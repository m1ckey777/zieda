<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import pauseIconUrl from '../../../assets/pause-ic.svg'
import playIconUrl from '../../../assets/play-ic.svg'
import videoUrl from '../../../assets/decor-showcase.mp4'

const videoRef = ref(null)
const isVideoPaused = ref(true)
const isVideoHovered = ref(false)
const canHover = ref(true)
let hoverMediaQuery = null

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
  <section
    id="event-decor-video"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[48px] pb-[88px] max-[768px]:w-[calc(100%-32px)] max-[768px]:pt-[40px] max-[768px]:pb-[48px]"
  >
    <div class="grid items-start gap-x-[48px] gap-y-[28px] min-[901px]:grid-cols-[360px_minmax(0,1fr)] max-[900px]:grid-cols-1">
      <div>
        <p class="m-0 mb-[5px] font-[var(--font-display)] text-[13px] font-normal uppercase leading-[20px] tracking-[-0.7px] text-[#22112E] max-[768px]:mb-0 max-[768px]:text-[16px] max-[768px]:leading-[20px] max-[768px]:tracking-[-0.32px]">
          #BACKSTAGE
        </p>

        <h2 class="m-0 [font-family:var(--font-display)] text-[32px] font-normal leading-[40px] tracking-[-0.7px] text-[#22112E] max-[768px]:mt-[8px] max-[768px]:text-[36px] max-[768px]:leading-[40px]">
          Магия, которая остаётся за кадром
        </h2>

        <p class="m-0 mt-[16px] max-w-[356px] font-[var(--font-sans)] text-[14px] font-normal leading-[24px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-[12px] max-[768px]:max-w-full max-[768px]:text-[16px] max-[768px]:leading-[27px]">
          Короткое видео о том, как мы работаем: создаём, собираем и устанавливаем инсталляции любой сложности.
        </p>
      </div>

      <div
        class="group relative overflow-hidden rounded-[20px] max-[768px]:rounded-[20px]"
        @mouseenter="isVideoHovered = true"
        @mouseleave="isVideoHovered = false"
      >
        <video
          ref="videoRef"
          :src="videoUrl"
          class="block h-[464px] w-full object-cover max-[768px]:h-[308px]"
          muted
          loop
          preload="metadata"
          playsinline
          @play="isVideoPaused = false"
          @pause="isVideoPaused = true"
        ></video>

        <div class="absolute inset-0 bg-black/20"></div>

        <button
          type="button"
          @click="toggleVideo"
          class="absolute left-1/2 top-1/2 inline-flex h-[125px] w-[125px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/55 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] max-[768px]:h-[78px] max-[768px]:w-[78px]"
          :class="isVideoControlVisible ? 'opacity-100' : 'pointer-events-none opacity-0'"
          :aria-label="isVideoPaused ? 'Воспроизвести backstage-видео' : 'Поставить backstage-видео на паузу'"
        >
          <span class="relative inline-flex h-[30px] w-[30px] items-center justify-center max-[768px]:h-[25px] max-[768px]:w-[25px]">
            <img
              :src="playIconUrl"
              alt=""
              class="absolute ml-[7px] h-full w-full transition-all duration-300 max-[768px]:ml-[5px]"
              :class="isVideoPaused ? 'scale-100 opacity-100' : 'scale-115 opacity-0'"
            />
            <img
              :src="pauseIconUrl"
              alt=""
              class="absolute h-full w-full transition-all duration-300"
              :class="isVideoPaused ? 'scale-100 opacity-0' : 'scale-115 opacity-100'"
            />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
