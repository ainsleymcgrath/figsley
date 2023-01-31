import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: { display: ['Unbounded'], mono: ['IBM Plex Mono'], sans: ['IBM Plex Sans'] }
		}
	},
	shortcuts: {
		'heavy-outline': 'border-4 border-black rounded-lg outline-0 bg-yellow-500 p-2'
	},
	plugins: []
});
