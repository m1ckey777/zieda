<script setup>
import { computed } from 'vue'
import aboutIcon1Url from '../../assets/about-ic-1.svg'
import aboutIcon2Url from '../../assets/about-ic-2.svg'
import aboutIcon3Url from '../../assets/about-ic-3.svg'
import aboutImageUrl from '../../assets/about-img.png'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()
const aboutIcons = [aboutIcon1Url, aboutIcon2Url, aboutIcon3Url]
const aboutItems = computed(() => t.value.home.about.items.map((item, index) => ({ ...item, icon: aboutIcons[index] })))
</script>

<template>
  <section id="about" class="mx-auto grid w-[min(1200px,calc(100%-40px))] items-center gap-10 py-[86px] min-[1025px]:grid-cols-[minmax(430px,573px)_minmax(0,1fr)] max-[1024px]:grid-cols-1 max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:gap-7 max-[768px]:pt-[50px] max-[768px]:pb-[30px]">
    <div v-reveal class="max-w-[573px]">
      <h2 class="m-0 max-w-[573px] [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[768px]:max-w-full max-[768px]:text-[32px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        {{ t.home.about.title }}
      </h2>

      <p class="mt-6 max-w-[573px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-4 max-[768px]:max-w-full max-[768px]:text-[14px] max-[768px]:leading-[24px] max-[768px]:tracking-[-0.28px]">
        {{ t.home.about.text }}
      </p>

      <div class="mt-11 space-y-8 max-[768px]:mt-8 max-[768px]:space-y-6">
        <article v-for="(item, index) in aboutItems" :key="item.title" v-reveal="{ delay: index * 80 }" class="flex items-start gap-5 max-[768px]:gap-5">
          <img :src="item.icon" :alt="item.title" class="mt-1 block h-[76px] w-[76px] shrink-0 max-[768px]:mt-0 max-[768px]:h-[76px] max-[768px]:w-[76px]" />
          <div class="max-w-[383px] max-[768px]:max-w-full">
            <h3 class="m-0 text-[16px] font-extrabold leading-[27px] text-[#322C36] max-[768px]:text-[16px] max-[768px]:leading-[27px]">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-[14px] font-normal leading-[24px] text-[#322C36] max-[768px]:mt-2 max-[768px]:text-[14px] max-[768px]:leading-[24px]">
              {{ item.text }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <div v-reveal="{ variant: 'image', delay: 120 }" class="flex items-center justify-end min-[1025px]:self-end max-[1024px]:justify-center max-[768px]:pt-1">
      <img
        :src="aboutImageUrl"
        :alt="t.home.about.imageAlt"
        class="block w-full max-w-[595px] object-contain min-[1025px]:max-w-[500px] max-[768px]:max-w-full"
      />
    </div>
  </section>
</template>
