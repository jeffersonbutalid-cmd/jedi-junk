import { useEffect } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { PHONE, PHONE_HREF } from '../components/constants';

export default function ThankYouPage() {
  useEffect(() => {
    document.title = 'Booking Confirmed · JEDI Junk Removal';
  }, []);

  return (
    <>
      <Topbar />
      <section className="hero" id="top" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="hero-copy" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 680 }}>
            <div className="hero-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="chip">★ BOOKING CONFIRMED</span>
            </div>
            <h1>
              <span className="line">YOU'RE</span>
              <span className="line green">ON THE BOOKS.</span>
            </h1>
            <p className="hero-lede" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Thanks — we've got your pickup request. Our team will confirm your window
              by text shortly. Need to reach us sooner?
            </p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <a href={PHONE_HREF} className="btn btn-primary">
                <span>📞</span><span>CALL {PHONE}</span>
              </a>
              <a href="/" className="btn btn-ghost">BACK TO HOME</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
