<script setup lang="ts">
import { useEnokiFlow, useZkLogin } from '@belongnet/enoki-vue'
import { joinURL } from 'ufo'

const config = useRuntimeConfig()
const enokiFlow = useEnokiFlow()
const suiState = useZkLogin()

const handleSignIn = async () => {
  const baseUrl = config.app.baseURL
  const redirectUrl = joinURL(
    window.location.origin,
    baseUrl ? baseUrl : '',
    '/auth'
  )

  console.log({ redirectUrl, baseUrl })

  const googleSignInUrl = await enokiFlow.createAuthorizationURL({
    provider: 'google',
    network: 'testnet',
    clientId: config.public.googleClientId,
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
