/* Cleanout LP — top sections: Topbar, Hero, Trust strip */

const PHONE = '(866) 487-9059';
const PHONE_HREF = 'tel:+18664879059';

/* ============ Before/After comparison slider (reused, smaller knob feel) ============ */
function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [pos, setPos] = React.useState(50);
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
      style={{ position: 'absolute', inset: 0 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img src={afterSrc} alt={afterAlt} className="ba-img" draggable={false} />
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
        .topbar-logo { height: 40px; width: auto; display: block; }
        @media (min-width: 600px) { .topbar-logo { height: 52px; } }
        .topbar-phone {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--jedi-green); color: var(--jet-black);
          font-weight: 900; font-size: 15px;
          letter-spacing: 0.04em;
          padding: 11px 18px;
          border-radius: 999px;
          white-space: nowrap;
          transition: transform 0.12s ease, background 0.12s ease;
        }
        .topbar-phone:hover { background: #25d325; transform: translateY(-1px); }
        .topbar-phone .icon { font-size: 16px; }
        @media (max-width: 480px) { .topbar-phone .label-long { display: none; } }
        @media (min-width: 481px) { .topbar-phone .label-short { display: none; } }
      `}</style>
      <a href="#top" aria-label="JEDI Junk Removal home">
        <img src="assets/logo-horizontal.jpg" alt="JEDI Junk Removal" className="topbar-logo" />
      </a>
      <a href={PHONE_HREF} className="topbar-phone">
        <span className="icon">📞</span>
        <span className="label-long">{PHONE}</span>
        <span className="label-short">CALL NOW</span>
      </a>
    </header>
  );
}

/* ============ Hero ============ */
function Hero({ heroCopy, mascotMode }) {
  const h1 = heroCopy || ['FULL CLEANOUTS.', 'ONE DAY.'];
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
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(60% 50% at 85% 25%, rgba(31,189,31,0.14), transparent 70%),
            radial-gradient(80% 60% at 0% 100%, rgba(255,195,25,0.04), transparent 60%);
          pointer-events: none;
        }
        .hero-grid {
          position: relative;
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: clamp(32px, 5vw, 56px);
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.15fr 1fr; gap: 56px; }
        }
        .hero-eyebrow { margin-bottom: 20px; }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 400;
          line-height: 0.92;
          letter-spacing: 0.005em;
          margin: 0 0 22px;
          font-size: clamp(56px, 12vw, 96px);
        }
        @media (min-width: 1024px) {
          .hero h1 { font-size: clamp(68px, 8vw, 108px); line-height: 0.9; }
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

        /* Hero photo card — before/after slider */
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
          pointer-events: none; user-select: none;
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
          font-size: 17px;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(0,0,0,0.72);
          color: var(--paper);
          z-index: 3;
          backdrop-filter: blur(4px);
        }
        .ba-label.before { top: 14px; left: 14px; }
        .ba-label.after  { top: 14px; right: 14px; background: var(--jedi-green); color: var(--jet-black); }

        /* Reserved mascot — hero only, smaller than primary LP (~28% vs 38%) */
        .hero-mascot {
          position: absolute;
          right: -3%; bottom: -3%;
          width: 28%;
          z-index: 5;
          filter: drop-shadow(0 12px 12px rgba(0,0,0,0.45));
          user-select: none; pointer-events: none;
          opacity: 0.92;
        }
        @media (max-width: 599px) {
          .hero-mascot { width: 30%; right: -4%; }
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
            <span className="line green">{h1[1]}</span>
          </h1>
          <p className="hero-lede">
            Houses · garages · estates · apartments · foreclosures · hoarder cleanups.
            We empty the whole property — you don't lift a thing.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">GET A QUOTE</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>#1 Rated</span>
            <span><span className="star">✦</span>Licensed &amp; Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>Estate-Sensitive</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc="assets/garage-before.png"
            afterSrc="assets/garage-after.png"
            beforeAlt="Cluttered property before JEDI cleanout"
            afterAlt="Empty, swept property after JEDI cleanout"
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
    'ESTATE-SENSITIVE',
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

Object.assign(window, { Topbar, Hero, TrustStrip, PHONE, PHONE_HREF, BeforeAfter });
