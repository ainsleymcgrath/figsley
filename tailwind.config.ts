import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: { display: ['Unbounded'], mono: ['IBM Plex Mono'], sans: ['IBM Plex Sans'] },
      fontSize: { xxs: '0.5rem' },
    },
  },
  shortcuts: {
    'heavy-outline': 'border-4 border-black rounded-lg outline-0 bg-yellow-500 p-2',
    'heavy-outline-red': 'border-4 border-red-500 rounded-lg outline-0 bg-yellow-500 p-2',
    'icon-sm': 'w-5 h-5',
    annotation: 'text-xs mx-2',
    'focus-border-red': 'focus:border-red-500',
    'hover-border-red': 'hover:border-red-500',
    'hl-text': 'text-red-500',
    'underline-hover-focus': 'focus:underline hover:underline outline-0',
  },
  plugins: [],
});
