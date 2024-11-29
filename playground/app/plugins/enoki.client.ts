import { EnokiPlugin } from '@belongnet/enoki-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(EnokiPlugin, {
    config: {
      apiKey: config.public.enokiApiKey,
    },
  })
})
