<script setup>
import starsIconUrl from '../../../assets/event-decor-stars-icon.svg'

const benefitItems = [
  {
    title: 'Свадьбы и выездные церемонии',
    description: 'арки, композиции, фотозоны, оформление зала.',
  },
  {
    title: 'Корпоративные мероприятия',
    description: 'стильный декор, фотозоны, брендированные элементы.',
  },
  {
    title: 'Детские праздники и вечеринки',
    description: 'нежные и яркие инсталляции, тематические фотозоны.',
  },
  {
    title: 'Частные торжества и юбилеи',
    description: 'гармоничное оформление для уютной и тёплой атмосферы.',
  },
  {
    title: 'Презентации, выставки, открытия',
    description: 'выразительные цветочные стены, акцентные композиции, визуальные точки притяжения.',
  },
  {
    title: 'Фотозоны и декорации для съёмок',
    description: 'композиции, которые создают выразительный фон и настроение.',
  },
]
</script>

<template>
  <section
    id="event-decor-benefits"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[44px] pb-[70px] max-[768px]:w-[min(1200px,calc(100%-32px))] max-[768px]:pb-[38px]"
  >
    <div class="w-full">
      <h2 class="m-0 mb-[21px] w-full [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[#22112E] max-[1024px]:text-[40px] max-[1024px]:leading-[48px] max-[768px]:text-[36px] max-[768px]:leading-[40px] max-[768px]:tracking-[-0.7px]">
        Там, где важны атмосфера и красота
      </h2>

      <div class="mt-0 w-full font-[var(--font-sans)] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        <p class="m-0">
          Zida Ziedi создаёт декор, который превращает любое событие в запоминающееся пространство.
        </p>
        <p class="m-0">
          Мы оформляем свадьбы, корпоративы, частные праздники, детские мероприятия и выставки — от небольших камерных вечеринок до крупных событий на сотни гостей.
        </p>
        <p class="m-0">
          Каждый проект продумывается индивидуально: мы подбираем цветовые сочетания, формы, композиции и элементы, которые идеально подходят вашей площадке и стилю мероприятия.
        </p>
        <p class="m-0">
          Мы работаем с премиальными искусственными цветами и декоративными конструкциями, создавая инсталляции, которые выглядят эффектно и вживую, и на фотографиях.
        </p>
        <p class="m-0">
          Наш подход — сочетание вкуса, аккуратного монтажа и понимания атмосферы, которую вы хотите передать.
        </p>
      </div>

      <div class="mt-[46px] grid grid-cols-3 gap-x-[44px] gap-y-[34px] max-[1024px]:grid-cols-2 max-[1024px]:gap-x-8 max-[1024px]:gap-y-7 max-[768px]:mt-[32px] max-[768px]:grid-cols-1 max-[768px]:gap-y-6">
        <article
          v-for="item in benefitItems"
          :key="item.title"
          class="flex items-start gap-2"
        >
          <img
            :src="starsIconUrl"
            alt=""
            aria-hidden="true"
            class="mt-[2px] h-6 w-6 shrink-0 max-[768px]:h-5 max-[768px]:w-5"
          />

          <div class="min-w-0">
            <h3 class="m-0 font-[var(--font-sans)] text-[16px] font-extrabold leading-[27px] text-[#322C36]">
              {{ item.title }}
            </h3>

            <p class="m-0 mt-[2px] font-[var(--font-sans)] text-[14px] font-normal leading-[24px] text-[#322C36]">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
