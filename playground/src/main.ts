import { createApp } from 'vue'
import GoogleSignInPlugin from 'vue3-google-signin'
import { EnokiPlugin } from '@belongnet/enoki-vue'
import uiPlugin from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import { router } from './router'
import './assets/main.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(GoogleSignInPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_OAUTH_APP_ID_WEB,
})

app.use(EnokiPlugin, {
  config: {
    apiKey: import.meta.env.VITE_ENOKI_API_KEY,
  },
})

app.use(uiPlugin)

app.mount('#app')
