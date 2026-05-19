<script setup>
import SiteFooter from '../../components/shared/SiteFooter.vue'
import SiteHeader from '../../components/shared/SiteHeader.vue'
import B2BContactSection from '../b2b/sections/B2BContactSection.vue'
import PortfolioGallerySection from './sections/PortfolioGallerySection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <PortfolioGallerySection />
      <B2BContactSection />
    </main>

    <SiteFooter />
  </div>
</template>
