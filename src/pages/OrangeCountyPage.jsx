import { Fragment, useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import PricingStrip from '../components/PricingStrip';
import BookingForm from '../components/BookingForm';
import { PHONE, PHONE_HREF } from '../components/constants';
import SmartImg from '../components/SmartImg';
import { MEDIA, FALLBACK } from './media';

const M = MEDIA.orangecounty;
const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20junk%20removal%20quote%20in%20OC.';

const OC_TIERS = [
  { label: 'SINGLE PICKUP', price: 'from $150', sub: 'Mattress · couch · fridge · single load' },
  { label: 'GARAGE CLEANOUT', price: '$350–$750', sub: 'Typical OC garage · same-day' },
  { label: 'WHOLE PROPERTY', price: '$1,200+', sub: 'Move-out · estate · multi-truck' },
];

function OCHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ OC SAME-DAY · FROM $150</span>
          </div>
          <h1>
            <span className="line">OC JUNK REMOVAL.</span>
            <span className="line">FLAT PRICE.</span>
            <span className="line green">FROM $150.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">No curb fees.</span> No hourly surprises. Gone today.
          </p>
          <p className="hero-lede">
            <b>Anaheim · Santa Ana · Irvine · Costa Mesa · Orange · Garden Grove ·
            Buena Park · Huntington Beach</b> — and the rest of OC. Call before 2 PM
            for same-day pickup.
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
            <span><span className="star">✦</span>OC Same-Day</span>
            <span><span className="star">✦</span>$2M Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>2-Hour Windows</span>
          </div>
        </div>
        <div className="hero-photo">
          <SmartImg
            className="hero-img-single"
            src={M.hero}
            fallback={FALLBACK.photo}
            alt="JEDI Junk Removal truck on an Orange County street"
          />
        </div>
      </div>
    </section>
  );
}

const STRIP_ITEMS = ['OC SAME-DAY', 'LICENSED & INSURED', 'FAMILY-OWNED', 'UPFRONT PRICING', '#1 RATED'];

