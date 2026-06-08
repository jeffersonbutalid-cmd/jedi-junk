import { PHONE, PHONE_HREF } from './constants';

const logoSrc = '/assets/logo-horizontal.jpg';

const DEFAULT_SERVICE_LINKS = [
  { label: 'Estate cleanouts', href: '#top' },
  { label: 'Hoarder cleanouts', href: '#top' },
  { label: 'Foreclosures', href: '#top' },
  { label: 'Same-day removal', href: '/same-day' },
];

const DEFAULT_TAGLINE = 'Family-owned, full-service junk removal across LA, Ventura, Orange County and the Valley.';

export default function Footer({
  serviceLinks = DEFAULT_SERVICE_LINKS,
  serviceHeading = 'SERVICE',
  tagline = DEFAULT_TAGLINE,
}) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img src={logoSrc} alt="JEDI Junk Removal" className="footer-logo" />
          <div className="footer-tag">{tagline}</div>
        </div>
        <div>
          <div className="footer-h">CONTACT</div>
          <ul>
            <li><a href={PHONE_HREF} className="footer-phone-link">📞 {PHONE}</a></li>
            <li><a href="mailto:hello@jedijunk.com">hello@jedijunk.com</a></li>
            <li>14930 Ventura Blvd<br />Sherman Oaks, CA 91403</li>
          </ul>
        </div>
        <div>
          <div className="footer-h">HOURS</div>
          <ul>
            <li>Mon–Sat · 7AM – 7PM</li>
            <li>Sunday · 8AM – 5PM</li>
            <li>After-hours by arrangement</li>
          </ul>
        </div>
        <div>
          <div className="footer-h">{serviceHeading}</div>
          <ul>
            {serviceLinks.map(link => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 JEDI Junk Removal · CA Lic. # 1098234 · $2M Insured</span>
        <span>Made in the Valley.</span>
      </div>
    </footer>
  );
}
