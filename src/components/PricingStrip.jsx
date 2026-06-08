const DEFAULT_TIERS = [
  { label: '1-BR APARTMENT', price: 'from $800', sub: 'Move-out · single unit' },
  { label: 'SINGLE-FAMILY HOME', price: '$1,200–$2,500', sub: 'Garage + interior · standard load' },
  { label: 'ESTATE / HOARDER', price: '$2,500+', sub: 'Multi-day · extra crew' },
];

export default function PricingStrip({
  eyebrow = 'WHAT IT COSTS',
  heading = (<>FLAT QUOTES — <span className="green">NO SURPRISES.</span></>),
  intro = 'Volume-based pricing. You get a written quote before any work starts. Most jobs land here:',
  tiers = DEFAULT_TIERS,
  ctaLabel = 'GET MY EXACT QUOTE',
  ctaHref = '#quote',
  note = 'Free walk-through · No-obligation quote · Pay only when the property is empty',
}) {
  return (
    <section className="pricing-strip section" id="pricing">
      <div className="pricing-strip-inner">
        <div className="pricing-strip-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="pricing-strip-grid">
          {tiers.map((t) => (
            <div className="pricing-tier" key={t.label}>
              <div className="pricing-tier-label">{t.label}</div>
              <div className="pricing-tier-price">{t.price}</div>
              <div className="pricing-tier-sub">{t.sub}</div>
            </div>
          ))}
        </div>
        <div className="pricing-strip-foot">
          <a href={ctaHref} className="btn btn-primary">{ctaLabel}</a>
          <span className="pricing-strip-note">{note}</span>
        </div>
      </div>
    </section>
  );
}
