<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  centered: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div :class="['max-w-[760px]', centered && 'mx-auto text-center']">
    <p
      v-if="eyebrow"
      class="mb-3 text-[12px] uppercase leading-[1.4] tracking-[0.18em] text-[var(--color-primary)]"
    >
      {{ eyebrow }}
    </p>
    <h2 class="m-0 font-[var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[0.98] text-[var(--color-heading)]">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-6 max-w-[680px] text-[18px] leading-[1.75] text-[var(--color-muted)]"
    >
      {{ description }}
    </p>
  </div>
</template>
