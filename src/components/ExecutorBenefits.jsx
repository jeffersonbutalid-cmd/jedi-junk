const BENEFITS = [
  'Respectful with estates — we sort, label, and set aside anything that looks important (mail, photos, paperwork)',
  'Realtor and property-manager friendly — net-15 invoicing, COI on request',
  'Discreet hoarder cleanouts — extra PPE, no judgement, your pace',
  'Donation and recycling routing — most jobs divert 60%+ from landfill',
  'One flat quote covers labor, dump fees, and disposal',
  'Same-day COI, after-hours and weekend availability for sensitive jobs',
];

const CITIES = [
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

export default function ExecutorBenefits() {
  return (
    <section className="exec section" id="coverage">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">WHY THEY CALL US</div>
          <h2 className="exec-h">
            WHY EXECUTORS, LANDLORDS &amp; <span className="green">FAMILIES</span> CALL US.
          </h2>
          <p className="exec-sub">
            A cleanout is rarely just about junk. We've handled enough estates, evictions,
            and difficult family situations to know what care looks like.
          </p>
          <ul className="benefits">
            {BENEFITS.map(b => (
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
            LA, Ventura, Orange, and the Valley. If you're managing a property in southern
            California, we can be on site this week.
          </p>
          <ul className="city-list">
            {CITIES.map(([city, county]) => (
              <li className="city-pill" key={city}>
                <span>{city}</span>
                <span className="county">{county}</span>
              </li>
            ))}
          </ul>
          <div className="city-foot">
            + surrounding cities. Out-of-area properties considered on a case-by-case basis — call to ask.
          </div>
        </div>
      </div>
    </section>
  );
}
