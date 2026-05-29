<script setup>
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const selectedGalleryImage = ref('')
const { t } = useLanguage()

const galleryImageUrls = Object.values(
  import.meta.glob('../../assets/gallery/*.jpg', {
    eager: true,
    import: 'default',
  }),
).sort((a, b) => {
  const getImageNumber = (value) => Number(value.match(/image-(\d+)\.jpg/)?.[1] ?? 0)

  return getImageNumber(a) - getImageNumber(b)
})

const galleryItems = galleryImageUrls.slice(0, 16).map((image, index) => ({
  image,
  showOnMobile: index < 10,
}))

const openGalleryImage = (image) => {
  selectedGalleryImage.value = image
}

const closeGalleryImage = () => {
  selectedGalleryImage.value = ''
}
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[50px] max-[768px]:pb-[65px]">
    <div v-reveal class="max-w-[920px]">
      <h2 class="m-0 text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)] max-[768px]:mb-[7px] max-[768px]:text-[32px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        {{ t.home.gallery.title }}
      </h2>

      <p class="mt-5 max-w-[820px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-0 max-[768px]:text-[14px] max-[768px]:leading-[24px] max-[768px]:tracking-[-0.28px]">
        {{ t.home.gallery.text }}
      </p>
    </div>

    <div class="mt-11 grid grid-cols-4 gap-[10px] max-[768px]:mt-8 max-[768px]:grid-cols-2">
      <article
        v-for="(item, index) in galleryItems"
        :key="item.image"
        :class="!item.showOnMobile ? 'max-[768px]:hidden' : ''"
        v-reveal="{ delay: (index % 8) * 45, variant: 'scale' }"
        class="motion-image-wrap overflow-hidden rounded-[4px] bg-[#d9d9d9]"
      >
        <button
          type="button"
          class="block w-full cursor-zoom-in transition duration-200 hover:opacity-95"
          @click="openGalleryImage(item.image)"
          :aria-label="`${t.home.gallery.openImage} ${index + 1}`"
        >
          <img
            :src="item.image"
            :alt="`${t.home.gallery.imageAlt} ${index + 1}`"
            class="motion-image block aspect-square w-full object-cover"
            loading="lazy"
          />
        </button>
      </article>
    </div>

    <div class="mt-10 flex justify-center max-[768px]:mt-[30px]">
      <a
        href="/portfolio"
        class="motion-button inline-flex min-h-[54px] items-center justify-center rounded-[555px] border-2 border-[var(--color-primary)] bg-[var(--color-primary)] px-[48px] [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-white transition duration-200 hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] max-[768px]:w-full max-[768px]:px-8"
      >
        {{ t.home.gallery.cta }}
      </a>
    </div>
  </section>

  <div
    v-if="selectedGalleryImage"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm max-[768px]:p-4"
    @click="closeGalleryImage"
  >
    <button
      type="button"
      class="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-[30px] leading-none text-white transition duration-200 hover:bg-white/20 max-[768px]:right-4 max-[768px]:top-4"
      :aria-label="t.home.gallery.closeImage"
      @click.stop="closeGalleryImage"
    >
      ×
    </button>

    <img
      :src="selectedGalleryImage"
      :alt="t.home.gallery.expandedAlt"
      class="max-h-[90vh] w-auto max-w-[min(100%,1100px)] rounded-[18px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      @click.stop
    />
  </div>
</template>
