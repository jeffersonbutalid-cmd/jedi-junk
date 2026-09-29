/**
 * /ventura : Ventura County general junk removal landing page (Google Ads campaign 23749597810,
 * ad group "Ventura Junk Removal"). Same section order and class names as /los-angeles and
 * /orange-county; only copy, city list, images and the local-crew section differ.
 *
 * Tracking: nothing to add. Analytics.jsx pushes page_view_spa on route change, phone_click on
 * any tel: link, book_click on any href="#quote" and booking_complete on /booking-thank-you or a
 * Workiz postMessage. Keep every call link a tel: link and every booking CTA href="#quote".
 */
import { Fragment, useState, useEffect, useMemo } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';
import PricingStrip from '../components/PricingStrip';
import BeforeAfter from '../components/BeforeAfter';
import SmartImg from '../components/SmartImg';
import { PHONE, PHONE_HREF, ADDRESS, WORKIZ_URL } from '../components/constants';
import { buildWorkizUrl } from '../lib/tracking';
import { MEDIA, FALLBACK } from './media';

function setMetaContent(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/* ------------------------------------------------------------------ */
/* Page constants                                                      */
/* ------------------------------------------------------------------ */
const IMG = MEDIA.ventura;
const SMS_VENTURA =
  "sms:+18664879059?&body=Hi%20JEDI%2C%20I%20need%20a%20junk%20removal%20quote%20in%20Ventura%20County.";

const META = {
  title: "Ventura County Junk Removal · JEDI Junk Removal",
  description:
    "Family-owned junk removal based in Thousand Oaks. Same-day or next-day pickup in Ventura County. Upfront pricing, licensed and insured. $20 off online.",
  canonical: "https://lp.jedijunkremoval.com/ventura",
};

const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://lp.jedijunkremoval.com/ventura#business",
  name: "JEDI Junk Removal",
  description:
    "Family-owned junk removal and demolition crew headquartered in Thousand Oaks, serving all of Ventura County with same-day or next-day pickup and upfront pricing.",
  slogan: "If you want it gone, it's gone.",
  url: "https://lp.jedijunkremoval.com/ventura",
  telephone: "+1-866-487-9059",
  image: "https://lp.jedijunkremoval.com/assets/jedi-truck-real.jpg", // new asset, ship it with this route
  logo: "https://lp.jedijunkremoval.com/assets/logo-horizontal.jpg",
  priceRange: "From $150",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, E-Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "275 E. Hillcrest Dr., Suite 160-205",
    addressLocality: "Thousand Oaks",
    addressRegion: "CA",
    postalCode: "91360",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Ventura County, CA" },
    ...[
      "Ventura", "Oxnard", "Camarillo", "Thousand Oaks", "Simi Valley", "Moorpark",
      "Newbury Park", "Westlake Village", "Oak Park", "Santa Paula", "Port Hueneme",
      "Ojai", "Fillmore",
    ].map((name) => ({ "@type": "City", name: `${name}, CA` })),
    // Outside Ventura County but inside the campaign's location targeting (see ALSO_COVER).
    ...["Agoura Hills", "Calabasas", "Malibu"].map((name) => ({ "@type": "City", name: `${name}, CA` })),
    { "@type": "Place", name: "West San Fernando Valley, Los Angeles, CA" },
  ],
  knowsAbout: [
    "Junk removal", "Garage cleanouts", "Estate cleanouts", "Foreclosure cleanouts",
    "Hoarder cleanouts", "Construction debris removal", "Deck demolition",
    "Shed removal", "Fence removal", "Hot tub removal", "Yard debris removal",
  ],
  sameAs: ["https://www.jedijunkremoval.com/"],
};

/* Pricing: same numbers as /los-angeles and /orange-county. Single-item wording
   removed on purpose (mattress, couch and appliance ads were cut on 17 Sep 2026). */
