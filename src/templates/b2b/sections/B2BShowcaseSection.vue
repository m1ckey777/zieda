<script setup>
import { computed, ref } from 'vue'
import showcaseImage1Url from '../../../assets/b2b-showcase-1.jpg'
import showcaseImage2Url from '../../../assets/b2b-showcase-2.jpg'
import showcaseImage3Url from '../../../assets/b2b-showcase-3.jpg'
import showcaseImage4Url from '../../../assets/b2b-showcase-4.jpg'
import showcaseImage5Url from '../../../assets/b2b-showcase-5.jpg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()

const showcaseImages = [
  showcaseImage1Url,
  showcaseImage2Url,
  showcaseImage3Url,
  showcaseImage4Url,
  showcaseImage5Url,
]

const showcaseItems = computed(() =>
  showcaseImages.map((image, index) => ({
    image,
    alt: t.value.b2b.showcase.imageAlts[index],
  })),
)

const showcaseSliderRef = ref(null)
const isShowcaseDragging = ref(false)
let showcaseDragStartX = 0
let showcaseStartScrollLeft = 0
let activeShowcasePointerId = null

const startShowcaseDrag = (event) => {
  if (!showcaseSliderRef.value) return
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const slider = showcaseSliderRef.value

  isShowcaseDragging.value = true
  activeShowcasePointerId = event.pointerId
  showcaseDragStartX = event.clientX
  showcaseStartScrollLeft = slider.scrollLeft
  slider.style.scrollSnapType = 'none'
  slider.style.scrollBehavior = 'auto'
  slider.setPointerCapture?.(event.pointerId)
}

const moveShowcaseDrag = (event) => {
  if (!isShowcaseDragging.value || !showcaseSliderRef.value) return
  if (activeShowcasePointerId !== event.pointerId) return

  const slider = showcaseSliderRef.value
  const deltaX = event.clientX - showcaseDragStartX

  slider.scrollLeft = showcaseStartScrollLeft - deltaX
}

const endShowcaseDrag = (event) => {
  if (!showcaseSliderRef.value) return
  if (activeShowcasePointerId !== null && event && activeShowcasePointerId !== event.pointerId) return

  const slider = showcaseSliderRef.value

  if (activeShowcasePointerId !== null && event) {
    slider.releasePointerCapture?.(event.pointerId)
  }

  isShowcaseDragging.value = false
  activeShowcasePointerId = null
  slider.style.scrollSnapType = ''
  slider.style.scrollBehavior = ''
}
</script>

<template>
  <section
    id="b2b-showcase"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[22px] pb-[64px] max-[768px]:w-[calc(100%-32px)] max-[768px]:pt-[32px] max-[768px]:pb-[34px]"
  >
    <div class="w-full">
      <h2 class="m-0 max-w-[620px] [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[768px]:max-w-[320px] max-[768px]:text-[30px] max-[768px]:leading-[1.14]">
        {{ t.b2b.showcase.title }}
      </h2>

      <p class="m-0 mt-[13px] max-w-[760px] font-[var(--font-sans)] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-3 max-[768px]:max-w-[355px] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        {{ t.b2b.showcase.text }}
      </p>

      <div class="mt-[38px] max-[768px]:mt-[22px]">
        <div
          ref="showcaseSliderRef"
          class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden max-[768px]:gap-4 max-[768px]:pb-0 max-[768px]:pr-4"
          :class="isShowcaseDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
          @pointerdown="startShowcaseDrag"
          @pointermove="moveShowcaseDrag"
          @pointerup="endShowcaseDrag"
          @pointerleave="endShowcaseDrag"
          @pointercancel="endShowcaseDrag"
        >
          <article
            v-for="item in showcaseItems"
            :key="item.image"
            class="h-[420px] w-[315px] shrink-0 snap-start overflow-hidden rounded-[12px] bg-[#F5EFE8] max-[768px]:h-[420px] max-[768px]:w-[315px] max-[560px]:w-[315px]"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              draggable="false"
              class="pointer-events-none block h-full w-full select-none object-cover"
            />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
