import { Fragment, useState, useEffect, useMemo } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import PricingStrip from '../components/PricingStrip';
import { PHONE, PHONE_HREF, WORKIZ_URL } from '../components/constants';
import SmartImg from '../components/SmartImg';
import { buildWorkizUrl } from '../lib/tracking';
import { MEDIA, FALLBACK } from './media';

const M = MEDIA.junkhauling;
const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20junk%20hauling%20quote.';

const HAUL_TIERS = [
  { label: 'SINGLE ITEM', price: 'from $150', sub: 'Sofa · fridge · mattress · 1/8 truck' },
  { label: 'PARTIAL LOAD', price: '$250–$500', sub: '1/4 to 1/2 truck · garage clearout' },
  { label: 'FULL TRUCK', price: '$600+', sub: '3/4 to full 20-yard load' },
];

function JunkHaulingHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ SAME-DAY · FROM $150</span>
          </div>
          <h1>
            <span className="line">SAME-DAY</span>
            <span className="line">JUNK HAULING.</span>
            <span className="line green">FROM $150.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">We haul it.</span> You don't lift a thing.
          </p>
          <p className="hero-lede">
            Furniture, appliances, construction debris, full-truck loads. Call before
            2 PM for same-day pickup — single item or 20-yard truck, flat upfront price.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">BOOK ONLINE</a>
          </div>
          <div className="hero-cta-reason">
            <span className="green">★</span> Same-day before 2 PM · <a href={SMS_HREF} className="hero-sms-link">or text us a photo — flat quote in 5 min</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>1,000+ Hauls</span>
            <span><span className="star">✦</span>Stairs OK</span>
            <span><span className="star">✦</span>$2M Insured</span>
            <span><span className="star">✦</span>4 Counties</span>
          </div>
        </div>
        <div className="hero-photo">
          <SmartImg
            className="hero-img-single"
            src={M.hero}
            fallback={FALLBACK.photo}
            alt="JEDI crew loading furniture and junk into the truck"
          />
        </div>
      </div>
    </section>
  );
}

const STRIP_ITEMS = ['SAME / NEXT DAY', 'FULL-TRUCK LOADS', 'UPFRONT PRICING', 'LICENSED & INSURED', 'FAMILY-OWNED'];

