<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { registerEnokiWallets, type AuthProvider } from '@mysten/enoki';
import { suiClient } from '~/config/sui-client'
import { StandardConnect, type WalletAccount } from '@mysten/wallet-standard'

const config = useRuntimeConfig()

const enokiWallets = shallowRef<ReturnType<typeof registerEnokiWallets>>()
const activeStep = ref(0)
const connectedAccounts = shallowRef<WalletAccount[]>()


enum Step {
  Initialize,
  Connection,
  Connected,
}

const items = computed<StepperItem[]>(() => ([
  {
    title: '1. Wallet Setup',
    description: 'Initialize your Enoki wallet',
    icon: 'i-lucide-wallet',
    slot: 'initialize',
    disabled: false,
  }, {
    title: '2. Connection',
    description: 'Connect to Sui network',
    icon: 'i-lucide-link',
    slot: 'connection',
    disabled: !enokiWallets.value,
  }, {
    title: '3. Connected',
    description: 'Your wallet is ready to use',
    disabled: !connectedAccounts.value,
    slot: 'connected',
  }
]))


function initializeEnokiWallets() {

  if (enokiWallets.value) {
    console.warn('Enoki wallets already initialized')
    return
  }

  enokiWallets.value = registerEnokiWallets({
    client: suiClient,
    network: 'testnet',
    apiKey: config.public.enokiApiKey,
    providers: {
      google: {
        clientId: config.public.googleClientId,
        redirectUrl: 'http://localhost:3000/sui-enoki-wallet',
      },
      //  facebook: {
      //      clientId: 'YOUR_FACEBOOK_CLIENT_ID',
      //  },
      //  twitch: {
      //      clientId: 'YOUR_TWITCH_CLIENT_ID',
      //  },
    },
  })

  activeStep.value = Step.Connection
}

async function connect(provider: AuthProvider) {
  if (!enokiWallets.value) {
    console.warn('Enoki wallets not initialized')
    return
  }

  const result = await enokiWallets.value.wallets[provider]?.features[StandardConnect].connect()

  if (result) {
    console.log(result)

    connectedAccounts.value = result.accounts.map((account) => ({
      address: account.address,
      publicKey: account.publicKey,
      chains: account.chains,
      features: account.features,
      label: account.label,
      icon: account.icon,
    }))

    activeStep.value = Step.Connected

    console.log(connectedAccounts.value)
  }
}


onMounted(() => {
  initializeEnokiWallets()
})

</script>

<template>
  <section>
    <h3>Sui Enoki Wallet</h3>
    <p class="text-sm text-gray-500">
      Use <code>registerEnokiWallets</code>, instead deprecated <code>EnokiFlow</code>.
    </p>


    <UStepper :items="items" size="sm" class="w-full p-4" v-model="activeStep">


      <template #initialize>
        <p class="pb-2">
          Initialize Enoki Wallets
        </p>
          <UButton @click="initializeEnokiWallets">Initialize Enoki Wallets</UButton>

      </template>

      <template #connection>
        <p class="pb-2">Connection</p>

          <div class="flex flex-col gap-2">
            <template v-for="(wallet, provider) in enokiWallets?.wallets" :key="provider">
              <div v-if="wallet">
                <UButton @click="connect(provider)">Connect {{ provider }}</UButton>
              </div>
            </template>
          </div>
      </template>

      <template #connected>
        <p class="pb-2">Connected</p>

        <div class="flex flex-col gap-2" v-if="connectedAccounts?.length">

          <template v-for="(wallet, i) in connectedAccounts" :key="i">
            <div v-if="wallet">
              <ul class="flex flex-col gap-2">
                <li v-for="(value, key, j) in wallet" :key="key + j">
                  <template v-if="key === 'icon'">
                    <img :src="value as string" alt="Wallet Logo" class="w-10 h-10">
                  </template>
                  <template v-else>
                    <span class="font-bold">{{ key }}:</span>
                    <span>{{ value }}</span>
                  </template>
                </li>
              </ul>

            </div>
          </template>
        </div>
      </template>

    </UStepper>
  </section>
</template>