<script setup>
import { computed, ref, watch } from 'vue'
import ContactSection from '../../main/ContactSection.vue'
import SiteFooter from '../../../components/shared/SiteFooter.vue'
import SiteHeader from '../../../components/shared/SiteHeader.vue'
import productImageUrl from '../../../assets/product-page/product-jpg.jpg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
const categoryOptions = computed(() => t.value.catalog.categories)

const productItems = [
  {
    id: 'a023',
    article: 'A023',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '20%',
    popularity: 98,
    href: '/product',
  },
  {
    id: 'a024',
    article: 'A024',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 94,
    href: '/product',
  },
  {
    id: 'a025',
    article: 'A025',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 90,
    href: '/product',
  },
  {
    id: 'a026',
    article: 'A026',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badgeKey: 'hitSeason',
    popularity: 96,
    href: '/product',
  },
  {
    id: 'a027',
    article: 'A027',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 84,
    href: '/product',
  },
  {
    id: 'a028',
    article: 'A028',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 82,
    href: '/product',
  },
  {
    id: 'a029',
    article: 'A029',
    titleKey: 'ledArch18',
    category: 'photozones',
    size: '200cm x 230cm',
    price: 349,
    oldPrice: 470,
    badge: '',
    popularity: 80,
    href: '/product',
  },
  {
    id: 'a030',
    article: 'A030',
    titleKey: 'ledArch18',
    category: 'table-decor',
    size: '60cm x 90cm',
    price: 129,
    oldPrice: 180,
    badge: '',
    popularity: 76,
    href: '/product',
  },
  {
    id: 'a031',
    article: 'A031',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 74,
    href: '/product',
  },
  {
    id: 'a032',
    article: 'A032',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 72,
    href: '/product',
  },
  {
    id: 'a033',
    article: 'A033',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 70,
    href: '/product',
  },
  {
    id: 'a034',
    article: 'A034',
    titleKey: 'ledArch18',
    category: 'arches',
    size: '180cm x 220cm',
    price: 339,
    oldPrice: 450,
    badge: '',
    popularity: 68,
    href: '/product',
  },
]

const products = computed(() =>
  productItems.map((product) => ({
    ...product,
    title: t.value.catalog.products[product.titleKey],
    badge: product.badgeKey ? t.value.catalog.badges[product.badgeKey] : product.badge,
  })),
)

const selectedCategory = ref('all')
const sortMode = ref('popular')
const visibleLimit = ref(8)

const toggleSort = () => {
  sortMode.value = sortMode.value === 'popular' ? 'price-asc' : 'popular'
}

const sortedProducts = computed(() => {
  const productsCopy = [...products.value]

  if (sortMode.value === 'price-asc') {
    return productsCopy.sort((first, second) => first.price - second.price)
  }

  return productsCopy.sort((first, second) => second.popularity - first.popularity)
})

const filteredProducts = computed(() => sortedProducts.value.filter((product) => (
  selectedCategory.value === 'all' || product.category === selectedCategory.value
)))

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleLimit.value))
const hasMoreProducts = computed(() => visibleProducts.value.length < filteredProducts.value.length)

const showMoreProducts = () => {
  visibleLimit.value += 8
}

watch([selectedCategory, sortMode], () => {
  visibleLimit.value = 8
})

const setCategory = (value) => {
  selectedCategory.value = value
  visibleLimit.value = 8
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  visibleLimit.value = 8
}
</script>

