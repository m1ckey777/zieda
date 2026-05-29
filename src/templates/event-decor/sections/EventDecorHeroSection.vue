<script setup>
import UiButton from '../../../components/shared/UiButton.vue'
import eventDecorHeroUrl from '../../../assets/event-decor-hero.png'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section
    id="event-decor-hero"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[52px] pb-[74px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[28px] max-[768px]:pb-[40px]"
  >
    <div class="grid items-center gap-x-0 gap-y-10 min-[1140px]:grid-cols-[700px_minmax(0,1fr)] min-[901px]:max-[1139px]:grid-cols-[minmax(520px,1fr)_minmax(320px,460px)] max-[900px]:grid-cols-1 max-[900px]:gap-y-8">
      <div v-reveal class="w-full max-w-[700px]">
        <p class="m-0 mb-[9px] font-[var(--font-sans)] text-[16px] font-normal uppercase leading-[27px] tracking-[-0.28px] text-[var(--color-primary)] max-[768px]:text-[13px] max-[768px]:leading-5">
          {{ t.eventDecor.hero.eyebrow }}
        </p>

        <h1 class="m-0 max-w-[840px] [font-family:var(--font-display)] text-[54px] font-normal leading-[64px] tracking-[-1.44px] text-[var(--color-heading)] max-[1139px]:max-w-full max-[1139px]:text-[48px] max-[1139px]:leading-[54px] max-[1139px]:tracking-[-1px] max-[900px]:max-w-full max-[900px]:text-[42px] max-[900px]:leading-[48px] max-[900px]:tracking-[-0.8px] max-[768px]:mt-[14px] max-[768px]:max-w-full max-[768px]:text-[36px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
          {{ t.eventDecor.hero.title }}
        </h1>

        <div class="mt-[31px] max-w-[500px] space-y-2 text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[1139px]:mt-[30px] max-[1139px]:max-w-[500px] max-[1139px]:text-[16px] max-[1139px]:leading-[1.85] max-[768px]:mt-[20px] max-[768px]:max-w-full max-[768px]:text-[14px] max-[768px]:leading-[1.75]">
          <p
            v-for="paragraph in t.eventDecor.hero.text"
            :key="paragraph"
            class="m-0"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-[41px] max-[900px]:hidden">
          <UiButton href="#contact" :label="t.eventDecor.hero.cta" class="min-h-0 min-w-[346px] px-10 py-[17px] text-[13px] font-normal leading-[22px] tracking-[-0.26px]" />
        </div>
      </div>

      <div v-reveal="{ delay: 140, variant: 'image' }" class="flex justify-end max-[900px]:justify-center">
        <img
          :src="eventDecorHeroUrl"
          :alt="t.eventDecor.hero.imageAlt"
          class="block w-full max-w-[500px] object-contain transition-transform duration-700 hover:scale-[1.025] max-[1139px]:max-w-[600px] max-[900px]:max-w-[640px] max-[768px]:max-w-[620px]"
        />
      </div>

      <div class="hidden max-[900px]:block">
        <UiButton href="#contact" :label="t.eventDecor.hero.cta" block class="min-h-[72px] text-[15px] tracking-[0.02em] max-[768px]:min-h-[56px] max-[768px]:text-[12px]" />
      </div>
    </div>
  </section>
</template>
