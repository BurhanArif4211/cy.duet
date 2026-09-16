// src/utils/format.js
export function formatDate(str) {
	if (!str) return '';
	const d = new Date(str);
	if (isNaN(d.getTime())) return str;
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function initials(name = '') {
	return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
}

export function resolveLink(url) {
	if (!url) return '#';
	if (url.startsWith('http') || url.startsWith('/')) return url;
	return '/' + url;
}
