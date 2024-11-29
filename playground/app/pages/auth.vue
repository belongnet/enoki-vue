<script setup lang="ts">
import { useAuthCallback } from '@belongnet/enoki-vue'
const { handled } = useAuthCallback()

const router = useRouter()

watchEffect(() => {
  if (handled.value) {
    console.log('handled')

    setTimeout(() => {
      router.push('/redirect')
    }, 1500)
  }
})
</script>

<template>
  <div>
    <template v-if="handled">
      <UIcon name="lucide:loader-2" class="animate-spin" :size="7" />
      <div>Redirecting...</div>
    </template>
    <template v-else> Auth not handled </template>
  </div>
</template>