<template>
  <div class="catalog-page">
    <SiteHeader />

    <main class="catalog-main">
      <section class="catalog-template">
        <div v-reveal>
          <p class="catalog-eyebrow">{{ t.catalog.eyebrow }}</p>
          <h1 class="catalog-title">{{ t.catalog.title }}</h1>
        </div>

        <div class="catalog-layout">
          <aside v-reveal="{ delay: 80, variant: 'scale' }" class="catalog-sidebar" :aria-label="t.catalog.sidebarAria">
            <div class="catalog-sidebar-block">
              <h2>{{ t.catalog.filterTitle }}</h2>
              <div class="catalog-sidebar-options">
                <button
                  v-for="option in categoryOptions"
                  :key="option.value"
                  type="button"
                  class="catalog-sidebar-option"
                  :class="{ 'is-active': selectedCategory === option.value }"
                  :data-filter-value="option.value"
                  @click="setCategory(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <button type="button" class="catalog-reset-button" @click="resetFilters">
              {{ t.catalog.reset }}
            </button>
            <button
              type="button"
              class="catalog-sidebar-sort-button"
              :aria-label="sortMode === 'popular' ? t.catalog.sortByPrice : t.catalog.sortByPopular"
              data-catalog-sort-sidebar
              @click="toggleSort"
            >
              <span>{{ sortMode === 'popular' ? t.catalog.sortByPrice : t.catalog.popular }}</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 3V15M5 15L2.5 12.5M5 15L7.5 12.5M13 15V3M13 3L10.5 5.5M13 3L15.5 5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </aside>

          <div class="catalog-content">
        <div class="catalog-toolbar">
          <label class="catalog-select-wrap">
            <span class="sr-only">{{ t.catalog.categoryLabel }}</span>
            <select
              v-model="selectedCategory"
              class="catalog-select"
              data-catalog-filter="category"
            >
              <option
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </label>

          <button
            type="button"
            class="catalog-sort-button"
            :aria-label="sortMode === 'popular' ? t.catalog.sortByPrice : t.catalog.sortByPopular"
            data-catalog-sort
            @click="toggleSort"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 3V15M5 15L2.5 12.5M5 15L7.5 12.5M13 15V3M13 3L10.5 5.5M13 3L15.5 5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div class="catalog-grid">
          <article
            v-for="(product, index) in visibleProducts"
            :key="product.id"
            class="catalog-card"
            :class="[`category-${product.category}`]"
            v-reveal="{ delay: (index % 8) * 45, variant: 'scale' }"
            :data-product-id="product.id"
            :data-category="product.category"
            :data-price="product.price"
            :data-popularity="product.popularity"
          >
            <a :href="product.href" class="catalog-card-image-link motion-image-wrap" :aria-label="product.title">
              <img :src="productImageUrl" :alt="product.title" class="catalog-card-image motion-image" loading="lazy" />
              <span v-if="product.badge" class="catalog-card-badge">{{ product.badge }}</span>
            </a>

            <div class="catalog-card-body">
              <p class="catalog-card-meta">{{ product.article }} - {{ product.size }}</p>
              <h2 class="catalog-card-title">
                <a :href="product.href">{{ product.title }}</a>
              </h2>

              <div class="catalog-card-footer">
                <p class="catalog-price">
                  {{ product.price }}€
                  <span>{{ product.oldPrice }}€</span>
                </p>

                <a :href="product.href" class="catalog-card-link" :aria-label="`${t.catalog.productLink} ${product.title}`">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 7.5H11M8.25 4.75L11 7.5L8.25 10.25" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>

        <button
          v-if="hasMoreProducts"
          type="button"
          class="catalog-more-button motion-button"
          @click="showMoreProducts"
        >
          {{ t.catalog.showMore }}
        </button>
          </div>
        </div>

      </section>

      <ContactSection
        :title="t.catalog.contact.title"
        :description="t.catalog.contact.description"
      />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: #FDF9F6;
  color: var(--color-text);
}

.catalog-main {
  padding: 22px 0 0;
}

.catalog-template {
  width: min(100% - 32px, 390px);
  margin: 0 auto 50px;
}

.catalog-eyebrow {
  margin: 0;
  font-family: var(--font-display);
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0;
  color: var(--color-heading);
  text-transform: uppercase;
}

.catalog-title {
  margin: 10px 0 0;
  font-family: var(--font-display);
  font-size: 29px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0;
  color: var(--color-heading);
}

.catalog-layout {
  margin-top: 18px;
}

.catalog-sidebar {
  display: none;
}

.catalog-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  gap: 10px;
  align-items: center;
  margin-top: 18px;
}

.catalog-select-wrap {
  position: relative;
  display: block;
}

.catalog-select {
  width: 100%;
  height: 34px;
  padding: 0 34px 0 13px;
  border: 1px solid rgba(34, 17, 46, 0.14);
  border-radius: 999px;
  background: #fff;
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: 11px;
  line-height: 16px;
  outline: none;
}

.catalog-sort-button {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(34, 17, 46, 0.14);
  border-radius: 999px;
  background: #fff;
  color: var(--color-heading);
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    background-color 0.24s ease,
    color 0.24s ease,
    box-shadow 0.24s ease;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 20px;
  margin-top: 16px;
}

.catalog-card {
  min-width: 0;
  transition:
    transform 0.28s ease,
    filter 0.28s ease;
}

.catalog-card-image-link {
  position: relative;
  display: block;
  overflow: hidden;
  border: 4px solid #fff;
  border-radius: 6px;
  background: #eee8e2;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
  transition:
    border-color 0.24s ease,
    box-shadow 0.28s ease;
}

