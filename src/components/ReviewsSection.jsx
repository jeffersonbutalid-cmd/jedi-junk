const REVIEWS = [
  {
    quote: "We needed to clear my mother's house in three days for the buyer's walkthrough. The crew was patient with us, set aside her photo albums and important paperwork, and finished early. Worth every dollar in a hard week.",
    name: 'Catherine M.',
    source: 'Google · Estate · Pasadena',
  },
  {
    quote: "Manage 14 rental units across the Valley. JEDI is now my go-to between tenants — flat quote, COI in my inbox same day, broom-clean when they leave. They make me look good to my owners.",
    name: 'Hector D.',
    source: 'Yelp · Property Manager · Sherman Oaks',
  },
  {
    quote: "Inherited a foreclosure that hadn't been touched in years. Two trucks, one long day, and the place was empty. Respectful, no surprises on pricing, and they hauled an old piano none of the other quotes wanted to deal with.",
    name: 'Andrew K.',
    source: 'Thumbtack · Foreclosure · Long Beach',
  },
];

export default function ReviewsSection() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">WHAT FAMILIES &amp; LANDLORDS SAY</div>
        <h2>HANDLED WITH <span style={{ color: 'var(--jedi-green)' }}>CARE.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
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
