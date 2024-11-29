/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_ENOKI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
