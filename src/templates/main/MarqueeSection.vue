<script setup>
const marqueeText =
  'Ziedu arkas • Foto zonas • Zāļu dekors • Kāzu noformējums • Dekora noma • Mākslīgie ziedi • Fona sienas • Pasākumu noformēšana • Ziedu kompozīcijas • Korporatīvais dekors • Individuāls dizains • Skatuvju noformējums • Fotosesiju dekors • Ziedu instalācijas • Event dekors • Arku un sienu noma • Floristikas dekors • Dekors uz atslēgas • Ātra montāža un demontāža •'

const marqueeItems = Array.from({ length: 4 }, () => marqueeText)
</script>

<template>
  <section class="mt-[15px] overflow-hidden bg-[var(--color-primary)] py-[26px] max-[768px]:py-[21px]">
    <div class="marquee-track flex w-max items-center whitespace-nowrap">
      <p
        v-for="(item, index) in marqueeItems"
        :key="index"
        class="m-0 [font-family:var(--font-display)] text-[26px] leading-[1.2] text-white"
      >
        {{ item }}
      </p>
    </div>
  </section>
</template>
