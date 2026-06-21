import { useState, useEffect, useMemo, useRef } from 'react';
import { readAttribution } from '../lib/tracking';
import { pushEvent } from '../lib/analytics';
import { PHONE, PHONE_HREF, GOOGLE_MAPS_API_KEY } from './constants';

const ZAP_ENDPOINT = 'https://hooks.zapier.com/hooks/catch/11805929/4ox6t4x/';

const JOB_OPTIONS = [
  'Whole house',
  'Estate',
  'Hoarder',
  'Garage',
  'Apartment',
  'Property / foreclosure',
  'Construction debris',
  'Hot tub',
  'A few items',
];

const SIZE_OPTIONS = [
  { value: 'A few items',    label: 'A few items',       hint: 'Pickup truck or smaller'   },
  { value: 'Half a truck',   label: 'Half a truck',      hint: 'Big haul, not full'         },
  { value: '1+ truckloads',  label: '1+ truckloads',     hint: 'Multiple loads · big job'   },
];

function isValidZip(zip) {
  return /^\d{5}$/.test(String(zip || '').trim());
}

function isValidPhone(phone) {
  return (String(phone || '').replace(/\D/g, '').length >= 10);
}

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
    s.onerror = (e) => { mapsScriptPromise = null; rej(e); };
    document.head.appendChild(s);
  });
  return mapsScriptPromise;
}

