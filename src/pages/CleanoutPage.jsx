import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import CleanoutForm from '../components/CleanoutForm';
import { PHONE, PHONE_HREF } from '../components/constants';

const CALL_HREF = PHONE_HREF;

const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20cleanout%20quote.';

// ─── URL ?job= → variant content. {CITY} is replaced at render-time. ──────────
const VARIANTS = {
  estate: {
    h1: 'ESTATE CLEANOUTS IN {CITY} — WE CLEAR THE WHOLE HOME IN A DAY',
    subhead: 'Compassionate, full-service estate cleanouts. Full crew, one truck, sorted and hauled. Licensed & insured, family-owned.',
    heroAlt: 'JEDI crew clearing a Pasadena estate — before and after a one-day cleanout',
    introLine: 'Estate cleanouts handled with respect — and finished in a day.',
    title: 'Estate Cleanouts {CITY} · JEDI Junk Removal',
    meta: 'Full-service estate cleanouts in {CITY}. Licensed, insured, family-owned. Whole-home cleared in a day. Call (866) 487-9059.',
    jobType: 'Estate',
  },
  'whole-house': {
    h1: 'WHOLE-HOUSE CLEANOUTS — FROM PACKED TO EMPTY IN ONE DAY',
    subhead: 'Every room, garage, and yard cleared by one crew. Upfront, by-the-load pricing. No hidden fees.',
    heroAlt: 'JEDI crew loading a fully cleared whole-house cleanout into the truck',
    introLine: 'Whole-house cleanout — one crew, one day, one upfront price.',
    title: 'Whole-House Cleanouts · JEDI Junk Removal',
    meta: 'Whole-house cleanouts cleared in a day. Upfront by-the-load pricing. Licensed, insured, family-owned. Call (866) 487-9059.',
    jobType: 'Whole house',
  },
  garage: {
    h1: 'GARAGE CLEANOUTS IN {CITY} — GET YOUR SPACE BACK',
    subhead: 'Years of clutter gone in an afternoon. We lift, load, and sweep up after. Same-day available.',
    heroAlt: 'JEDI crew clearing a packed two-car garage — before and after',
    introLine: 'Garage cleanouts — cluttered to clean in an afternoon.',
    title: 'Garage Cleanouts {CITY} · JEDI Junk Removal',
    meta: 'Garage cleanouts in {CITY}. Years of clutter gone in an afternoon. Same-day available. Call (866) 487-9059.',
    jobType: 'Garage',
  },
  property: {
    h1: 'PROPERTY CLEANOUTS — RENT-READY OR SALE-READY IN A DAY',
    subhead: 'Foreclosures, evictions, rental turnovers. One crew clears it all so you can list, lease, or close.',
    heroAlt: 'JEDI crew on a property turnover — entire rental cleared in a day',
    introLine: 'Property turnover — cleared, swept, listed-ready.',
    title: 'Property Cleanouts · JEDI Junk Removal',
    meta: 'Property cleanouts for foreclosures, evictions, rental turnovers. List-ready in a day. Licensed, insured. Call (866) 487-9059.',
    jobType: 'Property / foreclosure',
  },
  hoarder: {
    h1: 'HOARDER CLEANOUTS — DISCREET, JUDGMENT-FREE, DONE IN A DAY',
    subhead: 'Compassionate full-property clears. We handle the heavy, the hazardous, and the overwhelming.',
    heroAlt: 'JEDI crew handling a discreet, judgment-free hoarder cleanout',
    introLine: 'Hoarder cleanouts — handled with patience, finished in a day.',
    title: 'Hoarder Cleanouts · JEDI Junk Removal',
    meta: 'Discreet, judgment-free hoarder cleanouts. Full crew, one day. Licensed, insured. Call (866) 487-9059.',
    jobType: 'Hoarder',
  },
  'hot-tub': {
    h1: 'HOT TUB REMOVAL IN {CITY} — DEMO & HAUL, SAME WEEK',
    subhead: 'We cut it down, haul it out, and clean up the pad. No tools or dumpster needed on your end.',
    heroAlt: 'JEDI crew demoing and hauling out a backyard hot tub',
    introLine: 'Hot tub demo + haul — gone same week.',
    title: 'Hot Tub Removal {CITY} · JEDI Junk Removal',
    meta: 'Hot tub removal & demo in {CITY}. Same-week pickups. No tools or dumpster needed. Call (866) 487-9059.',
    jobType: 'Hot tub',
  },
  construction: {
    h1: 'CONSTRUCTION DEBRIS REMOVAL — BY THE LOAD, ON YOUR SCHEDULE',
    subhead: 'Drywall, lumber, concrete, fixtures. We clear the site so your crew keeps moving. Same-day pickups.',
    heroAlt: 'JEDI crew loading construction debris from a renovation site',
    introLine: 'Construction debris — cleared by the load, same day.',
    title: 'Construction Debris Removal · JEDI Junk Removal',
    meta: 'Same-day construction debris removal. Drywall, lumber, concrete. By-the-load pricing. Call (866) 487-9059.',
    jobType: 'Construction debris',
  },
  default: {
    h1: 'BIG-JOB CLEANOUTS IN {CITY} — ESTATE, WHOLE-HOME & MORE',
    subhead: "If you want it gone, it's gone. Full crew, one truck, one day. Licensed, insured, family-owned.",
    heroAlt: 'JEDI crew clearing a big-job cleanout — packed home before, empty after',
    introLine: 'Big-job cleanouts — handled in a day.',
    title: 'Cleanouts · JEDI Junk Removal',
    meta: 'Big-job cleanouts in the LA Area. Estate, whole-home, garage, property. Cleared in a day. Call (866) 487-9059.',
    jobType: '',
  },
};

