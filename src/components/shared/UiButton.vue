<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  href: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
})

const baseClasses =
  'motion-button inline-flex min-h-[32px] items-center justify-center rounded-full border px-5 py-2 font-[var(--font-display)] text-[13px] uppercase leading-[22px] transition duration-200 hover:-translate-y-px'

const variantClasses = {
  primary: 'border-transparent bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
  secondary: 'border-[var(--color-primary)] bg-transparent text-[var(--color-primary)]',
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="[baseClasses, variantClasses[variant] ?? variantClasses.primary, block && 'w-full']"
  >
    <span>{{ label }}</span>
  </a>
  <button
    v-else
    type="button"
    :class="[baseClasses, variantClasses[variant] ?? variantClasses.primary, block && 'w-full']"
  >
    <span>{{ label }}</span>
  </button>
</template>