async function compressImage(file, maxDim = 1600, quality = 0.78) {
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
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  return new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
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

export default function CleanoutForm({ defaultJobType = '' }) {
  const [status, setStatus] = useState('idle');
  const [jobType, setJobType] = useState(defaultJobType || '');
  const [jobSize, setJobSize] = useState('');
  const [photos, setPhotos] = useState([]); // array of { file, previewUrl }
  const [errors, setErrors] = useState({});
  const zipRef = useRef(null);
  const cityRef = useRef(null);

  // Keep defaultJobType in sync when ?job= changes
  useEffect(() => { if (defaultJobType) setJobType(defaultJobType); }, [defaultJobType]);

  // Pre-load Google Places autocomplete so the city field has zero typing delay
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !cityRef.current) return;
    let attached = false;
    loadGoogleMaps(GOOGLE_MAPS_API_KEY)
      .then((maps) => {
        if (attached || !cityRef.current) return;
        attached = true;
        const ac = new maps.places.Autocomplete(cityRef.current, {
          types: ['(cities)'],
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address'],
        });
        ac.addListener('place_changed', () => {
          const place = ac.getPlace();
          if (place && place.formatted_address && cityRef.current) {
            cityRef.current.value = place.formatted_address;
          }
        });
      })
      .catch(() => {});
  }, []);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => { photos.forEach((p) => p.previewUrl && URL.revokeObjectURL(p.previewUrl)); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    if (!files.length) return;
    const next = files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    photos.forEach((p) => p.previewUrl && URL.revokeObjectURL(p.previewUrl));
    setPhotos(next);
  };

  const clearPhotos = () => {
    photos.forEach((p) => p.previewUrl && URL.revokeObjectURL(p.previewUrl));
    setPhotos([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    const nextErrors = {};
    if (!jobType) nextErrors.job_type = 'Pick what needs clearing';
    if (!jobSize) nextErrors.job_size = 'Pick a rough size';
    if (!data.name) nextErrors.name = 'Name required';
    if (!isValidPhone(data.phone)) nextErrors.phone = 'Phone is incomplete';
    if (!isValidZip(data.zip)) nextErrors.zip = 'ZIP must be 5 digits';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('submitting');

    const attr = readAttribution();
    const payload = {
      ...data,
      job_type: jobType,
      job_size: jobSize,
      service: jobType, // Mirror into "service" so the Zap's existing sheet mapping still works
      phone: sheetSafePhone(data.phone),
      zip: String(data.zip || '').trim(),
      ...attr,
      page_path: window.location.pathname,
      page_url: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    // Compress + base64 each photo, post as photo_1_base64, photo_2_base64, ...
    if (photos.length) {
      try {
        for (let i = 0; i < photos.length; i++) {
          const compressed = await compressImage(photos[i].file);
          payload[`photo_${i + 1}_base64`] = await blobToBase64(compressed);
          payload[`photo_${i + 1}_name`] = (photos[i].file.name || `photo_${i + 1}.jpg`).replace(/\.[^.]+$/, '') + '.jpg';
        }
        payload.photo_count = String(photos.length);
      } catch (_err) {
        // skip photos on failure, still submit the lead
      }
    }

    // GA4 generate_lead + Google Ads click-tag conversion fire
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        job_type: jobType,
        job_size: jobSize,
        zip: payload.zip,
      });
    } catch (_e) {}

    pushEvent('lead_form_submit', {
      service: jobType,
      job_size: jobSize,
      zip: payload.zip,
      page_path: window.location.pathname,
      has_photo: photos.length > 0,
    });

    try {
      const formBody = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        formBody.append(k, v == null ? '' : String(v));
      });
      await fetch(ZAP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });
      window.location.assign('/booking-thank-you');
    } catch (_err) {
      setStatus('error');
    }
  };

  return (
    <form className="clo-form" onSubmit={onSubmit} noValidate>
      <div className="clo-form-row clo-form-row-full">
        <label htmlFor="clo-job-type">What needs clearing?</label>
        <select
          id="clo-job-type"
          name="job_type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          <option value="" disabled>Select…</option>
          {JOB_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {errors.job_type && <div className="clo-error">{errors.job_type}</div>}
      </div>

      <div className="clo-form-row clo-form-row-full">
        <label>Roughly how much?</label>
        <div className="clo-radio-group" role="radiogroup" aria-label="Roughly how much?">
          {SIZE_OPTIONS.map((opt) => (
            <label key={opt.value} className={'clo-radio' + (jobSize === opt.value ? ' selected' : '')}>
              <input
                type="radio"
                name="job_size"
                value={opt.value}
                checked={jobSize === opt.value}
                onChange={() => setJobSize(opt.value)}
              />
              <span className="clo-radio-label">{opt.label}</span>
              <span className="clo-radio-hint">{opt.hint}</span>
            </label>
          ))}
        </div>
        {errors.job_size && <div className="clo-error">{errors.job_size}</div>}
      </div>

      <div className="clo-form-row">
        <label htmlFor="clo-name">Name</label>
        <input
          id="clo-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Jane Smith"
        />
        {errors.name && <div className="clo-error">{errors.name}</div>}
      </div>

      <div className="clo-form-row">
        <label htmlFor="clo-phone">Phone</label>
        <input
          id="clo-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="(555) 123-4567"
          inputMode="tel"
        />
        {errors.phone && <div className="clo-error">{errors.phone}</div>}
      </div>

      <div className="clo-form-row">
        <label htmlFor="clo-zip">ZIP</label>
        <input
          id="clo-zip"
          name="zip"
          type="text"
          autoComplete="postal-code"
          required
          placeholder="90210"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          ref={zipRef}
        />
        {errors.zip && <div className="clo-error">{errors.zip}</div>}
      </div>

      <div className="clo-form-row">
        <label htmlFor="clo-city">City (optional)</label>
        <input
          id="clo-city"
          name="city"
          type="text"
          autoComplete="address-level2"
          placeholder="Los Angeles"
          ref={cityRef}
        />
      </div>

      <div className="clo-form-row clo-form-row-full">
        <label>Photos <span className="clo-optional">(optional — up to 3, helps us quote faster)</span></label>
        {photos.length === 0 ? (
          <label htmlFor="clo-photos" className="clo-photo-drop">
            <span className="clo-photo-icon" aria-hidden="true">📷</span>
            <span>Tap to take or upload photos</span>
          </label>
        ) : (
          <div className="clo-photo-grid">
            {photos.map((p, i) => (
              <div key={i} className="clo-photo-thumb">
                <img src={p.previewUrl} alt={`Selected photo ${i + 1}`} />
              </div>
            ))}
            <button type="button" className="clo-photo-remove" onClick={clearPhotos}>
              Remove all
            </button>
          </div>
        )}
        <input
          id="clo-photos"
          name="photos"
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handlePhotoChange}
          className="clo-photo-input"
        />
      </div>

      {status === 'error' && (
        <p className="clo-submit-error">
          Something went wrong. Please call us at <a href={PHONE_HREF}>{PHONE}</a> and we'll get you booked.
        </p>
      )}

      <button type="submit" className="clo-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'SENDING…' : 'GET MY FREE ESTIMATE'}
      </button>
      <p className="clo-fineprint">We'll text to confirm your window. No spam — ever.</p>
    </form>
  );
}
