import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	optimizeDeps: {
		include: ['@apollo/client', 'graphql']
	},
	server: {
		port: 3000
	}
});
