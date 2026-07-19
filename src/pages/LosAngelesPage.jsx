import { Fragment, useState, useEffect, useMemo } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import PricingStrip from '../components/PricingStrip';
import BeforeAfter from '../components/BeforeAfter';
import { PHONE, PHONE_HREF, WORKIZ_URL } from '../components/constants';
import SmartImg from '../components/SmartImg';
import { buildWorkizUrl } from '../lib/tracking';
import { MEDIA, FALLBACK } from './media';

const M = MEDIA.losangeles;
const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20junk%20removal%20quote%20in%20LA.';

const LA_TIERS = [
  { label: 'SINGLE ITEM PICKUP', price: 'from $150', sub: 'Mattress · couch · fridge · single load' },
  { label: 'GARAGE CLEANOUT', price: '$350–$750', sub: 'Typical LA garage · same-day' },
  { label: 'WHOLE PROPERTY CLEANOUT', price: '$1,200+', sub: 'Move-out · estate · multi-truck' },
];

function LAHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ LA COUNTY'S FAST, FLAT-PRICE JUNK REMOVAL CREW</span>
          </div>
          <h1>
            <span className="line">LA JUNK REMOVAL.</span>
            <span className="line">FLAT PRICE.</span>
            <span className="line green">FROM $150.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">One flat price.</span> No surprise fees. No hourly clock running while we work.
          </p>
          <p className="hero-lede">
            From <b>Pasadena to Long Beach, Woodland Hills to Downey</b>, our crews clear
            garages, whole properties, and construction debris across the LA basin and
            San Fernando Valley — same day if you call before noon.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">BOOK ONLINE</a>
          </div>
          <div className="hero-cta-reason">
            <span className="green">★</span> Same-day if you call before noon · <a href={SMS_HREF} className="hero-sms-link">or text us a photo — flat quote in 5 min</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>LA Same-Day</span>
            <span><span className="star">✦</span>$2M Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>Uniformed Crews</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc={M.before}
            afterSrc={M.after}
            beforeFallback={FALLBACK.before}
            afterFallback={FALLBACK.after}
            beforeAlt="Cluttered Los Angeles garage before JEDI junk removal"
            afterAlt="Empty garage after JEDI Los Angeles junk removal"
            initialPos={55}
          />
        </div>
      </div>
    </section>
  );
}

const STRIP_ITEMS = ['LA SAME-DAY', 'LICENSED & INSURED', 'FAMILY-OWNED', 'UPFRONT PRICING', 'UNIFORMED CREWS'];

