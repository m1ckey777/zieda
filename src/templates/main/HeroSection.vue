<script setup>
import catalogHeroUrl from '../../assets/catalog-hero.png'
import downloadHeroIconUrl from '../../assets/dwn-hero-ic.svg'
import heroImageUrl from '../../assets/hero-img.png'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section id="hero" v-reveal="{ variant: 'fade', threshold: 0.05 }" class="mx-auto w-[min(1200px,calc(100%-40px))] pt-11 pb-20 max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-3 max-[768px]:pb-8">
    <div class="grid items-center gap-10 min-[1025px]:grid-cols-[minmax(430px,520px)_minmax(0,1fr)] max-[1024px]:grid-cols-1 max-[1024px]:gap-10 max-[768px]:gap-5">
      <div v-reveal="{ delay: 80 }" class="max-w-[500px] max-[1024px]:order-1">
        <h1 class="m-0 max-w-[500px] [font-family:var(--font-display)] text-[56px] leading-[0.98] tracking-[-0.04em] text-[var(--color-heading)] max-[768px]:max-w-[340px] max-[768px]:text-[33px] max-[768px]:leading-[1.02] max-[768px]:tracking-[-0.03em]">
          {{ t.home.hero.title }}
        </h1>

        <p class="mt-8 max-w-[490px] text-[16px] leading-[1.72] text-[#6d6279] max-[768px]:mt-3 max-[768px]:max-w-[345px] max-[768px]:text-[13px] max-[768px]:leading-[1.45]">
          {{ t.home.hero.text }}
        </p>

        <div class="mt-8 flex max-w-[460px] flex-wrap gap-5 max-[768px]:mt-5 max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-3">
          <a
            href="/catalog"
            class="motion-button inline-flex min-h-[56px] w-[calc(50%-10px)] items-center justify-center rounded-full bg-[var(--color-primary)] [font-family:var(--font-display)] text-[13px] uppercase leading-[22px] text-white transition duration-200 hover:-translate-y-px hover:bg-[var(--color-primary-dark)] max-[768px]:min-h-[44px] max-[768px]:w-full max-[768px]:px-3 max-[768px]:text-[11px] max-[768px]:leading-[1]"
          >
            {{ t.home.hero.catalog }}
          </a>
          <a
            href="#contact"
            class="motion-button inline-flex min-h-[56px] w-[calc(50%-10px)] items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-transparent [font-family:var(--font-display)] text-[13px] uppercase leading-[22px] text-[var(--color-primary)] transition duration-200 hover:-translate-y-px max-[768px]:min-h-[44px] max-[768px]:w-full max-[768px]:px-3 max-[768px]:text-[11px] max-[768px]:leading-[1]"
          >
            {{ t.home.hero.contact }}
          </a>
        </div>

        <div v-reveal="{ delay: 220, variant: 'scale' }" class="motion-card relative mt-[74px] flex min-h-[112px] max-w-[460px] items-center gap-6 rounded-full border border-black/[0.03] bg-[#f7f1eb] px-[30px] py-5 pl-[142px] max-[768px]:hidden">
          <div class="absolute left-[-10px] top-1/2 h-[72px] w-[129px] shrink-0">
            <img
              :src="catalogHeroUrl"
              :alt="t.home.hero.catalogAlt"
              class="block w-[129px] -translate-y-1/2"
            />
          </div>

          <div class="min-w-0 flex-1">
            <p class="m-0 max-w-[340px] font-[var(--font-sans)] text-[18px] leading-[1.08] text-[var(--color-heading)]">
              {{ t.home.hero.download }}
            </p>
          </div>

          <a href="#" :aria-label="t.home.hero.downloadAria" class="ml-auto inline-flex shrink-0 items-center justify-center">
            <img :src="downloadHeroIconUrl" alt="" class="block h-[38px] w-[38px]" />
          </a>
        </div>
      </div>

      <div v-reveal="{ delay: 160, variant: 'image' }" class="flex items-start justify-end pt-1 min-[1025px]:self-end max-[1024px]:order-2 max-[1024px]:justify-center max-[768px]:pt-0">
        <img
          :src="heroImageUrl"
          :alt="t.home.hero.imageAlt"
          class="block w-full max-w-[560px] translate-x-2 -translate-y-1 object-contain min-[1025px]:max-w-[500px] max-[1024px]:translate-x-0 max-[1024px]:translate-y-0 max-[768px]:max-w-[360px]"
        />
      </div>

      <div class="hidden max-[768px]:block max-[1024px]:order-3">
        <div v-reveal="{ delay: 220, variant: 'scale' }" class="motion-card relative mt-[74px] flex min-h-[112px] max-w-[460px] items-center gap-6 rounded-full border border-black/[0.03] bg-[#f7f1eb] px-[30px] py-5 pl-[142px] max-[768px]:mt-0 max-[768px]:min-h-[68px] max-[768px]:max-w-full max-[768px]:rounded-full max-[768px]:px-4 max-[768px]:py-3 max-[768px]:pl-[136px]">
          <div class="absolute left-[-10px] top-1/2 h-[72px] w-[129px] shrink-0 max-[768px]:left-0 max-[768px]:h-[60px] max-[768px]:w-[128px]">
            <img
              :src="catalogHeroUrl"
              :alt="t.home.hero.catalogAlt"
              class="block w-[129px] -translate-y-1/2 max-[768px]:w-[128px]"
            />
          </div>

          <div class="min-w-0 flex-1">
            <p class="m-0 max-w-[340px] font-[var(--font-sans)] text-[18px] leading-[1.08] text-[var(--color-heading)] max-[768px]:max-w-[165px] max-[768px]:text-[12px] max-[768px]:leading-[1.35]">
              {{ t.home.hero.download }}
            </p>
          </div>

          <a href="#" :aria-label="t.home.hero.downloadAria" class="ml-auto inline-flex shrink-0 items-center justify-center">
            <img :src="downloadHeroIconUrl" alt="" class="block h-[38px] w-[38px] max-[768px]:h-[32px] max-[768px]:w-[32px]" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
