/* Top-of-page sections: Topbar, Hero, Trust strip, Steps */

const PHONE = '(866) 487-9059';
const PHONE_HREF = 'tel:+18664879059';

/* ============ Before/After comparison slider ============ */
function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [pos, setPos] = React.useState(55); // 0..100
  const wrapRef = React.useRef(null);
  const draggingRef = React.useRef(false);

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  };

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch {}
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 4));
  };

  return (
    <div
      ref={wrapRef}
      className="ba-wrap"
      style={{ position: 'absolute', inset: 0 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After image (clean) as full background — always behind */}
      <img src={afterSrc} alt={afterAlt} className="ba-img" draggable={false} />
      {/* Before image (cluttered) clipped from right — shows on LEFT up to pos% */}
      <div className="ba-after-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeAlt} className="ba-img" draggable={false} />
      </div>
      <span className="ba-label before">BEFORE</span>
      <span className="ba-label after">AFTER</span>
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      >
        <div className="ba-knob" aria-hidden="true">‹›</div>
      </div>
    </div>
  );
}

/* ============ Sticky Topbar ============ */
function Topbar() {
  return (
    <header className="topbar">
      <style>{`
        .topbar {
          position: sticky; top: 0; z-index: 50;
          background: var(--jet-black);
          border-bottom: 2px solid var(--jedi-green);
          padding: 10px var(--pad-x);
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }
        .topbar-logo {
          height: 40px; width: auto;
          display: block;
        }
        @media (min-width: 600px) { .topbar-logo { height: 52px; } }
        .topbar-phone {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--jedi-green);
          color: var(--jet-black);
          font-family: var(--font-body);
          font-weight: 900;
          font-size: 15px;
          letter-spacing: 0.04em;
          padding: 11px 18px;
          border-radius: 999px;
          white-space: nowrap;
          transition: transform 0.12s ease, background 0.12s ease;
        }
        .topbar-phone:hover { background: #25d325; transform: translateY(-1px); }
        .topbar-phone .icon { font-size: 16px; }
        @media (max-width: 480px) {
          .topbar-phone .label-long { display: none; }
        }
        @media (min-width: 481px) {
          .topbar-phone .label-short { display: none; }
        }
      `}</style>
      <a href="#top" aria-label="JEDI Junk Removal home">
        <img src="assets/logo-horizontal.jpg" alt="JEDI Junk Removal" className="topbar-logo" />
      </a>
      <a href={PHONE_HREF} className="topbar-phone" data-comment-anchor="topbar-phone">
        <span className="icon">📞</span>
        <span className="label-long">{PHONE}</span>
        <span className="label-short">CALL NOW</span>
      </a>
    </header>
  );
}

/* ============ Hero ============ */
function Hero({ heroCopy }) {
  const h1 = heroCopy || ['SAME-DAY', 'JUNK REMOVAL', "IT'S GONE TODAY."];
  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <style>{`
        .hero {
          background: var(--jet-black);
          color: var(--paper);
          padding: clamp(36px, 7vw, 80px) var(--pad-x) clamp(48px, 8vw, 96px);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          /* subtle Jedi Green spotlight bg */
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(60% 50% at 85% 25%, rgba(31,189,31,0.18), transparent 70%),
            radial-gradient(80% 60% at 0% 100%, rgba(255,195,25,0.06), transparent 60%);
          pointer-events: none;
        }
        .hero-grid {
          position: relative;
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: clamp(32px, 5vw, 56px);
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.2fr 1fr; gap: 56px; }
        }
        .hero-eyebrow { margin-bottom: 18px; }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: 0.005em;
          margin: 0 0 22px;
          font-size: clamp(52px, 11vw, 88px);
        }
        @media (min-width: 1024px) {
          .hero h1 { font-size: clamp(64px, 7.5vw, 104px); line-height: 0.88; }
        }
        .hero h1 .line { display: block; }
        .hero h1 .green { color: var(--jedi-green); }
        .hero-lede {
          font-size: clamp(16px, 2.1vw, 19px);
          line-height: 1.5;
          color: rgba(255,255,255,0.82);
          max-width: 540px;
          margin: 0 0 28px;
          text-wrap: pretty;
        }
        .hero-ctas {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-bottom: 28px;
        }
        .hero-ctas .btn { flex: 1 1 auto; min-width: 0; }
        @media (min-width: 600px) { .hero-ctas .btn { flex: 0 1 auto; } }

        /* Hero photo card - before/after slider */
        .hero-photo {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05);
          background: #1a1a1a;
          user-select: none;
        }
        @media (min-width: 1024px) {
          .hero-photo { aspect-ratio: 5 / 4; }
        }
        .ba-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }
        .ba-after-wrap {
          position: absolute; inset: 0;
          overflow: hidden;
          will-change: clip-path;
        }
        .ba-handle {
          position: absolute; top: 0; bottom: 0;
          width: 4px;
          background: var(--paper);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.35);
          transform: translateX(-50%);
          z-index: 4;
          cursor: ew-resize;
          touch-action: none;
        }
        .ba-knob {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--paper);
          border: 3px solid var(--jet-black);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900;
          color: var(--jet-black);
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          letter-spacing: -2px;
        }
        .ba-label {
          position: absolute;
          font-family: var(--font-display);
          font-size: 18px;
          letter-spacing: 0.1em;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(0,0,0,0.72);
          color: var(--paper);
          z-index: 3;
          backdrop-filter: blur(4px);
        }
        .ba-label.before { top: 16px; left: 16px; }
        .ba-label.after  { top: 16px; right: 16px; background: var(--jedi-green); color: var(--jet-black); }

        /* Mascot overlay anchored bottom-right (per brand spec) */
        .hero-mascot {
          position: absolute;
          right: -4%;
          bottom: -2%;
          width: 38%;
          z-index: 5;
          filter: drop-shadow(0 18px 16px rgba(0,0,0,0.55));
          user-select: none;
          pointer-events: none;
        }
        @media (max-width: 599px) {
          .hero-mascot { width: 42%; right: -6%; }
        }

        .trust-row { margin-top: 8px; }
      `}</style>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ $20 OFF — BOOK ONLINE</span>
          </div>
          <h1 data-comment-anchor="hero-h1">
            <span className="line">{h1[0]}</span>
            <span className="line">{h1[1]}</span>
            <span className="line green">{h1[2]}</span>
          </h1>
          <p className="hero-lede">
            Point. We haul. Done. Family-owned crew across LA, the Valley, OC and Ventura.
            Phone now — most jobs cleared same day or next.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary" data-comment-anchor="hero-cta-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">BOOK ONLINE</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>#1 Rated</span>
            <span><span className="star">✦</span>Licensed &amp; Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>4 Counties</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc="assets/garage-before.png"
            afterSrc="assets/garage-after.png"
            beforeAlt="Cluttered garage before JEDI Junk Removal"
            afterAlt="Empty, swept garage after JEDI Junk Removal"
          />
        </div>
      </div>
    </section>
  );
}

