import { Fragment } from 'react';

const ITEMS = [
  '#1 RATED',
  'LICENSED & INSURED',
  'FAMILY-OWNED',
  'ESTATE-SENSITIVE',
  'UPFRONT PRICING',
];

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-strip-inner">
        {ITEMS.map((label, i) => (
          <Fragment key={label}>
            <span className="item">{label}</span>
            {i < ITEMS.length - 1 && <span className="star">✦</span>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
