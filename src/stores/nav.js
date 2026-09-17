// src/stores/nav.js
import { writable } from 'svelte/store';
import { api } from '../config.js';

const FALLBACK = [
  { text: 'Home',    href: '/home' },
  { text: 'About',   href: '/about' },
  { text: 'Faculty', href: '/faculty' },
  { text: 'News',    href: '/news' },
  { text: 'Contact', href: '/contact' }
];

export const navItems = writable(FALLBACK);

let loaded = false;
export async function loadNav() {
  if (loaded) return;
  loaded = true;
  try {
    const res = await fetch(api('/nav'));
    if (res.ok) {
      const arr = await res.json();
      if (Array.isArray(arr) && arr.length > 0) navItems.set(arr);
    }
  } catch (e) {
    console.warn('[nav] failed to load', e);
  }
}
