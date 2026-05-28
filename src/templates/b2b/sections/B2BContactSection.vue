<script setup>
import ContactSection from '../../main/ContactSection.vue'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <ContactSection
    :title="t.b2b.contact.title"
    :description="t.b2b.contact.description"
    :submit-label="t.b2b.contact.submit"
  />
</template>
