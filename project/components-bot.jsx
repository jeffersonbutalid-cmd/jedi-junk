/* Bottom-of-page sections: Reviews, FAQ, Final CTA + form, Footer, Sticky mobile bar */

/* ============ Reviews ============ */
function ReviewsSection() {
  const reviews = [
    {
      quote: "Called at 9am. Truck was in my driveway by noon. Old fridge, mattress, two broken patio chairs — gone in 20 minutes. Quote stuck. No upsell.",
      name: "Marisol R.",
      source: "Google · Thousand Oaks",
    },
    {
      quote: "These guys are the real deal. Showed up on a Sunday for a hot tub haul. Polite, careful, and the price they quoted on the phone is exactly what I paid.",
      name: "David K.",
      source: "Yelp · Encino",
    },
    {
      quote: "Estate cleanout after my dad passed. The crew was respectful, fast, and didn't try to nickel-and-dime. Cleared the whole garage and swept it. Worth every dollar.",
      name: "Jennifer P.",
      source: "Thumbtack · Ventura",
    },
  ];
  return (
    <section className="reviews section" data-screen-label="Reviews">
      <style>{`
        .reviews { background: var(--gray-50); }
        .reviews-head { text-align: center; margin-bottom: clamp(28px, 4vw, 44px); }
        .reviews-head .eyebrow {
          color: var(--jedi-green-deep); font-size: 13px; letter-spacing: 0.18em;
          font-weight: 700; font-family: var(--font-body);
        }
        .reviews-head h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 60px);
          line-height: 0.95;
          margin: 8px 0 12px;
        }
        .reviews-stars { color: var(--jedi-green); font-size: 22px; letter-spacing: 4px; }
        .reviews-grid {
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 760px) {
          .reviews-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
        }
        .review-card {
          background: var(--paper);
          border-radius: 14px;
          padding: 24px 22px;
          display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 1px 0 var(--gray-200), 0 12px 24px rgba(0,0,0,0.04);
          position: relative;
        }
        .review-stars {
          color: var(--jedi-green);
          font-size: 17px;
          letter-spacing: 3px;
        }
        .review-quote {
          font-size: 15px;
          color: var(--jet-black);
          line-height: 1.55;
          flex: 1;
          text-wrap: pretty;
        }
        .review-meta {
          padding-top: 12px;
          border-top: 1px solid var(--gray-100);
          display: flex; flex-direction: column; gap: 2px;
        }
        .review-name { font-weight: 700; font-size: 14px; }
        .review-source {
          font-size: 11px; color: var(--gray-500);
          letter-spacing: 0.08em; text-transform: uppercase;
          font-weight: 600;
        }
      `}</style>
      <div className="reviews-head">
        <div className="eyebrow">REAL JOBS · REAL NEIGHBORS</div>
        <h2>FIVE-STAR <span style={{color: 'var(--jedi-green)'}}>HAULS.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">★★★★★</div>
            <div className="review-quote">"{r.quote}"</div>
            <div className="review-meta">
              <div className="review-name">{r.name}</div>
              <div className="review-source">{r.source}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ FAQ accordion ============ */
function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: open ? '400px' : '0px' }}>
        <div className="faq-a">{a}</div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = React.useState(0);
  const faqs = [
    {
      q: 'How fast can you come?',
      a: "Most calls before 2 PM get same-day service. Anything later, we'll be there first thing the next morning. Call to lock a window — we'll give you a 2-hour arrival slot, not a vague 'sometime today.'",
    },
    {
      q: 'How does pricing work?',
      a: "It's volume-based — how much of the truck your stuff fills, not how many items. We give you a flat, upfront quote on the phone (or text us photos for an even tighter number). What we quote is what you pay. No fuel fee, no 'stairs' fee, no surprises.",
    },
    {
      q: "What can't you take?",
      a: "Hazardous chemicals, paint (liquid), motor oil, asbestos, ammunition, and medical waste. If you're unsure, just call — we either take it, or point you somewhere that does.",
    },
    {
      q: 'Do I need to be home?',
      a: "Nope. If the junk is curbside, in an open garage, or you can leave a key/code, we'll send photos when we're done and charge the card on file. Many of our property-manager clients never see us.",
    },
    {
      q: 'Are you licensed and insured?',
      a: 'Fully licensed in California, $2M general liability, and every crew member is W-2, background-checked, and trained. Ask for the COI if your HOA or building needs one — we email it over in minutes.',
    },
  ];
  return (
    <section className="faq section" data-screen-label="FAQ">
      <style>{`
        .faq { background: var(--paper); }
        .faq-head { text-align: center; margin-bottom: clamp(32px, 5vw, 48px); }
        .faq-head .eyebrow {
          color: var(--jedi-green-deep); font-size: 13px; letter-spacing: 0.18em;
          font-weight: 700; font-family: var(--font-body);
        }
        .faq-head h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 60px);
          line-height: 0.95;
          margin: 8px 0 0;
        }
        .faq-list {
          max-width: 820px; margin: 0 auto;
          display: flex; flex-direction: column;
          border-top: 1px solid var(--gray-200);
        }
        .faq-item { border-bottom: 1px solid var(--gray-200); }
        .faq-q {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
          padding: 22px 4px;
          text-align: left;
          font-size: 17px;
          font-weight: 700;
          color: var(--jet-black);
          background: none;
        }
        .faq-q:hover { color: var(--jedi-green-deep); }
        .faq-toggle {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--jedi-green);
          color: var(--jet-black);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .faq-item.open .faq-toggle { transform: rotate(180deg); }
        .faq-a-wrap {
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-a {
          padding: 0 4px 22px;
          color: var(--gray-700);
          font-size: 15.5px;
          line-height: 1.6;
          max-width: 720px;
          text-wrap: pretty;
        }
      `}</style>
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <FAQItem
            key={i}
            q={f.q}
            a={f.a}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}

