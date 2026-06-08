export const PHONE = '(866) 487-9059';
export const PHONE_HREF = 'tel:+18664879059';
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
