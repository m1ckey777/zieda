<script setup>
import { computed, ref } from 'vue'
import authorImage1Url from '../../assets/author-img-1.jpg'
import authorImage2Url from '../../assets/author-img-2.jpg'
import authorImage3Url from '../../assets/author-img-3.jpg'
import blockquoteIconUrl from '../../assets/blockquote-ic.svg'
import { useLanguage } from '../../composables/useLanguage'

const testimonialsSliderRef = ref(null)
const isTestimonialsDragging = ref(false)
let testimonialsDragStartX = 0
let testimonialsStartScrollLeft = 0
const { t } = useLanguage()
const testimonialImages = [authorImage1Url, authorImage2Url, authorImage3Url, authorImage3Url, authorImage2Url]

const testimonialItems = computed(() => t.value.home.testimonials.items.map((item, index) => ({ ...item, image: testimonialImages[index] })))

const startTestimonialsDrag = (event) => {
  if (!testimonialsSliderRef.value) return

  isTestimonialsDragging.value = true
  testimonialsDragStartX = event.clientX
  testimonialsStartScrollLeft = testimonialsSliderRef.value.scrollLeft
  testimonialsSliderRef.value.style.scrollSnapType = 'none'
}

const moveTestimonialsDrag = (event) => {
  if (!isTestimonialsDragging.value || !testimonialsSliderRef.value) return

  const deltaX = event.clientX - testimonialsDragStartX
  testimonialsSliderRef.value.scrollLeft = testimonialsStartScrollLeft - deltaX
}

const endTestimonialsDrag = () => {
  if (!testimonialsSliderRef.value) return

  isTestimonialsDragging.value = false
  testimonialsSliderRef.value.style.scrollSnapType = ''
}
</script>

<template>
  <section id="testimonials" class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[15px] max-[768px]:pb-16">
    <div class="max-w-[760px]">
      <h2 class="m-0 [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[768px]:mb-[7px] max-[768px]:text-[32px] max-[768px]:leading-[40px]">
        {{ t.home.testimonials.title }}
      </h2>

      <div class="mt-8 max-[768px]:mt-0 max-[768px]:mb-[24px]">
        <p class="m-0 text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
          {{ t.home.testimonials.intro[0] }}
        </p>
        <p class="m-0 text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
          {{ t.home.testimonials.intro[1] }}
        </p>
      </div>
    </div>

    <div
      ref="testimonialsSliderRef"
      class="testimonials-slider mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 max-[768px]:mt-0 max-[768px]:gap-[23px]"
      :class="isTestimonialsDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
      @pointerdown="startTestimonialsDrag"
      @pointermove="moveTestimonialsDrag"
      @pointerup="endTestimonialsDrag"
      @pointerleave="endTestimonialsDrag"
      @pointercancel="endTestimonialsDrag"
    >
      <article
        v-for="(item, index) in testimonialItems"
        :key="`${item.author}-${index}`"
        class="flex min-h-[536px] w-[calc((100%-64px)/3)] min-w-[calc((100%-64px)/3)] snap-start flex-col rounded-[8px_8px_8px_48px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.10)] max-[1199px]:w-[360px] max-[1199px]:min-w-[360px] max-[980px]:w-[320px] max-[980px]:min-w-[320px] max-[768px]:min-h-[auto] max-[768px]:w-[88%] max-[768px]:min-w-[88%] max-[768px]:p-[23px]"
      >
        <img :src="blockquoteIconUrl" alt="" class="block h-[47px] w-[52px]" />

        <p class="my-[15px] text-[16px] font-normal leading-[27px] text-[#22112E] max-[768px]:mb-0">
          {{ item.text }}
        </p>

        <div class="mt-auto flex items-center gap-5 pt-10 max-[768px]:pt-[40px]">
          <img
            :src="item.image"
            :alt="item.author"
            class="block h-[78px] w-[78px] rounded-full object-cover max-[768px]:h-[65px] max-[768px]:w-[65px]"
          />

          <div>
            <h3 class="mb-[3px] text-[16px] font-bold leading-[22px] text-[#22112E] max-[768px]:mb-0">
              {{ item.author }}
            </h3>
            <p class="m-0 text-[12px] font-normal leading-[16px] text-[var(--color-primary)]">
              {{ item.role }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-10 flex justify-center max-[768px]:mt-[25px]">
      <a
        href="#contact"
        class="inline-flex min-h-[62px] items-center justify-center rounded-[555px] border-2 border-[var(--color-primary)] bg-white px-[36px] [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[var(--color-primary)] transition duration-200 hover:bg-[#fff4f7] max-[768px]:w-full max-[768px]:max-w-[300px] max-[768px]:px-[24px] max-[768px]:py-[17px] max-[768px]:text-[13px] max-[768px]:leading-[22px] max-[768px]:tracking-[-0.26px]"
      >
        {{ t.home.testimonials.cta }}
      </a>
    </div>
  </section>
</template>
