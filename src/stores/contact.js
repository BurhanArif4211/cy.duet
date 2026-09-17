// src/stores/contacts.js
import { writable, derived } from 'svelte/store';
import { api } from '../config.js';

export const contacts = writable([]);

let loaded = false;
export async function loadContacts() {
  if (loaded) return;
  loaded = true;
  try {
    const res = await fetch(api('/contacts'));
    if (res.ok) contacts.set(await res.json());
  } catch (e) {
    console.warn('[contacts] failed to load', e);
  }
}

/** Grouped by section: { primary: [...], IEEE: [...] } */
export const contactsBySection = derived(contacts, ($c) => {
  const map = {};
  for (const item of $c) {
    (map[item.section] ??= []).push(item);
  }
  return map;
});

/** Section + label lookup → contact object or undefined */
export function findContact(list, label) {
  const wanted = label.toLowerCase();
  return list.find(c => (c.label ?? '').toLowerCase() === wanted);
}

/** Build the correct href for a contact's `type` */
export function contactHref(c) {
  if (!c) return '#';
  switch (c.type) {
    case 'email':    return `mailto:${c.value}`;
    case 'phone':    return `tel:${c.value.replace(/[^0-9+]/g, '')}`;
    case 'whatsapp': return c.value;   // already a full wa.me URL
    default:         return c.value;   // url
  }
}

/** Recognised social labels for the footer / share rows */
export const SOCIAL_LABELS = ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube', 'whatsapp', 'x'];
export function isSocial(c) {
  return SOCIAL_LABELS.includes((c.label ?? '').toLowerCase());
}
