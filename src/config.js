// src/config.js
export const API_BASE = 'https://duet-backend.vercel.app';
export const API_PREFIX = '/api';
export const api = (path) => `${API_BASE}${API_PREFIX}${path}`;