/* ============ Final CTA + Workiz booking iframe ============ */
const WORKIZ_URL = "https://online-booking.workiz.com/?ac=5e739610d21c8f24198d6f1811702421894ed78bc6913627d5cdddbe87b8d200&location=general";

function FinalCTA() {
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  return (
    <section className="finalcta section" id="quote" data-screen-label="Final CTA">
      <style>{`
        .finalcta {
          background: var(--jet-black);
          color: var(--paper);
          position: relative; overflow: hidden;
        }
        .finalcta::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(50% 40% at 20% 10%, rgba(31,189,31,0.18), transparent 70%),
            radial-gradient(40% 40% at 90% 90%, rgba(255,195,25,0.07), transparent 70%);
          pointer-events: none;
        }
        .finalcta-inner {
          position: relative;
          max-width: 960px; margin: 0 auto;
          text-align: center;
        }
        .finalcta h2 {
          font-family: var(--font-display);
          font-size: clamp(54px, 11vw, 96px);
          line-height: 0.9;
          margin: 0 0 8px;
        }
        .finalcta h2 .green { color: var(--jedi-green); }
        .finalcta .sub {
          font-size: 16px;
          color: rgba(255,255,255,0.78);
          margin: 0 auto 28px;
          max-width: 520px;
          text-wrap: pretty;
        }
        .finalcta .callbtn {
          padding: 22px 32px;
          font-size: 19px;
        }
        .or {
          margin: 32px auto 22px;
          display: flex; align-items: center; gap: 14px;
          color: rgba(255,255,255,0.55);
          font-size: 12px; letter-spacing: 0.18em;
          font-weight: 700; text-transform: uppercase;
          max-width: 720px;
        }
        .or::before, .or::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.18);
        }

        /* Booking card with embedded Workiz iframe */
        .booking-card {
          background: var(--paper);
          color: var(--jet-black);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          max-width: 880px;
          margin: 0 auto;
          text-align: left;
        }
        .booking-head {
          padding: 22px 24px 18px;
          border-bottom: 1px solid var(--gray-100);
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (min-width: 600px) {
          .booking-head { padding: 28px 32px 22px; }
        }
        .booking-head-l h3 {
          font-family: var(--font-display);
          font-size: 30px;
          margin: 0 0 2px;
          line-height: 1;
        }
        .booking-head-l p {
          margin: 0;
          font-size: 13px;
          color: var(--gray-500);
        }
        .booking-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--jedi-green);
          color: var(--jet-black);
          font-weight: 900; font-size: 12px;
          padding: 7px 12px;
          border-radius: 999px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .iframe-wrap {
          position: relative;
          width: 100%;
          height: 760px;
          background: var(--gray-50);
        }
        @media (min-width: 900px) {
          .iframe-wrap { height: 820px; }
        }
        .iframe-wrap iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          border: 0; display: block;
          background: var(--paper);
        }
        .iframe-loading {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 14px;
          background: var(--paper);
          color: var(--gray-500);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .iframe-loading.hidden { opacity: 0; pointer-events: none; }
        .iframe-loading .spinner {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 3px solid var(--gray-200);
          border-top-color: var(--jedi-green);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .booking-foot {
          padding: 14px 24px 16px;
          background: var(--gray-50);
          border-top: 1px solid var(--gray-100);
          font-size: 12px;
          color: var(--gray-500);
          text-align: center;
        }
        .booking-foot .green { color: var(--jedi-green-deep); font-weight: 800; }
        .booking-foot .phone-fallback {
          color: var(--jet-black);
          font-weight: 700;
        }
        .booking-foot .phone-fallback:hover { color: var(--jedi-green-deep); }
      `}</style>
      <div className="finalcta-inner">
        <h2>LET'S TALK <span className="green">JUNK.</span></h2>
        <p className="sub">
          Two ways. Call us right now and we're on the way — or pick a time below and we'll come to you.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="or">OR BOOK ONLINE — $20 OFF</div>

        <div className="booking-card">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR PICKUP</h3>
              <p>Pick a window, get a confirmation text. Takes about a minute.</p>
            </div>
            <span className="booking-badge">★ $20 OFF APPLIED</span>
          </div>
          <div className="iframe-wrap">
            <div className={"iframe-loading" + (iframeLoaded ? " hidden" : "")}>
              <div className="spinner" aria-hidden="true"></div>
              <div>Loading secure booking…</div>
            </div>
            <iframe
              src={WORKIZ_URL}
              title="JEDI Junk Removal — book online"
              loading="lazy"
              allow="payment; geolocation; clipboard-write"
              onLoad={() => setIframeLoaded(true)}
            ></iframe>
          </div>
          <div className="booking-foot">
            Trouble with the form? <a href={PHONE_HREF} className="phone-fallback">Call {PHONE}</a> · <span className="green">$20 off</span> applied automatically when you book online.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <style>{`
        .footer {
          background: var(--footer-gray);
          color: rgba(255,255,255,0.7);
          padding: 48px var(--pad-x) 36px;
          font-size: 14px;
        }
        .footer-grid {
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 28px;
        }
        @media (min-width: 760px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
        }
        .footer-logo { height: 56px; width: auto; background: white; padding: 8px 12px; border-radius: 8px; }
        .footer-tag {
          margin-top: 14px;
          color: rgba(255,255,255,0.55);
          font-size: 13px;
          max-width: 280px;
          text-wrap: pretty;
        }
        .footer-h {
          font-family: var(--font-display);
          font-size: 18px;
          letter-spacing: 0.06em;
          color: var(--paper);
          margin: 0 0 12px;
        }
        .footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
        .footer a { color: rgba(255,255,255,0.7); transition: color 0.12s ease; }
        .footer a:hover { color: var(--jedi-green); }
        .footer-phone-link { font-weight: 700; color: var(--paper) !important; }
        .footer-bottom {
          max-width: var(--maxw); margin: 32px auto 0;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }
      `}</style>
      <div className="footer-grid">
        <div>
          <img src="assets/logo-horizontal.jpg" alt="JEDI Junk Removal" className="footer-logo" />
          <div className="footer-tag">Family-owned, full-service junk removal across LA, Ventura, Orange County and the Valley.</div>
        </div>
        <div>
          <div className="footer-h">CONTACT</div>
          <ul>
            <li><a href={PHONE_HREF} className="footer-phone-link">📞 {PHONE}</a></li>
            <li><a href="mailto:hello@jedijunk.com">hello@jedijunk.com</a></li>
            <li>14930 Ventura Blvd<br/>Sherman Oaks, CA 91403</li>
          </ul>
        </div>
        <div>
          <div className="footer-h">HOURS</div>
          <ul>
            <li>Mon–Sat · 7AM – 7PM</li>
            <li>Sunday · 8AM – 5PM</li>
            <li>Same-day available</li>
          </ul>
        </div>
        <div>
          <div className="footer-h">SERVICE</div>
          <ul>
            <li><a href="#top">Same-day removal</a></li>
            <li><a href="#top">Estate cleanouts</a></li>
            <li><a href="#top">Construction debris</a></li>
            <li><a href="#top">Property managers</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 JEDI Junk Removal · CA Lic. # 1098234 · $2M Insured</span>
        <span>Made in the Valley.</span>
      </div>
    </footer>
  );
}

