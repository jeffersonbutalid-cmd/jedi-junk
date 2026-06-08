const ITEMS = [
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

export default function ItemsSection() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE CLEAR</div>
        <h2>EVERY KIND OF<br /><span className="green">CLEANOUT.</span></h2>
        <p>Single rooms or entire properties. Cluttered, abandoned, or sensitive — we handle it with care and a flat upfront quote.</p>
      </div>
      <div className="items-grid">
        {ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
