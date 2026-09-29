// Records ad click IDs and UTMs when a Workiz booking lands on /booking-thank-you,
// so online bookings can be joined to Workiz jobs by timestamp for offline
// conversion uploads. Workiz's booking form drops URL params, so this is the
// only place the gclid and the booking moment meet.
//
// POST /.netlify/functions/booking-capture   (from the thank-you page)
// GET  /.netlify/functions/booking-capture?key=...&since=YYYY-MM-DD
//      Returns captures as JSON. Disabled unless BOOKING_CAPTURE_KEY is set.
//
// Stores no name, phone, email or IP address.
import { getStore } from '@netlify/blobs';

const STORE = 'booking-captures';
const ALLOWED = [
  'gclid', 'gbraid', 'wbraid', 'gclsrc', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'landing_page', 'referrer', 'first_seen', 'client_time', 'page_path', 'source',
];
const MAX_BODY = 4096;
const MAX_FIELD = 600;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === 'POST') {
    const raw = await req.text();
    if (!raw || raw.length > MAX_BODY) return new Response(null, { status: 413 });
    let data;
    try { data = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
    if (!data || typeof data !== 'object') return new Response(null, { status: 400 });

    const record = {};
    for (const k of ALLOWED) {
      if (typeof data[k] === 'string' && data[k]) record[k] = data[k].slice(0, MAX_FIELD);
    }
    const received = new Date().toISOString();
    record.received_at = received;
    const id = Math.random().toString(36).slice(2, 10);
    await store.setJSON(`${received}_${id}`, record);
    return new Response(null, { status: 204 });
  }

  if (req.method === 'GET') {
    const secret = process.env.BOOKING_CAPTURE_KEY;
    const url = new URL(req.url);
    if (!secret || url.searchParams.get('key') !== secret) return new Response(null, { status: 404 });
    const since = url.searchParams.get('since') || '';
    const { blobs } = await store.list();
    const keys = blobs.map((b) => b.key).filter((k) => !since || k >= since).sort();
    const out = [];
    for (const key of keys) out.push(await store.get(key, { type: 'json' }));
    return json({ count: out.length, captures: out });
  }

  return new Response(null, { status: 405 });
};
