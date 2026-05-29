<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logoUrl from './assets/logo.svg'

const isLoading = ref(true)
let fallbackTimer = null

const finishLoading = () => {
  window.setTimeout(() => {
    isLoading.value = false
  }, 180)
}

onMounted(() => {
  if (document.readyState === 'complete') {
    finishLoading()
    return
  }

  window.addEventListener('load', finishLoading, { once: true })
  fallbackTimer = window.setTimeout(finishLoading, 1400)
})

onBeforeUnmount(() => {
  window.removeEventListener('load', finishLoading)

  if (fallbackTimer) {
    window.clearTimeout(fallbackTimer)
  }
})
</script>

<template>
  <Transition name="preloader-fade">
    <div v-if="isLoading" class="page-preloader" aria-label="Loading">
      <div class="page-preloader__mark">
        <img :src="logoUrl" alt="Zida Ziedi" />
      </div>
    </div>
  </Transition>

  <RouterView v-slot="{ Component }">
    <Transition name="route-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
