import { ref, onMounted, onBeforeUnmount, watchEffect, inject } from 'vue'
import { useStore } from '@nanostores/vue'
import { _EnokiFlowKey } from './plugin.js'

/**
 * Manages state for Enoki authentication.
 *
 * @returns EnokiFlow instance.
 */
export function useEnokiFlow() {
  return inject(_EnokiFlowKey)!
}

/**
 * Use the current ZkLogin state.
 */
export function useZkLogin() {
  const enokiFlow = useEnokiFlow()
  return useStore(enokiFlow.$zkLoginState)
}

/**
 * Use the current ZkLogin Session
 */
export function useZkLoginSession() {
  const enokiFlow = useEnokiFlow()
  return useStore(enokiFlow.$zkLoginSession).value
}

/**
 * An auth callback to handle redirect after a successful log in
 *
 *
 *  @example
 *
 * ```ts
 * const { handled } = useAuthCallback();
 *
 * watchEffect(() => {
 *   if (handled.value) {
 *     // redirect to the home page
 *     router.push('/')
 *   }
 * })
 * ```
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
