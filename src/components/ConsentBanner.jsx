import { useEffect, useState } from 'react';
import { updateConsent, pushEvent } from '../lib/analytics';

const KEY = 'jedi_consent';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) setShow(true);
  }, []);

  const choose = (granted) => {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    updateConsent(granted);
    pushEvent(granted ? 'consent_granted' : 'consent_denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="consent" role="dialog" aria-label="Cookie consent">
      <div className="consent-inner">
        <p className="consent-text">
          We use cookies to measure ad performance and improve your experience.
          Accept all, or reject non-essential cookies.
        </p>
        <div className="consent-btns">
          <button className="consent-btn reject" onClick={() => choose(false)}>
            Reject
          </button>
          <button className="consent-btn accept" onClick={() => choose(true)}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