function applyCity(str, city) {
  return String(str || '').replace(/\{CITY\}/g, city);
}

// ─── Sections ────────────────────────────────────────────────────────────────

function CleanoutHero({ variant, city }) {
  const h1 = applyCity(variant.h1, city);
  const subhead = applyCity(variant.subhead, city);
  return (
    <section className="clo-hero" id="top">
      <div className="clo-hero-inner">
        <div className="clo-hero-copy">
          <div className="clo-hero-eyebrow">
            <span className="clo-chip">★ #1 RATED · LICENSED &amp; INSURED · FAMILY-OWNED &amp; LOCALLY-OPERATED</span>
          </div>
          <h1 className="clo-h1">{h1}</h1>
          <p className="clo-subhead">{subhead}</p>
          <p className="clo-hero-tagline">We use the power of the FORCE to remove all of your junk!</p>
          <div className="clo-hero-ctas">
            <a href="#form" className="clo-btn clo-btn-primary">GET MY FREE ESTIMATE</a>
            <a
              href={CALL_HREF}
              className="clo-btn clo-btn-secondary"
              onClick={() => {
                try {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: 'call_click', placement: 'hero' });
                } catch (_e) {}
              }}
            >
              <span aria-hidden="true">📞</span>
              <span>CALL {PHONE}</span>
            </a>
          </div>
          <div className="clo-hero-badge">
            $20 off when you book online
          </div>
        </div>
        <div className="clo-hero-photo">
          {/* Swap src for a real before/after of a large haul when available. */}
          <img
            src="/assets/garage-before.png"
            alt={variant.heroAlt}
            className="clo-hero-img"
            loading="eager"
          />
          <div className="clo-hero-photo-label">BEFORE → AFTER · Real JEDI Job</div>
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const items = [
    { icon: '🚚', text: 'Full crew, one truck, one day' },
    { icon: '💵', text: 'Upfront by-the-load pricing — no hidden fees' },
    { icon: '🛡', text: 'Licensed & insured · Family-owned' },
    { icon: '⚡', text: 'Same-day / next-day available' },
  ];
  return (
    <section className="clo-value">
      <div className="clo-value-inner">
        {items.map((it) => (
          <div key={it.text} className="clo-value-item">
            <span className="clo-value-icon" aria-hidden="true">{it.icon}</span>
            <span className="clo-value-text">{it.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormSection({ variant, introLine }) {
  return (
    <section className="clo-formsec" id="form">
      <div className="clo-formsec-inner">
        <div className="clo-formsec-head">
          <div className="clo-eyebrow">TELL US ABOUT THE JOB</div>
          <h2 className="clo-h2">{introLine}</h2>
          <p className="clo-formsec-sub">
            Two quick questions, then your contact info. We'll text you back with an upfront price.
          </p>
        </div>
        <CleanoutForm defaultJobType={variant.jobType} />
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', t: 'TELL US WHAT\'S THERE', d: 'Pick what needs clearing and roughly how much. A photo helps — but a sentence is fine.' },
  { n: '02', t: 'WE GIVE AN UPFRONT PRICE', d: 'Flat by-the-load quote — no hourly meter, no hidden fees. You say yes, we book the window.' },
  { n: '03', t: 'WE HAUL IT, SWEEP UP, DONE', d: "Full crew, one truck. We carry everything out, sort what we can recycle, sweep the floor on the way." },
];

function HowItWorks() {
  return (
    <section className="clo-steps">
      <div className="clo-steps-inner">
        <div className="clo-section-head">
          <div className="clo-eyebrow">HOW IT WORKS</div>
          <h2 className="clo-h2">THREE STEPS<span className="clo-green">.</span></h2>
        </div>
        <div className="clo-steps-grid">
          {STEPS.map((s) => (
            <div key={s.n} className="clo-step-card">
              <div className="clo-step-num">{s.n}</div>
              <div className="clo-step-title">{s.t}</div>
              <div className="clo-step-desc">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="clo-proof">
      <div className="clo-proof-inner">
        <div className="clo-section-head">
          <div className="clo-eyebrow">REVIEWS</div>
          <h2 className="clo-h2">#1 RATED FOR <span className="clo-green">BIG-JOB CLEANOUTS</span></h2>
          <div className="clo-stars" aria-label="5 out of 5 stars">★★★★★</div>
        </div>
        <div className="clo-badges">
          {REVIEW_BADGES.map((b) => (
            <div className="clo-badge" key={b}>
              <div className="clo-badge-name">{b}</div>
              <div className="clo-badge-score">5.0 ★</div>
            </div>
          ))}
        </div>
        <div className="clo-testimonials">
          {TESTIMONIALS.map((t) => (
            <blockquote className="clo-testimonial" key={t.headline}>
              <div className="clo-test-headline">{t.headline}</div>
              <p>{t.quote}</p>
              <footer>
                <span className="clo-test-name">— Verified JEDI customer</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEW_BADGES = ['Google', 'Yelp', 'Thumbtack', 'Facebook'];

const TESTIMONIALS = [
  {
    headline: 'Got the job done in 30 minutes!',
    quote:
      "I booked them around 6 PM the day before… they arrived on time, were super friendly, gave me clear pricing, knocked out the garage in about 30 minutes and were on their way.",
  },
  {
    headline: 'Jedi was a lifesaver!',
    quote:
      "They gave us same-day service during a hectic move and even accommodated a time change. Very nice and helpful. I highly recommend them for junk/household removal.",
  },
  {
    headline: 'Nice and professional!',
    quote:
      "I needed a lot of cardboard removed after a move. They came the day after I called, were professional, and gave me a price before removing anything. Such a big help.",
  },
];

const REGIONS = [
  { name: 'Los Angeles', cities: 'Pasadena · Beverly Hills · Long Beach · Burbank · West LA · Eagle Rock' },
  { name: 'San Fernando Valley', cities: 'Woodland Hills · Encino · Studio City · Northridge · Van Nuys · Tarzana' },
  { name: 'Orange County', cities: 'Irvine · Anaheim · Newport Beach · Santa Ana · Costa Mesa · Huntington Beach' },
  { name: 'Ventura County', cities: 'Thousand Oaks · Ventura · Oxnard · Camarillo · Simi Valley · Westlake Village' },
];

function ServiceArea() {
  return (
    <section className="clo-area">
      <div className="clo-area-inner">
        <div className="clo-section-head">
          <div className="clo-eyebrow">SERVICE AREA</div>
          <h2 className="clo-h2">FOUR COUNTIES<span className="clo-green">. ONE CREW.</span></h2>
        </div>
        <div className="clo-area-grid">
          {REGIONS.map((r) => (
            <div key={r.name} className="clo-area-card">
              <div className="clo-area-name">{r.name}</div>
              <div className="clo-area-cities">{r.cities}</div>
            </div>
          ))}
        </div>
        <p className="clo-area-foot">+ surrounding cities. Call to confirm availability for your ZIP.</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="clo-finalcta">
      <div className="clo-finalcta-inner">
        <h2 className="clo-h2">
          IF YOU WANT IT GONE, <span className="clo-green">IT'S GONE.</span>
        </h2>
        <p className="clo-finalcta-sub">
          Same-day / next-day windows available. Call now — or scroll up for a free upfront estimate.
        </p>
        <div className="clo-finalcta-ctas">
          <a
            href={CALL_HREF}
            className="clo-btn clo-btn-primary"
            onClick={() => {
              try {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'call_click', placement: 'final_cta' });
              } catch (_e) {}
            }}
          >
            <span aria-hidden="true">📞</span>
            <span>CALL {PHONE}</span>
          </a>
          <a href="#form" className="clo-btn clo-btn-ghost">GET A FREE ESTIMATE</a>
        </div>
        <div className="clo-finalcta-sms">
          <a href={SMS_HREF}>Or text us — we reply in 5 min</a>
        </div>
      </div>
    </section>
  );
}

// ─── Page wrapper ────────────────────────────────────────────────────────────

const CLEANOUT_SERVICE_LINKS = [
  { label: 'Estate cleanouts', href: '/cleanouts?job=estate' },
  { label: 'Whole-house cleanouts', href: '/cleanouts?job=whole-house' },
  { label: 'Garage cleanouts', href: '/cleanouts?job=garage' },
  { label: 'Property cleanouts', href: '/cleanouts?job=property' },
  { label: 'Hot tub removal', href: '/cleanouts?job=hot-tub' },
  { label: 'Same-day removal', href: '/same-day' },
];

function setMetaContent(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function CleanoutPage() {
  const [params] = useSearchParams();
  const jobKey = (params.get('job') || '').toLowerCase().trim();
  const cityParam = (params.get('city') || '').trim();
  const city = cityParam || 'the LA Area';

  const variant = useMemo(() => VARIANTS[jobKey] || VARIANTS.default, [jobKey]);

  useEffect(() => {
    document.title = applyCity(variant.title, city);
    setMetaContent('description', applyCity(variant.meta, city));
    setMetaContent('robots', 'noindex'); // Paid LP — keep out of organic index
  }, [variant, city]);

  const introLine = applyCity(variant.introLine, city);

  return (
    <div className="clo-page">
      <Topbar />
      <CleanoutHero variant={variant} city={city.toUpperCase()} />
      <ValueStrip />
      <FormSection variant={variant} introLine={introLine} />
      <HowItWorks />
      <Proof />
      <ServiceArea />
      <FinalCTA />
      <Footer serviceLinks={CLEANOUT_SERVICE_LINKS} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="GET ESTIMATE"
        smallText="★ FREE QUOTE · SAME-DAY"
        callLabel="CALL"
        href="#form"
      />
    </div>
  );
}
