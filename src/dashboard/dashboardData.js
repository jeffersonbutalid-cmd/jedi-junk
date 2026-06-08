// ============================================================
// CRO Dashboard — data layer
// ------------------------------------------------------------
// The dashboard reads two tabs from a Google Sheet (the "bridge"):
//   • "Totals"        — account-level metrics as key,value rows
//   • "LandingPages"  — one row per landing page (header + rows)
//
// To connect live data:
//   1. Make a Google Sheet with those two tabs (see schema below).
//   2. Share it "Anyone with the link → Viewer".
//   3. Paste the spreadsheet ID into SHEET_ID below (I do the rebuild).
//   4. Feed it from Google Ads (scheduled report) + your leads sheet.
// Until SHEET_ID is set, the LIVE toggle shows a "connect" empty state;
// the SEED toggle always shows the example data below so you can see it work.
// ============================================================

export const SHEET_ID = '1xdkNSe1qNRqd_-wiTWkp4VAUV4PZUnY2ZQCKAbL28-w';

// Google Apps Script web-app URL that proxies the Claude API for the Insights
// button (holds your Anthropic key server-side). Paste it here once deployed.
export const INSIGHTS_ENDPOINT = 'https://jedi-insights.jeffersonbutalid.workers.dev/';

// gviz CSV endpoint — works cross-origin, needs link-viewer sharing
const sheetUrl = (tab) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;

// SHA-256 of the dashboard password ("jedicro2026"). Ask me to change it.
export const DASH_PW_SHA256 =
  '281618449cacde43166bf694967cac070bbd425889bcce50501116bac4ab7b6b';

