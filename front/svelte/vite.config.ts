import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    Unfonts({
      // https://fonts.google.com/
      google: {
        families: ['Noto Sans JP', 'M PLUS 1', 'M PLUS 2', 'Murecho', 'M PLUS 1 Code'],
      },
    }),
  ],
});
