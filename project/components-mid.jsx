/* Mid-page sections: Items grid, Truck photo block, Coverage + Benefits */

/* ============ "If you want it gone, it's gone." items grid ============ */
function ItemsSection() {
  const items = [
    'Furniture & couches',
    'Mattresses & box springs',
    'Appliances (fridge, washer)',
    'Electronics & TVs',
    'Garage clutter',
    'Yard debris',
    'Construction debris',
    'Hot tubs & playsets',
    'Sheds & fences',
    'Office furniture',
    'Cardboard & paper',
    'Estate cleanouts',
  ];
  return (
    <section className="items section" data-screen-label="Items we take">
      <style>{`
        .items {
          background: var(--gray-50);
        }
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
          margin: 14px auto 0; max-width: 540px; color: var(--gray-700); font-size: 16px;
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
          background: var(--paper);
          border-radius: 12px;
          padding: 18px 16px;
          display: flex; align-items: center; gap: 10px;
          font-weight: 600;
          font-size: 14.5px;
          color: var(--jet-black);
          box-shadow: 0 1px 0 var(--gray-200);
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        @media (min-width: 640px) {
          .item-tile { padding: 22px 18px; font-size: 15.5px; }
        }
        .item-tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .item-tile .bullet {
          flex-shrink: 0;
          width: 10px; height: 10px;
          background: var(--jedi-green);
          border-radius: 50%;
        }
        .items-foot {
          text-align: center; margin-top: 28px;
          color: var(--gray-500); font-size: 13px; letter-spacing: 0.04em;
        }
      `}</style>
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE HAUL</div>
        <h2>IF YOU WANT IT GONE,<br/><span className="green">IT'S GONE.</span></h2>
        <p>From a single couch to a full estate. If it fits in the truck (and most things do), we'll take it.</p>
      </div>
      <div className="items-grid">
        {items.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true"></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="items-foot">Don't see it? Call — odds are we take it.</div>
    </section>
  );
}

/* ============ Photo block — full-width truck beauty shot ============ */
function TruckPhoto() {
  return (
    <section className="truckphoto" data-screen-label="Truck photo">
      <style>{`
        .truckphoto {
          position: relative;
          width: 100%;
          height: clamp(320px, 50vw, 720px);
          overflow: hidden;
          background: #1a1a1a;
        }
        .tp-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 45%;
        }
        .tp-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0.78) 100%),
            linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 35%);
          pointer-events: none;
        }
        .tp-caption {
          position: absolute; bottom: clamp(20px, 4vw, 36px); left: clamp(20px, 4vw, 40px);
          font-family: var(--font-display);
          font-size: clamp(28px, 5vw, 56px);
          color: var(--paper);
          letter-spacing: 0.03em;
          line-height: 0.95;
          text-align: left;
          z-index: 2;
          text-shadow: 0 4px 18px rgba(0,0,0,0.6);
        }
        .tp-caption .yellow { color: var(--hauler-yellow); }
        .tp-eyebrow {
          position: absolute; top: clamp(20px, 4vw, 32px); right: clamp(20px, 4vw, 40px);
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 8px 14px; border-radius: 999px;
          background: var(--jedi-green); color: var(--jet-black);
          z-index: 2;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
        }
      `}</style>
      <img src="assets/truck-beauty.png" alt="JEDI Junk Removal box truck on a residential street" className="tp-img" />
      <div className="tp-scrim"></div>
      <div className="tp-eyebrow">★ ON THE ROAD DAILY</div>
      <div className="tp-caption">ONE TRUCK<br/><span className="yellow">FOUR COUNTIES.</span></div>
    </section>
  );
}

/* ============ Coverage + benefits two-column ============ */
function CoverageBenefits() {
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
  const benefits = [
    'Same / next day pickup, 7 days a week',
    'Upfront flat quote — no surprises at the curb',
    'Full-service haul — we lift, we sweep, we go',
    'Licensed, insured, background-checked crew',
    'Eco-friendly: we donate & recycle what we can',
    "$20 off when you book online — applied automatically",
  ];
  return (
    <section className="cov section" data-screen-label="Coverage and benefits">
      <style>{`
        .cov { background: var(--paper); }
        .cov-grid {
          max-width: var(--maxw); margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 40px;
        }
        @media (min-width: 900px) {
          .cov-grid { grid-template-columns: 1fr 1fr; gap: 64px; }
        }
        .cov-h {
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 56px);
          line-height: 0.95;
          margin: 0 0 8px;
        }
        .cov-h .green { color: var(--jedi-green); }
        .cov-eyebrow {
          font-size: 13px; letter-spacing: 0.18em; font-weight: 700;
          color: var(--jedi-green-deep); text-transform: uppercase;
          margin-bottom: 10px;
        }
        .cov-sub {
          color: var(--gray-700); font-size: 15px; margin: 6px 0 22px;
          text-wrap: pretty;
        }
        /* City pill list */
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

        /* Benefits */
        .benefits {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .benefit {
          display: flex; gap: 14px; align-items: flex-start;
          font-size: 16px;
          color: var(--jet-black);
        }
        .benefit .check {
          flex-shrink: 0; width: 26px; height: 26px;
          background: var(--jedi-green);
          color: var(--jet-black);
          font-weight: 900;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 14px;
          margin-top: 1px;
        }
      `}</style>
      <div className="cov-grid">
        <div>
          <div className="cov-eyebrow">COVERAGE</div>
          <h2 className="cov-h">SERVING <span className="green">4 COUNTIES.</span></h2>
          <p className="cov-sub">
            LA, Ventura, Orange, and the Valley. If you're calling from southern California,
            odds are we're already nearby.
          </p>
          <ul className="city-list">
            {cities.map(([c, county]) => (
              <li className="city-pill" key={c}>
                <span>{c}</span>
                <span className="county">{county}</span>
              </li>
            ))}
          </ul>
          <div className="city-foot">+ surrounding cities. Not sure? Call — we'll tell you straight.</div>
        </div>
        <div>
          <div className="cov-eyebrow">WHAT YOU GET</div>
          <h2 className="cov-h">NO SURPRISES.<br/><span className="green">JUST GONE.</span></h2>
          <p className="cov-sub">
            One crew, one price, one truck. Here's what every JEDI Junk job comes with.
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
      </div>
    </section>
  );
}

Object.assign(window, { ItemsSection, TruckPhoto, CoverageBenefits });