// ---------- Seed (example) data ----------
export const SEED = {
  totals: {
    date_start: '2026-05-21',
    date_end: '2026-05-24',
    last_sync: '2026-05-24 14:32 PT',
    impressions: 1041,
    clicks: 87,
    ctr: 8.36,
    spend: 550.76,
    cpc: 6.33,
    conversions: 2,
    conv_rate: 2.30,
    cpl: 275.38,
    calls: 2,
    form_fills: 0,
    mobile_clicks: 74,
    desktop_clicks: 10,
    other_clicks: 3,
    goal_cpl: 100,
    goal_conv_rate: 3.0,
    prior_clicks: 71,
    prior_conversions: 1,
    prior_spend: 498.10,
    prior_cpl: 498.10,
    prior_conv_rate: 1.41,
    search_is: 42.3,
    lost_is_budget: 31.5,
    lost_is_rank: 26.2,
    budget_used: 88,
  },
  lps: [
    { id: 'same-day', name: 'Same-Day Junk Removal', path: '/same-day', ad_group: 'Same-Day · LA', impressions: 652, clicks: 46, ctr: 7.06, spend: 369.06, conv: 2, cr: 4.35, cpl: 184.53, status: 'good', note: '' },
    { id: 'cleanout', name: 'Junk Cleanout Service', path: '/cleanouts', ad_group: 'Cleanouts', impressions: 222, clicks: 28, ctr: 12.61, spend: 117.74, conv: 0, cr: 0, cpl: 0, status: 'crit', note: 'High clicks, zero conversions — check intent + offer' },
    { id: 'mattress', name: 'Mattress Removal', path: '/mattress-removal', ad_group: 'Mattress', impressions: 142, clicks: 9, ctr: 6.34, spend: 40.62, conv: 0, cr: 0, cpl: 0, status: 'watch', note: '' },
    { id: 'hauling', name: 'Junk Hauling', path: '/junk-hauling', ad_group: 'Hauling', impressions: 19, clicks: 1, ctr: 5.26, spend: 15.94, conv: 0, cr: 0, cpl: 0, status: 'low', note: '' },
    { id: 'orange-county', name: 'Orange County Junk Removal', path: '/orange-county', ad_group: 'Geo · OC', impressions: 358, clicks: 30, ctr: 8.38, spend: 190.0, conv: 1, cr: 3.33, cpl: 190.0, status: 'watch', note: '' },
    { id: 'brand', name: 'Brand (homepage)', path: '/', ad_group: 'Brand', impressions: 6, clicks: 3, ctr: 50, spend: 7.39, conv: 0, cr: 0, cpl: 0, status: 'low', note: '' },
  ],
  // 12-point sparkline series per KPI (oldest → newest)
  sparklines: {
    leads: [0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 2],
    cpl: [498, 470, 410, 388, 360, 333, 310, 300, 290, 285, 280, 275],
    cr: [1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 1.9, 2.0, 2.1, 2.2, 2.25, 2.3],
    spend: [120, 180, 240, 300, 340, 380, 410, 450, 480, 510, 530, 551],
    calls: [0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 2],
    forms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  cities: [
    { city: 'Anaheim', impr: 115, clicks: 9, spend: 53.31, conv: 0, oc: true },
    { city: 'Long Beach', impr: 64, clicks: 9, spend: 69.62, conv: 0 },
    { city: 'Los Angeles', impr: 57, clicks: 9, spend: 49.40, conv: 0 },
    { city: 'Oxnard', impr: 73, clicks: 8, spend: 27.25, conv: 0 },
    { city: 'Whittier', impr: 25, clicks: 5, spend: 24.41, conv: 0 },
    { city: 'Garden Grove', impr: 22, clicks: 4, spend: 18.51, conv: 0, oc: true },
    { city: 'Buena Park', impr: 16, clicks: 4, spend: 15.26, conv: 0, oc: true },
    { city: 'Irvine', impr: 50, clicks: 3, spend: 28.37, conv: 0, oc: true },
    { city: 'Ventura', impr: 34, clicks: 3, spend: 8.26, conv: 1 },
    { city: 'Simi Valley', impr: 36, clicks: 3, spend: 18.22, conv: 0 },
    { city: 'Villa Park', impr: 13, clicks: 1, spend: 27.30, conv: 1, oc: true },
    { city: 'Rowland Heights', impr: 8, clicks: 3, spend: 21.46, conv: 0 },
  ],
  searchTerms: [
    { term: 'junk cleanout service', match: 'phrase', clicks: 24, cost: 101.00, conv: 0, flag: 'test' },
    { term: 'junk pick up service', match: 'phrase', clicks: 14, cost: 103.75, conv: 0, flag: 'test' },
    { term: 'pick up trash', match: 'phrase', clicks: 10, cost: 95.34, conv: 0, flag: 'neg' },
    { term: 'pick up junk', match: 'phrase', clicks: 4, cost: 48.02, conv: 0 },
    { term: 'junk removal orange county', match: 'phrase', clicks: 2, cost: 47.14, conv: 1, flag: 'win' },
    { term: 'haul furniture away', match: 'phrase', clicks: 2, cost: 11.80, conv: 0 },
    { term: 'junk removal whittier', match: 'exact', clicks: 2, cost: 11.10, conv: 0 },
    { term: 'old paint disposal', match: 'phrase', clicks: 2, cost: 10.75, conv: 0, flag: 'neg' },
    { term: 'mattress disposal service', match: 'broad', clicks: 3, cost: 15.44, conv: 0 },
    { term: 'old mattress removal', match: 'phrase', clicks: 4, cost: 14.45, conv: 0 },
    { term: 'junk hauling service', match: 'exact', clicks: 1, cost: 15.94, conv: 0 },
    { term: 'estate cleanout near me', match: 'broad', clicks: 4, cost: 16.74, conv: 0 },
  ],
  keywords: [
    { kw: 'same day junk removal', match: 'phrase', clicks: 22, cost: 142.10, conv: 1, cpl: 142.10, qs: 7 },
    { kw: 'junk removal near me', match: 'broad', clicks: 18, cost: 121.40, conv: 1, cpl: 121.40, qs: 6 },
    { kw: 'house cleanout service', match: 'phrase', clicks: 16, cost: 88.20, conv: 0, cpl: 0, qs: 5 },
    { kw: 'mattress removal', match: 'exact', clicks: 9, cost: 40.62, conv: 0, cpl: 0, qs: 6 },
    { kw: 'junk hauling', match: 'phrase', clicks: 6, cost: 38.10, conv: 0, cpl: 0, qs: 5 },
    { kw: 'junk removal orange county', match: 'exact', clicks: 2, cost: 47.14, conv: 1, cpl: 47.14, qs: 8 },
  ],
  account: {
    name: 'LOGOS · Search account',
    impr: 1041, clicks: 87, ctr: 8.36, spend: 550.76, conv: 2, cr: 2.30, cpl: 275.38,
    campaigns: [
      {
        name: 'Core Junk Removal', type: 'Search', budget: '$170/day', state: 'Eligible (Learning)',
        impr: 671, clicks: 47, ctr: 7.00, spend: 385.00, conv: 2, cr: 4.26, cpl: 192.50, status: 'good', search_is: 24, lost_is_budget: 30, lost_is_rank: 46, budget_used: 88,
        adGroups: [
          { name: 'Junk Removal', impr: 646, clicks: 45, ctr: 6.97, spend: 368.26, conv: 2, cr: 4.41, cpl: 184.13, status: 'good', ads: [
            { hl: 'Junk Removal Near You / Same Day Junk Removal', url: '/los-angeles-junk-removal', strength: 'Good', clicks: 20, impr: 290, ctr: 6.90, spend: 179.62, conv: 2, cpl: 89.81 },
            { hl: 'Same Day Junk Removal / Junk Removal Today', url: '/', strength: 'Good', clicks: 17, impr: 243, ctr: 7.00, spend: 138.89, conv: 0 },
            { hl: 'Get junk removal service today / Affordable', url: '/', strength: 'Good', clicks: 8, impr: 113, ctr: 7.08, spend: 49.76, conv: 0 },
          ] },
          { name: 'Same Day / Fast', impr: 6, clicks: 1, ctr: 16.67, spend: 0.80, conv: 0, cr: 0, cpl: 0, status: 'low', ads: [
            { hl: 'Same Day Junk Removal / Junk Removal Today', url: '/', strength: 'Good', clicks: 0, impr: 1, ctr: 0, spend: 0, conv: 0 },
            { hl: 'Get junk removal services / Book Jedi today', url: '/general-cleanout-service', strength: 'Excellent', clicks: 1, impr: 5, ctr: 20.0, spend: 0.80, conv: 0 },
          ] },
          { name: 'Junk Hauling', impr: 19, clicks: 1, ctr: 5.26, spend: 15.94, conv: 0, cr: 0, cpl: 0, status: 'low', routing: true, ads: [
            { hl: 'Junk Hauling Near You / Fast Junk Hauling', url: '/shed-removal-services', strength: 'Good', clicks: 0, impr: 7, ctr: 0, spend: 0, conv: 0, wrongUrl: true },
            { hl: 'Junk Hauling Today / Call Now For Hauling', url: '/shed-removal-services', strength: 'Excellent', clicks: 1, impr: 12, ctr: 8.33, spend: 15.94, conv: 0, wrongUrl: true },
          ] },
        ],
      },
      {
        name: 'Service-Specific', type: 'Search', budget: '$40/day', state: 'Eligible',
        impr: 364, clicks: 37, ctr: 10.16, spend: 158.36, conv: 0, cr: 0, cpl: 0, status: 'crit', search_is: 18, lost_is_budget: 12, lost_is_rank: 70, budget_used: 79,
        adGroups: [
          { name: 'Cleanouts', impr: 222, clicks: 28, ctr: 12.61, spend: 117.74, conv: 0, cr: 0, cpl: 0, status: 'crit', ads: [
            { hl: 'Fast House Cleanouts / Garage Cleanout', url: '/general-cleanout-service', strength: 'Excellent', clicks: 15, impr: 92, ctr: 16.30, spend: 60.81, conv: 0 },
            { hl: 'House Cleanout Near You / Estate Cleanout', url: '/general-cleanout-service', strength: 'Excellent', clicks: 13, impr: 130, ctr: 10.0, spend: 56.93, conv: 0 },
          ] },
          { name: 'Mattress Removal', impr: 142, clicks: 9, ctr: 6.34, spend: 40.62, conv: 0, cr: 0, cpl: 0, status: 'watch', routing: true, ads: [
            { hl: 'Mattress Removal Near You / Mattress Pickup', url: '/furniture-removal-services', strength: 'Excellent', clicks: 6, impr: 71, ctr: 8.45, spend: 26.10, conv: 0, wrongUrl: true },
            { hl: 'Old Mattress Removal / Fast Bed Removal', url: '/furniture-removal-services', strength: 'Excellent', clicks: 3, impr: 71, ctr: 4.23, spend: 14.52, conv: 0, wrongUrl: true },
          ] },
        ],
      },
      {
        name: 'Brand', type: 'Search', budget: '$10/day', state: 'Eligible',
        impr: 6, clicks: 3, ctr: 50.0, spend: 7.39, conv: 0, cr: 0, cpl: 0, status: 'low', search_is: 62, lost_is_budget: 5, lost_is_rank: 33, budget_used: 40,
        adGroups: [
          { name: 'Brand', impr: 6, clicks: 3, ctr: 50.0, spend: 7.39, conv: 0, cr: 0, cpl: 0, status: 'low', ads: [
            { hl: 'Jedi Junk Removal / Call Jedi Junk Today', url: '/', strength: 'Average', clicks: 1, impr: 3, ctr: 33.33, spend: 0.93, conv: 0 },
            { hl: 'Jedi Junk Removal / Book Jedi today', url: '/general-cleanout-service', strength: 'Good', clicks: 2, impr: 3, ctr: 66.67, spend: 6.46, conv: 0 },
          ] },
        ],
      },
    ],
  },
};

// ---------- CSV parsing ----------
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', i = 0, inQ = false;
  while (i < text.length) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQ = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQ = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const num = (v) => {
  const n = parseFloat(String(v == null ? '' : v).replace(/[$,%\s]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

// ───────── Daily time-series (powers date-range switching + compare) ─────────
function round2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
function pct(a, b) { return b ? (a / b) * 100 : 0; }
function pctChange(cur, prior) { return prior ? ((cur - prior) / prior) * 100 : null; }
function addDays(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function daysInclusive(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000) + 1; }
function statusFor(clicks, conv, spend, cr, cpl) {
  if (spend >= 50 && conv === 0) return 'crit';
  if (cr >= 3 && cpl > 0 && cpl <= 100) return 'good';
  if (clicks >= 10 && cr < 1) return 'watch';
  if (clicks < 10) return 'low';
  return 'watch';
}

export const LP_META = SEED.lps.reduce((m, lp) => { m[lp.id] = { name: lp.name, path: lp.path, ad_group: lp.ad_group }; return m; }, {});
const LP_IDS = SEED.lps.map((lp) => lp.id);

// ~35 days of deterministic seed daily rows so the date picker works in SEED mode.
function genSeedDaily() {
  const base = {
    'same-day':      { impr: 90, clicks: 6.5, cost: 52,  convStep: 3 },
    'cleanout':      { impr: 32, clicks: 4,   cost: 17,  convStep: 0 },
    'mattress':      { impr: 20, clicks: 1.3, cost: 6,   convStep: 0 },
    'hauling':       { impr: 3,  clicks: 0.3, cost: 2.3, convStep: 0 },
    'orange-county': { impr: 51, clicks: 4.3, cost: 27,  convStep: 6 },
    'brand':         { impr: 1,  clicks: 0.45, cost: 1,  convStep: 0 },
  };
  const rows = [];
  const DAYS = 35;
  const endStr = '2026-05-25';
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = addDays(endStr, -i);
    const wob = 0.85 + 0.30 * (((i * 7) % 11) / 11);
    const acc = { impr: 0, clicks: 0, cost: 0, conv: 0 };
    LP_IDS.forEach((id) => {
      const b = base[id];
      const clicks = Math.max(0, Math.round(b.clicks * wob));
      const impr = Math.round(b.impr * wob);
      const cost = round2(b.cost * wob);
      const conv = (b.convStep && i % b.convStep === 2) ? 1 : 0;
      acc.impr += impr; acc.clicks += clicks; acc.cost += cost; acc.conv += conv;
      rows.push({ date, scope: id, impr, clicks, cost, conv, calls: 0, forms: 0, mobile: 0, desktop: 0, other: 0 });
    });
    const calls = Math.round(acc.conv * 0.6);
    const forms = acc.conv - calls;
    const mobile = Math.round(acc.clicks * 0.85);
    const desktop = Math.round(acc.clicks * 0.12);
    const other = Math.max(0, acc.clicks - mobile - desktop);
    const mobile_impr = Math.round(acc.impr * 0.85);
    const desktop_impr = Math.round(acc.impr * 0.12);
    const other_impr = Math.max(0, acc.impr - mobile_impr - desktop_impr);
    const mobile_conv = Math.round(acc.conv * 0.8);
    const desktop_conv = Math.max(0, acc.conv - mobile_conv);
    const search_is = round2(22 + 6 * (((i * 5) % 9) / 9));
    const lost_is_budget = round2(31 + 6 * (((i * 3) % 7) / 7));
    const lost_is_rank = round2(42 + 5 * (((i * 4) % 8) / 8));
    rows.push({ date, scope: 'ACCOUNT', impr: acc.impr, clicks: acc.clicks, cost: round2(acc.cost), conv: acc.conv, calls, forms, mobile, desktop, other, mobile_impr, desktop_impr, other_impr, mobile_conv, desktop_conv, other_conv: 0, search_is, lost_is_budget, lost_is_rank });
  }
  return rows;
}
SEED.daily = genSeedDaily();

function aggregateRange(daily, start, end) {
  const acc = { impr: 0, clicks: 0, cost: 0, conv: 0, calls: 0, forms: 0, mobile: 0, desktop: 0, other: 0, isW: 0, budW: 0, rankW: 0,
    dev: { mobile: { impr: 0, clicks: 0, conv: 0 }, desktop: { impr: 0, clicks: 0, conv: 0 }, other: { impr: 0, clicks: 0, conv: 0 } } };
  const lps = {}; LP_IDS.forEach((id) => { lps[id] = { impr: 0, clicks: 0, cost: 0, conv: 0 }; });
  daily.forEach((r) => {
    if (r.date < start || r.date > end) return;
    if (r.scope === 'ACCOUNT') {
      acc.impr += r.impr; acc.clicks += r.clicks; acc.cost += r.cost; acc.conv += r.conv;
      acc.calls += r.calls; acc.forms += r.forms; acc.mobile += r.mobile; acc.desktop += r.desktop; acc.other += r.other;
      acc.isW += (r.search_is || 0) * r.impr; acc.budW += (r.lost_is_budget || 0) * r.impr; acc.rankW += (r.lost_is_rank || 0) * r.impr;
      acc.dev.mobile.clicks += r.mobile; acc.dev.desktop.clicks += r.desktop; acc.dev.other.clicks += r.other;
      acc.dev.mobile.impr += r.mobile_impr || 0; acc.dev.desktop.impr += r.desktop_impr || 0; acc.dev.other.impr += r.other_impr || 0;
      acc.dev.mobile.conv += r.mobile_conv || 0; acc.dev.desktop.conv += r.desktop_conv || 0; acc.dev.other.conv += r.other_conv || 0;
    } else if (lps[r.scope]) {
      lps[r.scope].impr += r.impr; lps[r.scope].clicks += r.clicks; lps[r.scope].cost += r.cost; lps[r.scope].conv += r.conv;
    }
  });
  return { acc, lps };
}

export function computeWindows(daily, range, cStart, cEnd) {
  const dates = daily.map((r) => r.date).sort();
  const minDate = dates[0], maxDate = dates[dates.length - 1];
  let len, start, end;
  if (range === 'CUSTOM' && cStart && cEnd) { start = cStart; end = cEnd; len = daysInclusive(start, end); }
  else { len = range === '14D' ? 14 : range === '30D' ? 30 : 7; end = maxDate; start = addDays(end, -(len - 1)); }
  if (start < minDate) start = minDate;
  const priorEnd = addDays(start, -1);
  const priorStart = addDays(priorEnd, -(len - 1));
  return { start, end, priorStart, priorEnd, minDate, maxDate, len };
}

export function buildView(daily, snapshot, win) {
  const cur = aggregateRange(daily, win.start, win.end);
  const pri = aggregateRange(daily, win.priorStart, win.priorEnd);
  const a = cur.acc, pa = pri.acc;
  const s = snapshot || {};
  // Impression share = impression-weighted over the window; fall back to the snapshot if daily lacks IS columns.
  const curIs = a.impr ? round2(a.isW / a.impr) : 0;
  const priorIs = pa.impr ? round2(pa.isW / pa.impr) : 0;
  const curBud = a.impr ? round2(a.budW / a.impr) : 0;
  const priorBud = pa.impr ? round2(pa.budW / pa.impr) : 0;
  const curRank = a.impr ? round2(a.rankW / a.impr) : 0;
  const priorRank = pa.impr ? round2(pa.rankW / pa.impr) : 0;
  const totals = {
    date_start: win.start, date_end: win.end, last_sync: s.last_sync || '',
    impressions: a.impr, clicks: a.clicks, ctr: round2(pct(a.clicks, a.impr)),
    spend: round2(a.cost), cpc: a.clicks ? round2(a.cost / a.clicks) : 0,
    conversions: a.conv, conv_rate: round2(pct(a.conv, a.clicks)), cpl: a.conv ? round2(a.cost / a.conv) : 0,
    calls: a.calls, form_fills: a.forms,
    mobile_clicks: a.mobile, desktop_clicks: a.desktop, other_clicks: a.other,
    device: a.dev,
    goal_cpl: s.goal_cpl || 100, goal_conv_rate: s.goal_conv_rate || 3,
    prior_clicks: pa.clicks, prior_conversions: pa.conv, prior_spend: round2(pa.cost),
    prior_cpl: pa.conv ? round2(pa.cost / pa.conv) : 0, prior_conv_rate: round2(pct(pa.conv, pa.clicks)),
    search_is: curIs || (s.search_is || 0), lost_is_budget: curBud || (s.lost_is_budget || 0), lost_is_rank: curRank || (s.lost_is_rank || 0), budget_used: s.budget_used || 0,
    prior_search_is: priorIs, prior_lost_is_budget: priorBud, prior_lost_is_rank: priorRank,
  };
  const lps = LP_IDS.map((id) => {
    const m = cur.lps[id], pm = pri.lps[id] || { clicks: 0, cost: 0, conv: 0 }, meta = LP_META[id] || {};
    const ctr = round2(pct(m.clicks, m.impr)), cr = round2(pct(m.conv, m.clicks)), cpl = m.conv ? round2(m.cost / m.conv) : 0;
    const pcpl = pm.conv ? pm.cost / pm.conv : 0;
    const d = { conv: pctChange(m.conv, pm.conv), cpl: pctChange(cpl, pcpl), spend: pctChange(m.cost, pm.cost) };
    return { id, name: meta.name, path: meta.path, ad_group: meta.ad_group, impressions: m.impr, clicks: m.clicks, ctr, spend: round2(m.cost), conv: m.conv, cr, cpl, status: statusFor(m.clicks, m.conv, m.cost, cr, cpl), note: '', d };
  });
  const series = daily.filter((r) => r.scope === 'ACCOUNT' && r.date >= win.start && r.date <= win.end).sort((x, y) => (x.date < y.date ? -1 : 1));
  const sparklines = {
    leads: series.map((r) => r.conv),
    spend: series.map((r) => r.cost),
    cr: series.map((r) => (r.clicks ? round2(pct(r.conv, r.clicks)) : 0)),
    cpl: series.map((r) => (r.conv ? round2(r.cost / r.conv) : 0)),
    calls: series.map((r) => r.calls),
    forms: series.map((r) => r.forms),
  };
  return { totals, lps, sparklines };
}

function parseDaily(csv) {
  const rows = parseCSV(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) return SEED.daily;
  const h = rows[0].map((x) => x.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o = {}; h.forEach((k, i) => { o[k] = (r[i] || '').trim(); });
    return {
      date: o.date, scope: o.scope,
      impr: num(o.impressions || o.impr), clicks: num(o.clicks),
      cost: num(o.cost || o.spend), conv: num(o.conv || o.conversions),
      calls: num(o.calls), forms: num(o.forms || o.form_fills),
      mobile: num(o.mobile_clicks || o.mobile), desktop: num(o.desktop_clicks || o.desktop), other: num(o.other_clicks || o.other),
      mobile_impr: num(o.mobile_impr), desktop_impr: num(o.desktop_impr), other_impr: num(o.other_impr),
      mobile_conv: num(o.mobile_conv), desktop_conv: num(o.desktop_conv), other_conv: num(o.other_conv),
      search_is: num(o.search_is), lost_is_budget: num(o.lost_is_budget), lost_is_rank: num(o.lost_is_rank),
    };
  });
}

function parseTotals(csv) {
  const rows = parseCSV(csv).filter(r => r.length >= 2 && r[0]);
  const obj = {};
  for (const [k, v] of rows) {
    if (k.toLowerCase() === 'metric') continue; // header
    obj[k.trim()] = v;
  }
  const t = {};
  Object.keys(SEED.totals).forEach(key => {
    t[key] = key.startsWith('date') || key === 'last_sync'
      ? (obj[key] ?? SEED.totals[key])
      : num(obj[key] ?? SEED.totals[key]);
  });
  return t;
}

function parseLps(csv) {
  const rows = parseCSV(csv).filter(r => r.some(c => c && c.trim()));
  if (rows.length < 2) return SEED.lps;
  const header = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).map(r => {
    const o = {};
    header.forEach((h, idx) => { o[h] = (r[idx] ?? '').trim(); });
    return {
      id: o.id || o.name,
      name: o.name,
      path: o.path,
      ad_group: o.ad_group,
      impressions: num(o.impressions),
      clicks: num(o.clicks),
      ctr: num(o.ctr),
      spend: num(o.spend),
      conv: num(o.conv),
      cr: num(o.cr),
      cpl: num(o.cpl),
      status: (o.status || 'low').toLowerCase(),
      note: o.note || '',
    };
  });
}

function parseSearchTerms(csv) {
  const rows = parseCSV(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) return SEED.searchTerms;
  const h = rows[0].map((x) => x.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o = {}; h.forEach((k, i) => { o[k] = (r[i] || '').trim(); });
    return { term: o.term, match: o.match || 'phrase', clicks: num(o.clicks), cost: num(o.cost), conv: num(o.conv), flag: (o.flag || '').toLowerCase() };
  });
}

