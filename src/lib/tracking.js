// Captures Google Ads click IDs + UTM params on landing, persists them in a
// first-party cookie (90 days) so they survive navigation, and exposes them
// for injection into the booking form.
const PARAMS = [
  'gclid', 'gbraid', 'wbraid', 'gclsrc',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'msclkid',
];
const COOKIE = 'jedi_attribution';
const DAYS = 90;

function write(obj) {
  try {
    const val = encodeURIComponent(JSON.stringify(obj));
    const d = new Date(Date.now() + DAYS * 864e5);
    document.cookie = `${COOKIE}=${val};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  } catch (e) {}
  try { localStorage.setItem(COOKIE, JSON.stringify(obj)); } catch (e) {}
}

export function readAttribution() {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]*)'));
    if (m) return JSON.parse(decodeURIComponent(m[1]));
  } catch (e) {}
  try {
    const ls = localStorage.getItem(COOKIE);
    if (ls) return JSON.parse(ls);
  } catch (e) {}
  return {};
}

// Append captured GCLID/UTM/etc. as URL params to the Workiz booking iframe URL,
// so Workiz Ultimate hidden custom fields pre-fill with the attribution data.
export function buildWorkizUrl(baseUrl) {
  try {
    const attr = readAttribution();
    const u = new URL(baseUrl);
    PARAMS.forEach((k) => { if (attr[k]) u.searchParams.set(k, attr[k]); });
    if (attr.landing_page) u.searchParams.set('landing_page', attr.landing_page);
    if (attr.referrer) u.searchParams.set('referrer', attr.referrer);
    return u.toString();
  } catch (e) {
    return baseUrl;
  }
}

export function captureAttribution() {
  const url = new URLSearchParams(window.location.search);
  const stored = readAttribution();
  let changed = false;
  PARAMS.forEach((p) => {
    const v = url.get(p);
    if (v && stored[p] !== v) { stored[p] = v; changed = true; }
  });
  if (!stored.landing_page) { stored.landing_page = window.location.href; changed = true; }
  if (!stored.referrer) { stored.referrer = document.referrer || '(direct)'; changed = true; }
  if (!stored.first_seen) { stored.first_seen = new Date().toISOString(); changed = true; }
  if (changed) write(stored);
  return stored;
}
