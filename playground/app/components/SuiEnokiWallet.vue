<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { registerEnokiWallets, type AuthProvider } from '@mysten/enoki'
import { suiClient } from '~/config/sui-client'
import type { WalletAccount } from '@mysten/wallet-standard'
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'

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
  },
]))

const googleNonce = ref('')

async function initializeEnokiWallets() {
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
    // customAuthorization: async ({ oauthUrl, provider, network }) => {
    //   console.log('customAuthorization', { oauthUrl, provider, network })

    //   if (provider === 'google') {
    //     const searchParams = new URLSearchParams(oauthUrl)
    //     const nonce_ = searchParams.get('nonce')

    //     if (nonce_) {
    //       googleNonce.value = nonce_
    //     }
    //   }

    //   // start login flow

    //   return {
    //     hash: '123',
    //     search: '123',
    //   }
    // },

  })

  await nextTick()

  await getAccounts()

  if (connectedAccounts.value?.length) {
    activeStep.value = Step.Connected
  }
  else {
    activeStep.value = Step.Connection
  }
}

const sessionContext = shallowRef()
const authorizationUrl = ref('')

async function connect(provider: AuthProvider) {
  if (!enokiWallets.value) {
    console.warn('Enoki wallets not initialized')
    return
  }

  const result = await enokiWallets.value.wallets[provider]?.features['standard:connect'].connect({
    disablePopup: true,
  })

  console.log('result', result)

  if (result && 'authorizationUrl' in result) {
    sessionContext.value = result.sessionContext

    // handle auth
    authorizationUrl.value = result.authorizationUrl

    const url = new URL(result.authorizationUrl)

    console.log('url', Object.fromEntries(url.searchParams.entries()))

    const nonce_ = url.searchParams.get('nonce')

    if (nonce_) {
      googleNonce.value = nonce_
    }

    // or like
    // window.open(result.authorizationUrl, '_blank')
  }
}

async function getAccounts() {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const result = enokiWallets.value?.wallets.google?.accounts

  const accounts = result?.map(account => ({
    address: account.address,
    publicKey: account.publicKey,
    chains: account.chains,
    features: account.features,
    label: account.label,
    icon: account.icon,
  }))

  connectedAccounts.value = accounts

  return accounts
}

async function handleAuthCallback(response: CredentialResponse) {
  console.log('handleAuthCallback', response)

  try {
  // not async
    await enokiWallets.value?.wallets['google']?.features['enoki:handleAuthCallback'].handleAuthCallback({
      hash: 'id_token=' + response.credential,
      search: '',
      sessionContext: sessionContext.value,
    })
  }
  catch (error) {
    console.error('handleAuthCallback error', error)
  }

  getAccounts()

  activeStep.value = Step.Connected
}

function disconnect() {
  enokiWallets.value?.wallets.google?.features['standard:disconnect'].disconnect()

  connectedAccounts.value = []

  activeStep.value = Step.Connection
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

    <UStepper
      v-model="activeStep"
      :items="items"
      size="sm"
      class="w-full p-4"
    >
      <template #initialize>
        <p class="pb-2">
          Initialize Enoki Wallets
        </p>
        <UButton @click="initializeEnokiWallets">
          Initialize Enoki Wallets
        </UButton>
      </template>

      <template #connection>
        <p class="pb-2">
          Connection
        </p>

        <div class="flex flex-col gap-2">
          <template
            v-for="(wallet, provider) in enokiWallets?.wallets"
            :key="provider"
          >
            <div v-if="wallet">
              <UButton @click="connect(provider)">
                Generate nonce {{ provider }}
              </UButton>

              <p>nonce: {{ googleNonce }}</p>
              <template v-if="googleNonce && provider === 'google'">
                <GoogleSignInButton
                  :nonce="googleNonce"
                  @success="handleAuthCallback"
                  @error="console.error('Google sign in error', $event)"
                />
              </template>
            </div>
          </template>
        </div>
      </template>

      <template #connected>
        <p class="pb-2">
          Connected
        </p>

        <div
          v-if="connectedAccounts?.length"
          class="flex flex-col gap-2"
        >
          <template
            v-for="(wallet, i) in connectedAccounts"
            :key="i"
          >
            <div v-if="wallet">
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(value, key, j) in wallet"
                  :key="key + j"
                >
                  <template v-if="key === 'icon'">
                    <img
                      :src="value as string"
                      alt="Wallet Logo"
                      class="w-10 h-10"
                    >
                  </template>
                  <template v-else>
                    <span class="font-bold">{{ key }}:</span>
                    <span>{{ value }}</span>
                  </template>
                </li>
              </ul>
              <UButton @click="disconnect">
                Disconnect
              </UButton>
            </div>
          </template>
        </div>
      </template>
    </UStepper>
  </section>
</template>