function parseKeywords(csv) {
  const rows = parseCSV(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) return SEED.keywords;
  const h = rows[0].map((x) => x.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o = {}; h.forEach((k, i) => { o[k] = (r[i] || '').trim(); });
    const conv = num(o.conv), cost = num(o.cost);
    return { kw: o.keyword || o.kw, match: o.match || '', clicks: num(o.clicks), cost, conv, cpl: conv ? cost / conv : 0, qs: num(o.qs) };
  });
}

function titleCase(s) { s = String(s || '').toLowerCase(); return s ? s[0].toUpperCase() + s.slice(1) : 'Good'; }

// Per-node daily metrics for the account tree (campaign / adgroup / ad rows).
function parseStructure(csv) {
  const rows = parseCSV(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) return [];
  const h = rows[0].map((x) => x.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o = {}; h.forEach((k, i) => { o[k] = (r[i] || '').trim(); });
    return {
      date: o.date, level: o.level, campaign: o.campaign, ad_group: o.ad_group, ad_id: o.ad_id,
      impr: num(o.impressions || o.impr), clicks: num(o.clicks), cost: num(o.cost), conv: num(o.conv),
      search_is: num(o.search_is), lost_is_budget: num(o.lost_is_budget), lost_is_rank: num(o.lost_is_rank),
    };
  });
}

