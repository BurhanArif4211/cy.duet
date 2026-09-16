// src/config.js
export const API_BASE = 'https://duet-backend.vercel.app';
export const API_PREFIX = '/api';
export const api = (path) => `${API_BASE}${API_PREFIX}${path}`;

export const STATIC = {
	logoUrl: 'https://duet.edu.pk/__l5e/assets-v1/8bb90b9b-e793-4546-94df-afb0e04b380b/duet-logo.jpeg',
	logoAlt: 'DUET Cyber Security',
	departmentName: 'Cyber Security',
	tagline: 'The University of Relevance',
	universityName: 'Dawood University of Engineering & Technology',
	mainSiteUrl: 'https://duet.edu.pk'
};// ── Static assets ────────────────────────────────────────────────

