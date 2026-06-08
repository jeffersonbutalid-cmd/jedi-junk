import { PHONE, PHONE_HREF } from './constants';
import BeforeAfter from './BeforeAfter';
import { MEDIA, FALLBACK } from '../pages/media';

const beforeImg = MEDIA.cleanout.before;
const afterImg = MEDIA.cleanout.after;

const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20cleanout%20quote.';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ FREE WALK-THROUGH · FLAT QUOTE</span>
          </div>
          <h1>
            <span className="line">FULL HOUSE</span>
            <span className="line">CLEANOUTS.</span>
            <span className="line green">DONE IN A DAY.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">Free walk-through.</span> Flat quote on the spot. Broom-clean when we leave.
          </p>
          <p className="hero-lede">
            Estate, garage, hoarder, foreclosure, full-property. One flat upfront
            quote covers labor, dump fees, and disposal. We don't leave until it's empty.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">GET FREE QUOTE</a>
          </div>
          <div className="hero-cta-reason">
            <span className="green">★</span> Same-week walk-throughs · <a href={SMS_HREF} className="hero-sms-link">or text us — we reply in 5 min</a>
          </div>
          <div className="audience-row">
            <a href="#quote" className="audience-btn">
              Home or Estate Cleanout <span className="ab-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#quote" className="audience-btn">
              Property Manager or Realtor <span className="ab-arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>500+ Cleanouts</span>
            <span><span className="star">✦</span>$2M Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>Estate-Sensitive</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc={beforeImg}
            afterSrc={afterImg}
            beforeFallback={FALLBACK.before}
            afterFallback={FALLBACK.after}
            beforeAlt="Cluttered property before JEDI cleanout"
            afterAlt="Empty, swept property after JEDI cleanout"
          />
        </div>
      </div>
    </section>
  );
}
