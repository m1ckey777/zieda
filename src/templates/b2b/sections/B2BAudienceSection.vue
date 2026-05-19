<script setup>
import audienceImage1Url from '../../../assets/b2b-audience-1.jpg'
import audienceImage2Url from '../../../assets/b2b-audience-2.jpg'
import audienceImage3Url from '../../../assets/b2b-audience-3.jpg'
import audienceImage4Url from '../../../assets/b2b-audience-4.jpg'
import audienceImage5Url from '../../../assets/b2b-audience-5.jpg'
import audienceImage6Url from '../../../assets/b2b-audience-6.jpg'

const audienceCards = [
  {
    title: 'Event-агентства',
    image: audienceImage1Url,
  },
  {
    title: 'Банкетные залы',
    image: audienceImage2Url,
  },
  {
    title: 'Отели\nи конгресс-центры',
    image: audienceImage3Url,
  },
  {
    title: 'Рекламные\nи продакшн-агентства',
    image: audienceImage4Url,
  },
  {
    title: 'Фотостудии и площадки\nдля съемок',
    image: audienceImage5Url,
  },
  {
    title: 'Организаторы свадеб\nи частных праздников',
    image: audienceImage6Url,
  },
]
</script>

<template>
  <section
    id="b2b-audience"
    class="py-[50px] max-[768px]:pt-[45px] max-[768px]:pb-[25px]"
  >
    <div class="mx-auto w-[min(1200px,calc(100%-40px))] max-[768px]:w-[min(1200px,calc(100%-32px))]">
      <p class="m-0 font-[var(--font-display)] text-[13px] font-normal uppercase leading-5 tracking-[-0.7px] text-[var(--color-heading)] max-[768px]:text-center">
        #С КЕМ МЫ РАБОТАЕМ
      </p>

      <h2 class="m-0 mt-[8px] mb-[40px] max-w-[820px] [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-[var(--color-heading)] max-[768px]:mx-auto max-[768px]:mt-[10px] max-[768px]:mb-[22px] max-[768px]:max-w-[340px] max-[768px]:text-center max-[768px]:text-[30px] max-[768px]:leading-[1.15] max-[768px]:tracking-[-0.5px]">
        Мы работаем с профессионалами event-индустрии
      </h2>

      <div class="max-w-[980px]  text-[16px] font-normal leading-[1.68] tracking-[-0.28px] text-[#5A5064] max-[768px]:mx-auto max-[768px]:max-w-[351px] max-[768px]:space-y-0 max-[768px]:text-center max-[768px]:text-[14px] max-[768px]:leading-[1.7]">
        <p class=" ">
          Мы работаем с теми, кому важно качество декора, стабильность и предсказуемый результат.
        </p>
        <p class=" ">
          Мы берём на себя оформление, чтобы вы могли сосредоточиться на организации и работе с клиентом.
        </p>
      </div>

      <div class="mt-[50px] grid grid-cols-6 gap-[17px] max-[1180px]:grid-cols-3 max-[1180px]:gap-y-8 max-[768px]:mt-[28px] max-[768px]:grid-cols-2 max-[768px]:gap-x-[17px] max-[768px]:gap-y-[22px]">
        <article
          v-for="card in audienceCards"
          :key="card.title"
          class="min-w-0"
        >
          <img
            :src="card.image"
            :alt="card.title.replace('\n', ' ')"
            class="block aspect-[183/132] w-full rounded-[14px] object-cover max-[768px]:aspect-[160/117] max-[768px]:rounded-[10px]"
          />

          <p class="m-0 mt-[10px] whitespace-pre-line text-center font-[var(--font-sans)] text-[16px] font-normal leading-[19.661px] text-black max-[768px]:text-[12px] max-[768px]:leading-[1.35]">
            {{ card.title }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
