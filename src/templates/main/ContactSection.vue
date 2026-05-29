<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/styles'
import formImageUrl from '../../assets/form-img.png'
import { useLanguage } from '../../composables/useLanguage'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  submitLabel: {
    type: String,
    default: '',
  },
})

const { t } = useLanguage()
const phoneInputRef = ref(null)
const contactName = ref('')
const contactPhone = ref('')
let itiInstance = null

const title = computed(() => props.title || t.value.home.contact.title)
const description = computed(() => props.description || t.value.home.contact.description)
const submitLabel = computed(() => props.submitLabel || t.value.home.contact.submit)

onMounted(() => {
  if (!phoneInputRef.value) return

  itiInstance = intlTelInput(phoneInputRef.value, {
    initialCountry: 'lv',
    separateDialCode: true,
    nationalMode: false,
    autoPlaceholder: 'polite',
    formatAsYouType: true,
    strictMode: true,
    countryOrder: ['lv'],
    loadUtils: () => import('intl-tel-input/utils'),
  })

  itiInstance.setCountry('lv')
  phoneInputRef.value.value = ''

  phoneInputRef.value.addEventListener('input', () => {
    contactPhone.value = phoneInputRef.value?.value ?? ''
  })
})

onBeforeUnmount(() => {
  itiInstance?.destroy()
})

const submitContactForm = () => {
  contactPhone.value = phoneInputRef.value?.value ?? ''
}
</script>

<template>
  <section
    id="contact"
    v-reveal="{ variant: 'scale' }"
    class="mx-auto w-[min(1200px,calc(100%-40px))] pb-[110px] pt-[80px] max-[768px]:w-full max-[768px]:overflow-hidden max-[768px]:px-[5px] max-[768px]:pb-[55px]"
  >
    <div class="relative mx-auto max-w-[1121px] rounded-[52px] border-[5px] border-white bg-[var(--color-primary)] px-[66px] pt-[53px] pb-[36px] shadow-[0_24px_60px_rgba(34,17,46,0.12)] max-[1024px]:px-10 max-[1024px]:py-12 max-[768px]:ml-0 max-[768px]:w-full max-[768px]:rounded-none max-[768px]:border-0 max-[768px]:bg-transparent max-[768px]:px-0 max-[768px]:pt-0 max-[768px]:pb-0 max-[768px]:shadow-none">
      <img
        :src="formImageUrl"
        alt=""
        class="pointer-events-none absolute right-[-41px] top-[-85px] z-0 w-[255px] object-contain max-[1100px]:hidden"
      />

      <div class="grid items-start gap-[45px] min-[1100px]:grid-cols-[421px_520px] max-[1100px]:gap-10 max-[768px]:block">
        <div class="relative z-20 max-w-[460px] max-[768px]:hidden">
          <h2 class="m-0 max-w-[421px] [font-family:var(--font-display)] text-[36px] font-normal leading-[38px] tracking-[-0.7px] text-white">
            {{ title }}
          </h2>

          <p class="mt-6 max-w-[421px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-white">
            {{ description }}
          </p>
        </div>

        <div class="hidden max-[768px]:relative max-[768px]:mb-[20px] max-[768px]:block z-[222] pl-[5px]">
          <h2 class="m-0 mb-[8px] max-w-[350px] [font-family:var(--font-display)] text-[32px] font-normal leading-[36px] tracking-[-0.7px] text-[#020202]">
            {{ title }}
          </h2>

          <p class="max-w-[210px] text-[14px] font-normal leading-[24px] tracking-[-0.28px] text-[#2F2F2F]">
            {{ description }}
          </p>

          <img
            :src="formImageUrl"
            alt=""
            class="pointer-events-none absolute right-[-35px] top-[calc(100%-65px)] z-20 w-[255px] max-w-none object-contain"
          />
        </div>

        <form class="relative z-20 max-w-[520px] max-[768px]:mx-auto max-[768px]:max-w-full max-[768px]:rounded-[40px] max-[768px]:border-[5px] max-[768px]:border-white max-[768px]:bg-[var(--color-primary)] max-[768px]:px-[25px] max-[768px]:py-[30px] max-[768px]:shadow-[0_24px_60px_rgba(34,17,46,0.12)]" @submit.prevent="submitContactForm">
          <div class="hidden max-[768px]:hidden">
            <h2 class="m-0 max-w-[320px] [font-family:var(--font-display)] text-[32px] font-normal leading-[1.18] tracking-[-0.04em] text-white">
              {{ title }}
            </h2>

            <p class="mt-6 max-w-[320px] text-[14px] font-normal leading-[1.5] text-white">
              {{ description }}
            </p>
          </div>

          <div class="grid gap-[20px] min-[760px]:grid-cols-2 max-[759px]:grid-cols-1">
            <label class="block">
              <span class="sr-only">{{ t.home.contact.name }}</span>
              <input
                v-model="contactName"
                type="text"
                name="name"
                :placeholder="t.home.contact.name"
                class="h-[58px] w-full rounded-[555px] border-0 bg-white px-9 text-[16px] leading-[22px] text-[#5b5b5b] outline-none placeholder:text-[#8d8d8d] transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.28)] max-[768px]:h-[52px]"
              />
            </label>

            <label class="block">
              <span class="sr-only">{{ t.home.contact.phone }}</span>
              <input
                ref="phoneInputRef"
                type="tel"
                name="phone"
                class="contact-phone-input h-[58px] w-full rounded-[555px] border-0 bg-white text-[16px] leading-[22px] text-[#5b5b5b] outline-none transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.28)] max-[768px]:h-[52px]"
              />
            </label>
          </div>

          <button
            type="submit"
            class="motion-button mt-8 inline-flex h-[50px] w-full items-center justify-center rounded-[555px] bg-white px-8 [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[var(--color-primary)] transition duration-200 hover:bg-[#fff4f7] max-[768px]:mt-[20px] max-[768px]:h-[52px]"
          >
            {{ submitLabel }}
          </button>

          <p class="mx-auto mt-6 max-w-[610px] text-center text-[11px] font-normal leading-[16px] tracking-[-0.22px] text-white max-[768px]:mt-[20px] max-[768px]:max-w-[330px] max-[768px]:text-[10px] max-[768px]:leading-[1.45]">
            {{ t.home.contact.privacyBefore }}
            <a href="#" class="underline underline-offset-2 hover:no-underline">{{ t.home.contact.privacyLink }}</a>.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
