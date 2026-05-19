<script setup>
import { computed, ref } from 'vue'
import UiButton from '../../../components/shared/UiButton.vue'
import arrNextIconUrl from '../../../assets/product-page/arr-next.svg'
import arrPrevIconUrl from '../../../assets/product-page/arr-prev.svg'
import blueColorIconUrl from '../../../assets/product-page/blue-ic.svg'
import pinkColorIconUrl from '../../../assets/product-page/pink-ic.svg'
import productImageUrl from '../../../assets/product-page/product-jpg.jpg'
import purpleColorIconUrl from '../../../assets/product-page/purple-ic.svg'
import starsIconUrl from '../../../assets/product-page/stars-ic.svg'

const productImageSet = [
  {
    image: productImageUrl,
    alt: 'Каркасная арка White Elegance PBR22 с белыми цветами',
  },
  {
    image: productImageUrl,
    alt: 'Каркасная арка White Elegance PBR22 крупным планом',
  },
  {
    image: productImageUrl,
    alt: 'Каркасная арка White Elegance PBR22 как центральный декор церемонии',
  },
]

const productColorOptions = [
  {
    key: 'blue',
    label: 'Голубой',
    swatchIcon: blueColorIconUrl,
    isUsed: true,
  },
  {
    key: 'purple',
    label: 'Фиолетовый',
    swatchIcon: purpleColorIconUrl,
    isUsed: true,
  },
  {
    key: 'pink',
    label: 'Розовый',
    swatchIcon: pinkColorIconUrl,
    isUsed: true,
  },
]

const recommendedUsage = [
  'Центральный элемент зоны церемонии',
  'Фон для стола молодоженов',
  'Фотозона',
]

const currentSlideIndex = ref(0)
const activeGallery = computed(() => productImageSet)

const goToSlide = (index) => {
  currentSlideIndex.value = index
}

const goToPreviousSlide = () => {
  currentSlideIndex.value = currentSlideIndex.value === 0 ? activeGallery.value.length - 1 : currentSlideIndex.value - 1
}

const goToNextSlide = () => {
  currentSlideIndex.value = currentSlideIndex.value === activeGallery.value.length - 1 ? 0 : currentSlideIndex.value + 1
}

