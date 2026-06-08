import { Fragment, useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import BeforeAfter from '../components/BeforeAfter';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import BookingForm from '../components/BookingForm';
import { PHONE, PHONE_HREF } from '../components/constants';
import SmartImg from '../components/SmartImg';
import { MEDIA, FALLBACK } from './media';

const M = MEDIA.sameday;

function SameDayHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ $20 OFF — BOOK ONLINE</span>
          </div>
          <h1>
            <span className="line">SAME-DAY</span>
            <span className="line">JUNK</span>
            <span className="line green">REMOVAL.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">Call before noon — out by dark.</span> Flat price by the load.
          </p>
          <p className="hero-lede">
            Couch, mattress, fridge, garage full of everything. LA, Ventura,
            Orange County, and the Valley.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">GET A QUOTE</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>#1 Rated</span>
            <span><span className="star">✦</span>Licensed &amp; Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>4 Counties</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc={M.before}
            afterSrc={M.after}
            beforeFallback={FALLBACK.before}
            afterFallback={FALLBACK.after}
            beforeAlt="Cluttered garage before JEDI same-day pickup"
            afterAlt="Empty garage after JEDI same-day junk removal"
            initialPos={55}
          />
        </div>
      </div>
    </section>
  );
}

const STRIP_ITEMS = ['#1 RATED', 'LICENSED & INSURED', 'FAMILY-OWNED', 'SAME / NEXT DAY', 'UPFRONT PRICING'];

function SameDayTrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-strip-inner">
        {STRIP_ITEMS.map((label, i) => (
          <Fragment key={label}>
            <span className="item">{label}</span>
            {i < STRIP_ITEMS.length - 1 && <span className="star">✦</span>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

const SD_ITEMS = [
  'Furniture', 'Mattresses', 'Appliances', 'Electronics',
  'Garage clutter', 'Yard debris', 'Construction debris', 'Hot tubs',
  'Sheds', 'Office furniture', 'Cardboard', 'Estate cleanouts',
];

function SameDayItems() {
  return (
    <section className="items sd-items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE HAUL</div>
        <h2>WE HAUL<br /><span className="green">IT ALL.</span></h2>
        <p>One item or a truckload. Tell us what you've got and we'll quote it flat — before we arrive.</p>
      </div>
      <div className="items-grid">
        {SD_ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="items-foot wrap">Don't see it? Call — odds are we take it.</p>
    </section>
  );
}

const SD_STEPS = [
  {
    n: '01',
    t: 'CALL OR TEXT',
    d: "Tell us what you've got. A quick call or a photo — we quote same-day pickups by the load, on the spot.",
  },
  {
    n: '02',
    t: 'POINT. WE HAUL.',
    d: "Show us the pile. Crew loads everything — you don't touch a thing. No sorting required.",
  },
  {
    n: '03',
    t: 'DONE BY DARK.',
    d: 'Property clear, driveway swept. Most pickups wrapped up within a few hours of your call.',
  },
];

function SameDaySteps() {
  return (
    <section className="steps sd-steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW SAME-DAY WORKS</div>
        <h2>POINT. WE HAUL. DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {SD_STEPS.map(s => (
          <div className="step-card sd-step-card" key={s.n}>
            <div className="step-num">{s.n}</div>
            <div className="step-title">{s.t}</div>
            <div className="step-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TruckPhoto() {
  return (
    <section className="truckphoto">
      <SmartImg className="tp-img" src={M.photo} fallback={FALLBACK.photo} alt="JEDI junk removal truck on the road" />
      <div className="tp-scrim" aria-hidden="true" />
      <div className="tp-eyebrow">
        <span className="chip">★ ON THE ROAD DAILY</span>
      </div>
      <div className="tp-caption">
        <span className="tp-line">ONE TRUCK /</span>
        <span className="tp-line">FOUR COUNTIES.</span>
      </div>
    </section>
  );
}

const CITIES = [
  { city: 'Los Angeles', county: 'LA County' },
  { city: 'Sherman Oaks', county: 'LA County' },
  { city: 'Pasadena', county: 'LA County' },
  { city: 'Long Beach', county: 'LA County' },
  { city: 'Thousand Oaks', county: 'Ventura County' },
  { city: 'Ventura', county: 'Ventura County' },
  { city: 'Oxnard', county: 'Ventura County' },
  { city: 'Anaheim', county: 'Orange County' },
  { city: 'Irvine', county: 'Orange County' },
  { city: 'Santa Ana', county: 'Orange County' },
];

const COV_BENEFITS = [
  'Same-day and next-day pickup, 7 days a week',
  'All jobs quoted flat — no hourly surprises',
  'Two-person crews with fully equipped trucks',
  'You just point — we load and haul everything',
  'Certificate of insurance sent on request',
];

function CoverageBenefits() {
  return (
    <section className="exec section" id="coverage">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">COVERAGE AREA</div>
          <div className="exec-h">SERVING<br /><span className="green">4 COUNTIES.</span></div>
          <ul className="city-list" style={{ marginTop: 18 }}>
            {CITIES.map(c => (
              <li className="city-pill" key={c.city}>
                {c.city}
                <span className="county">{c.county}</span>
              </li>
            ))}
          </ul>
          <p className="city-foot">+ surrounding cities. Call to confirm availability for your zip.</p>
        </div>
        <div>
          <div className="exec-eyebrow">WHY JEDI</div>
          <div className="exec-h">NO SURPRISES.<br /><span className="green">JUST GONE.</span></div>
          <p className="exec-sub">Same-day slots fill fast. The earlier you call, the better your window.</p>
          <ul className="benefits">
            {COV_BENEFITS.map(b => (
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

const SD_REVIEWS = [
  {
    quote: "Called at 9am with a garage full of junk — broken furniture, tires, a dead fridge. Crew was there by 1pm and gone by 4. I didn't have to touch a single thing.",
    name: 'Marisol R.',
    source: 'Google · Same-Day Pickup · Thousand Oaks',
  },
  {
    quote: "Property management company. We needed a unit cleared before the weekend. JEDI showed up with two trucks, stripped the place clean, and sent me photos. COI was in my inbox before they left.",
    name: 'David K.',
    source: 'Yelp · Property Manager · Encino',
  },
  {
    quote: "Moving and the donation center wouldn't take my old sectional. One call to JEDI and it was gone same afternoon. Reasonable price, polite guys, no drama.",
    name: 'Jennifer P.',
    source: 'Thumbtack · Same-Day · Ventura',
  },
];

function SameDayReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">WHAT CUSTOMERS SAY</div>
        <h2>GONE THE SAME <span style={{ color: 'var(--jedi-green)' }}>DAY.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {SD_REVIEWS.map((r, i) => (
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

const SD_FAQS = [
  {
    q: 'How fast is "same-day"?',
    a: "Call before noon and we're usually out the same day. Afternoons may push to next morning. We'll tell you honestly when we book — no vague windows.",
  },
  {
    q: 'How do you price same-day pickups?',
    a: "By the load — how much space your items take in our truck. Jobs start at our $150 minimum, quoted flat on the spot (or from a photo). One flat price, no hourly meter.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous waste (paint, chemicals, fuel), asbestos, and biological material. Almost everything else — appliances, electronics, tires, mattresses, construction debris — is fine. When in doubt, call and ask.",
  },
  {
    q: 'Do I need to be home for the pickup?',
    a: "Not necessarily. If the items are accessible (garage, side yard, gated storage), we can often do a no-contact pickup. Just confirm access before we roll.",
  },
  {
    q: 'Are you licensed and insured?',
    a: "Fully licensed in California, $2M general liability. Every crew member is W-2 and background-checked. We can email a COI to your HOA, property manager, or building in minutes.",
  },
];

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: open ? '500px' : '0px' }}>
        <div className="faq-a">{a}</div>
      </div>
    </div>
  );
}

function SameDayFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq section" id="faq">
      <span id="pricing" aria-hidden="true" style={{ position: 'absolute' }} />
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS.</h2>
      </div>
      <div className="faq-list">
        {SD_FAQS.map((f, i) => (
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

function SameDayFinalCTA() {
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>LET'S TALK <span className="green">JUNK.</span></h2>
        <p className="sub">
          Call us now — or fill out the form below and we'll reach out to confirm.
          Same-day windows go fast.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="or">OR BOOK YOUR PICKUP ONLINE — $20 OFF</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR PICKUP</h3>
              <p>We'll text to confirm a window. Most same-day slots book before noon.</p>
            </div>
            <span className="booking-badge">★ $20 OFF APPLIED</span>
          </div>
          <BookingForm defaultService="Same-day pickup" />
        </div>
      </div>
    </section>
  );
}

const SD_SERVICE_LINKS = [
  { label: 'Same-day removal', href: '/same-day' },
  { label: 'Estate cleanouts', href: '/cleanouts' },
  { label: 'Construction debris', href: '/same-day' },
  { label: 'Property managers', href: '/same-day' },
];

export default function SameDayPage() {
  useEffect(() => {
    document.title = 'Same-Day Junk Removal · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <SameDayHero />
      <SameDayTrustStrip />
      <SameDayItems />
      <SameDaySteps />
      <TruckPhoto />
      <CoverageBenefits />
      <SameDayReviews />
      <SameDayFAQ />
      <SameDayFinalCTA />
      <Footer serviceLinks={SD_SERVICE_LINKS} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="BOOK PICKUP"
        smallText="★ SAME-DAY · FROM $150"
        callLabel="CALL NOW"
      />
    </>
  );
}
