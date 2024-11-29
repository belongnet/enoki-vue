/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_ENOKI_API_KEY: string
  readonly VITE_GOOGLE_OAUTH_APP_ID_WEB: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
