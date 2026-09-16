// src/stores/settings.js
import { writable } from 'svelte/store';
import { api } from '../config.js';

export const settings = writable({});

let loaded = false;
export async function loadSettings() {
	if (loaded) return;
	loaded = true;
	try {
		const res = await fetch(api('/settings'));
		if (res.ok) settings.set(await res.json());
	} catch (e) {
		console.warn('[settings] failed to load', e);
	}
}

// Helper for components: $settings.contact_email ?? fallback(...)
export function fallback(key, def) {
	let val = def;
	settings.subscribe(s => { val = s[key] ?? def; })();
	return val;
}
