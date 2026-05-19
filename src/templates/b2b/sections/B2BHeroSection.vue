<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import UiButton from '../../../components/shared/UiButton.vue'
import heroMainBgUrl from '../../../assets/b2b-hero-main.jpg'
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
    id="b2b-hero"
    class="w-full"
  >
    <div
      class="relative isolate overflow-hidden bg-[#08050D] text-white "
      :style="{
        backgroundImage: `url(${heroMainBgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }"
    >
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,7,17,0.7)_0%,rgba(12,7,17,0.3)_44%,rgba(12,7,17,0.54)_100%)]"></div>

      <div class="relative z-[1] mx-auto w-[min(1200px,calc(100%-40px))] pt-[100px] pb-[110px] max-[1200px]:pt-[88px] max-[1200px]:pb-[96px] max-[1024px]:pt-[72px] max-[1024px]:pb-[78px] max-[900px]:pt-[56px] max-[900px]:pb-[60px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[118px] max-[768px]:pb-[34px]">
        <div class="grid items-start gap-x-[56px] gap-y-10 min-[1025px]:grid-cols-[minmax(0,1fr)_500px] max-[1024px]:grid-cols-[minmax(0,1fr)_420px] max-[900px]:grid-cols-1 max-[900px]:gap-y-7">
        <div class="max-w-[560px] max-[900px]:max-w-full">
          <p class="m-0 hidden font-[var(--font-sans)] text-[13px] uppercase leading-[1.4] tracking-[0.08em] text-[#d95a83] max-[768px]:block">
            Zida Ziedi - надежный партнер
          </p>

          <h1 class="m-0 w-full [font-family:var(--font-display)] text-[56px] font-normal leading-[64px] tracking-[-1.44px] text-white max-[1024px]:text-[48px] max-[1024px]:leading-[56px] max-[768px]:mt-[12px] max-[768px]:text-[33px] max-[768px]:leading-[1.06] max-[768px]:tracking-[-0.035em]">
            Сотрудничество для агентств, площадок и организаторов
          </h1>

          <p class="m-0 mt-[23px] max-w-[560px] font-[var(--font-sans)] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-white max-[1024px]:max-w-[470px] max-[768px]:mt-[18px] max-[768px]:max-w-[350px] max-[768px]:text-[13px] max-[768px]:leading-[1.52] max-[768px]:text-white/76">
            Мы создаем выразительный декор, который помогает вам предлагать клиентам стильные и готовые решения.
          </p>

          <div class="mt-[23px] max-[900px]:hidden">
            <UiButton
              href="#contact"
              label="Получить предложение"
              class="min-h-0 min-w-[262px] px-[34px] py-[17px] [font-family:var(--font-display)] text-[13px] font-normal leading-[22px] tracking-[-0.26px] uppercase"
            />
          </div>
        </div>

        <div
          class="group relative ml-auto h-[315px] w-[500px] overflow-hidden rounded-[12px] border-[3px] mt-[5px] border-white/20 bg-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] max-[900px]:mx-auto max-[900px]:h-auto max-[900px]:w-full max-[900px]:max-w-full max-[768px]:order-3 max-[768px]:rounded-[22px] max-[768px]:border-white/15"
          @mouseenter="isVideoHovered = true"
          @mouseleave="isVideoHovered = false"
        >
          <video
            ref="videoRef"
            :src="videoUrl"
            class="block h-[315px] w-[500px] object-cover max-[900px]:h-auto max-[900px]:w-full max-[768px]:aspect-[1.42/1] max-[768px]:min-h-[230px]"
            muted
            loop
            preload="metadata"
            playsinline
            @play="isVideoPaused = false"
            @pause="isVideoPaused = true"
          ></video>

          <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,7,17,0.06)_0%,rgba(12,7,17,0.18)_58%,rgba(12,7,17,0.34)_100%)]"></div>

          <button
            type="button"
            @click="toggleVideo"
            class="absolute left-1/2 top-1/2 inline-flex h-[91px] w-[91px] -translate-x-1/2 -translate-y-[58px] items-center justify-center rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:scale-[1.02] max-[768px]:h-[84px] max-[768px]:w-[84px] max-[768px]:-translate-y-[52px]"
            :class="isVideoControlVisible ? 'opacity-100' : 'pointer-events-none opacity-0'"
            :aria-label="isVideoPaused ? 'Воспроизвести видео о нашей работе' : 'Поставить видео о нашей работе на паузу'"
          >
            <span class="relative inline-flex h-[20px] w-[20px] items-center justify-center max-[768px]:h-[24px] max-[768px]:w-[24px]">
              <img
                :src="playIconUrl"
                alt=""
                class="absolute ml-[5px] h-full w-full transition-all duration-300"
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

          <p
            class="pointer-events-none absolute left-1/2 top-1/2 m-0 w-[calc(100%-40px)] -translate-x-1/2 translate-y-[42px] text-center font-[var(--font-sans)] text-[20.259px] font-normal leading-[34.729px] tracking-[-0.405px] text-white transition-opacity duration-300 max-[768px]:w-[calc(100%-36px)] max-[768px]:translate-y-[28px] max-[768px]:text-[14px] max-[768px]:leading-[1.3]"
            :class="isVideoControlVisible ? 'opacity-100' : 'opacity-0'"
          >
            Смотреть видео о нашей работе
          </p>
        </div>

        <div class="hidden max-[900px]:block max-[768px]:order-4">
          <UiButton
            href="#contact"
            label="Получить предложение"
            block
            class="min-h-[72px] [font-family:var(--font-display)] text-[13px] font-normal leading-[22px] tracking-[-0.26px] uppercase max-[768px]:min-h-[56px] max-[768px]:text-[12px]"
          />
        </div>
        </div>
      </div>
    </div>
  </section>
</template>
