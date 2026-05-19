<script setup>
import individBgUrl from '../../assets/individ-bg.jpg'
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] max-[768px]:w-full max-[768px]:pb-0">
    <div class="relative overflow-hidden rounded-[42px] max-[768px]:rounded-none">
      <img
        :src="individBgUrl"
        alt="Индивидуальный декор для любого события"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/55 max-[768px]:bg-black/50"></div>

      <div class="relative z-10 flex flex-col items-center justify-center px-8 py-[100px] text-center max-[768px]:px-[7px] max-[768px]:pt-[117px] max-[768px]:pb-[157px]">
        <h2 class="m-0 max-w-[860px] [font-family:var(--font-display)] text-[52px] font-normal leading-[60px] tracking-[-2px] text-white max-[768px]:max-w-full max-[768px]:text-[44px] max-[768px]:leading-[48px] max-[768px]:tracking-[-2px]">
          Индивидуальный декор для любого события
        </h2>

        <div class="mt-12 max-w-[590px] space-y-4 max-[768px]:mt-[42px] max-[768px]:max-w-[375px] max-[768px]:space-y-0">
          <p class="m-0 text-center text-[18px] font-normal leading-[30px] text-white max-[768px]:text-[16px] max-[768px]:leading-[27px]">
            Каждая арка, каждая стена, каждая деталь — результат вдохновения и мастерства Zida Ziedi.
          </p>
          <p class="m-0 text-center text-[18px] font-normal leading-[30px] text-white max-[768px]:mt-0 max-[768px]:text-[16px] max-[768px]:leading-[27px]">
            Мы поможем превратить любую площадку в место, где хочется праздновать.
          </p>
        </div>

        <a
          href="#contact"
          class="mt-12 inline-flex min-h-[58px] items-center justify-center rounded-[555px] bg-[var(--color-primary)] px-[66px] [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-white transition duration-200 hover:bg-[var(--color-primary-dark)] max-[768px]:mt-[42px] max-[768px]:w-full max-[768px]:max-w-[375px] max-[768px]:px-6 max-[768px]:py-[17px] max-[768px]:text-[17px] max-[768px]:leading-[22px] max-[768px]:tracking-[-0.34px]"
        >
          Заказать оформление
        </a>
      </div>
    </div>
  </section>
</template>
