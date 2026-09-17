// src/stores/identity.js
import { writable } from 'svelte/store';
import { api } from '../config.js';

const DEFAULTS = {
  site_type: 'department',
  site_title: 'Cyber Security',
  site_tagline: '',
  site_logo_url: '',
  university_name: '',
  university_logo_url: '',
  favicon_url: '',
  primary_color: '#4c1d95',
  meta_description: ''
};

export const identity = writable(DEFAULTS);

let loaded = false;
export async function loadIdentity() {
  if (loaded) return;
  loaded = true;
  try {
    const res = await fetch(api('/site-identity'));
    if (res.ok) identity.set({ ...DEFAULTS, ...(await res.json()) });
  } catch (e) {
    console.warn('[identity] failed to load', e);
  }
}
