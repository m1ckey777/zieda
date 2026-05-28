<script setup>
import { computed, ref } from 'vue'
import UiButton from '../../../components/shared/UiButton.vue'
import portfolioImage1Url from '../../../assets/event-decor-portfolio-1.jpg'
import portfolioImage2Url from '../../../assets/event-decor-portfolio-2.jpg'
import portfolioImage3Url from '../../../assets/event-decor-portfolio-3.jpg'
import portfolioImage4Url from '../../../assets/event-decor-portfolio-4.jpg'
import portfolioImage5Url from '../../../assets/event-decor-portfolio-5.jpg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()

const portfolioImages = [
  portfolioImage1Url,
  portfolioImage2Url,
  portfolioImage3Url,
  portfolioImage4Url,
  portfolioImage5Url,
]

const portfolioItems = computed(() =>
  portfolioImages.map((image, index) => ({
    image,
    alt: t.value.eventDecor.portfolio.imageAlts[index],
  })),
)

const portfolioSliderRef = ref(null)
const isPortfolioDragging = ref(false)
let portfolioDragStartX = 0
let portfolioStartScrollLeft = 0
let activePortfolioPointerId = null

const startPortfolioDrag = (event) => {
  if (!portfolioSliderRef.value) return
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const slider = portfolioSliderRef.value

  isPortfolioDragging.value = true
  activePortfolioPointerId = event.pointerId
  portfolioDragStartX = event.clientX
  portfolioStartScrollLeft = slider.scrollLeft
  slider.style.scrollSnapType = 'none'
  slider.style.scrollBehavior = 'auto'
  slider.setPointerCapture?.(event.pointerId)
}

const movePortfolioDrag = (event) => {
  if (!isPortfolioDragging.value || !portfolioSliderRef.value) return
  if (activePortfolioPointerId !== event.pointerId) return

  const slider = portfolioSliderRef.value
  const deltaX = event.clientX - portfolioDragStartX

  slider.scrollLeft = portfolioStartScrollLeft - deltaX
}

const endPortfolioDrag = (event) => {
  if (!portfolioSliderRef.value) return
  if (activePortfolioPointerId !== null && event && activePortfolioPointerId !== event.pointerId) return

  const slider = portfolioSliderRef.value

  if (activePortfolioPointerId !== null && event) {
    slider.releasePointerCapture?.(event.pointerId)
  }

  isPortfolioDragging.value = false
  activePortfolioPointerId = null
  slider.style.scrollSnapType = ''
  slider.style.scrollBehavior = ''
}
</script>

<template>
  <section
    id="event-decor-portfolio"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[20px] pb-[70px] max-[768px]:w-[calc(100%-32px)] max-[768px]:pt-[38px] max-[768px]:pb-[40px]"
  >
    <div class="w-full">
      <h2 class="m-0 [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[1024px]:text-[40px] max-[1024px]:leading-[48px] max-[768px]:max-w-full max-[768px]:text-[36px] max-[768px]:leading-[40px]">
        {{ t.eventDecor.portfolio.title }}
      </h2>

      <p class="m-0 mt-[13px] max-w-[980px] font-[var(--font-sans)] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-3 max-[768px]:max-w-full max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        {{ t.eventDecor.portfolio.text }}
      </p>

      <div class="mt-[38px] max-[768px]:mt-[28px]">
        <div
          ref="portfolioSliderRef"
          class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden max-[768px]:gap-4 max-[768px]:pb-0 max-[768px]:pr-4"
          :class="isPortfolioDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
          @pointerdown="startPortfolioDrag"
          @pointermove="movePortfolioDrag"
          @pointerup="endPortfolioDrag"
          @pointerleave="endPortfolioDrag"
          @pointercancel="endPortfolioDrag"
        >
          <article
            v-for="item in portfolioItems"
            :key="item.image"
            class="h-[420px] w-[315px] shrink-0 snap-start overflow-hidden rounded-[12px] bg-[#F5EFE8] max-[768px]:h-[420px] max-[768px]:w-[315px] max-[560px]:w-[315px]"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              draggable="false"
              class="block h-full w-full object-cover pointer-events-none select-none"
            />
          </article>
        </div>
      </div>

      <div class="mt-[30px] max-[768px]:mt-[34px]">
        <UiButton
          href="#contact"
          :label="t.eventDecor.portfolio.cta"
          class="min-h-0 w-full max-w-[390px] px-10 py-[17px] text-[16px] font-normal leading-[22px] tracking-[-0.32px] max-[768px]:max-w-full"
        />
      </div>
    </div>
  </section>
</template>