// Static structure metadata (names, budgets, ad headlines, final URLs, strength).
function parseStructureMeta(csv) {
  const rows = parseCSV(csv).filter((r) => r.some((c) => c && c.trim()));
  if (rows.length < 2) return null;
  const h = rows[0].map((x) => x.trim().toLowerCase());
  const out = { campaigns: [], adGroups: [], ads: [] };
  rows.slice(1).forEach((r) => {
    const o = {}; h.forEach((k, i) => { o[k] = (r[i] || '').trim(); });
    const lvl = (o.level || '').toLowerCase();
    if (lvl === 'campaign') out.campaigns.push({ name: o.campaign, type: o.type || 'Search', budget: o.budget, budgetMicros: num(o.budget_micros), state: o.state || 'Eligible' });
    else if (lvl === 'adgroup') out.adGroups.push({ campaign: o.campaign, name: o.ad_group });
    else if (lvl === 'ad') out.ads.push({ campaign: o.campaign, ad_group: o.ad_group, ad_id: o.ad_id, headline: o.headline, url: o.final_url, strength: titleCase(o.strength), wrong: /^(1|true|yes)$/i.test(o.wrong || '') });
  });
  return out;
}

// Rebuild the nested account tree from the daily structure + metadata, for a window,
// with real prior-period deltas on every node.
export function buildAccountTree(structure, meta, win) {
  if (!meta || !meta.campaigns.length || !structure || !structure.length) return null;
  const agg = (start, end) => {
    const m = {};
    structure.forEach((r) => {
      if (r.date < start || r.date > end) return;
      const key = r.level === 'campaign' ? 'C|' + r.campaign
        : r.level === 'adgroup' ? 'G|' + r.campaign + '|' + r.ad_group
          : 'A|' + r.campaign + '|' + r.ad_group + '|' + r.ad_id;
      if (!m[key]) m[key] = { impr: 0, clicks: 0, cost: 0, conv: 0, isW: 0, budW: 0, rankW: 0, isImpr: 0 };
      const x = m[key];
      x.impr += r.impr; x.clicks += r.clicks; x.cost += r.cost; x.conv += r.conv;
      if (r.level === 'campaign') { x.isW += (r.search_is || 0) * r.impr; x.budW += (r.lost_is_budget || 0) * r.impr; x.rankW += (r.lost_is_rank || 0) * r.impr; x.isImpr += r.impr; }
    });
    return m;
  };
  const cur = agg(win.start, win.end), pri = agg(win.priorStart, win.priorEnd);
  const D = (c, p) => (p ? round2(((c - p) / p) * 100) : null);
  const metrics = (key) => {
    const c = cur[key] || { impr: 0, clicks: 0, cost: 0, conv: 0 };
    const p = pri[key] || { impr: 0, clicks: 0, cost: 0, conv: 0 };
    const ctr = round2(pct(c.clicks, c.impr)), cr = round2(pct(c.conv, c.clicks)), cpl = c.conv ? round2(c.cost / c.conv) : 0;
    const pcpl = p.conv ? p.cost / p.conv : 0;
    return {
      impr: c.impr, clicks: c.clicks, ctr, spend: round2(c.cost), conv: c.conv, cr, cpl,
      status: statusFor(c.clicks, c.conv, c.cost, cr, cpl),
      d: { impr: D(c.impr, p.impr), clicks: D(c.clicks, p.clicks), ctr: D(ctr, pct(p.clicks, p.impr)), spend: D(c.cost, p.cost), conv: D(c.conv, p.conv), cpl: D(cpl, pcpl) },
    };
  };
  // Only active campaigns with "LOGOS" in the name (skip paused / other test campaigns).
  let camps = meta.campaigns.filter((cm) => /logos/i.test(cm.name) && !/paused/i.test(cm.state || ''));
  if (!camps.length) camps = meta.campaigns;
  let aImpr = 0, aClicks = 0, aCost = 0, aConv = 0;
  const campaigns = camps.map((cm) => {
    const ck = 'C|' + cm.name, cc = cur[ck] || { impr: 0, clicks: 0, cost: 0, conv: 0, isW: 0, budW: 0, rankW: 0, isImpr: 0 };
    aImpr += cc.impr; aClicks += cc.clicks; aCost += cc.cost; aConv += cc.conv;
    const dailyBudget = (cm.budgetMicros || 0) / 1e6;
    const adGroups = meta.adGroups.filter((g) => g.campaign === cm.name).map((gm) => {
      const ads = meta.ads.filter((ad) => ad.campaign === cm.name && ad.ad_group === gm.name)
        .map((ad) => ({ hl: ad.headline || ('Ad ' + ad.ad_id), url: ad.url || '', strength: ad.strength, wrongUrl: ad.wrong, ...metrics('A|' + cm.name + '|' + gm.name + '|' + ad.ad_id) }));
      return { name: gm.name, routing: ads.some((a) => a.wrongUrl), ads, ...metrics('G|' + cm.name + '|' + gm.name) };
    });
    return {
      name: cm.name, type: cm.type, budget: cm.budget || (dailyBudget ? '$' + dailyBudget + '/day' : '—'), state: cm.state,
      search_is: cc.isImpr ? round2(cc.isW / cc.isImpr) : 0,
      lost_is_budget: cc.isImpr ? round2(cc.budW / cc.isImpr) : 0,
      lost_is_rank: cc.isImpr ? round2(cc.rankW / cc.isImpr) : 0,
      budget_used: dailyBudget ? round2((cc.cost / (dailyBudget * win.len)) * 100) : 0,
      adGroups, ...metrics(ck),
    };
  });
  return { name: 'LOGOS · Search account', impr: aImpr, clicks: aClicks, ctr: round2(pct(aClicks, aImpr)), spend: round2(aCost), conv: aConv, cr: round2(pct(aConv, aClicks)), cpl: aConv ? round2(aCost / aConv) : 0, campaigns };
}

