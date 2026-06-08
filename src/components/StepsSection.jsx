const STEPS = [
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

export default function StepsSection() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>QUOTE. EMPTY. SWEEP.</h2>
      </div>
      <div className="steps-grid">
        {STEPS.map(s => (
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
