import { Fragment, useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import SmartImg from '../components/SmartImg';
import AfterPhoto from '../components/AfterPhoto';
import BookingForm from '../components/BookingForm';
import { PHONE, PHONE_HREF } from '../components/constants';
import { MEDIA, FALLBACK } from './media';

const M = MEDIA.mattress;

function MattressHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ $20 OFF — BOOK ONLINE</span>
          </div>
          <h1>
            <span className="line">OLD MATTRESS.</span>
            <span className="line">GONE</span>
            <span className="line green">TODAY.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">We don't just dump it</span> — 80–90% recycled, donated when possible.
          </p>
          <p className="hero-lede">
            Twin, full, queen, king — any size, any floor. We haul the mattress,
            box spring, and frame in one trip. Same-day and next-day across LA,
            Ventura, and Orange County.
          </p>
          <div className="hero-stickers" id="pricing">
            <span className="hero-sticker price">From $150 · single mattress</span>
            <span className="hero-sticker price">Flat by the load · no hourly meter</span>
          </div>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span><span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">GET A QUOTE</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>#1 Rated</span>
            <span><span className="star">✦</span>Licensed &amp; Insured</span>
            <span><span className="star">✦</span>Same-Day Available</span>
            <span><span className="star">✦</span>Eco-Friendly</span>
          </div>
        </div>
        <div className="hero-photo">
          <SmartImg
            className="hero-img-single"
            src={M.hero}
            fallback={FALLBACK.photo}
            alt="JEDI crew loading an old mattress and furniture into the truck"
          />
        </div>
      </div>
    </section>
  );
}

const STRIP_ITEMS = ['#1 RATED', 'LICENSED & INSURED', 'SAME / NEXT DAY', 'ECO-FRIENDLY', 'UPFRONT PRICING'];

