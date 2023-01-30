/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: { display: ['Unbounded'], mono: ['IBM Plex Mono'], sans: ['IBM Plex Sans'] }
		}
	},
	plugins: []
};
