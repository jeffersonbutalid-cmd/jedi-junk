import { useState, useEffect, useRef } from 'react';
import { readAttribution } from '../lib/tracking';
import { pushEvent } from '../lib/analytics';
import { PHONE, PHONE_HREF, LEAD_ENDPOINT, GOOGLE_MAPS_API_KEY } from './constants';

const ZAP_ENDPOINT = 'https://hooks.zapier.com/hooks/catch/11805929/4ox6t4x/';

const SERVICES = [
  'Full cleanout',
  'Same-day pickup',
  'Mattress removal',
  'Junk hauling',
  'Construction debris',
  'Estate cleanout',
  'Other',
];

// Normalize to a Google-Sheets-safe phone: strip the leading "+" / country
// code so Sheets never treats it as a formula. US 10-digit -> (xxx) xxx-xxxx.
function sheetSafePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '');
  let d = digits;
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return digits || String(raw || '').replace(/^[+=@-]+/, '');
}

let mapsScriptPromise = null;
function loadGoogleMaps(apiKey) {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.google && window.google.maps && window.google.maps.places) {
    return Promise.resolve(window.google.maps);
  }
  if (mapsScriptPromise) return mapsScriptPromise;
  mapsScriptPromise = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&loading=async&v=weekly`;
    s.async = true;
    s.defer = true;
    s.onload = () => res(window.google.maps);
    s.onerror = (e) => {
      mapsScriptPromise = null;
      rej(e);
    };
    document.head.appendChild(s);
  });
  return mapsScriptPromise;
}

async function compressImage(file, maxDim = 1920, quality = 0.82) {
  if (!file || !file.type || !file.type.startsWith('image/')) return file;
  const dataUrl = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });
  const ratio = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * ratio));
  const h = Math.max(1, Math.round(img.height * ratio));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  return new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
}

function submitViaHiddenForm(url, data) {
  return new Promise((resolve) => {
    const targetName = 'jedi-lead-' + Math.random().toString(36).slice(2);

    const iframe = document.createElement('iframe');
    iframe.name = targetName;
    iframe.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;border:0;';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;

    let settled = false;
    const finish = () => { if (!settled) { settled = true; resolve(); } };
    iframe.addEventListener('load', finish);
    iframe.addEventListener('error', finish);
    setTimeout(finish, 8000);

    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.target = targetName;
    form.enctype = 'application/x-www-form-urlencoded';
    form.acceptCharset = 'utf-8';
    form.style.display = 'none';

    Object.entries(data).forEach(([k, v]) => {
      if (v == null) return;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = String(v);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  });
}

function blobToBase64(blob) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      const s = String(r.result || '');
      const i = s.indexOf(',');
      res(i >= 0 ? s.slice(i + 1) : s);
    };
    r.onerror = rej;
    r.readAsDataURL(blob);
  });
}

export default function BookingForm({ defaultService = '' }) {
  const [status, setStatus] = useState('idle');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const addressRef = useRef(null);
  const autocompleteRef = useRef(null);

  const handleAddressFocus = () => {
    // Retained as a safety net: if mount-time loading failed for any reason,
    // try again on first focus.
    if (!GOOGLE_MAPS_API_KEY || autocompleteRef.current) return;
    attachAutocomplete();
  };

  const attachAutocomplete = async () => {
    if (autocompleteRef.current) return;
    try {
      const maps = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);
      if (!addressRef.current || autocompleteRef.current) return;
      const ac = new maps.places.Autocomplete(addressRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        fields: ['formatted_address'],
      });
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (place && place.formatted_address && addressRef.current) {
          addressRef.current.value = place.formatted_address;
        }
      });
      autocompleteRef.current = ac;
    } catch (_err) {
      // graceful fallback — input still works as plain text
    }
  };

  // Eager-load the Maps script + attach Autocomplete on mount so there's no
  // first-keystroke delay when the user focuses the address field.
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;
    attachAutocomplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setPhotoFile(null);
      setPhotoPreview('');
      return;
    }
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
  };

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    delete data.photo;
    const attr = readAttribution();
    const payload = {
      ...data,
      ...attr,
      phone: sheetSafePhone(data.phone),
      page_path: window.location.pathname,
      page_url: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    if (photoFile) {
      try {
        const compressed = await compressImage(photoFile);
        payload.photo_base64 = await blobToBase64(compressed);
        payload.photo_name = photoFile.name.replace(/\.[^.]+$/, '') + '.jpg';
        payload.photo_mime = 'image/jpeg';
      } catch (_err) {
        // skip photo on error, still submit the lead
      }
    }

    pushEvent('lead_form_submit', {
      service: data.service || '',
      page_path: window.location.pathname,
      has_photo: !!photoFile,
    });

    try {
      if (LEAD_ENDPOINT) {
        // Apps Script web app — submit via a hidden iframe form POST.
        // Native form submissions preserve POST method through Apps Script's
        // 302 redirect, which fetch in no-cors mode does not.
        await submitViaHiddenForm(LEAD_ENDPOINT, payload);
      } else {
        // Zapier webhook — urlencoded POST, photo included as base64 string.
        const formBody = new URLSearchParams();
        Object.entries(payload).forEach(([k, v]) => {
          formBody.append(k, v == null ? '' : String(v));
        });
        await fetch(ZAP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        });
      }
      window.location.assign('/booking-thank-you');
    } catch (_err) {
      setStatus('error');
    }
  };

  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="bf-grid">
        <div className="field bf-full">
          <label htmlFor="bf-name">Full name</label>
          <input id="bf-name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" />
        </div>
        <div className="field">
          <label htmlFor="bf-phone">Phone</label>
          <input id="bf-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="field">
          <label htmlFor="bf-email">Email</label>
          <input id="bf-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </div>
        <div className="field bf-full">
          <label htmlFor="bf-address">Service address</label>
          <input
            id="bf-address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Start typing your address…"
            ref={addressRef}
            onFocus={handleAddressFocus}
          />
        </div>
        <div className="field">
          <label htmlFor="bf-service">Service needed</label>
          <select id="bf-service" name="service" defaultValue={defaultService} required>
            <option value="" disabled>Select…</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="bf-date">Preferred date</label>
          <input id="bf-date" name="preferred_date" type="date" required />
        </div>
        <div className="field bf-full">
          <label htmlFor="bf-time">Preferred time</label>
          <select id="bf-time" name="preferred_time" defaultValue="Flexible">
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Flexible">Flexible (any time)</option>
          </select>
        </div>
        <div className="field bf-full">
          <label htmlFor="bf-details">What needs to go?</label>
          <textarea id="bf-details" name="details" rows={3} placeholder="e.g. a queen mattress, a couch, and some boxes from the garage" />
        </div>
        <div className="field bf-full bf-photo-field">
          <label>Add a photo <span className="bf-optional">(optional — helps us quote faster)</span></label>
          {!photoPreview ? (
            <label htmlFor="bf-photo" className="bf-photo-drop">
              <span className="bf-photo-icon" aria-hidden="true">📷</span>
              <span>Tap to take or upload a photo</span>
            </label>
          ) : (
            <div className="bf-photo-preview">
              <img src={photoPreview} alt="Selected upload" />
              <button type="button" className="bf-photo-remove" onClick={clearPhoto}>Remove</button>
            </div>
          )}
          <input
            id="bf-photo"
            name="photo"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="bf-photo-input"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="bf-error">
          Something went wrong sending your request — please call us at{' '}
          <a href={PHONE_HREF}>{PHONE}</a> and we'll get you booked.
        </p>
      )}

      <button type="submit" className="btn btn-primary bf-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'SENDING…' : 'BOOK MY PICKUP · $20 OFF'}
      </button>
      <p className="bf-fineprint">We'll text to confirm your window. No spam — ever.</p>
    </form>
  );
}
