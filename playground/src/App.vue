<script lang="ts" setup>
import AccountState from './components/AccountState.vue'
import { ref } from 'vue'

const items = ref([
  {
    icon: 'i-lucide:house',
    to: '/',
  },

  {
    label: 'Redirect',
    icon: 'i-lucide:send-to-back',
    to: '/redirect',
  },
  {
    label: 'Plugins',
    icon: 'i-lucide:box',
    to: '/plugins',
  },
])
</script>

<template>
  <UApp>
    <div class="app">
      <header class="mt-4">
        <h1>Sui Enoki playground for Vue 3</h1>
        <UNavigationMenu :items="items" class="justify-center" />
        <AccountState class="py-2" />
      </header>

      <main class="container mx-auto">
        <RouterView />
      </main>

      <footer>
        2024 &copy; <a href="https://belong.net/" target="_blank">Belong.net</a>
      </footer>
    </div>
  </UApp>
</template>
