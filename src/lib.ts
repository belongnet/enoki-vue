import { ref, onMounted, onBeforeUnmount, watchEffect, inject } from 'vue'
import { useStore } from '@nanostores/vue'
import { _EnokiFlowKey } from './plugin.js'

/**
 * Create a new EnokiFlow instance and provide it to the app.
 *
 * @param config - EnokiFlow configuration.
 * @returns EnokiFlow instance.
 */
export function useEnokiFlow() {
  return inject(_EnokiFlowKey)!
}

export function useZkLogin() {
  const enokiFlow = useEnokiFlow()
  return useStore(enokiFlow.$zkLoginState)
}

export function useZkLoginSession() {
  const enokiFlow = useEnokiFlow()
  return useStore(enokiFlow.$zkLoginSession).value
}

/**
 * Handle auth callback from Enoki.
 */
export function useAuthCallback() {
  const enokiFlow = useEnokiFlow()
  const state = ref<string | null>(null)
  const handled = ref(false)

  // hash
  const hash = ref()
  const listener = () => {
    hash.value = window.location.hash.slice(1).trim()
  }
  onMounted(() => {
    listener()
    window.addEventListener('hashchange', listener)
  })
  onBeforeUnmount(() => window.removeEventListener('hashchange', listener))

  // handle auth callback
  watchEffect(() => {
    if (!hash.value) return

    enokiFlow
      .handleAuthCallback(hash.value)
      .then((_state) => {
        state.value = _state
        window.location.hash = ''
      })
      .finally(() => {
        handled.value = true
      })
  })

  return { handled, state }
}