/* ============ Trust strip ============ */
function TrustStrip() {
  const items = [
    '#1 RATED',
    'LICENSED & INSURED',
    'FAMILY-OWNED',
    'SAME / NEXT DAY',
    'UPFRONT PRICING',
  ];
  return (
    <section className="trust-strip" data-screen-label="Trust strip">
      <style>{`
        .trust-strip {
          background: var(--jet-black-soft);
          color: var(--paper);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 18px var(--pad-x);
          overflow: hidden;
        }
        .trust-strip-inner {
          max-width: var(--maxw); margin: 0 auto;
          display: flex; flex-wrap: wrap; justify-content: center;
          align-items: center; gap: 10px 18px;
          font-family: var(--font-display);
          font-size: clamp(18px, 2.4vw, 24px);
          letter-spacing: 0.04em;
        }
        .trust-strip-inner .star { color: var(--jedi-green); font-size: 0.85em; }
        .trust-strip-inner .item { white-space: nowrap; }
      `}</style>
      <div className="trust-strip-inner">
        {items.map((label, i) => (
          <React.Fragment key={label}>
            <span className="item">{label}</span>
            {i < items.length - 1 && <span className="star">✦</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ============ "Point. We haul. Done." 3-step ============ */
function StepsSection() {
  const steps = [
    {
      n: '01',
      t: 'CALL OR BOOK ONLINE',
      d: "Tell us what's going. Get a free, upfront quote in minutes — no obligation, no pressure.",
    },
    {
      n: '02',
      t: 'WE SHOW UP',
      d: 'Same day or next day, on time. Family-owned crew, gloves on. You point — we lift.',
    },
    {
      n: '03',
      t: "IT'S GONE",
      d: "Truck loaded, space swept clean. You pay the quoted price. That's it.",
    },
  ];
  return (
    <section className="steps section" data-screen-label="How it works">
      <style>{`
        .steps { background: var(--paper); }
        .steps-head { text-align: center; margin-bottom: clamp(32px, 5vw, 56px); }
        .steps-head .eyebrow {
          color: var(--jedi-green); font-size: 14px; letter-spacing: 0.18em;
          font-weight: 700; font-family: var(--font-body);
        }
        .steps-head h2 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 72px);
          line-height: 0.95;
          margin: 8px 0 0;
        }
        .steps-head h2 .dot { color: var(--jedi-green); }
        .steps-grid {
          display: grid; grid-template-columns: 1fr; gap: 18px;
          max-width: var(--maxw); margin: 0 auto;
        }
        @media (min-width: 760px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 22px; }
        }
        .step-card {
          background: var(--gray-50);
          border-left: 6px solid var(--jedi-green);
          padding: 28px 26px 28px;
          border-radius: 4px 12px 12px 4px;
          display: flex; flex-direction: column; gap: 10px;
          transition: transform 0.16s ease, box-shadow 0.16s ease;
        }
        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.06);
        }
        .step-num {
          font-family: var(--font-display);
          font-size: 56px;
          line-height: 1;
          color: var(--jedi-green);
        }
        .step-title {
          font-family: var(--font-display);
          font-size: 28px;
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .step-desc {
          color: var(--gray-700);
          font-size: 15px;
          text-wrap: pretty;
        }
      `}</style>
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>POINT<span className="dot">.</span> WE HAUL<span className="dot">.</span> DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {steps.map(s => (
          <div className="step-card" key={s.n}>
            <div className="step-num">{s.n}</div>
            <div className="step-title">{s.t}</div>
            <div className="step-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Topbar, Hero, TrustStrip, StepsSection, PHONE, PHONE_HREF });