const PRICE_TIERS = [
  { label: "SMALL LOAD", price: "from $150", sub: "Our minimum · a few items or a small pile" },
  { label: "GARAGE CLEANOUT", price: "$350 to $750", sub: "Typical Ventura County garage" },
  { label: "WHOLE PROPERTY", price: "$1,200+", sub: "Estate · move-out · multi-truck" },
];

const TRUST_STRIP = ["SAME-DAY OR NEXT-DAY", "LICENSED & INSURED", "FAMILY-OWNED", "UPFRONT PRICING", "$20 OFF ONLINE"];

const CITIES = [
  "Thousand Oaks", "Newbury Park", "Westlake Village", "Oak Park", "Simi Valley",
  "Moorpark", "Camarillo", "Oxnard", "Ventura", "Port Hueneme", "Santa Paula",
  "Ojai", "Fillmore",
];

/* Places outside Ventura County that the Ventura campaign's location targeting covers. */
const ALSO_COVER =
  "We also cover Agoura Hills, Calabasas, Malibu and the west San Fernando Valley, including Woodland Hills, Chatsworth, Northridge, Granada Hills, Porter Ranch, Canoga Park, Winnetka, Reseda and Tarzana.";

const STEPS = [
  { n: "01", t: "CALL, TEXT OR BOOK", d: "Tell us what's going, or text a photo. You get an upfront price before anything is booked." },
  { n: "02", t: "WE SHOW UP READY", d: "Same day or next day. The crew brings the truck, the gloves and the muscle." },
  { n: "03", t: "IT'S GONE", d: "You point, we lift, load and sweep up. You pay the price we quoted." },
];

const WHAT_WE_TAKE = [
  "Garage, attic & storage cleanouts",
  "Estate & whole-house cleanouts",
  "Foreclosure & hoarder cleanouts",
  "Construction debris",
  "Deck demolition",
  "Hot tubs & playsets",
  "Sheds & fences",
  "Yard debris",
  "Furniture",
  "Office & commercial cleanouts",
  "Electronics recycling",
  "Cardboard recycling",
];

const LOCAL_BENEFITS = [
  "Headquartered in Thousand Oaks, family-owned",
  "Same-day or next-day pickup across Ventura County",
  "Upfront price before we lift anything",
  "Licensed and insured",
  "Junk removal and demolition from one crew",
];

const HOURS = [
  { day: "Every day", time: "6 AM to 7 PM" },
  { day: "Pickup", time: "Same day or next day" },
  { day: "Payment", time: "Cash, card, e-transfer" },
];

/* Real customer reviews already published on the live "/" page, attributed there
   as "Verified JEDI customer". Do NOT invent names or tag them to Ventura cities.
   Swap in Ventura-tagged Google reviews (real names as posted) when Bryan sends them. */
const REVIEWS = [
  {
    headline: "Got the job done in 30 minutes!",
    quote: "I booked them around 6 PM the day before… they arrived on time, were super friendly, gave me clear pricing, knocked out the garage in about 30 minutes and were on their way.",
  },
  {
    headline: "Jedi was a lifesaver!",
    quote: "They gave us same-day service during a hectic move and even accommodated a time change. Very nice and helpful. I highly recommend them for junk/household removal.",
  },
  {
    headline: "Nice and professional!",
    quote: "I needed a lot of cardboard removed after a move. They came the day after I called, were professional, and gave me a price before removing anything. Such a big help.",
  },
];

const FAQS = [
  {
    q: "Do you offer same-day junk removal in Ventura County?",
    a: `Yes, most days. We run same-day and next-day pickups across Ventura County. Call ${PHONE} to check today's openings, or book online and save $20.`,
  },
  {
    q: "Are you actually local?",
    a: "Yes. JEDI Junk Removal is family-owned and headquartered in Thousand Oaks. Ventura County is home base.",
  },
  {
    q: "How much does junk removal cost in Ventura County?",
    a: "Pricing is by volume, starting at $150. A typical garage cleanout runs $350 to $750, and whole-property cleanouts start at $1,200. You get an upfront price before we start, and booking online takes $20 off.",
  },
  {
    q: "Do you handle demolition and big cleanouts?",
    a: "Yes. We're a junk removal and demolition crew, so we take on deck demolition, shed and fence removal, hot tub removal, construction debris, and full estate, foreclosure and hoarder cleanouts.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous materials like chemicals, liquid paint, motor oil and asbestos. If you're not sure about an item, text us a photo and we'll tell you straight.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. JEDI Junk Removal is licensed and insured. If your property manager or HOA needs proof of insurance, ask when you book.",
  },
];

