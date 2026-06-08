import { useState } from 'react';

const FAQS = [
  {
    q: 'How long does a full cleanout take?',
    a: 'Most single-family homes are one day with our standard two-person crew. Larger estates or hoarder properties may run two to three days. We give you a realistic timeline along with the quote — and we stick to it.',
  },
  {
    q: 'Do you handle hoarder cleanouts?',
    a: "Yes, regularly. We bring extra PPE, an extended crew, and we move at your pace. No judgement — we've seen everything, and our job is to make the property safe and clear, not to make you feel bad about the path it took to get there. Families often want to be on site for the first hour and then step away; we'll work either way.",
  },
  {
    q: 'What about valuables, mail, photos, paperwork?',
    a: "Standard practice: we sort and set aside anything that looks important. Mail, photos, jewelry, documents, keys, anything that's clearly personal. We'll set it on a designated table and walk you through what we found before we haul anything to the truck.",
  },
  {
    q: "What's the price for a full cleanout?",
    a: "Cleanout pricing is volume-based — what fills the truck. Most single-family homes run between $800 and $3,500 depending on volume, access, and how much donation/recycle routing is involved. We give you a flat, written quote after the walk-through. No hourly surprises.",
  },
  {
    q: 'Do you donate or recycle?',
    a: "Whenever possible, yes. We work with local Goodwill, Habitat ReStore, and a network of textile and metal recyclers. Most cleanouts divert 60%+ of materials from landfill. If you have specific items you want donated, point them out — we'll keep them separate.",
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Fully licensed in California, $2M general liability, and every crew member is W-2, background-checked, and trained. We can email a certificate of insurance to your HOA, building, or escrow office in minutes.',
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

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq section" id="faq">
      <div className="faq-head">
        <div className="eyebrow">QUESTIONS</div>
        <h2>STRAIGHT ANSWERS.</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
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
