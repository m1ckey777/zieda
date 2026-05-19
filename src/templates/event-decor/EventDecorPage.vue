<script setup>
import SiteHeader from '../../components/shared/SiteHeader.vue'
import SiteFooter from '../../components/shared/SiteFooter.vue'
import EventDecorHeroSection from './sections/EventDecorHeroSection.vue'
import EventDecorBenefitsSection from './sections/EventDecorBenefitsSection.vue'
import EventDecorPortfolioSection from './sections/EventDecorPortfolioSection.vue'
import EventDecorVideoSection from './sections/EventDecorVideoSection.vue'
import EventDecorTestimonialsSection from './sections/EventDecorTestimonialsSection.vue'
import EventDecorContactSection from './sections/EventDecorContactSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <EventDecorHeroSection />
      <EventDecorBenefitsSection />
      <EventDecorPortfolioSection />
      <EventDecorVideoSection />
      <EventDecorTestimonialsSection />
      <EventDecorContactSection />
    </main>

    <SiteFooter />
  </div>
</template>