.catalog-card-image {
  display: block;
  width: 100%;
  aspect-ratio: 160 / 166;
  border-radius: 2px;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.catalog-card-badge {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 42px;
  padding: 5px 7px 4px;
  background: #2e1742;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 700;
  line-height: 10px;
  text-transform: uppercase;
}

.catalog-card-body {
  padding-top: 5px;
}

.catalog-card-meta {
  margin: 0;
  color: #817C84;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
}

.catalog-card-title {
  min-height: 28px;
  margin: 1px 0 0;
  color: #22112E;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
}

.catalog-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 7px;
}

.catalog-price {
  margin: 0;
  color: #22112E;
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
}

.catalog-price span {
  margin-left: 0;
  color: #817C84;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 300;
  line-height: 14px;
  text-decoration-line: line-through;
}

.catalog-card-link {
  display: inline-flex;
  width: 70px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 27px;
  background: #E93C60;
  color: #fff;
  transition:
    transform 0.24s ease,
    background-color 0.24s ease,
    box-shadow 0.24s ease;
}

.catalog-more-button {
  display: flex;
  width: 100%;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  background: transparent;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  transition:
    transform 0.24s ease,
    background-color 0.24s ease,
    color 0.24s ease,
    box-shadow 0.24s ease;
}

@media (hover: hover) and (pointer: fine) {
  .catalog-sort-button:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: #fff;
    box-shadow: 0 12px 24px rgba(233, 60, 96, 0.16);
  }

  .catalog-card:hover {
    transform: translateY(-5px);
  }

  .catalog-card:hover .catalog-card-image-link {
    border-color: rgba(233, 60, 96, 0.32);
    box-shadow: 0 18px 38px rgba(34, 17, 46, 0.14);
  }

  .catalog-card:hover .catalog-card-image {
    transform: scale(1.045);
  }

  .catalog-card-link:hover {
    transform: translateX(2px);
    background: var(--color-primary-dark);
    box-shadow: 0 12px 22px rgba(233, 60, 96, 0.2);
  }

  .catalog-more-button:hover {
    transform: translateY(-2px);
    background: var(--color-primary);
    color: #fff;
    box-shadow: 0 14px 30px rgba(233, 60, 96, 0.16);
  }
}

@media (min-width: 700px) {
  .catalog-template {
    width: min(100% - 48px, 760px);
  }

  .catalog-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .catalog-template {
    width: min(100% - 64px, 1120px);
  }

  .catalog-layout {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 24px;
    align-items: start;
    margin-top: 24px;
  }

  .catalog-sidebar {
    display: block;
    padding: 20px;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 18px 44px rgba(34, 17, 46, 0.07);
  }

  .catalog-sidebar-block h2 {
    margin: 0;
    color: var(--color-heading);
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
  }

  .catalog-sidebar-options {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 16px;
  }

  .catalog-sidebar-option {
    min-height: 36px;
    padding: 0 16px;
    border: 1px solid rgba(34, 17, 46, 0.13);
    border-radius: 999px;
    background: #fff;
    color: var(--color-heading);
    font-size: 13px;
    line-height: 18px;
    transition: 0.2s ease;
  }

  .catalog-sidebar-option:hover,
  .catalog-sidebar-option.is-active {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: #fff;
  }

  .catalog-reset-button,
  .catalog-sidebar-sort-button {
    width: 100%;
    min-height: 42px;
    border: 1px solid rgba(34, 17, 46, 0.14);
    border-radius: 999px;
    background: transparent;
    color: var(--color-heading);
    font-family: var(--font-display);
    font-size: 12px;
    line-height: 18px;
    text-transform: uppercase;
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      background-color 0.24s ease,
      color 0.24s ease,
      box-shadow 0.24s ease;
  }

  .catalog-reset-button {
    margin-top: 24px;
  }

  .catalog-sidebar-sort-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    padding: 0 16px;
    text-align: left;
  }

  .catalog-sidebar-sort-button svg {
    transition: transform 0.24s ease;
  }

  .catalog-reset-button:hover {
    transform: translateY(-2px);
    border-color: rgba(233, 60, 96, 0.42);
    background: #fff4f7;
    color: var(--color-primary);
    box-shadow: 0 12px 24px rgba(233, 60, 96, 0.1);
  }

  .catalog-sidebar-sort-button:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: #fff;
    box-shadow: 0 14px 30px rgba(233, 60, 96, 0.16);
  }

  .catalog-sidebar-sort-button:hover svg {
    transform: translateY(-1px);
  }

  .catalog-toolbar {
    display: none;
  }

  .catalog-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 0;
  }

  .catalog-card-meta {
    color: #817C84;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
  }

  .catalog-card-title {
    color: #22112E;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

  .catalog-price {
    color: #22112E;
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
  }
}

@media (min-width: 1240px) {
  .catalog-template {
    width: min(100% - 80px, 1240px);
  }
}
</style>
