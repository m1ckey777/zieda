<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import decorShowcaseVideoUrl from '../../assets/decor-showcase.mp4'
import pauseIconUrl from '../../assets/pause-ic.svg'
import playIconUrl from '../../assets/play-ic.svg'

const decorVideoRef = ref(null)
const isDecorVideoPaused = ref(true)
const isDecorVideoHovered = ref(false)
const canHover = ref(true)
let hoverMediaQuery = null

const updateCanHover = (event) => {
  canHover.value = event?.matches ?? hoverMediaQuery?.matches ?? true
}

const isDecorVideoControlVisible = computed(() => {
  return isDecorVideoPaused.value || isDecorVideoHovered.value || !canHover.value
})

const decorStats = [
  {
    value: '7,600',
    suffix: 'm²',
    label: 'Оформленных площадей',
  },
  {
    value: '500',
    suffix: '+',
    label: 'Проведённых мероприятий',
  },
  {
    value: '15',
    suffix: '+',
    label: 'Постоянных партнёров',
  },
]

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

const toggleDecorVideo = async () => {
  if (!decorVideoRef.value) return

  if (decorVideoRef.value.paused) {
    try {
      await decorVideoRef.value.play()
      isDecorVideoPaused.value = false
    } catch {
      isDecorVideoPaused.value = true
    }

    return
  }

  decorVideoRef.value.pause()
  isDecorVideoPaused.value = true
}
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pb-16">
    <div class="rounded-[40px] bg-white px-[68px] py-[70px] shadow-[0_22px_60px_rgba(34,17,46,0.08)] max-[768px]:rounded-[28px] max-[768px]:px-6 max-[768px]:pt-[30px] max-[768px]:pb-[24px]">
      <h2 class="m-0 text-center [font-family:var(--font-display)] text-[40px] font-normal leading-[48px] tracking-[-0.7px] text-[#22112E] max-[768px]:text-[32px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        Наши декорации украшают события по всей Балтии
      </h2>

      <div class="mt-12 grid grid-cols-3 gap-8 max-[768px]:mt-[30px] max-[768px]:grid-cols-1 max-[768px]:gap-[24px]">
        <article v-for="item in decorStats" :key="item.label" class="text-center">
          <p class="m-0 text-center [font-family:var(--font-accent)] text-[62px] font-normal leading-[74.4px] tracking-[-1.5px] text-[#4D286C]">
            {{ item.value }}<span>{{ item.suffix }}</span>
          </p>
          <p class="mt-2 text-center [font-family:var(--font-display)] text-[17px] font-normal leading-[30.4px] text-[#282828] max-[768px]:mt-0">
            {{ item.label }}
          </p>
        </article>
      </div>

      <p class="mx-auto mt-12 max-w-[600px] text-center text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#2F2F2F] max-[768px]:mt-[24px] max-[768px]:max-w-[300px] max-[768px]:text-[14px] max-[768px]:leading-[24px] max-[768px]:tracking-[-0.28px]">
        Каждый проект — это внимание к деталям и стремление превзойти ожидания.
      </p>

      <div
        class="group relative mt-12 overflow-hidden rounded-[24px] max-[768px]:mt-[24px] max-[768px]:rounded-[20px]"
        @mouseenter="isDecorVideoHovered = true"
        @mouseleave="isDecorVideoHovered = false"
      >
        <video
          ref="decorVideoRef"
          :src="decorShowcaseVideoUrl"
          class="block h-[371px] w-full object-cover max-[768px]:h-[220px]"
          loop
          muted
          preload="metadata"
          playsinline
          @play="isDecorVideoPaused = false"
          @pause="isDecorVideoPaused = true"
        ></video>

        <div class="absolute inset-0 bg-black/40"></div>

        <button
          type="button"
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 max-[768px]:gap-2"
          :class="isDecorVideoControlVisible ? 'opacity-100' : 'pointer-events-none opacity-0'"
          @click="toggleDecorVideo"
          :aria-label="isDecorVideoPaused ? 'Воспроизвести видео о нашей работе' : 'Поставить видео о нашей работе на паузу'"
        >
          <span class="inline-flex h-[63px] w-[63px] shrink-0 items-center justify-center rounded-[63px] bg-white pl-[3px]">
            <img
              :src="isDecorVideoPaused ? playIconUrl : pauseIconUrl"
              alt=""
              class="block h-5 w-5"
            />
          </span>
          <span
            class="text-center text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-white transition duration-300 max-[768px]:text-[14px] max-[768px]:leading-[24px]"
            :class="isDecorVideoPaused ? 'opacity-100' : 'hidden opacity-0'"
          >
            Смотреть видео о нашей работе
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
