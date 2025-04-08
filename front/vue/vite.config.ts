import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Unfonts from 'unplugin-fonts/vite';
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import VueComponents from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import VueDevTools from 'vite-plugin-vue-devtools';
import VueLayouts from 'vite-plugin-vue-layouts';

// https://vite.dev/config/
export default defineConfig({
  base: '/playground/front/vue/', // for GitHub Pages
  plugins: [
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/page',
      exclude: ['**/component', '**/modal'],
      dts: 'src/vue-router.d.ts',
      importMode: 'sync', // for GitHub Pages
    }),
    Vue(),
    VueJsx(),
    VueLayouts({
      layoutsDirs: 'src/layout',
      pagesDirs: 'src/page',
      extensions: ['vue'],
      exclude: ['**/component', '**/modal'],
      defaultLayout: 'default',
    }),
    Unfonts({
      // https://fonts.google.com/
      google: {
        families: ['Noto Sans JP', 'M PLUS 1', 'M PLUS 2', 'Murecho', 'M PLUS 1 Code'],
      },
    }),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
      vueTemplate: true,
      dts: 'src/vue-auto-import.d.ts',
    }),
    VueComponents({
      dirs: ['src/component'],
      resolvers: [VueUseComponentsResolver()],
      dts: 'src/vue-components.d.ts',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
      },
      manifest: {
        name: '/playground/front/vue/',
        short_name: '/playground/front/vue/',
        description: '/playground/front/vue/',
        theme_color: '#4b5563',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    tailwindcss(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  build: {
    target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