export async function fetchLiveData() {
  if (!SHEET_ID) throw new Error('not-configured');
  // Daily = range-sliceable time series; Totals = snapshot (goals, impr-share, last sync).
  const [dCsv, tCsv] = await Promise.all([
    fetch(sheetUrl('Daily')).then(r => { if (!r.ok) throw new Error('daily'); return r.text(); }),
    fetch(sheetUrl('Totals')).then(r => { if (!r.ok) throw new Error('totals'); return r.text(); }),
  ]);
  // Account tree + cities stay seed (not fed by the sheet yet).
  const out = { ...SEED, daily: parseDaily(dCsv), snapshot: parseTotals(tCsv) };
  try { out.searchTerms = parseSearchTerms(await (await fetch(sheetUrl('SearchTerms'))).text()); } catch (e) { /* keep seed */ }
  try { out.keywords = parseKeywords(await (await fetch(sheetUrl('Keywords'))).text()); } catch (e) { /* keep seed */ }
  try { out.structure = parseStructure(await (await fetch(sheetUrl('Structure'))).text()); } catch (e) { /* keep seed tree */ }
  try { out.structureMeta = parseStructureMeta(await (await fetch(sheetUrl('StructureMeta'))).text()); } catch (e) { /* keep seed tree */ }
  return out;
}

