import {
  ref,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  watchEffect,
  type ShallowRef,
} from 'vue'
import { EnokiFlow, type EnokiFlowConfig } from '@mysten/enoki'
import { useStore } from '@nanostores/vue'

const enokiFlow = shallowRef<EnokiFlow | null>(null)

export function useEnokiFlow(config?: EnokiFlowConfig): ShallowRef<EnokiFlow> {
  if (!enokiFlow.value) {
    if (!config) {
      throw new Error('EnokiFlow not initialized, please provide config first')
    }

    enokiFlow.value = new EnokiFlow(config)
  }

  return enokiFlow as ShallowRef<EnokiFlow>
}

export function useZkLogin() {
  const flow = useEnokiFlow()
  return useStore(flow.value.$zkLoginState)
}

export function useZkLoginSession() {
  const flow = useEnokiFlow()
  return useStore(flow.value.$zkLoginSession).value
}

export function useAuthCallback() {
  const flow = useEnokiFlow()
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

    flow.value
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
