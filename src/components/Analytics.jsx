import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pushEvent, BOOKING_THANKYOU_TOKEN } from '../lib/analytics';
import { captureAttribution } from '../lib/tracking';

function fireBookingComplete(source) {
  try {
    const url = window.location.href;
    if (sessionStorage.getItem('jedi_booking_fired') === url) return;
    sessionStorage.setItem('jedi_booking_fired', url);
  } catch (e) {}
  pushEvent('booking_complete', {
    page_path: window.location.pathname,
    source: source || 'url',
  });
}

function isThankYou() {
  return window.location.href.toLowerCase().includes(BOOKING_THANKYOU_TOKEN);
}

export default function Analytics() {
  const location = useLocation();

  // SPA pageview on every route change (+ thank-you detection)
  useEffect(() => {
    const t = setTimeout(() => {
      pushEvent('page_view_spa', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }, 0);
    if (isThankYou()) fireBookingComplete('url');
    return () => clearTimeout(t);
  }, [location]);

  // Capture gclid/utm into a first-party cookie as early as possible
  useEffect(() => {
    captureAttribution();
  }, [location]);

  // Delegated click tracking + booking postMessage (mount once)
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest) return;
      const tel = e.target.closest('a[href^="tel:"]');
      if (tel) {
        pushEvent('phone_click', {
          phone_number: tel.getAttribute('href').replace('tel:', ''),
          page_path: window.location.pathname,
        });
        return;
      }
      const book = e.target.closest('a[href="#quote"], [data-cta="book"]');
      if (book) {
        pushEvent('book_click', { page_path: window.location.pathname });
      }
    };
    document.addEventListener('click', onClick, true);

    const onMessage = (ev) => {
      const d = ev.data;
      let str = '';
      try { str = typeof d === 'string' ? d : JSON.stringify(d); } catch (e) {}
      if (str && str.toLowerCase().includes(BOOKING_THANKYOU_TOKEN)) {
        fireBookingComplete('postMessage');
      }
    };
    window.addEventListener('message', onMessage);

    if (isThankYou()) fireBookingComplete('url');

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}
