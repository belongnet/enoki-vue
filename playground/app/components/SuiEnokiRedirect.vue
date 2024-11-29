<script setup lang="ts">
import { useAuthCallback, useEnokiFlow, useZkLogin } from '@belongnet/enoki-vue'

const enokiFlow = useEnokiFlow()
const { handled } = useAuthCallback()
const suiState = useZkLogin()

const handleSignIn = async () => {
  const baseUrl = import.meta.env.BASE_URL
  const redirectUrl = `${window.location.origin}${baseUrl ? baseUrl : '/'}redirect`

  console.log({ redirectUrl, baseUrl })

  const googleSignInUrl = await enokiFlow.createAuthorizationURL({
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
</script>

<template>
  <section>
    <template v-if="!suiState?.address">
      <UButton
        icon="i-logos:google-icon"
        variant="outline"
        @click="handleSignIn()"
        >Login</UButton
      >
    </template>
    <template v-else>
      <p>Already logged in</p>
    </template>
  </section>
</template>
