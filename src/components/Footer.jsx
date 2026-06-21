import { PHONE, PHONE_HREF, ADDRESS, HOURS, PAYMENTS, TRUST_LINE } from './constants';

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
            <li>{ADDRESS}</li>
          </ul>
        </div>
        <div>
          <div className="footer-h">HOURS</div>
          <ul>
            <li>{HOURS}</li>
            <li>Same-day / next-day available</li>
            <li>{PAYMENTS}</li>
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
        <span>© 2026 JEDI Junk Removal · {TRUST_LINE} · $2M Insured</span>
        <span>If you want it gone, it's gone.</span>
      </div>
    </footer>
  );
}
