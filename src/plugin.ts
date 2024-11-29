import type { InjectionKey, Plugin } from 'vue'
import type { EnokiFlowConfig } from '@mysten/enoki'
import { EnokiFlow } from '@mysten/enoki'

export const enokiFlow = null
export const _EnokiFlowKey: InjectionKey<EnokiFlow> = Symbol('enokiFlow')

export type EnokiPluginOptions = {
  config: EnokiFlowConfig
}

export const EnokiPlugin = {
  install(app, options) {
    const { config } = options
    app.provide(_EnokiFlowKey, new EnokiFlow(config))
  },
} satisfies Plugin<EnokiPluginOptions>
