import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./vitest-setup.ts'],
			include: ['src/test/*.{test,spec}.{js,ts}'],
			coverage: {
				reporter: ['text', 'json', 'html', 'clover'],
				reportsDirectory: 'coverage'
			}
		}
	})
);
