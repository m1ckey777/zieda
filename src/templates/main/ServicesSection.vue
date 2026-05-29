<script setup>
import { computed } from 'vue'
import serviceImage1Url from '../../assets/service-1.jpg'
import serviceImage2Url from '../../assets/service-2.jpg'
import serviceImage3Url from '../../assets/service-3.jpg'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()
const serviceImages = [serviceImage1Url, serviceImage2Url, serviceImage3Url]
const serviceCards = computed(() => t.value.home.services.cards.map((card, index) => ({ ...card, image: serviceImages[index] })))
</script>

<template>
  <section id="services" class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[72px] max-[768px]:pb-[82px]">
    <div v-reveal class="text-center">
      <p class="m-0 [font-family:var(--font-display)] text-[14px] uppercase leading-5 tracking-[0.04em] text-[var(--color-heading)]/90 max-[768px]:text-[13px] max-[768px]:leading-5 max-[768px]:tracking-[-0.7px]">
        {{ t.home.services.eyebrow }}
      </p>
      <h2 class="mx-auto mt-7 [font-family:var(--font-display)] text-[44px] leading-[1.05] tracking-[-0.04em] text-[var(--color-heading)] max-[768px]:mt-2 max-[768px]:text-[32px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        {{ t.home.services.title }}
      </h2>
    </div>

    <div class="mt-12 grid items-stretch gap-9 min-[1100px]:grid-cols-3 max-[1099px]:grid-cols-1 max-[768px]:mt-10 max-[768px]:gap-8">
      <article
        v-for="(card, index) in serviceCards"
        :key="card.title"
        v-reveal="{ delay: index * 90, variant: 'scale' }"
        class="motion-card flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_45px_rgba(34,17,46,0.08)] max-[768px]:overflow-visible max-[768px]:rounded-none max-[768px]:bg-transparent max-[768px]:shadow-none"
      >
        <div class="motion-image-wrap max-[768px]:rounded-[8px]">
          <img :src="card.image" :alt="card.title" class="motion-image block h-[264px] w-full object-cover max-[768px]:h-[444px] max-[768px]:rounded-[8px]" loading="lazy" />
        </div>
        <div class="flex flex-1 flex-col px-[30px] pt-[30px] pb-7 max-[768px]:-mt-[36px] max-[768px]:mx-auto max-[768px]:w-[345px] max-[768px]:rounded-[8px] max-[768px]:bg-white max-[768px]:px-[27px] max-[768px]:py-[23px] max-[768px]:shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <h3 class="m-0 max-w-[280px] [font-family:var(--font-display)] text-[24px] leading-[1.08] tracking-[-0.03em] text-[var(--color-heading)] max-[768px]:max-w-full max-[768px]:text-[24px] max-[768px]:leading-[30px] max-[768px]:tracking-normal">
            {{ card.title }}
          </h3>
          <p class="mt-5 text-[14px] leading-[1.7] text-[#7B7086] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box] overflow-hidden max-[768px]:mt-[10px] max-[768px]:text-[14px] max-[768px]:leading-[22px] max-[768px]:tracking-[-0.28px] max-[768px]:text-[rgba(34,17,46,0.62)]">
            {{ card.text }}
          </p>
          <a
            :href="card.href"
            class="motion-link mt-6 block border-b border-[var(--color-primary)] text-[14px] font-semibold leading-6 text-[var(--color-primary)] transition duration-200 hover:text-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] max-[768px]:mt-[10px] max-[768px]:inline-flex max-[768px]:w-fit max-[768px]:items-center max-[768px]:gap-2 max-[768px]:py-[8px] max-[768px]:text-center max-[768px]:font-[var(--font-sans)] max-[768px]:text-[14px] max-[768px]:font-bold max-[768px]:leading-[14.041px]"
          >
            <span>{{ t.home.services.details }}</span>
            <svg class="hidden h-[14px] w-[9px] max-[768px]:block" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1.25 6.75 7 1 12.75" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </article>
    </div>

    <div class="mt-[58px] flex justify-center max-[768px]:mt-[42px]">
      <a
        href="#contact"
        class="motion-button inline-flex min-h-[54px] min-w-[330px] items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-white px-10 [font-family:var(--font-display)] text-[16px] uppercase leading-[22px] text-[var(--color-primary)] transition duration-200 hover:-translate-y-px hover:bg-[#fff8fa] max-[768px]:min-h-0 max-[768px]:w-full max-[768px]:max-w-[350px] max-[768px]:justify-center max-[768px]:rounded-[555px] max-[768px]:px-[52px] max-[768px]:py-[17px] max-[768px]:text-center max-[768px]:text-[17px] max-[768px]:font-normal max-[768px]:leading-[22px] max-[768px]:tracking-[-0.34px]"
      >
        {{ t.home.services.all }}
      </a>
    </div>
  </section>
</template>
