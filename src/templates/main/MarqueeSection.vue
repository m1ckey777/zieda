<script setup>
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()
const marqueeItems = computed(() => Array.from({ length: 4 }, () => t.value.home.marquee))
</script>

<template>
  <section class="mt-[15px] overflow-hidden bg-[var(--color-primary)] py-[26px] max-[768px]:py-[21px]">
    <div class="marquee-track flex w-max items-center whitespace-nowrap">
      <p
        v-for="(item, index) in marqueeItems"
        :key="index"
        class="m-0 [font-family:var(--font-display)] text-[26px] leading-[1.2] text-white"
      >
        {{ item }}
      </p>
    </div>
  </section>
</template>
