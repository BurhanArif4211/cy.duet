// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
	plugins: [svelte()],
	base: '/',                    // ← CRITICAL: absolute base, not '/client/'
	build: {
		outDir: 'dist',             // ← default; NOT 'client' or 'build/client'
		emptyOutDir: true,
		sourcemap: false
	}
});
