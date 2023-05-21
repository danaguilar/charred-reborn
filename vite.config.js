import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
          ? '/charred-reborn/' // prod
          : '/', // dev
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'js': fileURLToPath(new URL('./src/javascript', import.meta.url)),
      'data': fileURLToPath(new URL('./data', import.meta.url))
    }
  }
})
