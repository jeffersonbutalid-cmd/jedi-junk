// Token that marks a completed Workiz booking. Workiz must redirect the TOP
// window to a URL containing this string (e.g. /booking-thank-you).
export const BOOKING_THANKYOU_TOKEN = 'booking-thank-you';

export function pushEvent(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function updateConsent(granted) {
  const state = granted ? 'granted' : 'denied';
  const payload = {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  };
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['consent', 'update', payload]);
  }
}