// Recommended action for a single search term (drives the Action column).
export function termAction(t) {
  if (t.conv > 0 || t.flag === 'win') return { kind: 'SCALE', label: 'Add exact + SKAG', cls: 'win' };
  if (t.flag === 'neg' || (t.clicks >= 5 && t.conv === 0 && t.cost >= 30 && t.flag !== 'test')) return { kind: 'NEGATIVE', label: 'Add as negative', cls: 'neg' };
  if (t.flag === 'test' || (t.clicks >= 8 && t.conv === 0)) return { kind: 'OPPORTUNITY', label: 'Dedicated LP + STAG', cls: 'lp' };
  if (t.clicks >= 3 && t.conv === 0) return { kind: 'TEST', label: 'Add as keyword (test)', cls: 'test' };
  return { kind: '', label: '—', cls: '' };
}

// Search-term-level recommendations (negatives, winners, dedicated-LP/STAG).
export function buildSearchTermRecs(terms) {
  if (!terms || !terms.length) return [];
  const money = (n) => '$' + Number(n).toFixed(2);
  const recs = [];
  const byCost = [...terms].sort((a, b) => b.cost - a.cost);
  const neg = byCost.find((t) => termAction(t).kind === 'NEGATIVE');
  const win = byCost.find((t) => termAction(t).kind === 'SCALE');
  const opp = byCost.find((t) => termAction(t).kind === 'OPPORTUNITY');
  if (neg) recs.push({
    priority: 'High', sev: 'watch', icon: '💸', kind: 'WASTED SPEND',
    headline: `"${neg.term}" is burning spend with no conversions`,
    evidence: `${neg.clicks} clicks · ${money(neg.cost)} · 0 conv`,
    fix: 'Add it as a campaign-level negative keyword — the intent does not match junk removal.',
    impact: `Stops ~${money(neg.cost / 4 * 7)} /wk of wasted spend.`,
  });
  if (win) recs.push({
    priority: 'Medium', sev: 'good', icon: '🎯', kind: 'WINNER KEYWORD',
    headline: `"${win.term}" is converting — scale it`,
    evidence: `${win.clicks} clicks · ${money(win.cost)} · ${win.conv} conv`,
    fix: 'Add as exact match, isolate it in its own single-keyword ad group (SKAG), and raise the bid ~30%.',
    impact: 'Doubles down on your proven converter.',
  });
  if (opp) recs.push({
    priority: 'High', sev: 'watch', icon: '🗺️', kind: 'NEW AD GROUP + LP',
    headline: `"${opp.term}" has real volume but no dedicated setup`,
    evidence: `${opp.clicks} clicks · ${money(opp.cost)} · 0 conv`,
    fix: 'Build a single-theme ad group (STAG/SKAG) for this query and point it at a dedicated landing page.',
    impact: 'A tighter ad-to-page match should start converting this traffic.',
  });
  return recs;
}

