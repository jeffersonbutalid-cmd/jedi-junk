/* Cleanout LP — mid sections: Items grid, Steps, After-photo, Executor two-col */

/* ============ "EVERY KIND OF CLEANOUT" items grid ============ */
function ItemsSection() {
  const items = [
    'House cleanouts',
    'Garage cleanouts',
    'Estate cleanouts',
    'Apartment cleanouts',
    'Foreclosure cleanouts',
    'Hoarder cleanouts',
    'Attic cleanouts',
    'Storage unit cleanouts',
    'Move-out cleanouts',
    'Whole-property cleanouts',
    'Yard & shed cleanouts',
    'Office cleanouts',
  ];
  return (
    <section className="items section" data-screen-label="Types of cleanouts">
      <style>{`
        .items { background: var(--paper); }
        .items-head { text-align: center; margin-bottom: clamp(32px, 5vw, 48px); }
        .items-head .eyebrow {
          color: var(--jedi-green-deep); font-size: 13px; letter-spacing: 0.18em;
          font-weight: 700; font-family: var(--font-body);
        }
        .items-head h2 {
          font-family: var(--font-display);
          font-size: clamp(40px, 6.5vw, 68px);
          line-height: 0.95;
          margin: 8px 0 0;
        }
        .items-head h2 .green { color: var(--jedi-green); }
        .items-head p {
          margin: 14px auto 0; max-width: 580px; color: var(--gray-700); font-size: 16px;
          text-wrap: pretty;
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 10px;
          max-width: var(--maxw); margin: 0 auto;
        }
        @media (min-width: 640px) {
          .items-grid { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        }
        @media (min-width: 1000px) {
          .items-grid { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; }
        }
        .item-tile {
          background: var(--gray-50);
          border-radius: 12px;
          padding: 20px 18px;
          display: flex; align-items: center; gap: 12px;
          font-weight: 600;
          font-size: 15px;
          color: var(--jet-black);
          transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;
        }
        @media (min-width: 640px) {
          .item-tile { padding: 24px 20px; font-size: 15.5px; }
        }
        .item-tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          background: var(--paper);
        }
        .item-tile .bullet {
          flex-shrink: 0;
          width: 10px; height: 10px;
          background: var(--jedi-green);
          border-radius: 50%;
        }
      `}</style>
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE CLEAR</div>
        <h2>EVERY KIND OF<br/><span className="green">CLEANOUT.</span></h2>
        <p>Single rooms or entire properties. Cluttered, abandoned, or sensitive — we handle it with care and a flat upfront quote.</p>
      </div>
      <div className="items-grid">
        {items.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true"></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ "HOW IT WORKS" — 3 steps ============ */
function StepsSection() {
  const steps = [
    {
      n: '01',
      t: 'WALK-THROUGH QUOTE',
      d: 'We walk the property — in person or by video — and quote the whole job upfront. Free, no obligation.',
    },
    {
      n: '02',
      t: 'WE EMPTY IT',
      d: 'Two-person crew, gloves on. Furniture, clothes, appliances, debris — everything goes in our truck.',
    },
    {
      n: '03',
      t: 'BROOM-CLEAN',
      d: 'Property left empty and swept. Ready for the realtor, the new tenant, or the next chapter.',
    },
  ];
  return (
    <section className="steps section" data-screen-label="How it works">
      <style>{`
        .steps { background: var(--gray-50); }
        .steps-head { text-align: center; margin-bottom: clamp(32px, 5vw, 56px); }
        .steps-head .eyebrow {
          color: var(--jedi-green-deep); font-size: 14px; letter-spacing: 0.18em;
          font-weight: 700; font-family: var(--font-body);
        }
        .steps-head h2 {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 72px);
          line-height: 0.95;
          margin: 8px 0 0;
        }
        .steps-grid {
          display: grid; grid-template-columns: 1fr; gap: 18px;
          max-width: var(--maxw); margin: 0 auto;
        }
        @media (min-width: 760px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 22px; }
        }
        .step-card {
          background: var(--paper);
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
        <h2>QUOTE. EMPTY. SWEEP.</h2>
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

/* ============ After-cleanout photo block (NO mascot per brand rule) ============ */
function AfterPhoto() {
  return (
    <section className="afterphoto" data-screen-label="After cleanout photo">
      <style>{`
        .afterphoto {
          position: relative;
          width: 100%;
          height: clamp(320px, 48vw, 640px);
          overflow: hidden;
          background: #cfcfcc;
        }
        .ap-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
        }
        .ap-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%),
            linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 45%);
          pointer-events: none;
        }
        .ap-content {
          position: absolute;
          left: clamp(20px, 5vw, 56px);
          right: clamp(20px, 5vw, 56px);
          bottom: clamp(28px, 5vw, 56px);
          z-index: 2;
          max-width: 620px;
          color: var(--paper);
        }
        .ap-eyebrow {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--jedi-green);
          margin-bottom: 10px;
        }
        .ap-headline {
          font-family: var(--font-display);
          font-size: clamp(34px, 6vw, 64px);
          line-height: 0.95;
          margin: 0 0 12px;
          letter-spacing: 0.02em;
          text-shadow: 0 4px 18px rgba(0,0,0,0.45);
        }
        .ap-headline .yellow { color: var(--hauler-yellow); }
        .ap-sub {
          font-size: 15px;
          line-height: 1.5;
          color: rgba(255,255,255,0.86);
          max-width: 480px;
          text-wrap: pretty;
          text-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }
      `}</style>
      <img src="assets/garage-after.png" alt="An empty, swept property after a JEDI Junk Removal cleanout" className="ap-img" />
      <div className="ap-scrim"></div>
      <div className="ap-content">
        <div className="ap-eyebrow">★ THIS IS HOW WE LEAVE IT</div>
        <h2 className="ap-headline">EMPTY.<br/><span className="yellow">SWEPT. READY.</span></h2>
        <p className="ap-sub">
          When we hand the keys back, the property is ready for the realtor, the next tenant, or the next chapter. No piles. No debris. Nothing left behind.
        </p>
      </div>
    </section>
  );
}

/* ============ Executor two-column + coverage ============ */
function ExecutorBenefits() {
  const benefits = [
    'Respectful with estates — we sort, label, and set aside anything that looks important (mail, photos, paperwork)',
    'Realtor and property-manager friendly — net-15 invoicing, COI on request',
    'Discreet hoarder cleanouts — extra PPE, no judgement, your pace',
    'Donation and recycling routing — most jobs divert 60%+ from landfill',
    'One flat quote covers labor, dump fees, and disposal',
    'Same-day COI, after-hours and weekend availability for sensitive jobs',
  ];
  const cities = [
    ['Los Angeles', 'LA County'],
    ['Santa Monica', 'LA County'],
    ['Pasadena', 'LA County'],
    ['Sherman Oaks', 'LA County'],
    ['Encino', 'LA County'],
    ['Burbank', 'LA County'],
    ['Glendale', 'LA County'],
    ['Long Beach', 'LA County'],
    ['Thousand Oaks', 'Ventura'],
    ['Ventura', 'Ventura'],
    ['Camarillo', 'Ventura'],
    ['Anaheim', 'Orange Co.'],
    ['Irvine', 'Orange Co.'],
    ['Huntington Beach', 'Orange Co.'],
  ];
  return (
    <section className="exec section" data-screen-label="For executors landlords families">
      <style>{`
        .exec { background: var(--paper); }
        .exec-grid {
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 40px;
        }
        @media (min-width: 900px) {
          .exec-grid { grid-template-columns: 1.1fr 1fr; gap: 64px; }
        }
        .exec-h {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.5vw, 52px);
          line-height: 0.98;
          margin: 0 0 8px;
        }
        .exec-h .green { color: var(--jedi-green); }
        .exec-eyebrow {
          font-size: 13px; letter-spacing: 0.18em; font-weight: 700;
          color: var(--jedi-green-deep); text-transform: uppercase;
          margin-bottom: 10px;
        }
        .exec-sub {
          color: var(--gray-700); font-size: 15px; margin: 8px 0 22px;
          text-wrap: pretty;
        }
        .benefits {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 14px;
        }
        .benefit {
          display: flex; gap: 14px; align-items: flex-start;
          font-size: 15.5px; line-height: 1.5;
          color: var(--jet-black);
          text-wrap: pretty;
        }
        .benefit .check {
          flex-shrink: 0; width: 26px; height: 26px;
          background: var(--jedi-green); color: var(--jet-black);
          font-weight: 900;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 14px;
          margin-top: 1px;
        }
        .city-list {
          display: flex; flex-wrap: wrap; gap: 8px;
          list-style: none; padding: 0; margin: 0;
        }
        .city-pill {
          background: var(--gray-50);
          border-left: 4px solid var(--jedi-green);
          padding: 9px 14px 9px 12px;
          border-radius: 4px 999px 999px 4px;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex; align-items: baseline; gap: 8px;
        }
        .city-pill .county {
          font-size: 11px; font-weight: 600;
          color: var(--gray-500);
          letter-spacing: 0.04em;
        }
        .city-foot {
          margin-top: 16px; font-size: 13px; color: var(--gray-500);
        }
      `}</style>
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">WHY THEY CALL US</div>
          <h2 className="exec-h">WHY EXECUTORS, LANDLORDS &amp; <span className="green">FAMILIES</span> CALL US.</h2>
          <p className="exec-sub">
            A cleanout is rarely just about junk. We've handled enough estates, evictions, and difficult family situations to know what care looks like.
          </p>
          <ul className="benefits">
            {benefits.map(b => (
              <li className="benefit" key={b}>
                <span className="check" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="exec-eyebrow">COVERAGE</div>
          <h2 className="exec-h">SERVING <span className="green">4 COUNTIES.</span></h2>
          <p className="exec-sub">
            LA, Ventura, Orange, and the Valley. If you're managing a property in southern California, we can be on site this week.
          </p>
          <ul className="city-list">
            {cities.map(([c, county]) => (
              <li className="city-pill" key={c}>
                <span>{c}</span>
                <span className="county">{county}</span>
              </li>
            ))}
          </ul>
          <div className="city-foot">+ surrounding cities. Out-of-area properties considered on a case-by-case basis — call to ask.</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ItemsSection, StepsSection, AfterPhoto, ExecutorBenefits });
