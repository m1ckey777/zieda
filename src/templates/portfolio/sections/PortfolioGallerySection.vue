<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const selectedGalleryImage = ref('')
const activeFilter = ref('all')
const visibleCount = ref(12)

const filterOptions = [
  { key: 'all', label: 'Все' },
  { key: 'weddings', label: 'Свадьбы' },
  { key: 'photozones', label: 'Фотозоны' },
  { key: 'decor', label: 'Декор' },
]

const categoriesByNumber = {
  11: ['photozones', 'decor'],
  12: ['weddings'],
  13: ['photozones'],
  14: ['decor'],
  15: ['weddings', 'decor'],
  16: ['photozones', 'decor'],
  17: ['weddings'],
  18: ['photozones'],
  19: ['decor'],
  20: ['weddings', 'decor'],
  21: ['weddings'],
  22: ['photozones'],
  23: ['weddings', 'photozones'],
  24: ['decor'],
  25: ['weddings', 'photozones'],
  26: ['weddings'],
  27: ['photozones'],
  28: ['weddings', 'photozones'],
  29: ['decor'],
  30: ['weddings', 'photozones'],
}

const imageEntries = Object.entries(
  import.meta.glob('../../../assets/portfolio/*.jpg', {
    eager: true,
    import: 'default',
  }),
)
  .map(([path, image]) => ({
    image,
    number: Number(path.match(/\/(\d+)\.jpg$/)?.[1] ?? 0),
  }))
  .sort((a, b) => a.number - b.number)

const portfolioItems = imageEntries.map(({ image, number }, index) => ({
  id: `${number}-${index}`,
  image,
  number,
  categories: categoriesByNumber[number] ?? ['decor'],
  alt: `Портфолио Zida Ziedi ${index + 1}`,
}))

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return portfolioItems

  return portfolioItems.filter((item) => item.categories.includes(activeFilter.value))
})

const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))
const hasMoreItems = computed(() => visibleCount.value < filteredItems.value.length)

const getInitialVisibleCount = () => (window.innerWidth <= 768 ? 10 : 12)

const setFilter = (filterKey) => {
  activeFilter.value = filterKey
  visibleCount.value = getInitialVisibleCount()
}

const showMoreItems = () => {
  visibleCount.value += 10
}

const openGalleryImage = (image) => {
  selectedGalleryImage.value = image
}

const closeGalleryImage = () => {
  selectedGalleryImage.value = ''
}

const syncVisibleCountWithViewport = () => {
  visibleCount.value = Math.min(filteredItems.value.length, getInitialVisibleCount())
}

onMounted(() => {
  syncVisibleCountWithViewport()
  window.addEventListener('resize', syncVisibleCountWithViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncVisibleCountWithViewport)
})
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[80px] pb-[110px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pt-[45px] max-[768px]:pb-[65px]">
    <div class="max-w-[760px] max-[768px]:mx-auto max-[768px]:text-center">
      <p class="m-0 text-[13px] font-normal uppercase leading-5 tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)]">
        #Наши работы
      </p>

      <h1 class="mt-4 text-[56px] font-normal leading-[64px] tracking-[-1.44px] text-[#22112E] [font-family:var(--font-display)] max-[1024px]:text-[48px] max-[1024px]:leading-[56px] max-[768px]:mt-[10px] max-[768px]:text-[44px] max-[768px]:leading-[52px] max-[768px]:tracking-[-0.7px]">
        Портфолио
      </h1>

      <p class="mt-5 max-w-[600px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mx-auto max-[768px]:mt-4 max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        Только реальные фотографии реализованных проектов.
      </p>
    </div>

    <div class="mt-10 flex flex-wrap gap-3 max-[768px]:mt-8 max-[768px]:flex-nowrap max-[768px]:overflow-x-auto max-[768px]:pb-3">
      <button
        v-for="option in filterOptions"
        :key="option.key"
        type="button"
        :data-filter="option.key"
        class="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-[#E93C60] bg-white px-[26px] text-center text-[13px] font-normal uppercase leading-[22px] tracking-[-0.26px] text-[#E93C60] transition duration-200 [font-family:var(--font-display)] max-[768px]:shrink-0"
        :class="activeFilter === option.key ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'hover:bg-[#fff4f7]'"
        @click="setFilter(option.key)"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="mt-11 grid grid-cols-4 gap-[10px] max-[1024px]:grid-cols-3 max-[768px]:mt-8 max-[768px]:grid-cols-2">
      <article
        v-for="(item, index) in visibleItems"
        :key="item.id"
        :data-categories="item.categories.join(' ')"
        class="overflow-hidden rounded-[4px] bg-[#d9d9d9]"
      >
        <button
          type="button"
          class="block w-full cursor-zoom-in transition duration-200 hover:opacity-95"
          @click="openGalleryImage(item.image)"
          :aria-label="`Открыть изображение ${index + 1}`"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            class="block aspect-square w-full object-cover"
            loading="lazy"
          />
        </button>
      </article>
    </div>

    <div v-if="hasMoreItems" class="mt-10 flex justify-center max-[768px]:mt-[30px]">
      <button
        type="button"
        class="inline-flex min-h-[54px] items-center justify-center rounded-[555px] border border-[#22112E] bg-transparent px-[38px] [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[#22112E] transition duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] max-[768px]:w-full"
        @click="showMoreItems"
      >
        Показать еще
      </button>
    </div>
  </section>

  <div
    v-if="selectedGalleryImage"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 max-[768px]:p-4"
    @click="closeGalleryImage"
  >
    <button
      type="button"
      class="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-[30px] leading-none text-white transition duration-200 hover:bg-white/20 max-[768px]:right-4 max-[768px]:top-4"
      aria-label="Закрыть изображение"
      @click.stop="closeGalleryImage"
    >
      ×
    </button>

    <img
      :src="selectedGalleryImage"
      alt="Увеличенное изображение из портфолио"
      class="max-h-[90vh] w-auto max-w-[min(100%,1100px)] rounded-[18px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      @click.stop
    />
  </div>
</template>
