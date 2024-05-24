import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import AutoImport from 'unplugin-auto-import/vite'

const dev = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  base: dev ? '/' : './',
  plugins: [
    vue2(),
    AutoImport({
      imports: ['vue', 'vue-router']
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false
  }
})