/* ============ Sticky mobile bottom bar ============ */
function MobileBottomBar() {
  return (
    <div className="mob-bar">
      <style>{`
        .mob-bar {
          display: none;
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 60;
          background: var(--jedi-green);
          padding: 10px 14px;
          padding-bottom: calc(10px + env(safe-area-inset-bottom));
          box-shadow: 0 -6px 20px rgba(0,0,0,0.18);
          align-items: center; justify-content: space-between;
          gap: 12px;
        }
        @media (max-width: 899px) {
          .mob-bar { display: flex; }
        }
        .mob-bar-msg {
          font-family: var(--font-display);
          font-size: 19px;
          letter-spacing: 0.04em;
          color: var(--jet-black);
          line-height: 1;
        }
        .mob-bar-msg .small { display: block; font-size: 11px; font-weight: 700; opacity: 0.7; letter-spacing: 0.14em; font-family: var(--font-body); }
        .mob-bar-cta {
          background: var(--jet-black);
          color: var(--paper);
          font-weight: 900;
          font-size: 14px;
          letter-spacing: 0.06em;
          padding: 12px 18px;
          border-radius: 999px;
          display: inline-flex; align-items: center; gap: 8px;
        }
      `}</style>
      <div className="mob-bar-msg">
        <span className="small">★ $20 OFF · ONLINE</span>
        SAME-DAY HAUL
      </div>
      <a href={PHONE_HREF} className="mob-bar-cta">📞 CALL NOW</a>
    </div>
  );
}

Object.assign(window, { ReviewsSection, FAQSection, FinalCTA, Footer, MobileBottomBar });
