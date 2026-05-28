<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import pauseButtonIconUrl from '../../assets/pause-btn-ic.svg'
import playButtonIconUrl from '../../assets/play-btn-ic.svg'
import videoUrl from '../../assets/wedding-video.mp4'
import { useLanguage } from '../../composables/useLanguage'

const videoRef = ref(null)
const isVideoPaused = ref(true)
const isVideoHovered = ref(false)
const canHover = ref(true)
let hoverMediaQuery = null
const { t } = useLanguage()

const updateCanHover = (event) => {
  canHover.value = event?.matches ?? hoverMediaQuery?.matches ?? true
}

const isVideoControlVisible = computed(() => {
  return isVideoPaused.value || isVideoHovered.value || !canHover.value
})

onMounted(() => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

  hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  updateCanHover()

  if (typeof hoverMediaQuery.addEventListener === 'function') {
    hoverMediaQuery.addEventListener('change', updateCanHover)
    return
  }

  hoverMediaQuery.addListener(updateCanHover)
})

onBeforeUnmount(() => {
  if (!hoverMediaQuery) return

  if (typeof hoverMediaQuery.removeEventListener === 'function') {
    hoverMediaQuery.removeEventListener('change', updateCanHover)
    return
  }

  hoverMediaQuery.removeListener(updateCanHover)
})

const toggleVideo = async () => {
  if (!videoRef.value) return

  if (videoRef.value.paused) {
    try {
      await videoRef.value.play()
      isVideoPaused.value = false
    } catch {
      isVideoPaused.value = true
    }

    return
  }

  videoRef.value.pause()
  isVideoPaused.value = true
}
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[46px] pb-[92px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-0 max-[768px]:pb-0">
    <div
      class="group relative overflow-hidden rounded-[28px] max-[768px]:rounded-[20px]"
      @mouseenter="isVideoHovered = true"
      @mouseleave="isVideoHovered = false"
    >
      <video
        ref="videoRef"
        :src="videoUrl"
        class="block h-[610px] w-full object-cover max-[768px]:h-[285px]"
        muted
        loop
        preload="metadata"
        playsinline
        @play="isVideoPaused = false"
        @pause="isVideoPaused = true"
      ></video>

      <button
        type="button"
        @click="toggleVideo"
        class="absolute left-1/2 top-1/2 inline-flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/55 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] max-[768px]:h-[72px] max-[768px]:w-[72px]"
        :class="isVideoControlVisible ? 'opacity-100' : 'pointer-events-none opacity-0'"
        :aria-label="isVideoPaused ? t.home.video.playAria : t.home.video.pauseAria"
      >
        <span class="relative inline-flex h-[58px] w-[58px] items-center justify-center max-[768px]:h-[20px] max-[768px]:w-[20px]">
          <img
            :src="playButtonIconUrl"
            alt=""
            class="absolute h-full w-full transition-all duration-300 ml-[7px] max-[768px]:ml-[5px]"
            :class="isVideoPaused ? 'scale-100 opacity-100' : 'scale-75 opacity-0'"
          />
          <img
            :src="pauseButtonIconUrl"
            alt=""
            class="absolute h-full w-full transition-all duration-300"
            :class="isVideoPaused ? 'scale-75 opacity-0' : 'scale-100 opacity-100'"
          />
        </span>
      </button>
    </div>
  </section>
</template>