// ---------- Auto recommendations ("What to fix next") ----------
// Derived from the live LP data, formatted to match the design's rec cards.
export function buildRecommendations(totals, lps) {
  const recs = [];
  const goalCpl = totals.goal_cpl || 100;
  const money = (n) => '$' + Number(n).toFixed(2);
  lps.forEach((lp) => {
    if (lp.id === 'brand') return;
    if (lp.spend >= 50 && lp.conv === 0) {
      recs.push({
        priority: 'Critical', sev: 'crit', icon: '💸', kind: 'WASTED SPEND',
        headline: `${lp.name} is burning spend with zero conversions`,
        evidence: `${lp.clicks} clicks · ${money(lp.spend)} · ${lp.ctr}% CTR · 0 conv`,
        fix: 'Confirm the ad → landing-page match and offer, then add negatives for off-intent search terms feeding this group.',
        impact: `Stops ~${money(lp.spend / 4 * 7)} /wk of wasted spend.`,
      });
    } else if (lp.conv > 0 && lp.cpl > goalCpl * 1.25) {
      recs.push({
        priority: 'High', sev: 'watch', icon: '📈', kind: 'HIGH CPL',
        headline: `${lp.name} CPL is well over goal`,
        evidence: `${lp.conv} conv · CPL ${money(lp.cpl)} vs ${money(goalCpl)} goal`,
        fix: 'Tighten match types/geo and lift on-page conversion rate (stronger hero CTA, fewer form fields).',
        impact: `Bring CPL toward ${money(goalCpl)} to roughly halve cost per lead.`,
      });
    } else if (lp.conv > 0 && lp.cpl > 0 && lp.cpl <= goalCpl) {
      recs.push({
        priority: 'Medium', sev: 'good', icon: '🎯', kind: 'WINNER',
        headline: `${lp.name} is beating the CPL goal — scale it`,
        evidence: `${lp.conv} conv · CPL ${money(lp.cpl)} (goal ${money(goalCpl)})`,
        fix: 'Raise the budget / bids on this ad group; it is your most efficient lead source.',
        impact: 'More volume at a CPL you already accept.',
      });
    } else if (lp.clicks > 0 && lp.clicks < 10) {
      recs.push({
        priority: 'Low', sev: 'low', icon: '🔍', kind: 'LOW VOLUME',
        headline: `${lp.name} has too little data to judge`,
        evidence: `${lp.clicks} click(s) · ${money(lp.spend)}`,
        fix: 'Widen match types or raise bids to gather enough signal before optimising.',
        impact: 'Faster path to a statistically meaningful read.',
      });
    }
  });
  if (totals.conv_rate < totals.goal_conv_rate) {
    recs.push({
      priority: 'High', sev: 'watch', icon: '🧪', kind: 'CONV RATE',
      headline: 'Account conversion rate is below goal',
      evidence: `${totals.conv_rate}% CR vs ${totals.goal_conv_rate}% goal`,
      fix: 'Prioritise the flagged pages above; test sharper ad copy against the new LP headlines.',
      impact: 'Hitting goal CR lifts leads without more spend.',
    });
  }
  const order = { crit: 0, watch: 1, low: 3, good: 2 };
  return recs.sort((a, b) => order[a.sev] - order[b.sev]);
}