const SERVICE_LINKS = [
  { label: "Same-day removal", href: "/same-day" },
  { label: "Cleanouts", href: "/cleanouts" },
  { label: "Estate cleanouts", href: "/cleanouts?job=estate" },
  { label: "Junk hauling", href: "/junk-hauling" },
];
const FOOTER_TAGLINE =
  "Family-owned junk removal headquartered in Thousand Oaks, serving Ventura County, LA, the San Fernando Valley, and Orange County.";
/* The shared footer prints "#1 Rated" and "$2M Insured" and a dashed hours line on every route.
   /ventura overrides both until the client proves the claims (then the defaults can change site-wide). */
const FOOTER_HOURS = "Open Daily · 6 AM to 7 PM";
const FOOTER_TRUST_LINE = "Licensed & Insured · Family-Owned & Locally-Operated";

/* ------------------------------------------------------------------ */
/* Sections (same markup and class names as the LA / OC components)    */
/* ------------------------------------------------------------------ */
function VenturaHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="chip">★ HOMETOWN CREW · THOUSAND OAKS HQ</span>
          </div>
          <h1>
            <span className="line">VENTURA COUNTY</span>
            <span className="line">JUNK REMOVAL.</span>
            <span className="line green">FROM $150.</span>
          </h1>
          <p className="hero-subhead">
            <span className="green">One upfront price.</span> No hourly clock. No surprise fees.
          </p>
          <p className="hero-lede">
            From <b>Thousand Oaks to Oxnard, Simi Valley to Ojai</b>, our family-owned crew clears
            garages, whole homes and construction debris across Ventura County. Same-day or next-day pickup.
          </p>
          <div className="hero-ctas">
            <a href={PHONE_HREF} className="btn btn-primary">
              <span>📞</span>
              <span>CALL {PHONE}</span>
            </a>
            <a href="#quote" className="btn btn-ghost">BOOK ONLINE · SAVE $20</a>
          </div>
          <div className="hero-cta-reason">
            <span className="green">★</span> Same-day or next-day · Call for a quote in minutes, or{" "}
            <a href={SMS_VENTURA} className="hero-sms-link">text us a photo</a>
          </div>
          <div className="trust-row">
            <span><span className="star">✦</span>Thousand Oaks HQ</span>
            <span><span className="star">✦</span>Licensed &amp; Insured</span>
            <span><span className="star">✦</span>Family-Owned</span>
            <span><span className="star">✦</span>$20 Off Online</span>
          </div>
        </div>
        <div className="hero-photo">
          <BeforeAfter
            beforeSrc={IMG.before}
            afterSrc={IMG.after}
            beforeFallback={FALLBACK.before}
            afterFallback={FALLBACK.after}
            beforeAlt="Cluttered garage before a JEDI junk removal job"
            afterAlt="The same garage cleared and swept after JEDI hauled it away"
            initialPos={55}
          />
        </div>
      </div>
    </section>
  );
}

function VenturaTrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-strip-inner">
        {TRUST_STRIP.map((item, i) => (
          <Fragment key={item}>
            <span className="item">{item}</span>
            {i < TRUST_STRIP.length - 1 && <span className="star">✦</span>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function VenturaCoverage() {
  return (
    <section className="items cities section" id="coverage">
      <div className="items-head wrap">
        <div className="eyebrow">COVERAGE</div>
        <h2>JUNK REMOVAL ACROSS<br /><span className="green">VENTURA COUNTY.</span></h2>
        <p>We're based in Thousand Oaks, so Ventura County is home turf. Same-day or next-day pickup in every city below.</p>
      </div>
      <ul className="city-list cities-pills">
        {CITIES.map((c) => <li className="city-pill" key={c}>{c}</li>)}
      </ul>
      <p className="city-foot cities-foot cities-also">{ALSO_COVER}</p>
      <p className="city-foot cities-foot">
        Don't see your neighborhood? Call and we'll confirm same-day or next-day availability for your ZIP.
      </p>
    </section>
  );
}

function VenturaSteps() {
  return (
    <section className="steps section">
      <div className="steps-head wrap">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>POINT<span className="dot">.</span> WE HAUL<span className="dot">.</span> DONE<span className="dot">.</span></h2>
      </div>
      <div className="steps-grid">
        {STEPS.map((s) => (
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

function VenturaWhatWeTake() {
  return (
    <section className="items section" id="what-we-take">
      <div className="items-head wrap">
        <div className="eyebrow">WHAT WE TAKE</div>
        <h2>IF YOU WANT IT GONE,<br /><span className="green">IT'S GONE.</span></h2>
      </div>
      <div className="items-grid">
        {WHAT_WE_TAKE.map((t) => (
          <div className="item-tile" key={t}>
            <span className="bullet" aria-hidden="true" />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <p className="items-foot wrap">Not sure it qualifies? Call and ask. We'll tell you straight.</p>
    </section>
  );
}

function VenturaTruckPhoto() {
  return (
    <section className="truckphoto">
      <SmartImg className="tp-img" src={IMG.photo} fallback={FALLBACK.photo}
        alt="JEDI Junk Removal truck and family-owned crew" />
      <div className="tp-scrim" aria-hidden="true" />
      <div className="tp-eyebrow"><span className="chip">★ VENTURA COUNTY CREW · FAMILY-OWNED</span></div>
      <div className="tp-caption">
        <span className="tp-line">YOUR HOMETOWN</span>
        <span className="tp-line yellow">VENTURA CREW.</span>
      </div>
    </section>
  );
}

/* OC layout (benefits left, hours card right). Ventura is HQ, so the address card is proof. */
function VenturaLocalCrew() {
  return (
    <section className="exec section" id="local-crew">
      <div className="exec-grid">
        <div>
          <div className="exec-eyebrow">LOCAL TO VENTURA COUNTY</div>
          <div className="exec-h">WE'RE <span className="green">FROM HERE.</span></div>
          <p className="exec-sub">
            JEDI Junk Removal is a family-owned junk removal and demolition crew headquartered in
            Thousand Oaks. Ventura County is home, so same-day and next-day pickups here are routine.
            We use the power of the FORCE to remove all of your junk. The rest is hard work.
          </p>
          <ul className="benefits">
            {LOCAL_BENEFITS.map((b) => (
              <li className="benefit" key={b}>
                <span className="check" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="hours-card">
            <div className="exec-eyebrow">HOURS &amp; CONTACT</div>
            <div className="exec-h">CALL US <span className="green">TODAY.</span></div>
            <a href={PHONE_HREF} className="hours-phone">
              <span className="tap">Tap to call</span>
              <span className="num">{PHONE}</span>
            </a>
            <ul className="hours-list">
              {HOURS.map((h) => (
                <li key={h.day}><span className="day">{h.day}</span><span className="time">{h.time}</span></li>
              ))}
            </ul>
            <div className="hours-addr">
              JEDI Junk Removal · Serving all of Ventura County<br />HQ: {ADDRESS}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VenturaReviews() {
  return (
    <section className="reviews section" id="reviews">
      <div className="reviews-head">
        <div className="eyebrow">VERIFIED JEDI CUSTOMERS</div>
        <h2>STRAIGHT FROM <span style={{ color: "var(--jedi-green)" }}>OUR CUSTOMERS.</span></h2>
        <div className="reviews-stars">★★★★★</div>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">★★★★★</div>
            <div className="review-quote">"{r.quote}"</div>
            <div className="review-meta">
              <div className="review-name">{r.headline}</div>
              <div className="review-source">Verified JEDI customer</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-toggle" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: open ? "600px" : "0px" }}>
        <div className="faq-a">{a}</div>
      </div>
    </div>
  );
}

function VenturaFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS, VENTURA.</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </section>
  );
}

function VenturaFinalCta() {
  const [loaded, setLoaded] = useState(false);
  const src = useMemo(() => buildWorkizUrl(WORKIZ_URL), []);
  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner" style={{ maxWidth: 960 }}>
        <h2>READY TO <span className="green">GET IT GONE?</span></h2>
        <p className="sub">
          <span className="green">Same-day or next-day pickup across Ventura County.</span> One upfront price. Book online and save $20.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span>
          <span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms"><a href={SMS_VENTURA}>Or text us a photo for an upfront quote</a></div>
        <div className="or">OR BOOK YOUR VENTURA COUNTY PICKUP ONLINE</div>
        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK YOUR VENTURA COUNTY PICKUP</h3>
              <p>Pick a window. Tell us what's going. We confirm by text.</p>
            </div>
            <span className="booking-badge">★ $20 OFF WHEN YOU BOOK ONLINE</span>
          </div>
          <div className="iframe-wrap">
            <div className={"iframe-loading" + (loaded ? " hidden" : "")}>
              <div className="spinner" aria-hidden="true" />
              <div>Loading secure booking…</div>
            </div>
            <iframe
              src={src}
              title="JEDI Junk Removal: book a Ventura County pickup"
              loading="lazy"
              allow="payment; geolocation; clipboard-write"
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="booking-foot">
            Trouble with the form?{" "}
            <a href={PHONE_HREF} className="phone-fallback">Call {PHONE}</a> · or{" "}
            <a href={SMS_VENTURA} className="phone-fallback">text a photo</a> for an upfront quote.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Route component                                                     */
/* ------------------------------------------------------------------ */
export default function VenturaPage() {
  useEffect(() => {
    document.title = META.title;
    setMetaContent("description", META.description);
    setMetaContent("robots", "index,follow"); // "/" sets noindex via the same helper and never clears it

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = META.canonical;
    document.head.appendChild(canonical);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "ld-ventura-localbusiness";
    ld.textContent = JSON.stringify(LOCAL_BUSINESS_LD);
    document.head.appendChild(ld);

    return () => {
      canonical.remove();
      ld.remove();
    };
  }, []);

  return (
    <>
      <Topbar />
      <VenturaHero />
      <VenturaTrustStrip />
      <PricingStrip
        eyebrow="WHAT IT COSTS IN VENTURA COUNTY"
        heading={<>FLAT PRICE. <span className="green">FROM $150.</span></>}
        intro="Volume-based pricing. You pay for the space your junk takes in the truck. Text us a photo and we'll give you the exact price before we roll."
        tiers={PRICE_TIERS}
        ctaLabel="GET MY UPFRONT QUOTE"
        note="Labor, loading, hauling and disposal included · Book online and save $20"
      />
      <VenturaCoverage />
      <VenturaSteps />
      <VenturaWhatWeTake />
      <VenturaTruckPhoto />
      <VenturaLocalCrew />
      <VenturaReviews />
      <VenturaFaq />
      <VenturaFinalCta />
      <Footer
        serviceLinks={SERVICE_LINKS}
        tagline={FOOTER_TAGLINE}
        hours={FOOTER_HOURS}
        trustLine={FOOTER_TRUST_LINE}
      />
      <div className="mobile-spacer" aria-hidden="true" />
      <MobileBottomBar quoteLabel="BOOK ONLINE" smallText="★ $20 OFF · FROM $150" callLabel="CALL NOW" href="#quote" />
    </>
  );
}
