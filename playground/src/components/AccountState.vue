<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useEnokiFlow, useZkLogin } from '@belongnet/enoki-vue'
import { suiClient } from '../config/enoki'
import { MIST_PER_SUI } from '@mysten/sui/utils'
import truncateEthAddress from 'truncate-eth-address'

const enokiFlow = useEnokiFlow()
const suiState = useZkLogin()
const balance = ref()

async function reloadBalance() {
  if (!suiState.value.address) return

  balance.value = '...'
  const result = await suiClient.getBalance({
    owner: suiState.value.address,
  })

  balance.value = Number.parseInt(result.totalBalance) / Number(MIST_PER_SUI)
}

watchEffect(() => {
  if (suiState.value.address) {
    reloadBalance()
  }
})
</script>

<template>
  <section v-if="suiState.address" class="flex items-center flex-col">
    <UCard
      :ui="{
        body: 'p-1 sm:p-2',
      }"
    >
      <div class="flex gap-4 items-center">
        <template v-if="suiState.provider">
          <UIcon
            v-if="suiState.provider === 'google'"
            name="i-logos:google-icon"
            class="size-4"
          />
        </template>

        <p class="font-mono font-semibold text-sm">
          {{ truncateEthAddress(suiState.address) }}
        </p>

        <div class="flex items-center gap-1">
          <span class="font-mono font-semibold text-sm">
            <b>{{ balance }}</b> SUI</span
          >

          <UButton
            @click="reloadBalance()"
            variant="ghost"
            size="xs"
            icon="i-lucide:refresh-ccw"
          ></UButton>
        </div>

        <UButton @click="enokiFlow.logout()" icon="i-lucide:log-out" size="sm"
          >Logout</UButton
        >
      </div>
    </UCard>
  </section>

  <section v-else>
    <p>Not logged in</p>
  </section>
</template>
