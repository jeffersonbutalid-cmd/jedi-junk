// ── Single source of truth for every contact fact. Reference CONTACT.* (or the
//    named exports below) anywhere a phone / address / hours string is shown. ──
export const PHONE = '(866) 487-9059';          // CallRail tracking number (fallback display)
export const PHONE_HREF = 'tel:+18664879059';
export const ADDRESS = '275 E. Hillcrest Dr., Suite 160-205, Thousand Oaks, CA 91360';
export const HOURS = 'Open Daily · 6 AM – 7 PM';
export const PAYMENTS = 'Cash, card & e-transfer accepted';
export const EMAIL = null;                       // No public email — phone + form only.
export const LICENSE_NO = null;                  // "Licensed & Insured" with NO number.
export const TRUST_LINE = '#1 Rated · Licensed & Insured · Family-Owned & Locally-Operated';

export const CONTACT = {
  phoneDisplay: PHONE,
  phoneTel: PHONE_HREF,
  address: ADDRESS,
  hours: HOURS,
  payments: PAYMENTS,
  email: EMAIL,
  licenseNo: LICENSE_NO,
  trustLine: TRUST_LINE,
};

// ── Google Ads / GA4 conversion placeholders. Paste real IDs to activate the
//    gtag conversion on form submit (the dataLayer 'lead_submit' event fires
//    regardless, for GTM-based conversion tags). ──
export const GA4_ID = '';                  // e.g. 'G-XXXXXXXXXX'
export const AW_CONVERSION_ID = '';        // e.g. 'AW-123456789'
export const AW_CONVERSION_LABEL = '';     // e.g. 'AbC-D_efGhIjKl'

// Zapier Catch Hook that writes the leads sheet (same hook the LPs use).
export const ZAPIER_HOOK_URL = 'https://hooks.zapier.com/hooks/catch/11805929/4ox6t4x/';

export const WORKIZ_URL =
  'https://online-booking.workiz.com/?ac=5e739610d21c8f24198d6f1811702421894ed78bc6913627d5cdddbe87b8d200&ad_group=Google_Ads_Jeff';

// Deployed Google Apps Script web app URL. See apps-script/leads.gs for the
// script + deploy steps. While this is empty, BookingForm falls back to the
// legacy Zapier webhook (which means photo upload is dropped).
export const LEAD_ENDPOINT = '';

// Google Maps Platform API key with the Places API enabled.
// Restrict it to your domains in the GCP console before shipping.
// While empty, the address field works as a plain text input (no autocomplete).
export const GOOGLE_MAPS_API_KEY = 'AIzaSyApuWcKaoENxPXS8T9NNCAWJEzNnbYuHZI';
