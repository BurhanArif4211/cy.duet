// src/router.js
import { writable } from 'svelte/store';
import { api } from './config.js';

export const routes = {
	'/home': { component: () => import('./page/HomePage.svelte') },
	'/about': { component: () => import('./page/AboutPage.svelte') },
	'/faculty': { component: () => import('./page/FacultyPage.svelte') },
	'/contact': { component: () => import('./page/ContactPage.svelte') },
	'/news': { component: () => import('./page/PostsPage.svelte') },
	'/publications': { component: () => import('./page/PublicationsPage.svelte') },

	'/news/:slug': {
		component: () => import('./page/PostPage.svelte'),
		data: async ({ slug }) => {
			const res = await fetch(api(`/posts/${slug}`));
			if (res.status === 404) throw new Error('POST_NOT_FOUND');
			if (!res.ok) throw new Error('Failed to load post');
			return await res.json();
		}
	},

	'/404': { component: () => import('./page/NotFoundPage.svelte') }
};

function parsePath(pathname) {
	let path = pathname.replace(/\/$/, '') || '/';
	if (path === '/') path = '/home';

	for (const routeKey of Object.keys(routes)) {
		if (!routeKey.includes(':')) {
			if (routeKey === path) return { route: routes[routeKey], params: {} };
			continue;
		}
		const rp = routeKey.split('/'), pp = path.split('/');
		if (rp.length !== pp.length) continue;
		const params = {}; let ok = true;
		for (let i = 0; i < rp.length; i++) {
			if (rp[i].startsWith(':')) params[rp[i].slice(1)] = decodeURIComponent(pp[i]);
			else if (rp[i] !== pp[i]) { ok = false; break; }
		}
		if (ok) return { route: routes[routeKey], params };
	}
	return { route: routes['/404'], params: {} };
}

function createRouter() {
	const { subscribe, set } = writable({
		currentRoute: null, component: null, params: {}, routeData: null, loading: true
	});

	async function navigate(to, replace = false) {
		const path = to.startsWith('/') ? to : `/${to}`;
		const { route, params } = parsePath(path);

		set({ currentRoute: null, component: null, params, routeData: null, loading: true });

		try {
			const component = (await route.component()).default;
			let routeData = null;
			if (route.data) routeData = await route.data(params);

			replace ? history.replaceState({}, '', path) : history.pushState({}, '', path);
			set({ currentRoute: route, component, params, routeData, loading: false });
			window.scrollTo({ top: 0, behavior: 'auto' });
		} catch (err) {
			console.error('[router]', err);
			const fallback = routes['/404'];
			const component = (await fallback.component()).default;
			set({
				currentRoute: fallback, component,
				params: err.message === 'POST_NOT_FOUND' ? { message: 'The requested post was not found.' } : {},
				routeData: null, loading: false
			});
		}
	}

	async function init() {
		await navigate(window.location.pathname, true);
		window.addEventListener('popstate', () => navigate(window.location.pathname, true));
	}

	return { subscribe, navigate, init };
}

export const router = createRouter();
