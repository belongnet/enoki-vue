<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEnokiFlow, useAuthCallback, useZkLogin } from '@belongnet/enoki-vue'
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'
import { MIST_PER_SUI } from '@mysten/sui/utils'

const enokiFlow = useEnokiFlow({
  apiKey: import.meta.env.VITE_ENOKI_API_KEY,
})
const { handled } = useAuthCallback()
const suiState = useZkLogin()

const handleSignIn = async () => {
  const redirectUrl = `${window.location.origin}`

  console.log({ redirectUrl })

  const googleSignInUrl = await enokiFlow.value?.createAuthorizationURL({
    provider: 'google',
    network: 'testnet',
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_APP_ID_WEB,
    redirectUrl,
    extraParams: {
      scope: ['openid', 'email', 'profile'],
    },
  })

  console.log(googleSignInUrl)

  if (googleSignInUrl) {
    window.location.href = googleSignInUrl
  }
}

watchEffect(() => {
  if (handled.value) {
    console.log('handled')
  }
})

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') })
const balance = ref()

async function reloadBalance() {
  balance.value = 'loading...'
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
  <header>
    <h1>Playground Enoki vue</h1>
  </header>

  <main class="container">
    <section v-if="suiState.address">
      <h2>Balance</h2>
      <p>
        <b>{{ balance }}</b> SUI
        <button @click="reloadBalance()">reload</button>
      </p>
      <pre>{{ JSON.stringify(suiState, null, 2) }}</pre>
      <button @click="enokiFlow.logout()">Logout</button>
    </section>

    <section v-else>
      <button @click="handleSignIn()">Login</button>
    </section>
  </main>

  <footer>2024 &copy; Belongnet</footer>
</template>
