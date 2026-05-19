<script setup>
import SiteFooter from '../../components/shared/SiteFooter.vue'
import SiteHeader from '../../components/shared/SiteHeader.vue'
import ProductDetailsSection from './sections/ProductDetailsSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <ProductDetailsSection />
    </main>

    <SiteFooter />
  </div>
</template>
