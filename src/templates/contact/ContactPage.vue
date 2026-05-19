<script setup>
import SiteFooter from '../../components/shared/SiteFooter.vue'
import SiteHeader from '../../components/shared/SiteHeader.vue'
import ContactContentSection from './sections/ContactContentSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <SiteHeader />

    <main>
      <ContactContentSection />
    </main>

    <SiteFooter />
  </div>
</template>
