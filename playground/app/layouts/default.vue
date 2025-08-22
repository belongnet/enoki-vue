<script lang="ts" setup>
import { ref } from 'vue'

const headerItems = ref([
  {
    icon: 'i-lucide:house',
    to: '/',
  },
  {
    label: 'Wallet',
    icon: 'i-lucide:wallet',
    to: '/wallet',
  },
  {
    label: 'Redirect (deprecated)',
    icon: 'i-lucide:send-to-back',
    to: '/redirect',
  },
  {
    label: 'Plugins (deprecated)',
    icon: 'i-lucide:box',
    to: '/plugins',
  },
])

const footerItems = ref([
  {
    label: 'cm',
    slot: 'cm',
    as: 'div',
  },
  {
    label: '',
    to: 'https://belong.net/',
    slot: 'belong',
  },
  {
    icon: 'i-simple-icons-github',
    to: 'https://github.com/belongnet/enoki-vue',
    target: '_blank',
  },
])
</script>

<template>
  <div class="app">
    <header class="mt-4">
      <h1>Sui Enoki playground for Vue 3</h1>
      <UNavigationMenu
        :items="headerItems"
        class="justify-center"
      />
      <AccountState class="py-2" />
    </header>

    <UContainer
      as="main"
      class="overflow-x-hidden"
    >
      <slot />
    </UContainer>

    <footer>
      <UNavigationMenu
        :items="footerItems"
        class="justify-center"
        variant="link"
      >
        <template #belong>
          2024 &copy; Belong.net
        </template>
        <template #cm>
          <ColorModeButton />
        </template>
      </UNavigationMenu>
    </footer>
  </div>
</template>
