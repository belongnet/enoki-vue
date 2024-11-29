import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import VueRouter from 'unplugin-vue-router/vite'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    // ⚠️ Vue must be placed after VueRouter()
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'violet',
          neutral: 'slate',
        },
      },
    }),
    Inspect(),
  ],

  resolve: {
    alias: {
      '@belongnet/enoki-vue': resolve('../src/index.ts'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
})
