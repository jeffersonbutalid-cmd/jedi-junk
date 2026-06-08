import { useEffect, useState, useRef } from 'react';
import {
  SEED, SHEET_ID, INSIGHTS_ENDPOINT, DASH_PW_SHA256, fetchLiveData, buildRecommendations,
  buildSearchTermRecs, termAction, computeWindows, buildView, buildAccountTree,
} from '../dashboard/dashboardData';

const PAGE_SIZE = 10;
function Pager({ page, pages, setPage }) {
  if (pages <= 1) return null;
  return (
    <div className="dash-pager">
      <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>‹ Prev</button>
      <span>Page {page} of {pages}</span>
      <button disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}>Next ›</button>
    </div>
  );
}

const logoSrc = '/assets/logo-horizontal.jpg';

const fmtMoney = (n) => '$' + (Number(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtNum = (n) => (Number(n) || 0).toLocaleString('en-US');
const fmtPct = (n) => (Number(n) || 0).toFixed(2) + '%';
function fmtDuration(secs) {
  const s = Math.round(Number(secs) || 0);
  if (!s) return '—';
  if (s < 60) return s + 's';
  return Math.floor(s / 60) + 'm ' + (s % 60) + 's';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// "2026-05-21" -> "21 May 2026" (Jefferson's preferred European format)
function fmtDate(iso) {
  if (!iso) return '';
  const m = String(iso).match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`;
}
function daysBetween(a, b) {
  const d1 = new Date(a), d2 = new Date(b);
  if (isNaN(d1) || isNaN(d2)) return null;
  return Math.round((d2 - d1) / 86400000) + 1;
}

async function sha256hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function pctChange(cur, prior) {
  if (!prior) return null;
  return ((cur - prior) / prior) * 100;
}

function Sparkline({ data, w = 96, h = 28 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - ((v - min) / span) * (h - 4) - 2]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = `M0,${h} ` + pts.map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ` L${w},${h} Z`;
  return (
    <svg className="dash-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={area} fill="rgba(33,233,61,0.12)" />
      <path d={line} fill="none" stroke="#21E93D" strokeWidth="1.5" />
    </svg>
  );
}

function DeltaPill({ change, goodWhenDown = false, neutral = false }) {
  if (change == null) return <span className="dash-delta flat">—</span>;
  const up = change >= 0;
  const good = neutral ? null : goodWhenDown ? !up : up;
  const cls = neutral ? 'flat' : good ? 'good' : 'bad';
  return <span className={'dash-delta ' + cls}>{up ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%</span>;
}

function KpiCard({ label, value, sub, change, goodWhenDown, neutral, spark, compare }) {
  return (
    <div className="dash-kpi">
      <div className="dash-kpi-label">{label}</div>
      <div className="dash-kpi-value">{value}</div>
      <div className="dash-kpi-foot">
        <span className="dash-kpi-sub">{sub}</span>
        {compare && <DeltaPill change={change} goodWhenDown={goodWhenDown} neutral={neutral} />}
      </div>
      <Sparkline data={spark} />
    </div>
  );
}

const STATUS = {
  good: { label: 'On Track', cls: 'st-good' },
  watch: { label: 'Watch', cls: 'st-watch' },
  crit: { label: 'Critical', cls: 'st-crit' },
  low: { label: 'Low Volume', cls: 'st-low' },
};
function StatusPill({ status }) {
  const s = STATUS[status] || STATUS.low;
  return <span className={'dash-pill ' + s.cls}>{s.label}</span>;
}

function KpiStrip({ t, spark, compare }) {
  const live2 = (a, b) => [Number(a) || 0, Number(b) || 0];
  const s = spark || {};
  return (
    <div className="dash-kpis">
      <KpiCard label="Total Leads" value={fmtNum(t.conversions)} sub={`${fmtNum(t.clicks)} clicks · ${fmtNum(t.impressions)} impr`} change={pctChange(t.conversions, t.prior_conversions)} compare={compare} spark={s.leads || live2(t.prior_conversions, t.conversions)} />
      <KpiCard label="Cost / Lead" value={t.cpl ? fmtMoney(t.cpl) : '—'} sub={`goal · ${fmtMoney(t.goal_cpl)}`} change={pctChange(t.cpl, t.prior_cpl)} goodWhenDown compare={compare} spark={s.cpl || live2(t.prior_cpl, t.cpl)} />
      <KpiCard label="Conversion Rate" value={fmtPct(t.conv_rate)} sub={`goal · ${t.goal_conv_rate.toFixed(2)}%`} change={pctChange(t.conv_rate, t.prior_conv_rate)} compare={compare} spark={s.cr || live2(t.prior_conv_rate, t.conv_rate)} />
      <KpiCard label="Total Spend" value={fmtMoney(t.spend)} sub={`avg CPC · ${fmtMoney(t.cpc)}`} change={pctChange(t.spend, t.prior_spend)} neutral compare={compare} spark={s.spend || live2(t.prior_spend, t.spend)} />
      <KpiCard label="Calls" value={fmtNum(t.calls)} sub="click-to-call + call ext" compare={compare} spark={s.calls} />
      <KpiCard label="Form Fills" value={fmtNum(t.form_fills)} sub={t.form_fills ? 'LP form submits' : 'tracking pending'} compare={compare} spark={s.forms} />
    </div>
  );
}

// Deterministic pseudo-delta for the seed account tree (illustrative until the tree is fed live).
function nodeDelta(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.round(((h >>> 0) % 4000) / 100 - 20); // -20..+19
}
function NumCell({ children, change, compare, goodWhenDown, neutral }) {
  return (
    <td className="num">
      {children}
      {compare && <div className="dash-cell-delta"><DeltaPill change={change} goodWhenDown={goodWhenDown} neutral={neutral} /></div>}
    </td>
  );
}

function AccountStructure({ account, t, compare }) {
  const [open, setOpen] = useState({});
  if (!account) return null;
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const adGroups = account.campaigns.reduce((n, c) => n + c.adGroups.length, 0);
  const ads = account.campaigns.reduce((n, c) => n + c.adGroups.reduce((m, g) => m + g.ads.length, 0), 0);
  const lb = t ? t.lost_is_budget : 0, lr = t ? t.lost_is_rank : 0;
  const parts = [];
  if (lb >= 10) parts.push(`losing ${fmtPct(lb)} of impressions to budget — raise daily budgets to capture more demand`);
  if (lr >= 10) parts.push(`losing ${fmtPct(lr)} to ad rank — lift Quality Score (ad relevance + landing-page experience) or raise bids`);
  return (
    <section className="dash-section">
      <h2 className="dash-h">ACCOUNT <span className="g">STRUCTURE</span></h2>
      <p className="dash-sub">{account.campaigns.length} campaigns · {adGroups} ad groups · {ads} ads · click a row to expand</p>
      <div className="dash-table-wrap">
        <table className="dash-table dash-tree">
          <thead>
            <tr>
              <th>Status</th><th>Name</th><th>Type</th>
              <th className="num">Impr</th><th className="num">Clicks</th><th className="num">CTR</th>
              <th className="num">Spend</th><th className="num">Conv</th><th className="num">CPL</th>
              <th>Final URL</th>
            </tr>
          </thead>
          <tbody>
            {account.campaigns.map((c, ci) => {
              const cKey = 'c' + ci;
              const cOpen = open[cKey];
              return (
                <FragmentRows key={cKey}>
                  <tr className="lvl-campaign" onClick={() => toggle(cKey)}>
                    <td><StatusPill status={c.status} /></td>
                    <td>
                      <span className="tw-chev">{cOpen ? '▾' : '▸'}</span><b>{c.name}</b>
                      <span className="tw-budget">{c.budget} · {c.state}</span>
                      {c.search_is != null && (
                        <span className="tw-is">IS {fmtPct(c.search_is)} · Lost B {fmtPct(c.lost_is_budget)} / R {fmtPct(c.lost_is_rank)} · Budget {fmtPct(c.budget_used)} used</span>
                      )}
                    </td>
                    <td className="dash-mono">{c.type}</td>
                    <NumCell change={c.d ? c.d.impr : nodeDelta(c.name + 'i')} compare={compare}>{fmtNum(c.impr)}</NumCell>
                    <NumCell change={c.d ? c.d.clicks : nodeDelta(c.name + 'c')} compare={compare}>{fmtNum(c.clicks)}</NumCell>
                    <NumCell change={c.d ? c.d.ctr : nodeDelta(c.name + 't')} compare={compare}>{fmtPct(c.ctr)}</NumCell>
                    <NumCell change={c.d ? c.d.spend : nodeDelta(c.name + 's')} compare={compare} neutral>{fmtMoney(c.spend)}</NumCell>
                    <NumCell change={c.d ? c.d.conv : nodeDelta(c.name + 'v')} compare={compare}>{fmtNum(c.conv)}</NumCell>
                    <NumCell change={c.d ? c.d.cpl : nodeDelta(c.name + 'p')} compare={compare} goodWhenDown>{c.cpl ? fmtMoney(c.cpl) : '—'}</NumCell>
                    <td>—</td>
                  </tr>
                  {cOpen && c.adGroups.map((g, gi) => {
                    const gKey = cKey + 'g' + gi;
                    const gOpen = open[gKey];
                    const gUrl = g.ads && g.ads.length ? g.ads[0].url : '';
                    const gWrong = g.ads && g.ads.some((a) => a.wrongUrl);
                    return (
                      <FragmentRows key={gKey}>
                        <tr className="lvl-adgroup" onClick={() => toggle(gKey)}>
                          <td><StatusPill status={g.status} /></td>
                          <td className="indent1"><span className="tw-chev">{gOpen ? '▾' : '▸'}</span>{g.name}{g.routing && <span className="tw-route">⚠ Routing</span>}</td>
                          <td className="dash-mono">Standard</td>
                          <NumCell change={g.d ? g.d.impr : nodeDelta(gKey + 'i')} compare={compare}>{fmtNum(g.impr)}</NumCell>
                          <NumCell change={g.d ? g.d.clicks : nodeDelta(gKey + 'c')} compare={compare}>{fmtNum(g.clicks)}</NumCell>
                          <NumCell change={g.d ? g.d.ctr : nodeDelta(gKey + 't')} compare={compare}>{fmtPct(g.ctr)}</NumCell>
                          <NumCell change={g.d ? g.d.spend : nodeDelta(gKey + 's')} compare={compare} neutral>{fmtMoney(g.spend)}</NumCell>
                          <NumCell change={g.d ? g.d.conv : nodeDelta(gKey + 'v')} compare={compare}>{fmtNum(g.conv)}</NumCell>
                          <NumCell change={g.d ? g.d.cpl : nodeDelta(gKey + 'p')} compare={compare} goodWhenDown>{g.cpl ? fmtMoney(g.cpl) : '—'}</NumCell>
                          <td className={'dash-url' + (gWrong ? ' wrong' : '')}>{gUrl ? (gWrong ? '⚠ ' : '') + gUrl : '—'}</td>
                        </tr>
                        {gOpen && g.ads.map((a, ai) => (
                          <tr className="lvl-ad" key={gKey + 'a' + ai}>
                            <td><span className={'dash-strength s-' + a.strength.toLowerCase()}>{a.strength}</span></td>
                            <td className="indent2 dash-ad-hl">{a.hl}</td>
                            <td className="dash-mono">RSA</td>
                            <NumCell change={a.d ? a.d.impr : nodeDelta(gKey + 'a' + ai + 'i')} compare={compare}>{fmtNum(a.impr)}</NumCell>
                            <NumCell change={a.d ? a.d.clicks : nodeDelta(gKey + 'a' + ai + 'c')} compare={compare}>{fmtNum(a.clicks)}</NumCell>
                            <NumCell change={a.d ? a.d.ctr : nodeDelta(gKey + 'a' + ai + 't')} compare={compare}>{fmtPct(a.ctr)}</NumCell>
                            <NumCell change={a.d ? a.d.spend : nodeDelta(gKey + 'a' + ai + 's')} compare={compare} neutral>{fmtMoney(a.spend)}</NumCell>
                            <NumCell change={a.d ? a.d.conv : nodeDelta(gKey + 'a' + ai + 'v')} compare={compare}>{fmtNum(a.conv)}</NumCell>
                            <NumCell change={a.d ? a.d.cpl : nodeDelta(gKey + 'a' + ai + 'p')} compare={compare} goodWhenDown>{a.cpl ? fmtMoney(a.cpl) : '—'}</NumCell>
                            <td className={'dash-url' + (a.wrongUrl ? ' wrong' : '')}>{a.wrongUrl && '⚠ '}{a.url}</td>
                          </tr>
                        ))}
                      </FragmentRows>
                    );
                  })}
                </FragmentRows>
              );
            })}
            <tr className="dash-totals">
              <td>—</td><td><b>TOTALS</b></td><td>—</td>
              <td className="num">{fmtNum(account.impr)}</td><td className="num">{fmtNum(account.clicks)}</td><td className="num">{fmtPct(account.ctr)}</td>
              <td className="num">{fmtMoney(account.spend)}</td><td className="num">{fmtNum(account.conv)}</td><td className="num">{fmtMoney(account.cpl)}</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
      {t && (
        <p className="dash-isnote">
          {parts.length
            ? <>⚠ You're {parts.join('; and ')}.</>
            : 'Impression share is healthy for this period — little demand lost to budget or rank.'}
        </p>
      )}
    </section>
  );
}
function FragmentRows({ children }) { return <>{children}</>; }

function LpTable({ lps, compare }) {
  return (
    <section className="dash-section">
      <h2 className="dash-h">LANDING PAGE <span className="g">PERFORMANCE</span></h2>
      <p className="dash-sub">{lps.length} pages · ranked by spend{compare ? ' · Δ vs prior period' : ''}</p>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Status</th><th>Landing Page</th><th>Ad Group</th>
              <th className="num">Impr</th><th className="num">Clicks</th><th className="num">CTR</th>
              <th className="num">Spend</th><th className="num">Conv</th><th className="num">CR%</th><th className="num">CPL</th>
            </tr>
          </thead>
          <tbody>
            {[...lps].sort((a, b) => b.spend - a.spend).map((lp) => (
              <tr key={lp.id}>
                <td><StatusPill status={lp.status} /></td>
                <td>
                  <div className="dash-lp-name">{lp.name}</div>
                  <div className="dash-lp-path">{lp.path}</div>
                  {lp.note && <div className="dash-lp-note">⚠ {lp.note}</div>}
                </td>
                <td className="dash-mono">{lp.ad_group}</td>
                <td className="num">{fmtNum(lp.impressions)}</td>
                <td className="num">{fmtNum(lp.clicks)}</td>
                <td className="num">{fmtPct(lp.ctr)}</td>
                <td className="num">{fmtMoney(lp.spend)}</td>
                <td className="num">{fmtNum(lp.conv)}{compare && lp.d && lp.d.conv != null && <div className="dash-cell-delta"><DeltaPill change={lp.d.conv} /></div>}</td>
                <td className="num">{lp.cr ? fmtPct(lp.cr) : '—'}</td>
                <td className="num">{lp.cpl ? fmtMoney(lp.cpl) : '—'}{compare && lp.d && lp.d.cpl != null && <div className="dash-cell-delta"><DeltaPill change={lp.d.cpl} goodWhenDown /></div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Funnel = real stages with the conversion rate that matters between each.
function FunnelCard({ t }) {
  const ctr = t.impressions ? (t.clicks / t.impressions) * 100 : 0;
  const cvr = t.clicks ? (t.conversions / t.clicks) * 100 : 0;
  const overall = t.impressions ? (t.conversions / t.impressions) * 100 : 0;
  const stages = [
    { label: 'IMPRESSIONS', v: t.impressions, note: 'shown to searchers' },
    { label: 'CLICKS', v: t.clicks, note: `${ctr.toFixed(2)}% click-through rate` },
    { label: 'LEADS', v: t.conversions, note: `${cvr.toFixed(2)}% of clicks convert` },
  ];
  const max = stages[0].v || 1;
  return (
    <div className="dash-card">
      <div className="dash-card-h">FUNNEL</div>
      <div className="dash-card-note">impressions → clicks → leads</div>
      <div className="dash-funnel">
        {stages.map((s) => (
          <div className="dash-funnel-row" key={s.label}>
            <div className="dash-funnel-meta"><span>{s.label}</span><b>{fmtNum(s.v)}</b></div>
            <div className="dash-funnel-bar"><span style={{ width: Math.max(2, (s.v / max) * 100) + '%' }} /></div>
            <div className="dash-funnel-drop">{s.note}</div>
          </div>
        ))}
      </div>
      <div className="dash-funnel-foot">
        {t.conversions
          ? <>≈ 1 lead per {Math.round(t.clicks / t.conversions)} clicks · {overall.toFixed(2)}% of impressions become leads</>
          : 'No leads in this period yet.'}
      </div>
    </div>
  );
}

const MIX_METRICS = [
  { key: 'clicks', label: 'Clicks' },
  { key: 'impressions', label: 'Impr' },
  { key: 'conv', label: 'Conv' },
];
const DEVICE_METRICS = [
  { key: 'clicks', label: 'Clicks' },
  { key: 'conv', label: 'Conv' },
];
function MetricToggle({ metric, setMetric, metrics = MIX_METRICS }) {
  return (
    <div className="dash-mini-seg">
      {metrics.map((m) => (
        <button key={m.key} className={metric === m.key ? 'on' : ''} onClick={() => setMetric(m.key)}>{m.label}</button>
      ))}
    </div>
  );
}

function SourceMixCard({ lps }) {
  const [metric, setMetric] = useState('clicks');
  const rows = lps.filter((l) => (l[metric] || 0) > 0).sort((a, b) => b[metric] - a[metric]);
  const total = rows.reduce((s, l) => s + (l[metric] || 0), 0) || 1;
  return (
    <div className="dash-card">
      <div className="dash-card-head">
        <div className="dash-card-h">SOURCE MIX</div>
        <MetricToggle metric={metric} setMetric={setMetric} />
      </div>
      <div className="dash-card-note">{MIX_METRICS.find((m) => m.key === metric).label.toLowerCase()} by landing page</div>
      <div className="dash-mix">
        {rows.length ? rows.map((l) => (
          <div className="dash-mix-row" key={l.id}>
            <div className="dash-mix-meta"><span>{l.name}</span><b>{fmtNum(l[metric])}</b></div>
            <div className="dash-mix-bar"><span style={{ width: ((l[metric] || 0) / total) * 100 + '%' }} /></div>
          </div>
        )) : <div className="dash-card-note">No {metric} in this period.</div>}
      </div>
    </div>
  );
}

function DeviceCard({ t }) {
  const [metric, setMetric] = useState('clicks');
  const dev = t.device || { mobile: {}, desktop: {}, other: {} };
  const m = (dev.mobile && dev.mobile[metric]) || 0;
  const d = (dev.desktop && dev.desktop[metric]) || 0;
  const o = (dev.other && dev.other[metric]) || 0;
  const total = m + d + o;
  const mp = total ? Math.round((m / total) * 100) : 0;
  const dp = total ? Math.round((d / total) * 100) : 0;
  const op = total ? 100 - mp - dp : 0;
  const g = '#21E93D', y = '#FFCD00', gr = '#3a3a3a';
  const donut = total
    ? `conic-gradient(${g} 0% ${mp}%, ${y} ${mp}% ${mp + dp}%, ${gr} ${mp + dp}% 100%)`
    : '#1f1f1f';
  return (
    <div className="dash-card">
      <div className="dash-card-head">
        <div className="dash-card-h">DEVICE SPLIT</div>
        <MetricToggle metric={metric} setMetric={setMetric} metrics={DEVICE_METRICS} />
      </div>
      {total ? (
        <div className="dash-device">
          <div className="dash-donut" style={{ background: donut }}>
            <div className="dash-donut-hole"><b>{mp}%</b><span>MOBILE</span></div>
          </div>
          <ul className="dash-legend">
            <li><i style={{ background: g }} />Mobile <b>{mp}%</b> · {fmtNum(m)}</li>
            <li><i style={{ background: y }} />Desktop <b>{dp}%</b> · {fmtNum(d)}</li>
            <li><i style={{ background: gr }} />Other <b>{op}%</b> · {fmtNum(o)}</li>
          </ul>
        </div>
      ) : (
        <div className="dash-card-note">No {metric} by device in this period (needs the updated daily feed).</div>
      )}
    </div>
  );
}

function TopCities({ cities }) {
  const [page, setPage] = useState(1);
  if (!cities || !cities.length) return null;
  const sorted = [...cities].sort((a, b) => b.spend - a.spend);
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const shown = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <section className="dash-section">
      <h2 className="dash-h">TOP <span className="g">CITIES</span></h2>
      <p className="dash-sub">{sorted.length} by spend · OC cluster highlighted</p>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead><tr><th>City</th><th className="num">Impr</th><th className="num">Clicks</th><th className="num">Spend</th><th className="num">Conv</th></tr></thead>
          <tbody>
            {shown.map((c) => (
              <tr key={c.city} className={c.oc ? 'oc-row' : ''}>
                <td>{c.city}{c.conv > 0 && <span className="tw-conv">✓ {c.conv} conv</span>}</td>
                <td className="num">{fmtNum(c.impr)}</td>
                <td className="num">{fmtNum(c.clicks)}</td>
                <td className="num">{fmtMoney(c.spend)}</td>
                <td className="num">{fmtNum(c.conv)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager page={page} pages={pages} setPage={setPage} />
    </section>
  );
}

const ACTION_CLS = { win: 'tf-win', neg: 'tf-neg', lp: 'tf-lp', test: 'tf-test' };
function SearchTerms({ terms }) {
  const [page, setPage] = useState(1);
  if (!terms || !terms.length) return null;
  const sorted = [...terms].sort((a, b) => b.cost - a.cost);
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const shown = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <section className="dash-section">
      <h2 className="dash-h">SEARCH <span className="g">TERMS</span></h2>
      <p className="dash-sub">{sorted.length} by spend · recommended action per term</p>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead><tr><th>Term</th><th>Match</th><th className="num">Clicks</th><th className="num">Cost</th><th className="num">Conv</th><th>Action</th></tr></thead>
          <tbody>
            {shown.map((s) => {
              const a = termAction(s);
              return (
                <tr key={s.term}>
                  <td className="dash-mono">{s.match === 'exact' ? `[${s.term}]` : `"${s.term}"`}</td>
                  <td className="dash-mono">{s.match}</td>
                  <td className="num">{fmtNum(s.clicks)}</td>
                  <td className="num">{fmtMoney(s.cost)}</td>
                  <td className="num">{fmtNum(s.conv)}</td>
                  <td>{a.cls ? <span className={'dash-tflag ' + ACTION_CLS[a.cls]}>{a.label}</span> : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pager page={page} pages={pages} setPage={setPage} />
    </section>
  );
}

function CallTracking({ win }) {
  const [state, setState] = useState({ status: 'idle', data: null, err: '' });
  const [page, setPage] = useState(1);
  const startKey = win ? win.start : '';
  const endKey = win ? win.end : '';
  useEffect(() => {
    if (!INSIGHTS_ENDPOINT || !win) return;
    let cancelled = false;
    setState({ status: 'loading', data: null, err: '' });
    setPage(1);
    const url = `${INSIGHTS_ENDPOINT}${INSIGHTS_ENDPOINT.includes('?') ? '&' : '?'}action=calls&start=${win.start}&end=${win.end}`;
    fetch(url, { method: 'GET' })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        if (j.error) throw new Error(j.error);
        setState({ status: 'done', data: j, err: '' });
      })
      .catch((e) => { if (!cancelled) setState({ status: 'error', data: null, err: String(e.message || e) }); });
    return () => { cancelled = true; };
  }, [startKey, endKey]);

  if (!INSIGHTS_ENDPOINT) return null;
  const d = state.data;
  const calls = (d && d.calls) || [];
  const pages = Math.max(1, Math.ceil(calls.length / PAGE_SIZE));
  const shown = calls.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <section className="dash-section">
      <h2 className="dash-h">CALL <span className="g">TRACKING</span></h2>
      <p className="dash-sub">CallRail · filtered to New Google Ads Jeff + Website Pool</p>
      {state.status === 'loading' && <p className="dash-sub">Loading calls…</p>}
      {state.status === 'error' && <p className="dash-sub">Couldn't load calls: {state.err}</p>}
      {state.status === 'done' && d && (
        <>
          <div className="dash-istiles">
            <div className="dash-istile"><div className="dash-istile-v">{fmtNum(d.total || 0)}</div><div className="dash-istile-l">Total Calls</div></div>
            <div className="dash-istile good"><div className="dash-istile-v">{fmtNum(d.answered || 0)}</div><div className="dash-istile-l">Answered</div></div>
            <div className="dash-istile bad"><div className="dash-istile-v">{fmtNum(d.missed || 0)}</div><div className="dash-istile-l">Missed</div></div>
          </div>
          {d.available_trackers && d.available_trackers.length > 0 && (
            <p className="dash-isnote" style={{ marginTop: 14 }}>
              ⚠ Filter ({(d.filter || []).join(', ')}) matched no trackers. Your CallRail trackers are:{' '}
              <b>{d.available_trackers.join(' · ')}</b>. Update the Worker secret <code>CALLRAIL_TRACKER_FILTER</code> with the right substrings (comma-separated).
            </p>
          )}
          {calls.length > 0 && (
            <>
              <div className="dash-table-wrap" style={{ marginTop: 14 }}>
                <table className="dash-table">
                  <thead><tr><th>Time</th><th>Caller</th><th className="num">Duration</th><th>Answered</th><th>Tags</th></tr></thead>
                  <tbody>
                    {shown.map((c, i) => (
                      <tr key={i}>
                        <td className="dash-mono">{String(c.time || '').replace('T', ' ').slice(0, 16)}</td>
                        <td className="dash-mono">{c.phone}</td>
                        <td className="num">{fmtDuration(c.duration)}</td>
                        <td>{c.answered ? '✓' : '✕'}</td>
                        <td>{Array.isArray(c.tags) && c.tags.length ? c.tags.join(', ') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pager page={page} pages={pages} setPage={setPage} />
            </>
          )}
          {d.note && (!d.available_trackers || !d.available_trackers.length) && <p className="dash-sub" style={{ marginTop: 10 }}>{d.note}</p>}
        </>
      )}
    </section>
  );
}

function TopKeywords({ keywords }) {
  const [page, setPage] = useState(1);
  if (!keywords || !keywords.length) return null;
  const qsCls = (q) => (q >= 7 ? 'qs-good' : q >= 5 ? 'qs-ok' : 'qs-bad');
  const sorted = [...keywords].sort((a, b) => b.cost - a.cost);
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const shown = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <section className="dash-section">
      <h2 className="dash-h">TOP <span className="g">KEYWORDS</span></h2>
      <p className="dash-sub">{sorted.length} by spend · with quality score</p>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead><tr><th>Keyword</th><th>Match</th><th className="num">Clicks</th><th className="num">Cost</th><th className="num">Conv</th><th className="num">CPL</th><th className="num">QS</th></tr></thead>
          <tbody>
            {shown.map((k) => (
              <tr key={k.kw}>
                <td className="dash-mono">{k.match === 'exact' ? `[${k.kw}]` : k.match === 'phrase' ? `"${k.kw}"` : k.kw}</td>
                <td className="dash-mono">{k.match}</td>
                <td className="num">{fmtNum(k.clicks)}</td>
                <td className="num">{fmtMoney(k.cost)}</td>
                <td className="num">{fmtNum(k.conv)}</td>
                <td className="num">{k.cpl ? fmtMoney(k.cpl) : '—'}</td>
                <td className="num">{k.qs ? <span className={'dash-qs ' + qsCls(k.qs)}>{k.qs}</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager page={page} pages={pages} setPage={setPage} />
    </section>
  );
}

const PRIO = { Critical: 'crit', High: 'watch', Medium: 'good', Low: 'low' };
function Recommendations({ recs }) {
  if (!recs.length) return null;
  return (
    <section className="dash-section">
      <h2 className="dash-h">WHAT TO <span className="g">FIX NEXT</span></h2>
      <p className="dash-sub">prioritised from current performance</p>
      <div className="dash-recs">
        {recs.map((r, i) => (
          <div className={'dash-rec sev-' + (PRIO[r.priority] || 'low')} key={i}>
            <div className="dash-rec-top">
              <span className={'dash-prio p-' + (PRIO[r.priority] || 'low')}>● {r.priority}</span>
              <span className="dash-rec-kind">{r.icon} {r.kind}</span>
            </div>
            <div className="dash-rec-name">{r.headline}</div>
            <div className="dash-rec-line"><b>EVIDENCE</b> {r.evidence}</div>
            <div className="dash-rec-line"><b>FIX</b> {r.fix}</div>
            <div className="dash-rec-line"><b>IMPACT</b> {r.impact}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyState({ onSeed }) {
  return (
    <div className="dash-empty">
      <h2>NOTHING TO HAUL <span className="g">YET.</span></h2>
      <p>
        {SHEET_ID
          ? "Couldn't reach the Google Sheet. Check it's shared “Anyone with the link → Viewer” with tabs named Totals and LandingPages."
          : 'No data source connected. Add your Google Sheet ID to the config, then switch to LIVE.'}
      </p>
      <button className="dash-btn" onClick={onSeed}>View example (SEED) data</button>
    </div>
  );
}

function DatePicker({ win, onApply, onClose }) {
  const [s, setS] = useState(win.start);
  const [e, setE] = useState(win.end);
  const valid = s && e && s <= e;
  return (
    <div className="dash-picker">
      <div className="dash-picker-row">
        <label>Start<input type="date" value={s} min={win.minDate} max={win.maxDate} onChange={(ev) => setS(ev.target.value)} /></label>
        <label>End<input type="date" value={e} min={win.minDate} max={win.maxDate} onChange={(ev) => setE(ev.target.value)} /></label>
      </div>
      <p className="dash-picker-note">
        Auto-compares to the equal prior period. Data available {fmtDate(win.minDate)} → {fmtDate(win.maxDate)}.
      </p>
      <div className="dash-picker-btns">
        <button type="button" className="dash-cmp" onClick={onClose}>Cancel</button>
        <button type="button" className="dash-btn" disabled={!valid} onClick={() => valid && onApply(s, e)}>Apply</button>
      </div>
    </div>
  );
}

// Compact, token-light summary sent to the Claude proxy — only sections that warrant action.
function buildInsightPayload(t, lps, searchTerms) {
  const problem = lps.filter((l) => l.id !== 'brand' && (l.status === 'crit' || l.status === 'watch'))
    .map((l) => ({ lp: l.name, clicks: l.clicks, spend: l.spend, conv: l.conv, cpl: l.cpl, cr: l.cr, status: l.status }));
  const terms = searchTerms || [];
  const wasted = terms.filter((s) => termAction(s).kind === 'NEGATIVE').slice(0, 3).map((s) => ({ term: s.term, clicks: s.clicks, cost: s.cost }));
  const opp = terms.filter((s) => termAction(s).kind === 'OPPORTUNITY').slice(0, 2).map((s) => ({ term: s.term, clicks: s.clicks, cost: s.cost }));
  return {
    range: `${t.date_start}..${t.date_end}`,
    account: { clicks: t.clicks, spend: t.spend, conv: t.conversions, cpl: t.cpl, cr: t.conv_rate, goal_cpl: t.goal_cpl, goal_cr: t.goal_conv_rate, lost_is_budget: t.lost_is_budget, calls: t.calls, forms: t.form_fills },
    problem_landing_pages: problem,
    wasted_search_terms: wasted,
    opportunity_search_terms: opp,
  };
}

function Dashboard() {
  const [mode, setMode] = useState('SEED');
  const [data, setData] = useState(() => ({ ...SEED, snapshot: SEED.totals }));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [range, setRange] = useState('7D');
  const [custom, setCustom] = useState({ start: '', end: '' });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [compare, setCompare] = useState(true);
  const [ins, setIns] = useState({ status: 'idle', items: [], overview: '', err: '' });
  const insightsActive = useRef(false); // true once the user has generated insights at least once
  const genRef = useRef(null);

  const loadLive = async () => {
    setLoading(true); setError(false);
    try { setData(await fetchLiveData()); setMode('LIVE'); }
    catch (e) { setError(true); setMode('LIVE'); setData(null); }
    finally { setLoading(false); }
  };
  const loadSeed = () => { setData({ ...SEED, snapshot: SEED.totals }); setMode('SEED'); setError(false); };

  const daily = data?.daily;
  const win = daily && daily.length ? computeWindows(daily, range, custom.start, custom.end) : null;
  const view = daily && win ? buildView(daily, data.snapshot || SEED.totals, win) : null;
  const t = view?.totals;
  const lps = view?.lps || [];
  const sevOrder = { crit: 0, watch: 1, good: 2, low: 3 };
  const recs = t
    ? [...buildRecommendations(t, lps), ...buildSearchTermRecs(data.searchTerms)].sort((a, b) => sevOrder[a.sev] - sevOrder[b.sev])
    : [];
  // Live account tree (range-aware, real deltas) when the sheet feeds it; else seed.
  const account = (win && data.structure && data.structure.length && data.structureMeta)
    ? (buildAccountTree(data.structure, data.structureMeta, win) || data.account)
    : data.account;

  const applyPreset = (r) => { setRange(r); setCustom({ start: '', end: '' }); setPickerOpen(false); };
  const applyCustom = (s, e) => { setCustom({ start: s, end: e }); setRange('CUSTOM'); setPickerOpen(false); };

  const genInsights = async () => {
    insightsActive.current = true; // engage auto-refresh on subsequent range/data changes
    if (!INSIGHTS_ENDPOINT) { setIns({ status: 'unconfigured', items: [], overview: '', err: '' }); return; }
    if (!t) return;
    setIns({ status: 'loading', items: [], overview: '', err: '' });
    try {
      const payload = buildInsightPayload(t, lps, data.searchTerms);
      const res = await fetch(INSIGHTS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setIns({ status: 'done', items: json.insights || [], overview: json.overview || '', err: '' });
    } catch (e) {
      setIns({ status: 'error', items: [], overview: '', err: String(e.message || e) });
    }
  };

  // Keep the latest genInsights closure (with current range/data) reachable from the effect.
  genRef.current = genInsights;

  // Once insights have been generated, auto-refresh them when the period or data source changes.
  useEffect(() => {
    if (!insightsActive.current || !INSIGHTS_ENDPOINT) return;
    const id = setTimeout(() => { if (genRef.current) genRef.current(); }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, custom.start, custom.end, mode]);

  return (
    <div className="dash">
      <header className="dash-nav">
        <div className="dash-nav-l">
          <img src={logoSrc} alt="JEDI" className="dash-logo" />
          <span className="dash-nav-tag">JEDI JUNK REMOVAL DASHBOARD</span>
        </div>
        <div className="dash-nav-r">
          <div className="dash-seg">
            {['7D', '14D', '30D'].map((r) => (
              <button key={r} className={range === r ? 'on' : ''} onClick={() => applyPreset(r)}>{r}</button>
            ))}
            <button className={range === 'CUSTOM' ? 'on' : ''} onClick={() => setPickerOpen((o) => !o)}>CUSTOM</button>
          </div>
          <button className="dash-insights-btn" onClick={genInsights} disabled={ins.status === 'loading'}>✨ {ins.status === 'loading' ? 'Thinking…' : 'AI Insights'}</button>
          <button className={'dash-cmp' + (compare ? ' on' : '')} onClick={() => setCompare((c) => !c)}>Compare</button>
          <div className="dash-toggle">
            <button className={mode === 'SEED' ? 'on' : ''} onClick={loadSeed}>SEED</button>
            <button className={mode === 'LIVE' ? 'on' : ''} onClick={loadLive}>LIVE</button>
          </div>
          <button className="dash-refresh" onClick={mode === 'LIVE' ? loadLive : loadSeed} aria-label="Refresh">↻</button>
        </div>
        {pickerOpen && win && <DatePicker win={win} onApply={applyCustom} onClose={() => setPickerOpen(false)} />}
      </header>

      {t && win && (
        <div className="dash-datebar">
          <span>
            {fmtDate(win.start)} → {fmtDate(win.end)} · {win.len} days
            {compare && <span className="dash-datebar-cmp"> · vs {fmtDate(win.priorStart)} → {fmtDate(win.priorEnd)}</span>}
          </span>
          <span className="dash-datebar-r">LAST REFRESHED {t.last_sync || '—'} · auto-refresh every 15m</span>
        </div>
      )}

      {loading && <div className="dash-loading">Loading live data…</div>}
      {!loading && (!data || error) && <EmptyState onSeed={loadSeed} />}

      {!loading && view && t && (
        <main className="dash-main">
          {mode === 'SEED' && <div className="dash-banner">Showing <b>example</b> data — switch to LIVE once your Google Sheet is feeding real numbers.</div>}
          {ins.status !== 'idle' && (
            <section className="dash-insights">
              <h2 className="dash-h">✨ AI INSIGHTS <span className="g">OVERVIEW</span></h2>
              {ins.status === 'loading' && <p className="dash-insights-text">Analysing this period with Claude…</p>}
              {ins.status === 'unconfigured' && <p className="dash-insights-text">Insights proxy not connected yet — deploy the Worker and paste its URL into the dashboard config.</p>}
              {ins.status === 'error' && <p className="dash-insights-text">Couldn't generate insights: {ins.err}</p>}
              {ins.status === 'done' && (
                <p className="dash-insights-text">
                  {ins.overview
                    ? ins.overview
                    : ins.items.length
                      ? ins.items.map((it) => `${it.title} — ${it.action}.`).join(' ')
                      : 'No urgent insights for this period — metrics look on track.'}
                </p>
              )}
            </section>
          )}
          <KpiStrip t={t} spark={view.sparklines} compare={compare} />
          <AccountStructure account={account} t={t} compare={compare} />
          <LpTable lps={lps} compare={compare} />
          <div className="dash-three">
            <FunnelCard t={t} />
            <SourceMixCard lps={lps} />
            <DeviceCard t={t} />
          </div>
          <CallTracking win={win} />
          <TopKeywords keywords={data.keywords} />
          <SearchTerms terms={data.searchTerms} />
          <TopCities cities={data.cities} />
          <Recommendations recs={recs} />
          <footer className="dash-footer">
            <span>Source · Google Sheet bridge {t.last_sync ? `· last sync ${t.last_sync}` : ''}</span>
            <span>Conversions tracked · Click-to-Call · Phone Call · Calls from ads · Form Submit (LP)</span>
            <span className="dash-footer-tag">POINT. WE HAUL. DONE. · Built by Logos Framework</span>
          </footer>
        </main>
      )}
    </div>
  );
}

function Gate({ onUnlock }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const hex = await sha256hex(pw);
    if (hex === DASH_PW_SHA256) {
      try { sessionStorage.setItem('dash_ok', '1'); } catch (x) {}
      onUnlock();
    } else { setErr(true); }
  };
  return (
    <div className="dash dash-gate">
      <form className="dash-gate-box" onSubmit={submit}>
        <img src={logoSrc} alt="JEDI" className="dash-logo" />
        <div className="dash-gate-tag">CRO DASHBOARD</div>
        <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setErr(false); }} placeholder="Password" autoFocus className="dash-gate-input" />
        {err && <div className="dash-gate-err">Wrong password.</div>}
        <button type="submit" className="dash-btn">Unlock</button>
      </form>
    </div>
  );
}

export default function DashboardPage() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    document.title = 'CRO · Landing Pages · JEDI Junk Removal';
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    try { if (sessionStorage.getItem('dash_ok') === '1') setOk(true); } catch (x) {}
    return () => { try { document.head.removeChild(m); } catch (x) {} };
  }, []);
  return ok ? <Dashboard /> : <Gate onUnlock={() => setOk(true)} />;
}