function LATrustStrip() {
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

const LA_CITIES = [
  'Pasadena', 'Beverly Hills', 'Long Beach', 'Burbank', 'West LA', 'Eagle Rock',
  'Woodland Hills', 'Encino', 'Studio City', 'Northridge', 'Van Nuys', 'Tarzana',
  'Torrance', 'Glendale', 'Santa Monica', 'Culver City', 'Downey', 'Whittier',
  'Inglewood', 'Sherman Oaks',
];

function LACitiesGrid() {
  return (
    <section className="items cities section" id="coverage">
      <div className="items-head wrap">
        <div className="eyebrow">COVERAGE</div>
        <h2>JUNK REMOVAL ACROSS<br /><span className="green">LA COUNTY.</span></h2>
        <p>Same-day pickup across the LA basin and San Fernando Valley. Don't see yours? Call — we cover the whole county.</p>
      </div>
      <ul className="city-list cities-pills">
        {LA_CITIES.map(c => (
          <li className="city-pill" key={c}>{c}</li>
        ))}
      </ul>
      <p className="city-foot cities-foot">Don't see your neighborhood? We're rolling through LA County and the San Fernando Valley daily — call and we'll confirm same-day or next-day availability.</p>
    </section>
  );
}

const LA_STEPS = [
  { n: '01', t: 'CALL OR BOOK ONLINE', d: "Tell us what's gone (or send a photo by text) and we'll give you a flat quote — no guessing." },
  { n: '02', t: 'WE SHOW UP ON TIME', d: 'Our LA crew arrives in uniform, in a marked truck, ready to load.' },
  { n: '03', t: 'WE HAUL IT AWAY', d: 'You point, we lift. Furniture, appliances, yard waste, construction debris — gone in one trip.' },
];

function LASteps() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>POINT<span className="dot">.</span> WE HAUL<span className="dot">.</span> DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {LA_STEPS.map(s => (
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

const LA_ITEMS = [
  'Furniture & mattresses',
  'Appliances',
  'Garage & basement junk',
  'Yard & construction debris',
  'Hot tubs & spas',
  'Estate & foreclosure cleanouts',
  'Office & commercial cleanouts',
  'E-waste & electronics',
];

function LAItems() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE TAKE</div>
        <h2>IF YOU WANT IT GONE,<br /><span className="green">IT'S GONE.</span></h2>
      </div>
      <div className="items-grid">
        {LA_ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="items-foot wrap">If you're not sure it qualifies, call and ask — we'll tell you straight.</p>
    </section>
  );
}

function CrewPhoto() {
  return (
    <section className="truckphoto">
      <SmartImg className="tp-img" src={M.photo} fallback={FALLBACK.photo} alt="JEDI Junk Removal — family-owned crew working in Los Angeles" />
      <div className="tp-scrim" aria-hidden="true" />
      <div className="tp-eyebrow">
        <span className="chip">★ LA CREW · DAILY ROUTES</span>
      </div>
      <div className="tp-caption">
        <span className="tp-line">YOUR LOCAL</span>
        <span className="tp-line yellow">LA CREW.</span>
      </div>
    </section>
  );
}

const CREW_CHIPS = ['$2M Insured', 'Family-Owned', 'Uniformed Crews', 'Daily LA Routes', 'Open Daily 6AM–7PM'];

const CREW_POINTS = [
  'Uniformed, background-checked crews',
  '$2 million general-liability insured',
  'Marked trucks — no subcontractors',
  'Daily routes across LA + the Valley',
  'Flat quotes — no hourly clock',
];

function LocalLACrew() {
  return (
    <section className="exec section" id="local-crew">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">YOUR LOCAL LA CREW</div>
          <div className="exec-h">WE SHOW UP <span className="green">ON TIME.</span></div>
          <p className="exec-sub">
            JEDI Junk Removal is based in Thousand Oaks, and our uniformed,
            background-checked crews run routes across LA County and the San Fernando
            Valley every single day. We're $2 million insured, family-owned, and we
            show up when we say we will — in a marked truck, ready to work. No
            subcontractors, no surprise faces, just the same crew standards our
            Ventura County customers already trust.
          </p>
          <div className="crew-chips">
            {CREW_CHIPS.map(c => <span className="crew-chip" key={c}>{c}</span>)}
          </div>
        </div>
        <div>
          <ul className="benefits">
            {CREW_POINTS.map(b => (
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

const LA_REVIEWS = [
  {
    quote: "Called in the morning, they were at my place in Woodland Hills by 2PM and had the whole garage cleared in under an hour. Flat price, no upsells.",
    name: 'Maria',
    source: 'Google · Woodland Hills',
  },
  {
    quote: "We had a hoarder cleanout in Long Beach that three other companies quoted by the hour. JEDI gave me one flat number and stuck to it.",
    name: 'Darnell',
    source: 'Yelp · Long Beach',
  },
  {
    quote: "Fast, polite, and they actually showed up on time. My old furniture in Pasadena was gone before lunch.",
    name: 'Priya',
    source: 'Thumbtack · Pasadena',
  },
];

function LAReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">LA NEIGHBORS · LA JOBS</div>
        <h2>HEARD FROM <span style={{ color: 'var(--jedi-green)' }}>YOUR ZIP.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {LA_REVIEWS.map((r, i) => (
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

const LA_FAQS = [
  {
    q: 'Do you offer same-day junk removal in LA?',
    a: `Yes — if you call before noon most days we can get a crew to you the same day. Call ${PHONE} to check today's availability in your area.`,
  },
  {
    q: 'Are you actually based in LA?',
    a: "We're headquartered in Thousand Oaks, and our crews run routes across LA County and the San Fernando Valley every day. We're not a local storefront — we're a mobile crew that shows up on your schedule, same as we do for our Ventura County customers.",
  },
  {
    q: 'How much does junk removal cost in LA?',
    a: 'Pricing starts at $150 for a single item and scales by volume — a full garage typically runs $350 to $750 and a whole-property cleanout starts at $1,200. You\'ll get a flat quote before we start, never an hourly guess.',
  },
  {
    q: 'Do you handle commercial jobs and do you carry insurance?',
    a: 'Yes — we handle office, retail, and commercial cleanouts, and we carry $2 million in insurance coverage. Ask for a certificate of insurance when you book if your property manager requires one.',
  },
  {
    q: "What items can't you take?",
    a: "We can't take hazardous materials like paint, chemicals, or asbestos, or certain regulated electronics. If you're not sure about an item, text us a photo and we'll tell you straight away.",
  },
  {
    q: 'Are you licensed to operate in LA County?',
    a: 'Yes — JEDI Junk Removal is a licensed, insured, family-owned junk removal company operating throughout LA County and the San Fernando Valley.',
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

function LAFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS, LA.</h2>
      </div>
      <div className="faq-list">
        {LA_FAQS.map((f, i) => (
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

function LAFinalCTA() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const workizUrl = useMemo(() => buildWorkizUrl(WORKIZ_URL), []);
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>READY TO <span className="green">GET IT GONE?</span></h2>
        <p className="sub">
          <span className="green">Text us a photo — flat quote in 5 minutes.</span> Or call
          now and we'll book your LA window.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms">
          <a href={SMS_HREF}>Or text us a photo — flat quote in 5 min</a>
        </div>
        <div className="or">OR BOOK YOUR LA JUNK REMOVAL ONLINE</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR LA JUNK REMOVAL</h3>
              <p>Pick a window. Tell us what's going. We confirm by text.</p>
            </div>
            <span className="booking-badge">★ FLAT PRICE · FROM $150</span>
          </div>
          <div className="iframe-wrap">
            <div className={'iframe-loading' + (iframeLoaded ? ' hidden' : '')}>
              <div className="spinner" aria-hidden="true" />
              <div>Loading secure booking…</div>
            </div>
            <iframe
              src={workizUrl}
              title="JEDI Junk Removal — book a Los Angeles pickup"
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

const LA_SERVICE_LINKS = [
  { label: 'Same-day removal', href: '/same-day' },
  { label: 'Cleanouts', href: '/cleanouts' },
  { label: 'Mattress removal', href: '/mattress-removal' },
  { label: 'Junk hauling', href: '/junk-hauling' },
];

const LA_TAGLINE = 'Family-owned junk removal serving LA County, the San Fernando Valley, Orange County, and Ventura.';

export default function LosAngelesPage() {
  useEffect(() => {
    document.title = 'Los Angeles Junk Removal · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <LAHero />
      <LATrustStrip />
      <PricingStrip
        eyebrow="WHAT IT COSTS IN LA"
        heading={<>FLAT PRICE — <span className="green">FROM $150.</span></>}
        intro="Volume-based pricing — you pay for the space your junk takes in the truck. Text us a photo and we'll give you the exact LA price before we roll."
        tiers={LA_TIERS}
        ctaLabel="GET MY FLAT LA QUOTE"
        note="Every job includes labor, hauling, and disposal. You'll always know the price before we lift a single box."
      />
      <LACitiesGrid />
      <LASteps />
      <LAItems />
      <CrewPhoto />
      <LocalLACrew />
      <LAReviews />
      <LAFAQ />
      <LAFinalCTA />
      <Footer serviceLinks={LA_SERVICE_LINKS} tagline={LA_TAGLINE} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="BOOK LA PICKUP"
        smallText="★ LA SAME-DAY · FROM $150"
        callLabel="CALL NOW"
        href="#quote"
      />
    </>
  );
}
