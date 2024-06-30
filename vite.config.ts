import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      mode: 'development',
      base: '/',
      injectRegister: 'auto',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      manifest: {
        name: 'Memory: spaced repetition learning',
        short_name: 'Memory',
        description: 'A spaced repetition learning app',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/memory-middle.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/memory.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
