// src/config.js
export const API_BASE = 'https://duet-backend.vercel.app';
export const API_PREFIX = '/api';
export const api = (path) => `${API_BASE}${API_PREFIX}${path}`;

export const STATIC = {
	logoUrl: 'https://pub-b3589ba545114fce92da1edaa54f8cfd.r2.dev/static/cy-logo_c.jpg',
	logoAlt: 'DUET Cyber Security',
	universityLogoUrl: 'https://pub-b3589ba545114fce92da1edaa54f8cfd.r2.dev/static/duet-logo.jpeg',
	departmentName: 'Cyber Security',
	tagline: 'The University of Relevance',
	universityName: 'Dawood University of Engineering & Technology',
	mainSiteUrl: 'https://duet.edu.pk'
};// ── Static assets ────────────────────────────────────────────────

