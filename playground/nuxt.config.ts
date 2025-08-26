import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  ssr: false,

  devtools: { enabled: true },

  app: {
    baseURL: '/enoki-vue/',
  },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  runtimeConfig: {
    public: {
      googleClientId: '',
      enokiApiKey: '',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-27',

  vite: {
    resolve: {
      alias: {
        '@belongnet/enoki-vue': resolve('../src/index.ts'),
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
