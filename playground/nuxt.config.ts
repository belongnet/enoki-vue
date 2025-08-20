import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/enoki-vue/',
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-27',
  runtimeConfig: {
    public: {
      googleClientId: '',
      enokiApiKey: '',
    },
  },
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
  ui: {
    fonts: false,
  },
})