function JunkHaulingTrustStrip() {
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

function InfoStrips() {
  return (
    <section className="info-strips">
      <div className="info-strips-inner">
        <div className="info-strip">
          <span className="is-label">Property managers &amp; trade</span>
          <span className="is-value">
            Net-15 invoicing · COI in minutes · Recurring routes
          </span>
        </div>
      </div>
    </section>
  );
}

const HAUL_ITEMS = [
  'Furniture & sofas',
  'Appliances (fridge, washer, dryer)',
  'Mattresses & bed frames',
  'Electronics & TVs',
  'Construction debris',
  'Drywall & lumber',
  'Yard debris & branches',
  'Hot tubs & playsets',
  'Sheds & fencing',
  'Office furniture',
  'Cardboard & paper',
  'Full-truck loads',
];

function JunkHaulingItems() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE HAUL</div>
        <h2>SINGLE ITEMS TO<br /><span className="green">FULL-TRUCK LOADS.</span></h2>
        <p>Residential, commercial, construction. If it fits in a 20-yard truck, we'll haul it.</p>
      </div>
      <div className="items-grid">
        {HAUL_ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const HAUL_STEPS = [
  {
    n: '01',
    t: 'POINT',
    d: 'Phone us or send a few photos. We give you a free, upfront quote in minutes.',
  },
  {
    n: '02',
    t: 'WE HAUL',
    d: "Same day or next day. Two-person crew, gloves on. We load — you don't lift.",
  },
  {
    n: '03',
    t: 'DONE',
    d: 'Truck loaded, space swept clean. Recycle and donate where we can. You pay the quoted price.',
  },
];

function JunkHaulingSteps() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>POINT. WE HAUL. DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {HAUL_STEPS.map(s => (
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

function TruckPhoto() {
  return (
    <section className="truckphoto">
      <SmartImg className="tp-img" src={M.photo} fallback={FALLBACK.photo} alt="JEDI junk removal truck" />
      <div className="tp-scrim" aria-hidden="true" />
      <div className="tp-eyebrow">
        <span className="chip">★ FAMILY-OWNED</span>
      </div>
      <div className="tp-caption">
        <span className="tp-line">ONE FAMILY /</span>
        <span className="tp-line">FOUR COUNTIES.</span>
      </div>
    </section>
  );
}

const WHO_BENEFITS = [
  'Residential furniture & appliance hauls',
  'Post-construction debris (drywall, lumber, fixtures)',
  'Office & commercial cleanouts',
  'Yard debris, fence pulls, and deck demo',
  'Recurring schedules for landlords and property managers',
];

const COVERAGE_CITIES = [
  { city: 'Los Angeles', county: 'LA County' },
  { city: 'Santa Monica', county: 'LA County' },
  { city: 'Pasadena', county: 'LA County' },
  { city: 'Sherman Oaks', county: 'LA County' },
  { city: 'Encino', county: 'LA County' },
  { city: 'Burbank', county: 'LA County' },
  { city: 'Glendale', county: 'LA County' },
  { city: 'Long Beach', county: 'LA County' },
  { city: 'Thousand Oaks', county: 'Ventura' },
  { city: 'Ventura', county: 'Ventura' },
  { city: 'Camarillo', county: 'Ventura' },
  { city: 'Anaheim', county: 'Orange Co.' },
  { city: 'Irvine', county: 'Orange Co.' },
  { city: 'Huntington Beach', county: 'Orange Co.' },
];

function ResCommSection() {
  return (
    <section className="exec section" id="coverage">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">WHO WE WORK FOR</div>
          <div className="exec-h">RESIDENTIAL OR COMMERCIAL —<br /><span className="green">SAME CREW.</span></div>
          <p className="exec-sub">
            We don't keep "two divisions." The same family-owned team handles a
            kitchen-appliance swap, a 30-yard construction haul, or a monthly route
            for a property management group.
          </p>
          <ul className="benefits">
            {WHO_BENEFITS.map(b => (
              <li className="benefit" key={b}>
                <span className="check" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="exec-eyebrow">COVERAGE</div>
          <div className="exec-h">SERVING<br /><span className="green">4 COUNTIES.</span></div>
          <p className="exec-sub">LA, Ventura, Orange, and the Valley. Recurring routes priced by the month. One-off jobs priced by the load.</p>
          <ul className="city-list">
            {COVERAGE_CITIES.map(c => (
              <li className="city-pill" key={c.city}>
                {c.city}
                <span className="county">{c.county}</span>
              </li>
            ))}
          </ul>
          <p className="city-foot">+ surrounding cities. Out-of-area job site? Call — we travel for the right work.</p>
        </div>
      </div>
    </section>
  );
}

const HAUL_REVIEWS = [
  {
    quote: "Run a residential remodel in Encino. Called Monday for a Wednesday haul of drywall, old cabinets, and a tub. Crew showed up on time, loaded everything, swept the driveway. Flat $640 — same as the quote.",
    name: 'Tomás L.',
    source: 'Google · Contractor · Encino',
  },
  {
    quote: "We use JEDI on a monthly route for between-tenant hauls across nine of our buildings. Predictable pricing, same crew every time, and they invoice net-15. Easiest line item on my P&L.",
    name: 'Renée H.',
    source: 'Yelp · Property Group · Sherman Oaks',
  },
  {
    quote: "Cleared out an entire garage worth of old appliances, patio furniture, and three TVs in one truck. They quoted by volume, didn't nickel-and-dime, and the place looked better when they left than when they got there.",
    name: 'Devin O.',
    source: 'Thumbtack · Homeowner · Long Beach',
  },
];

function JunkHaulingReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">REAL HAULS · REAL JOBS</div>
        <h2>BOOKED. LOADED. <span style={{ color: 'var(--jedi-green)' }}>GONE.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {HAUL_REVIEWS.map((r, i) => (
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

const HAUL_FAQS = [
  {
    q: 'How does hauling pricing work?',
    a: "Volume-based, starting at our $150 minimum. We quote by how much of the truck your load fills — not by item count or hourly. One-eighth truck, quarter, half, three-quarter, full. Send photos by text and we'll give you a flat number before anyone shows up.",
  },
  {
    q: 'What size loads do you take?',
    a: "Anywhere from a single sofa to a 20-yard full-truck load. For jobs bigger than one truckload, we'll send two trucks back-to-back or schedule consecutive runs. Job sites and recurring routes get their own pricing.",
  },
  {
    q: 'Same-day hauling — really?',
    a: "For most calls before 2 PM, yes. After that we book the next morning. Saturday and Sunday hauling is available with no upcharge. Tight window? Call and we'll tell you straight whether we can hit it.",
  },
  {
    q: 'Do you take construction debris?',
    a: "Yes — drywall, lumber, fixtures, tile, flooring scraps, demolition debris. We can't take hazardous chemicals, liquid paint, or anything classified as hazmat. If you're not sure, send a photo.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous chemicals, paint (liquid), motor oil, asbestos, ammunition, and medical waste. Everything else is fair game. If you're uncertain about a specific item, just call.",
  },
  {
    q: 'Are you licensed and insured?',
    a: "Fully licensed in California, $2M general liability, and every crew member is W-2, background-checked, and trained. COI emailed to your GC, building, or property manager in minutes — just ask.",
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

function JunkHaulingFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS.</h2>
      </div>
      <div className="faq-list">
        {HAUL_FAQS.map((f, i) => (
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

function JunkHaulingFinalCTA() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const workizUrl = useMemo(() => buildWorkizUrl(WORKIZ_URL), []);
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>LET'S <span className="green">HAUL IT.</span></h2>
        <p className="sub">
          <span className="green">Same-day pickup before 2 PM.</span> Flat quote up front.
          Text us a photo or call — we move fast.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms">
          <a href={SMS_HREF}>Or text us a photo — flat quote in 5 min</a>
        </div>
        <div className="or">OR BOOK YOUR HAUL ONLINE</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR HAUL</h3>
              <p>Pick a window. Tell us what's going. We confirm by text.</p>
            </div>
            <span className="booking-badge">★ FLAT QUOTE · NO SURPRISES</span>
          </div>
          <div className="iframe-wrap">
            <div className={'iframe-loading' + (iframeLoaded ? ' hidden' : '')}>
              <div className="spinner" aria-hidden="true" />
              <div>Loading secure booking…</div>
            </div>
            <iframe
              src={workizUrl}
              title="JEDI Junk Removal — book a haul"
              loading="lazy"
              allow="payment; geolocation; clipboard-write"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
          <div className="booking-foot">
            Trouble with the form?{' '}
            <a href={PHONE_HREF} className="phone-fallback">Call {PHONE}</a>
            {' · or '}
            <a href={SMS_HREF} className="phone-fallback">text a photo</a>
            {' for a flat quote.'}
          </div>
        </div>
      </div>
    </section>
  );
}

const HAUL_SERVICE_LINKS = [
  { label: 'Junk hauling', href: '/junk-hauling' },
  { label: 'Same-day removal', href: '/same-day' },
  { label: 'Cleanouts', href: '/cleanouts' },
  { label: 'Mattress removal', href: '/mattress-removal' },
];

export default function JunkHaulingPage() {
  useEffect(() => {
    document.title = 'Junk Hauling · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <JunkHaulingHero />
      <JunkHaulingTrustStrip />
      <PricingStrip
        eyebrow="WHAT IT COSTS"
        heading={<>FLAT PRICE — <span className="green">BY THE LOAD.</span></>}
        intro="Volume-based pricing. Photo us your load and we'll give you the exact number before the truck shows up."
        tiers={HAUL_TIERS}
        ctaLabel="GET MY FLAT QUOTE"
        note="Same-day before 2 PM · Stairs OK · No hourly meter · Pay only when it's loaded"
      />
      <InfoStrips />
      <JunkHaulingItems />
      <JunkHaulingSteps />
      <TruckPhoto />
      <ResCommSection />
      <JunkHaulingReviews />
      <JunkHaulingFAQ />
      <JunkHaulingFinalCTA />
      <Footer serviceLinks={HAUL_SERVICE_LINKS} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="BOOK HAUL"
        smallText="★ SAME-DAY · FROM $150"
        callLabel="CALL NOW"
      />
    </>
  );
}
