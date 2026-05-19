<script setup>
import SiteFooter from '../components/shared/SiteFooter.vue'
import SiteHeader from '../components/shared/SiteHeader.vue'
import AboutSection from '../templates/main/AboutSection.vue'
import ContactSection from '../templates/main/ContactSection.vue'
import GallerySection from '../templates/main/GallerySection.vue'
import HeroSection from '../templates/main/HeroSection.vue'
import IndividualDecorSection from '../templates/main/IndividualDecorSection.vue'
import MarqueeSection from '../templates/main/MarqueeSection.vue'
import ServicesSection from '../templates/main/ServicesSection.vue'
import StatsVideoSection from '../templates/main/StatsVideoSection.vue'
import TestimonialsSection from '../templates/main/TestimonialsSection.vue'
import VideoShowcaseSection from '../templates/main/VideoShowcaseSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VideoShowcaseSection />
      <ServicesSection />
      <IndividualDecorSection />
      <GallerySection />
      <StatsVideoSection />
      <ContactSection />
      <TestimonialsSection />
    </main>

    <SiteFooter />
  </div>
</template>
