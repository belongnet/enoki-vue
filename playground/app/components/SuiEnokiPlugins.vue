<script setup lang="ts">
import { useEnokiFlow, useZkLogin } from '@belongnet/enoki-vue'
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'

const enokiFlow = useEnokiFlow()
const suiState = useZkLogin()
const nonce = ref('')

const generateNonce = async () => {
  const url = await enokiFlow?.createAuthorizationURL({
    provider: 'google',
    network: 'testnet',
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_APP_ID_WEB,
    redirectUrl: '',
    extraParams: {
      scope: ['openid', 'email', 'profile'],
    },
  })

  const searchParams = new URLSearchParams(url)
  const nonce_ = searchParams.get('nonce')

  if (nonce_) {
    nonce.value = nonce_
  }
}

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  console.log({ response })
  await enokiFlow.handleAuthCallback('id_token=' + response.credential)
}

// handle an error event
const handleLoginError = () => {
  console.error('Login failed')
}
</script>

<template>
  <section v-if="!suiState?.address">
    <h3>Google</h3>

    <UButton @click="generateNonce()">Start new session</UButton>

    <template v-if="nonce">
      <p>nonce: {{ nonce }}</p>
      <GoogleSignInButton
        :nonce="nonce"
        @success="handleLoginSuccess"
        @error="handleLoginError"
      />
    </template>
  </section>
  <section v-else>
    <p>Already logged in</p>
  </section>
</template>
