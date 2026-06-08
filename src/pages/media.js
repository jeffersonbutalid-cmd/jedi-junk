// ============================================================
// Per-page imagery
// ------------------------------------------------------------
//  slider:true  -> hero uses the draggable BEFORE/AFTER comparison
//  slider:false -> hero is a single static photo (hero field)
//  photo        -> the large full-width photo section on the page
//
// To swap a photo, drop a file with the same name into public/assets
// and redeploy.
// ============================================================
const A = '/assets/';

export const MEDIA = {
  // Cleanout & Same-Day keep the draggable before/after slider.
  cleanout: {
    slider: true,
    before: A + 'garage-before.png',
    after: A + 'garage-after.png',
    photo: A + 'garage-after.png',
  },
  sameday: {
    slider: true,
    before: A + 'garage-before.png',
    after: A + 'garage-after.png',
    photo: A + 'truck-beauty.png',
  },
  // Single-image heroes (no before/after).
  mattress: {
    slider: false,
    hero: A + 'crew-loading.jpg',
    photo: A + 'room-empty.jpg',
  },
  junkhauling: {
    slider: false,
    hero: A + 'crew-loading.jpg',
    photo: A + 'truck-beauty.png',
  },
  orangecounty: {
    slider: false,
    hero: A + 'truck-beauty.png',
    photo: A + 'jedi-truck-street.jpg',
  },
};

// Shared stock images shipped with the project (safety fallback).
export const FALLBACK = {
  before: A + 'garage-before.png',
  after: A + 'garage-after.png',
  photo: A + 'truck-beauty.png',
};
