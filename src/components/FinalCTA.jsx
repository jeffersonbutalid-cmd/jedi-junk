import { useMemo, useState } from 'react';
import { PHONE, PHONE_HREF, WORKIZ_URL } from './constants';
import { buildWorkizUrl } from '../lib/tracking';

const SMS_HREF = 'sms:+18664879059?&body=Hi%20JEDI%20%E2%80%94%20I%20need%20a%20cleanout%20quote.';

export default function FinalCTA() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const workizUrl = useMemo(() => buildWorkizUrl(WORKIZ_URL), []);

  return (
    <section className="finalcta section" id="quote">
      <div className="finalcta-inner">
        <h2>
          READY FOR THE PROPERTY<br />
          TO BE <span className="green">EMPTY?</span>
        </h2>
        <p className="sub">
          <span className="green">Same-week walk-throughs.</span> Flat upfront quote.
          Pay nothing until the property is empty.
        </p>
        <a href={PHONE_HREF} className="btn btn-primary callbtn">
          <span>📞</span><span>CALL {PHONE}</span>
        </a>
        <div className="finalcta-sms">
          <a href={SMS_HREF}>Or text us — we reply in 5 min</a>
        </div>
        <div className="or">OR BOOK A WALK-THROUGH ONLINE</div>

        <div className="booking-card" id="book">
          <div className="booking-head">
            <div className="booking-head-l">
              <h3>BOOK A WALK-THROUGH</h3>
              <p>Pick a window. We'll confirm and bring a quote on the spot.</p>
            </div>
            <span className="booking-badge">★ $20 OFF APPLIED</span>
          </div>
          <div className="iframe-wrap">
            <div className={'iframe-loading' + (iframeLoaded ? ' hidden' : '')}>
              <div className="spinner" aria-hidden="true" />
              <div>Loading secure booking…</div>
            </div>
            <iframe
              src={workizUrl}
              title="JEDI Junk Removal — book a cleanout walk-through"
              loading="lazy"
              allow="payment; geolocation; clipboard-write"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
          <div className="booking-foot">
            Trouble with the form?{' '}
            <a href={PHONE_HREF} className="phone-fallback">Call {PHONE}</a>
            {' · '}
            <span className="green">$20 off</span> applied automatically when you book online.
          </div>
        </div>
      </div>
    </section>
  );
}
