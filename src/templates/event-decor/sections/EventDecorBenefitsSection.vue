<script setup>
import starsIconUrl from '../../../assets/event-decor-stars-icon.svg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section
    id="event-decor-benefits"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[44px] pb-[70px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pb-[38px]"
  >
    <div class="w-full">
      <div v-reveal>
      <h2 class="m-0 mb-[21px] w-full [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[1024px]:text-[40px] max-[1024px]:leading-[48px] max-[768px]:text-[36px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        {{ t.eventDecor.benefits.title }}
      </h2>

      <div class="mt-0 w-full font-[var(--font-sans)] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        <p
          v-for="paragraph in t.eventDecor.benefits.text"
          :key="paragraph"
          class="m-0"
        >
          {{ paragraph }}
        </p>
      </div>
      </div>

      <div class="mt-[46px] grid grid-cols-3 gap-x-[44px] gap-y-[34px] max-[1024px]:grid-cols-2 max-[1024px]:gap-x-8 max-[1024px]:gap-y-7 max-[768px]:mt-[32px] max-[768px]:grid-cols-1 max-[768px]:gap-y-6">
        <article
          v-for="(item, index) in t.eventDecor.benefits.items"
          :key="item.title"
          v-reveal="{ delay: (index % 6) * 60 }"
          class="motion-card flex items-start gap-2"
        >
          <img
            :src="starsIconUrl"
            alt=""
            aria-hidden="true"
            class="mt-[2px] h-6 w-6 shrink-0 max-[768px]:h-5 max-[768px]:w-5"
          />

          <div class="min-w-0">
            <h3 class="m-0 font-[var(--font-sans)] text-[16px] font-extrabold leading-[27px] text-[#322C36]">
              {{ item.title }}
            </h3>

            <p class="m-0 mt-[2px] font-[var(--font-sans)] text-[14px] font-normal leading-[24px] text-[#322C36]">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