const selectColor = (colorKey) => {
  selectedColorKey.value = colorKey
  currentSlideIndex.value = 0
}
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[64px] pb-[150px] max-[768px]:w-full max-[768px]:px-[22px] max-[768px]:pt-[34px] max-[768px]:pb-[150px]">
    <div class="grid items-start gap-[36px] min-[1100px]:grid-cols-[minmax(0,780px)_390px] max-[1099px]:gap-[40px]">
      <div>
        <div class="max-[768px]:mb-[12px]">
          <p class="m-0 text-[13px] font-normal uppercase leading-5 tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)]">
            Цветочные арки
          </p>

          <h1 class="mt-4 text-[56px] font-normal leading-[64px] tracking-[-1.44px] text-[#22112E] [font-family:var(--font-display)] max-[1024px]:text-[46px] max-[1024px]:leading-[54px] max-[768px]:mt-[10px] max-[768px]:max-w-full max-[768px]:text-[44px] max-[768px]:leading-[52px] max-[768px]:tracking-[-0.7px]">
            Каркасная арка White Elegance PBR22
          </h1>

          <p class="mt-4 text-[20px] font-normal leading-[30px] tracking-[-0.28px] text-[#6D6474] max-[768px]:mt-3 max-[768px]:text-[14px] max-[768px]:leading-[24px]">
            Размер - 240cm x 220cm
          </p>
        </div>

        <div class="relative mt-8 overflow-hidden rounded-[18px] bg-[#ebe3dc] max-[768px]:mt-0 max-[768px]:rounded-[18px]">
          <div class="absolute left-[22px] top-[22px] z-10 rounded-[4px] bg-[#2E1742] px-[14px] py-[10px] [font-family:var(--font-display)] text-[16px] font-normal uppercase leading-[18px] tracking-[-0.32px] text-white max-[768px]:left-4 max-[768px]:top-4 max-[768px]:px-[12px] max-[768px]:py-[8px] max-[768px]:text-[13px]">
            Хит сезона
          </div>

          <img
            :src="activeGallery[currentSlideIndex].image"
            :alt="activeGallery[currentSlideIndex].alt"
            class="block aspect-[1/1.05] w-full object-cover max-[768px]:aspect-[1/1.36]"
          />

          <button
            type="button"
            class="absolute left-5 top-1/2 inline-flex h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full bg-white/35 backdrop-blur-sm transition duration-200 hover:bg-white/50 max-[768px]:left-3 max-[768px]:h-[44px] max-[768px]:w-[44px]"
            aria-label="Предыдущее изображение"
            @click="goToPreviousSlide"
          >
            <img :src="arrPrevIconUrl" alt="" class="h-5 w-5 max-[768px]:h-4 max-[768px]:w-4" />
          </button>

          <button
            type="button"
            class="absolute right-5 top-1/2 inline-flex h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full bg-white/35 backdrop-blur-sm transition duration-200 hover:bg-white/50 max-[768px]:right-3 max-[768px]:h-[44px] max-[768px]:w-[44px]"
            aria-label="Следующее изображение"
            @click="goToNextSlide"
          >
            <img :src="arrNextIconUrl" alt="" class="h-5 w-5 max-[768px]:h-4 max-[768px]:w-4" />
          </button>
        </div>

        <div class="mt-5 grid max-w-[500px] grid-cols-3 gap-[16px] max-[768px]:mt-4 max-[768px]:max-w-full max-[768px]:gap-[12px]">
          <button
            v-for="(item, index) in activeGallery"
            :key="`gallery-${index}`"
            type="button"
            class="overflow-hidden rounded-[12px] border-2 transition duration-200"
            :class="currentSlideIndex === index ? 'border-[var(--color-primary)] shadow-[0_12px_24px_rgba(233,60,96,0.18)]' : 'border-transparent hover:border-[rgba(233,60,96,0.35)]'"
            :aria-label="`Показать изображение ${index + 1}`"
            @click="goToSlide(index)"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              class="block aspect-square w-full object-cover"
            />
          </button>
        </div>
      </div>

      <div class="min-[1100px]:pt-[8px]">
        <div class="mt-8 max-[768px]:mt-9">
          <h2 class="m-0 max-w-[430px] text-[32px] font-normal leading-[40px] tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)] max-[768px]:max-w-full max-[768px]:text-[24px] max-[768px]:leading-[32px]">
            Рекомендованные варианты использования
          </h2>

          <ul class="mt-6 space-y-5 p-0 max-[768px]:mt-5 max-[768px]:space-y-4">
            <li
              v-for="item in recommendedUsage"
              :key="item"
              class="flex items-center gap-4 list-none"
            >
              <img :src="starsIconUrl" alt="" class="h-[28px] w-[28px] shrink-0 max-[768px]:h-[24px] max-[768px]:w-[24px]" />
              <span class="text-[18px] font-normal leading-[28px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
                {{ item }}
              </span>
            </li>
          </ul>
        </div>

        <p class="mt-8 max-w-[390px] text-[18px] font-normal leading-[32px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-8 max-[768px]:max-w-full max-[768px]:text-[14px] max-[768px]:leading-[24px]">
          Арка выполнена с использованием качественных искусственных цветов, которые выглядят реалистично и сохраняют аккуратный вид на протяжении всего мероприятия. Конструкция подходит для фотосъёмки, церемоний и торжественных событий, эффектно смотрится как вживую, так и на фотографиях.
        </p>

        <div class="mt-8 max-[768px]:mt-9">
          <h2 class="m-0 text-[32px] font-normal leading-[40px] tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)] max-[768px]:text-[24px] max-[768px]:leading-[32px]">
            Цветовая сочетаемость
          </h2>

          <div class="mt-6 flex flex-wrap gap-x-8 gap-y-4 max-[768px]:mt-5 max-[768px]:gap-x-5 max-[768px]:gap-y-4">
            <div
              v-for="option in productColorOptions"
              :key="option.key"
              class="inline-flex items-center gap-3 text-left"
            >
              <span
                class="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-transparent max-[768px]:h-[34px] max-[768px]:w-[34px] max-[768px]:rounded-[10px]"
              >
                <img :src="option.swatchIcon" alt="" class="h-full w-full rounded-[10px] object-cover" />
              </span>
              <span class="text-[18px] font-normal leading-[28px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
                {{ option.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 rounded-[40px] border-[4px] max-w-[910px] border-white bg-[#22112E] px-[22px] py-[24px] shadow-[0_24px_60px_rgba(34,17,46,0.12)] max-[768px]:mt-10 max-[768px]:rounded-[40px] max-[768px]:px-[20px] max-[768px]:py-[22px]">
      <div class="relative z-10 mb-[18px]">
        <h2 class="m-0 max-w-[760px] [font-family:var(--font-display)] text-[44px] font-normal leading-[48px] tracking-[-0.7px] text-white max-[768px]:max-w-[240px] max-[768px]:text-[32px] max-[768px]:leading-[36px]">
          Хотите оформить своё мероприятие?
        </h2>

        <p class="mt-3 max-w-[760px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-white/80 max-[768px]:mt-3 max-[768px]:max-w-[240px] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
          Оставьте заявку, и мы подберём идеальное оформление под ваш стиль и площадку.
        </p>
      </div>

      <div class="grid gap-5 min-[760px]:grid-cols-2 max-[759px]:grid-cols-1">
        <label class="block">
          <span class="sr-only">Ваше имя</span>
          <input
            type="text"
            placeholder="Ваше имя"
            class="h-[58px] w-full rounded-[555px] border-0 bg-white px-6 text-[16px] leading-[22px] text-[#5b5b5b] outline-none placeholder:text-[#8d8d8d] max-[768px]:h-[52px]"
          />
        </label>

        <label class="block">
          <span class="sr-only">Ваш телефон</span>
          <input
            type="tel"
            placeholder="+371 00 000 000"
            class="h-[58px] w-full rounded-[555px] border-0 bg-white px-6 text-[16px] leading-[22px] text-[#5b5b5b] outline-none placeholder:text-[#8d8d8d] max-[768px]:h-[52px]"
          />
        </label>
      </div>

      <button
        type="button"
        class="mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-[555px] bg-white px-8 [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[#22112E] transition duration-200 hover:bg-[#fff4f7] max-[768px]:mt-6 max-[768px]:min-h-[52px]"
      >
        Заказать оформление
      </button>

      <p class="mx-auto mt-6 max-w-[760px] text-center text-[11px] font-normal leading-[16px] tracking-[-0.22px] text-white max-[768px]:mt-[16px] max-[768px]:max-w-[330px] max-[768px]:text-[10px] max-[768px]:leading-[1.45]">
        Отправляя эту форму, вы соглашаетесь, что предоставленные данные будут использованы для связи с вами и обработаны в соответствии с нашей
        <a href="#" class="underline underline-offset-2 hover:no-underline">Политикой конфиденциальности</a>.
      </p>
    </div>

    <div class="fixed inset-x-0 bottom-0 z-40 bg-transparent px-[18px] pb-[18px] min-[769px]:hidden">
      <div class="flex items-center gap-[10px] rounded-[40px] bg-[var(--color-primary)] p-[10px] shadow-[0_24px_60px_rgba(34,17,46,0.22)]">
        <div class="flex min-h-[68px] min-w-[120px] items-center justify-center rounded-[555px] bg-[var(--color-primary)] [font-family:var(--font-display)] text-[28px] font-normal leading-[30px] tracking-[-0.7px] text-white">
          350€
        </div>

        <button
          type="button"
          class="flex min-h-[68px] flex-1 items-center justify-center gap-2 rounded-[555px] bg-white px-5 [font-family:var(--font-display)] text-[14px] font-normal uppercase leading-[20px] tracking-[-0.26px] text-[var(--color-primary)] transition duration-200 hover:bg-[#fff4f7]"
        >
          <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8.125 8.125H22.75L20.625 16.625H10.25L8.125 4.9375H4.1875" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.625 21.25C11.2113 21.25 11.6875 20.7738 11.6875 20.1875C11.6875 19.6012 11.2113 19.125 10.625 19.125C10.0387 19.125 9.5625 19.6012 9.5625 20.1875C9.5625 20.7738 10.0387 21.25 10.625 21.25Z" fill="currentColor" />
            <path d="M18.5 21.25C19.0863 21.25 19.5625 20.7738 19.5625 20.1875C19.5625 19.6012 19.0863 19.125 18.5 19.125C17.9137 19.125 17.4375 19.6012 17.4375 20.1875C17.4375 20.7738 17.9137 21.25 18.5 21.25Z" fill="currentColor" />
          </svg>
          Добавить в заказ
        </button>
      </div>
    </div>
  </section>
</template>
