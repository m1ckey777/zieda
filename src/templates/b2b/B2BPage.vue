<script setup>
import SiteFooter from '../../components/shared/SiteFooter.vue'
import SiteHeader from '../../components/shared/SiteHeader.vue'
import B2BAudienceSection from './sections/B2BAudienceSection.vue'
import B2BCapabilitiesSection from './sections/B2BCapabilitiesSection.vue'
import B2BContactSection from './sections/B2BContactSection.vue'
import B2BHeroSection from './sections/B2BHeroSection.vue'
import B2BShowcaseSection from './sections/B2BShowcaseSection.vue'
import B2BWhyUsSection from './sections/B2BWhyUsSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <B2BHeroSection />
      <B2BAudienceSection />
      <B2BCapabilitiesSection />
      <B2BWhyUsSection />
      <B2BShowcaseSection />
      <B2BContactSection />
    </main>

    <SiteFooter />
  </div>
</template>
