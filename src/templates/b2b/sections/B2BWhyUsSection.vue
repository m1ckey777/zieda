<script setup>
import iconUrl from '../../../assets/b2b-why-us-icon.svg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section
    id="b2b-why-us"
    class="py-[55px] max-[768px]:pt-[42px] max-[768px]:pb-[40px]"
  >
    <div class="mx-auto w-[min(1200px,calc(100%-40px))] max-[768px]:w-[min(1200px,calc(100%-32px))]">
      <p class="m-0 font-[var(--font-display)] text-[13px] font-normal uppercase leading-5 tracking-[-0.7px] text-[var(--color-heading)]">
        {{ t.b2b.whyUs.eyebrow }}
      </p>

      <h2 class="m-0 mt-[10px] max-w-[760px] [font-family:var(--font-display)] text-[48px] font-normal leading-[1.08] tracking-[-0.9px] text-[var(--color-heading)] max-[768px]:max-w-[350px] max-[768px]:text-[30px] max-[768px]:leading-[1.14] max-[768px]:tracking-[-0.6px]">
        {{ t.b2b.whyUs.title }}
      </h2>

      <p class="m-0 mt-[14px] max-w-[860px] font-[var(--font-sans)] text-[18px] font-normal leading-[1.65] tracking-[-0.02em] text-[#5A5064] max-[768px]:max-w-[348px] max-[768px]:text-[14px] max-[768px]:leading-[1.72] max-[768px]:tracking-[-0.28px]">
        {{ t.b2b.whyUs.text }}
      </p>

      <div class="mt-[30px] grid max-w-[980px] gap-y-[18px] max-[768px]:mt-[24px] max-[768px]:gap-y-[14px]">
        <article
          v-for="item in t.b2b.whyUs.items"
          :key="item"
          class="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-x-[12px] max-[768px]:grid-cols-[16px_minmax(0,1fr)] max-[768px]:gap-x-[10px]"
        >
          <img
            :src="iconUrl"
            alt=""
            aria-hidden="true"
            class="mt-[6px] block h-[18px] w-[18px] max-[768px]:mt-[5px] max-[768px]:h-[16px] max-[768px]:w-[16px]"
          />

          <p class="m-0 font-[var(--font-sans)] text-[16px] font-normal leading-[1.65] tracking-[-0.02em] text-[#3C3344] max-[768px]:text-[14px] max-[768px]:leading-[1.72] max-[768px]:tracking-[-0.28px]">
            {{ item }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