function OCTrustStrip() {
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

const OC_CITIES = [
  'Anaheim', 'Santa Ana', 'Irvine', 'Costa Mesa', 'Orange', 'Garden Grove',
  'Buena Park', 'Huntington Beach', 'Fullerton', 'Yorba Linda', 'La Habra',
  'Villa Park', 'Brea', 'Cypress', 'Tustin', 'Newport Beach', 'Lake Forest',
  'Westminster', 'Placentia', 'Fountain Valley', 'Stanton', 'Seal Beach',
];

function CitiesGrid() {
  return (
    <section className="items cities section" id="coverage">
      <div className="items-head wrap">
        <div className="eyebrow">COVERAGE</div>
        <h2>JUNK REMOVAL ACROSS<br /><span className="green">ORANGE COUNTY.</span></h2>
        <p>Same-day pickup across the cities below. Don't see yours? Call — we cover the whole county.</p>
      </div>
      <ul className="city-list cities-pills">
        {OC_CITIES.map(c => (
          <li className="city-pill" key={c}>{c}</li>
        ))}
      </ul>
      <p className="city-foot cities-foot">Next-day service in Aliso Viejo, Mission Viejo, Laguna Beach, San Clemente, Dana Point &amp; surrounding areas.</p>
    </section>
  );
}

const OC_STEPS = [
  { n: '01', t: 'CALL OR BOOK', d: 'Phone or online — free flat quote in minutes.' },
  { n: '02', t: 'WE ARRIVE', d: 'Same day or next day, 2-hour window. Gloves on.' },
  { n: '03', t: 'GONE', d: 'Truck loaded, space swept. You pay the quoted price.' },
];

function OCSteps() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>POINT<span className="dot">.</span> WE HAUL<span className="dot">.</span> DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {OC_STEPS.map(s => (
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

const OC_ITEMS = [
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

function OCItems() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE TAKE</div>
        <h2>WHAT WE TAKE<br /><span className="green">IN OC.</span></h2>
      </div>
      <div className="items-grid">
        {OC_ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CrewPhoto() {
  return (
    <section className="truckphoto">
      <SmartImg className="tp-img" src={M.photo} fallback={FALLBACK.photo} alt="JEDI Junk Removal — family-owned crew working in Orange County" />
      <div className="tp-scrim" aria-hidden="true" />
      <div className="tp-eyebrow">
        <span className="chip">★ OC CREW · DAILY</span>
      </div>
      <div className="tp-caption">
        <span className="tp-line">YOUR LOCAL</span>
        <span className="tp-line yellow">OC CREW.</span>
      </div>
    </section>
  );
}

const OC_BENEFITS = [
  'OC same-day pickup — most calls before 2 PM',
  'Two-hour arrival windows — not vague all-day windows',
  'Family-owned crew, W-2, background-checked',
  'Flat upfront quote — no curb surprises',
  'COI and net-15 for OC landlords + property managers',
];

const OC_HOURS = [
  { day: 'Mon – Sat', time: '7AM – 7PM' },
  { day: 'Sunday', time: '8AM – 5PM' },
  { day: 'Same-day', time: 'Call before 2PM' },
];

function LocalCrewHours() {
  return (
    <section className="exec section">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">LOCAL TO OC</div>
          <div className="exec-h">YOUR LOCAL <span className="green">OC CREW.</span></div>
          <p className="exec-sub">
            We're family-owned out of Thousand Oaks, but our crew runs Orange County
            daily — from Anaheim Hills to Huntington Beach. Same-day pickup is standard,
            not a special favour.
          </p>
          <ul className="benefits">
            {OC_BENEFITS.map(b => (
              <li className="benefit" key={b}>
                <span className="check" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="hours-card">
            <div className="exec-eyebrow">HOURS & CONTACT</div>
            <div className="exec-h">CALL US <span className="green">TODAY.</span></div>
            <a href={PHONE_HREF} className="hours-phone">
              <span className="tap">Tap to call</span>
              <span className="num">{PHONE}</span>
            </a>
            <ul className="hours-list">
              {OC_HOURS.map(h => (
                <li key={h.day}>
                  <span className="day">{h.day}</span>
                  <span className="time">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="hours-addr">
              JEDI Junk Removal · Serving all of Orange County<br />
              HQ: 14930 Ventura Blvd, Sherman Oaks, CA 91403<br />
              hello@jedijunk.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const OC_REVIEWS = [
  {
    quote: "Finally found a junk-removal crew that actually shows up in Villa Park on a Saturday. Quoted on the phone, arrived in a two-hour window, and hauled an old patio set, three appliances and a busted treadmill in under an hour.",
    name: 'Margaret W.',
    source: 'Google · Villa Park',
  },
  {
    quote: "Bought a fixer-upper in Anaheim Hills and the garage was packed when we got the keys. JEDI cleared it in a single afternoon. Flat $720 — same as the quote. Polite, careful, no surprises.",
    name: 'Aaron T.',
    source: 'Yelp · Anaheim',
  },
  {
    quote: "We rent out two condos in Irvine and use JEDI for every move-out clean. Easy to book, COI in my inbox same day, broom-clean when they leave. Worth it.",
    name: 'Sandeep R.',
    source: 'Thumbtack · Irvine',
  },
];

function OCReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">OC NEIGHBOURS · OC JOBS</div>
        <h2>HEARD FROM <span style={{ color: 'var(--jedi-green)' }}>YOUR ZIP.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {OC_REVIEWS.map((r, i) => (
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

const OC_FAQS = [
  {
    q: 'How fast can you come in OC?',
    a: 'Most OC calls before 2 PM get same-day service. After that, first thing the next morning. We give you a 2-hour arrival window when you book — not a vague all-day window. Anaheim, Irvine, Costa Mesa, and Huntington Beach are routine same-day, but we hit every city on the list too.',
  },
  {
    q: 'Are you actually based in OC?',
    a: 'Our HQ is in Thousand Oaks (Ventura County) — we\'re family-owned and our crew runs Orange County daily. The trucks live closer to OC than most local-sounding competitors. If you\'ve ever called a so-called "OC junk removal" company and waited two days for a callback, you know why proximity matters.',
  },
  {
    q: 'What does junk removal cost in OC?',
    a: 'Volume-based — what fills the truck. Pickups start at our $150 minimum. A standard garage cleanout runs $350 to $750. Whole-property jobs go up from there. We give you a flat upfront quote on the phone or after sending a couple of photos. No hourly surprises, no curb fees.',
  },
  {
    q: 'Do you do commercial jobs?',
    a: 'Yes. Office cleanouts, post-construction debris, recurring property-manager routes, foreclosure cleanouts, retail relocations. We invoice net-15 for trade accounts and can email a COI to your building or HOA in minutes.',
  },
  {
    q: "What can't you take?",
    a: "Hazardous chemicals, paint (liquid), motor oil, asbestos, ammunition, and medical waste. If you're not sure about a specific item, just call — we either take it, or we point you to who does.",
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Fully licensed in California, $2M general liability, and every crew member is W-2, background-checked, and trained. COI emailed to your building, HOA, or escrow office in minutes.',
  },
];

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: open ? '600px' : '0px' }}>
        <div className="faq-a">{a}</div>
      </div>
    </div>
  );
}

function OCFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS, OC.</h2>
      </div>
      <div className="faq-list">
        {OC_FAQS.map((f, i) => (
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

function OCFinalCTA() {
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>LET'S TALK JUNK<span className="green">, OC.</span></h2>
        <p className="sub">
          <span className="green">Same-day pickup before 2 PM.</span> Flat price up front —
          no curb fees, no hourly meter.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms">
          <a href={SMS_HREF}>Or text us a photo — flat quote in 5 min</a>
        </div>
        <div className="or">OR BOOK YOUR OC PICKUP ONLINE</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR OC PICKUP</h3>
              <p>Pick a window. Tell us what's going. We confirm by text.</p>
            </div>
            <span className="booking-badge">★ FLAT PRICE · NO CURB FEES</span>
          </div>
          <BookingForm defaultService="Same-day pickup" />
        </div>
      </div>
    </section>
  );
}

const OC_REGION_LINKS = [
  { label: 'Orange County', href: '#top' },
  { label: 'Los Angeles', href: '/same-day' },
  { label: 'San Fernando Valley', href: '/same-day' },
  { label: 'Ventura County', href: '/same-day' },
];

const OC_TAGLINE = 'Family-owned junk removal serving Orange County, LA, the San Fernando Valley, and Ventura.';

export default function OrangeCountyPage() {
  useEffect(() => {
    document.title = 'Orange County Junk Removal · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <OCHero />
      <OCTrustStrip />
      <PricingStrip
        eyebrow="WHAT IT COSTS IN OC"
        heading={<>FLAT PRICE — <span className="green">NO CURB FEES.</span></>}
        intro="Volume-based pricing. Text us a photo and we'll give you the exact OC price before the truck rolls."
        tiers={OC_TIERS}
        ctaLabel="GET MY FLAT OC QUOTE"
        note="Same-day before 2 PM · 2-hour arrival windows · No hourly meter · No curb fees"
      />
      <CitiesGrid />
      <OCSteps />
      <OCItems />
      <CrewPhoto />
      <LocalCrewHours />
      <OCReviews />
      <OCFAQ />
      <OCFinalCTA />
      <Footer serviceLinks={OC_REGION_LINKS} serviceHeading="REGIONS" tagline={OC_TAGLINE} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="BOOK OC PICKUP"
        smallText="★ OC SAME-DAY · FROM $150"
        callLabel="CALL NOW"
      />
    </>
  );
}