function MattressTrustStrip() {
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

const MATTRESS_ITEMS = [
  'Twin mattresses',
  'Full / double mattresses',
  'Queen mattresses',
  'King mattresses',
  'California king mattresses',
  'Box springs',
  'Mattress + frame sets',
  'Bunk bed mattresses',
  'Futon mattresses',
  'Sofa bed mattresses',
  'Foam / memory foam',
  'Hotel & commercial surplus',
];

function MattressItems() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE HAUL</div>
        <h2>ANY SIZE.<br /><span className="green">ANY FLOOR.</span></h2>
        <p>Ground floor, third-floor walk-up, tight staircase — our crew handles the heavy lifting. One flat price, no surprises.</p>
      </div>
      <div className="items-grid">
        {MATTRESS_ITEMS.map(label => (
          <div className="item-tile" key={label}>
            <span className="bullet" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="items-foot wrap">Have a whole bedroom set? Call — we'll quote it all at once.</p>
    </section>
  );
}

const MATTRESS_STEPS = [
  {
    n: '01',
    t: 'CALL OR BOOK',
    d: "Tell us the size and where it is — bedroom, hallway, curbside. We'll quote it flat and lock in your window.",
  },
  {
    n: '02',
    t: 'WE HAUL IT OUT',
    d: 'Our two-person crew carries it from any floor, disassembles bed frames if needed, and loads everything in one trip.',
  },
  {
    n: '03',
    t: 'RESPONSIBLY GONE',
    d: 'Clean mattresses go to donation partners first. The rest are recycled — springs, foam, fabric — kept out of the landfill.',
  },
];

function MattressSteps() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>CALL. WE HAUL. DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {MATTRESS_STEPS.map(s => (
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

const ECO_CARDS = [
  {
    icon: '🫶',
    label: 'DONATED',
    headline: 'Clean & gently used',
    body: "Mattresses in good condition go to local shelters and donation centers — not the dump. We'll flag yours if it qualifies.",
  },
  {
    icon: '♻️',
    label: 'RECYCLED',
    headline: 'Springs, foam & fabric',
    body: 'Most mattresses are 80–90% recyclable. We work with certified recyclers to break them down and divert from landfill.',
  },
  {
    icon: '🗑️',
    label: 'LAST RESORT',
    headline: 'Responsible disposal',
    body: 'When donation and recycling aren\'t options, we use licensed disposal facilities — never illegal dumping.',
  },
];

function EcoSection() {
  return (
    <section className="eco section-tight" id="where-it-goes">
      <div className="eco-inner wrap">
        <div className="eco-head">
          <div className="eyebrow">WHERE YOUR MATTRESS GOES</div>
          <h2>WE DON'T JUST <span className="green">DUMP IT.</span></h2>
          <p className="eco-sub">Most junk haulers throw everything in a landfill. We sort for donation and recycling on every job.</p>
        </div>
        <div className="eco-grid">
          {ECO_CARDS.map(c => (
            <div className="eco-card" key={c.label}>
              <div className="eco-icon" aria-hidden="true">{c.icon}</div>
              <div className="eco-badge">{c.label}</div>
              <div className="eco-card-h">{c.headline}</div>
              <div className="eco-card-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MATTRESS_CITIES = [
  'Los Angeles', 'Sherman Oaks', 'Pasadena', 'Long Beach', 'Burbank',
  'Thousand Oaks', 'Ventura', 'Oxnard', 'Anaheim', 'Irvine', 'Santa Ana',
];

function MattressCoverage() {
  return (
    <section className="items cities section" id="coverage">
      <div className="items-head wrap">
        <div className="eyebrow">WHERE WE PICK UP</div>
        <h2>SAME-DAY ACROSS<br /><span className="green">3 COUNTIES.</span></h2>
        <p>Mattress pickup across LA, Ventura, and Orange County — same-day in core cities, next-day in surrounding areas.</p>
      </div>
      <ul className="city-list cities-pills">
        {MATTRESS_CITIES.map(c => (
          <li className="city-pill" key={c}>{c}</li>
        ))}
      </ul>
      <p className="city-foot cities-foot">Don't see your city? Call — we likely cover it.</p>
    </section>
  );
}

const MATTRESS_REVIEWS = [
  {
    quote: "Moving out and had three old mattresses to deal with. Called at 8am, guys showed up by noon. Carried a king down a narrow staircase without a scratch on the wall. Charged exactly what they quoted.",
    name: 'Patricia L.',
    source: 'Google · Mattress Removal · Encino',
  },
  {
    quote: "Replaced our guest room mattress and couldn't get the old one to the curb. JEDI came the same day, took the mattress and box spring, even hauled the old frame. Done in 20 minutes.",
    name: 'Kevin D.',
    source: 'Yelp · Same-Day Pickup · Thousand Oaks',
  },
  {
    quote: "Clearing out my late mother's house. They took four mattresses and treated the whole job with respect. Told me which ones were going to donation. That mattered to me.",
    name: 'Sandra M.',
    source: 'Thumbtack · Estate Cleanout · Pasadena',
  },
];

function MattressReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">WHAT CUSTOMERS SAY</div>
        <h2>HAULED WITH <span style={{ color: 'var(--jedi-green)' }}>CARE.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {MATTRESS_REVIEWS.map((r, i) => (
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

const MATTRESS_FAQS = [
  {
    q: 'How much does mattress removal cost?',
    a: "Mattress removal starts at our $150 minimum, priced flat by the load — no hourly surprises. Add a box spring, frame, or extra items and we fold it all into one flat quote. Call or book online for an exact number.",
  },
  {
    q: 'Can you haul from upstairs or a tight staircase?',
    a: "Yes, and we do it every day. Our two-person crew is trained for awkward hallways, spiral staircases, and narrow doorways. Tell us the situation when you book and we come prepared.",
  },
  {
    q: 'Can my mattress be donated instead of trashed?',
    a: "If it's in clean condition — no major stains, tears, or odors — we'll route it to a donation partner. We check on site and let you know. We can't guarantee acceptance for every mattress, but we always try first.",
  },
  {
    q: 'Do you take the box spring and bed frame too?',
    a: "Yes. We'll haul the mattress, box spring, and metal or wooden frame all in one trip. Just let us know when you book so we bring the right crew and tools.",
  },
  {
    q: 'Do I need to bag or wrap the mattress first?',
    a: "No. You don't need to do anything — just have it accessible. If it's still in the bedroom, we carry it out. A mattress bag is fine if you have one, but not required.",
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

function MattressFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS.</h2>
      </div>
      <div className="faq-list">
        {MATTRESS_FAQS.map((f, i) => (
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

function MattressFinalCTA() {
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>READY TO <span className="green">HAUL IT?</span></h2>
        <p className="sub">
          Call us now or book online. Same-day windows available — call before noon for best availability.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="or">OR BOOK YOUR PICKUP ONLINE — $20 OFF</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR PICKUP</h3>
              <p>Pick a window. We'll text to confirm and show up ready to haul.</p>
            </div>
            <span className="booking-badge">★ $20 OFF APPLIED</span>
          </div>
          <BookingForm defaultService="Mattress removal" />
        </div>
      </div>
    </section>
  );
}

const MATTRESS_SERVICE_LINKS = [
  { label: 'Mattress removal', href: '/mattress-removal' },
  { label: 'Same-day removal', href: '/same-day' },
  { label: 'Estate cleanouts', href: '/cleanouts' },
  { label: 'Property managers', href: '/same-day' },
];

export default function MattressPage() {
  useEffect(() => {
    document.title = 'Old Mattress Removal · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <MattressHero />
      <MattressTrustStrip />
      <MattressItems />
      <MattressSteps />
      <AfterPhoto
        src={M.photo}
        fallback={FALLBACK.photo}
        alt="An empty, sunlit room after JEDI hauled the old mattress away"
        eyebrow="★ SPACE RECLAIMED"
        headline={<>GONE.<br /><span className="yellow">ROOM'S YOURS.</span></>}
        sub="We carry the old mattress out — down the stairs, through the hallway, all of it. You get the room back without lifting a thing."
      />
      <EcoSection />
      <MattressCoverage />
      <MattressReviews />
      <MattressFAQ />
      <MattressFinalCTA />
      <Footer serviceLinks={MATTRESS_SERVICE_LINKS} />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar
        quoteLabel="BOOK PICKUP"
        smallText="★ SAME-DAY · FROM $75"
        callLabel="CALL NOW"
      />
    </>
  );
}
