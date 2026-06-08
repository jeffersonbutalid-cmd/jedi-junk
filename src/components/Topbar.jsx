import { PHONE, PHONE_HREF } from './constants';

const logoSrc = '/assets/logo-horizontal.jpg';

export default function Topbar() {
  return (
    <header className="topbar">
      <a href="#top" aria-label="JEDI Junk Removal home">
        <img src={logoSrc} alt="JEDI Junk Removal" className="topbar-logo" />
      </a>
      <a href={PHONE_HREF} className="topbar-phone">
        <span className="icon">📞</span>
        <span className="label-long">{PHONE}</span>
        <span className="label-short">CALL NOW</span>
      </a>
    </header>
  );
}
