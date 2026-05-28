<script setup>
import capabilitiesImage1Url from '../../../assets/b2b-capabilities-1.jpg'
import capabilitiesImage2Url from '../../../assets/b2b-capabilities-2.jpg'
import capabilitiesImage3Url from '../../../assets/b2b-capabilities-3.jpg'
import capabilitiesImage4Url from '../../../assets/b2b-capabilities-4.jpg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section
    id="b2b-capabilities"
    class="py-[50px] max-[768px]:pt-[30px] max-[768px]:pb-[45px]"
  >
    <div class="mx-auto grid w-[min(1200px,calc(100%-40px))] items-start gap-x-[48px] min-[1025px]:grid-cols-[minmax(0,1fr)_405px] max-[1024px]:gap-x-[32px] max-[900px]:grid-cols-1 max-[900px]:gap-y-[34px] max-[768px]:w-[min(1200px,calc(100%-32px))]">
      <div>
        <h2 class="m-0 mb-[16px] max-w-[630px] [font-family:var(--font-display)] text-[32px] font-normal leading-10 tracking-[-0.7px] text-[var(--color-heading)] max-[768px]:max-w-[360px] max-[768px]:text-[30px] max-[768px]:leading-[1.15]">
          {{ t.b2b.capabilities.title }}
        </h2>

        <div class="max-w-[640px] space-y-0 font-[var(--font-sans)] text-[14px] font-normal leading-6 tracking-[-0.28px] text-[#51465A]">
          <p
            v-for="paragraph in t.b2b.capabilities.text"
            :key="paragraph"
            class="m-0"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-[34px] grid gap-x-[45px] gap-y-[36px] min-[768px]:grid-cols-2 max-[768px]:mt-[30px] max-[768px]:grid-cols-1 max-[768px]:gap-y-[24px]">
          <article
            v-for="item in t.b2b.capabilities.items"
            :key="item.number"
            class="grid items-center gap-x-[18px] gap-y-[10px]"
            :class="item.number === '01' ? 'grid-cols-[44px_minmax(0,1fr)]' : 'grid-cols-[55px_minmax(0,1fr)]'"
          >
            <p class="m-0 pt-[4px] text-right [font-family:var(--font-display)] text-[48px] font-normal leading-[27px] text-[var(--color-primary)]">
              {{ item.number }}
            </p>

            <h3 class="m-0 whitespace-pre-line font-[var(--font-sans)] text-[16px] font-extrabold leading-[21px] text-[#322C36]">
              {{ item.title }}
            </h3>

            <p class="col-span-2 m-0 font-[var(--font-sans)] text-[14px] font-normal leading-6 text-[#322C36]">
              {{ item.text }}
            </p>
          </article>
        </div>
      </div>

      <div class="grid grid-cols-[minmax(0,1fr)_152px] gap-[18px] max-[900px]:mx-auto max-[900px]:w-full max-[900px]:max-w-[405px] max-[768px]:grid-cols-[minmax(0,1fr)_41.7%]">
        <img
          :src="capabilitiesImage1Url"
          :alt="t.b2b.capabilities.imageAlts[0]"
          class="col-span-2 block aspect-[405/173] w-full rounded-[20px] object-cover"
        />

        <img
          :src="capabilitiesImage2Url"
          :alt="t.b2b.capabilities.imageAlts[1]"
          class="block h-full min-h-[370px] w-full rounded-[20px] object-cover max-[768px]:min-h-0 max-[768px]:aspect-[188/337]"
        />

        <div class="grid h-full grid-rows-2 gap-[18px]">
          <img
            :src="capabilitiesImage3Url"
            :alt="t.b2b.capabilities.imageAlts[2]"
            class="block h-full w-full rounded-[20px] object-cover max-[768px]:aspect-[1/1] max-[768px]:h-auto"
          />

          <img
            :src="capabilitiesImage4Url"
            :alt="t.b2b.capabilities.imageAlts[3]"
            class="block h-full w-full rounded-[20px] object-cover max-[768px]:aspect-[1/1] max-[768px]:h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>
