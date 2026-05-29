<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/styles'
import mailIconUrl from '../../../assets/contact-page/mail-ic.svg'
import phoneIconUrl from '../../../assets/contact-page/phone-ic.svg'
import pinIconUrl from '../../../assets/contact-page/pin-ic.svg'
import socialFacebookIconUrl from '../../../assets/contact-page/soc-ic-1.svg'
import socialInstagramIconUrl from '../../../assets/contact-page/soc-ic-2.svg'
import socialYoutubeIconUrl from '../../../assets/contact-page/soc-ic-3.svg'
import { useLanguage } from '../../../composables/useLanguage'

const { t } = useLanguage()
const city = ref('')
const service = ref('')
const contactName = ref('')
const contactMessage = ref('')
const phoneInputRef = ref(null)
const contactPhone = ref('')
const isSubmitted = ref(false)

const cityOptions = computed(() => t.value.contacts.cityOptions)
const serviceOptions = computed(() => t.value.contacts.serviceOptions)

const socialLinks = [
  { key: 'facebook', href: '#', label: 'Facebook', icon: socialFacebookIconUrl },
  { key: 'instagram', href: '#', label: 'Instagram', icon: socialInstagramIconUrl },
  { key: 'youtube', href: '#', label: 'YouTube', icon: socialYoutubeIconUrl },
]

let itiInstance = null

const bindPhoneInput = () => {
  if (!phoneInputRef.value) return

  phoneInputRef.value.removeEventListener('input', syncPhoneValue)
  itiInstance?.destroy()

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
  phoneInputRef.value.value = contactPhone.value

  phoneInputRef.value.addEventListener('input', syncPhoneValue)
}

const syncPhoneValue = () => {
  contactPhone.value = phoneInputRef.value?.value ?? ''
}

const submitContactForm = () => {
  syncPhoneValue()
  isSubmitted.value = true
}

const resetForm = () => {
  isSubmitted.value = false
  city.value = ''
  service.value = ''
  contactName.value = ''
  contactMessage.value = ''
  contactPhone.value = ''

  requestAnimationFrame(() => {
    bindPhoneInput()
  })
}

onMounted(() => {
  bindPhoneInput()
})

onBeforeUnmount(() => {
  if (phoneInputRef.value) {
    phoneInputRef.value.removeEventListener('input', syncPhoneValue)
  }

  itiInstance?.destroy()
})
</script>

<template>
  <section class="mx-auto w-[min(1200px,calc(100%-40px))] pt-[80px] pb-[110px] max-[768px]:w-full max-[768px]:px-[15px] max-[768px]:pt-[38px] max-[768px]:pb-[45px]">
    <div v-reveal class="max-w-[680px] max-[768px]:max-w-none">
      <p class="m-0 text-[13px] font-normal uppercase leading-5 tracking-[-0.7px] text-[#22112E] [font-family:var(--font-display)]">
        {{ t.contacts.eyebrow }}
      </p>

      <h1 class="mt-4 text-[56px] font-normal leading-[64px] tracking-[-1.44px] text-[#22112E] [font-family:var(--font-display)] max-[1024px]:text-[48px] max-[1024px]:leading-[56px] max-[768px]:mt-[10px] max-[768px]:text-[44px] max-[768px]:leading-[52px] max-[768px]:tracking-[-0.7px]">
        {{ t.contacts.title }}
      </h1>

      <p class="mt-5 max-w-[620px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-[#51465A] max-[768px]:mt-[10px] max-[768px]:text-[14px] max-[768px]:leading-[24px]">
        {{ t.contacts.text }}
      </p>
    </div>

    <div class="mt-12 grid items-start gap-10 min-[1025px]:grid-cols-[1fr_430px] max-[1024px]:mt-10 max-[768px]:block">
      <div v-reveal="{ delay: 100, variant: 'scale' }" class="order-2 max-[768px]:order-1">
        <div
          v-if="isSubmitted"
          class="rounded-[40px] border-[4px] border-white bg-[var(--color-primary)] px-[44px] py-[42px] shadow-[0_24px_60px_rgba(34,17,46,0.12)] max-[768px]:mb-[38px] max-[768px]:rounded-[40px] max-[768px]:px-[22px] max-[768px]:py-[30px]"
        >
          <h2 class="m-0 [font-family:var(--font-display)] text-[44px] font-normal leading-[52px] tracking-[-0.7px] text-white max-[768px]:text-[32px] max-[768px]:leading-[40px]">
            {{ t.contacts.successTitle }}
          </h2>

          <p class="mt-6 max-w-[520px] text-[16px] font-normal leading-[27px] tracking-[-0.28px] text-white max-[768px]:mt-5 max-[768px]:text-[14px] max-[768px]:leading-[24px]">
            {{ t.contacts.successText }}
          </p>

          <button
            type="button"
            class="motion-button mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[555px] bg-white px-8 [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[var(--color-primary)] transition duration-200 hover:bg-[#fff4f7] max-[768px]:mt-6 max-[768px]:h-[52px]"
            @click="resetForm"
          >
            {{ t.contacts.sendAgain }}
          </button>
        </div>

        <form
          v-else
          class="rounded-[40px] border-[4px] border-white bg-[var(--color-primary)] px-[36px] py-[32px] shadow-[0_24px_60px_rgba(34,17,46,0.12)] max-[768px]:mt-[28px] max-[768px]:rounded-[20px] max-[768px]:px-[15px] max-[768px]:py-[15px]"
          @submit.prevent="submitContactForm"
        >
          <div class="grid gap-5">
            <label class="block">
              <span class="sr-only">{{ t.contacts.name }}</span>
              <input
                v-model="contactName"
                type="text"
                name="name"
                :placeholder="t.contacts.name"
                class="h-[58px] w-full rounded-[555px] border-0 bg-white px-6 text-[16px] leading-[22px] text-[#5b5b5b] outline-none placeholder:text-[#8d8d8d] transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.24)] max-[768px]:h-[52px]"
              />
            </label>

            <label class="relative block">
              <span class="sr-only">{{ t.contacts.city }}</span>
              <select
                v-model="city"
                name="city"
                class="h-[58px] w-full appearance-none rounded-[555px] border-0 bg-white px-6 pr-12 text-[16px] leading-[22px] text-[#5b5b5b] outline-none transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.24)] max-[768px]:h-[52px]"
              >
                <option value="" disabled>{{ t.contacts.city }}</option>
                <option v-for="option in cityOptions" :key="option" :value="option">{{ option }}</option>
              </select>
              <span class="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[#22112E]">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 2 7 7l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </label>

            <label class="relative block">
              <span class="sr-only">{{ t.contacts.service }}</span>
              <select
                v-model="service"
                name="service"
                class="h-[58px] w-full appearance-none rounded-[555px] border-0 bg-white px-6 pr-12 text-[16px] leading-[22px] text-[#5b5b5b] outline-none transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.24)] max-[768px]:h-[52px]"
              >
                <option value="" disabled>{{ t.contacts.service }}</option>
                <option v-for="option in serviceOptions" :key="option" :value="option">{{ option }}</option>
              </select>
              <span class="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[#22112E]">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 2 7 7l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </label>

            <label class="block">
              <span class="sr-only">{{ t.contacts.phone }}</span>
              <input
                ref="phoneInputRef"
                type="tel"
                name="phone"
                class="contact-phone-input h-[58px] w-full rounded-[555px] border-0 bg-white text-[16px] leading-[22px] text-[#5b5b5b] outline-none transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.24)] max-[768px]:h-[52px]"
              />
            </label>

            <label class="block">
              <span class="sr-only">{{ t.contacts.message }}</span>
              <textarea
                v-model="contactMessage"
                name="message"
                :placeholder="t.contacts.message"
                rows="6"
                class="min-h-[208px] w-full resize-none rounded-[32px] border-0 bg-white px-6 py-5 text-[16px] leading-[24px] text-[#5b5b5b] outline-none placeholder:text-[#8d8d8d] transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.24)] max-[768px]:min-h-[178px]"
              />
            </label>
          </div>

          <button
            type="submit"
            class="motion-button mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[555px] bg-white px-8 [font-family:var(--font-display)] text-center text-[16px] font-normal uppercase leading-[22px] tracking-[-0.32px] text-[var(--color-primary)] transition duration-200 hover:bg-[#fff4f7] max-[768px]:mt-6 max-[768px]:h-[52px]"
          >
            {{ t.contacts.submit }}
          </button>

          <p class="mx-auto mt-6 max-w-[610px] text-center text-[11px] font-normal leading-[16px] tracking-[-0.22px] text-white max-[768px]:mt-[16px] max-[768px]:max-w-[330px] max-[768px]:text-[10px] max-[768px]:leading-[1.45]">
            {{ t.contacts.privacy }}
          </p>
        </form>
      </div>

      <aside v-reveal="{ delay: 180, variant: 'scale' }" class="order-1 rounded-[40px] border-[4px] border-white bg-[var(--color-footer)] px-[34px] py-[34px] shadow-[0_24px_60px_rgba(34,17,46,0.12)] max-[768px]:order-2 max-[768px]:mt-[38px] max-[768px]:rounded-[40px] max-[768px]:px-[20px] max-[768px]:py-[22px]">
        <div class="space-y-8 max-[768px]:space-y-7">
          <div class="grid grid-cols-[72px_1fr] items-center gap-5 max-[768px]:grid-cols-[40px_1fr] max-[768px]:gap-4">
            <img :src="phoneIconUrl" alt="" class="w-[72px] max-[768px]:w-[40px]" />
            <div>
              <p class="m-0 text-[18px] font-normal leading-[22px] text-white/80 max-[768px]:text-[16px]">{{ t.contacts.callUs }}</p>
              <a href="tel:+37100000000" class="mt-2 block [font-family:var(--font-display)] text-[42px] font-normal leading-[44px] tracking-[-0.7px] text-white max-[768px]:mt-1 max-[768px]:text-[21px] max-[768px]:leading-[30px]">
                +371 00 000 000
              </a>
            </div>
          </div>

          <div class="grid grid-cols-[72px_1fr] items-center gap-5 max-[768px]:grid-cols-[40px_1fr] max-[768px]:gap-4">
            <img :src="mailIconUrl" alt="" class="w-[72px] max-[768px]:w-[40px]" />
            <div>
              <p class="m-0 text-[18px] font-normal leading-[22px] text-white/80 max-[768px]:text-[16px]">{{ t.contacts.writeUs }}</p>
              <a href="mailto:info@zidaziedi.lv" class="mt-2 block [font-family:var(--font-display)] text-[42px] font-normal leading-[44px] tracking-[-0.7px] text-white max-[768px]:mt-1 max-[768px]:text-[21px] max-[768px]:leading-[30px]">
                info@zidaziedi.lv
              </a>
            </div>
          </div>

          <div class="grid grid-cols-[72px_1fr] items-center gap-5 max-[768px]:grid-cols-[40px_1fr] max-[768px]:gap-4">
            <img :src="pinIconUrl" alt="" class="w-[72px] max-[768px]:w-[40px]" />
            <div>
              <p class="m-0 text-[18px] font-normal leading-[22px] text-white/80 max-[768px]:text-[16px]">{{ t.contacts.visitUs }}</p>
              <p class="mt-2 [font-family:var(--font-display)] text-[42px] font-normal leading-[44px] tracking-[-0.7px] text-white max-[768px]:mt-1 max-[768px]:text-[21px] max-[768px]:leading-[30px]">
                Brivības iela 58
              </p>
            </div>
          </div>
        </div>

        <div class="mt-10 flex items-center justify-between gap-5 rounded-[555px] bg-white px-[22px] py-[12px] max-[768px]:mt-8 max-[768px]:px-[18px] max-[768px]:py-[10px]">
          <span class="[font-family:var(--font-display)] text-[26px] font-normal leading-[30px] tracking-[-0.7px] text-[var(--color-footer)] max-[768px]:text-[18px] max-[768px]:leading-[22px]">
            {{ t.contacts.socials }}
          </span>

          <div class="flex items-center gap-3 max-[768px]:gap-2">
            <a
              v-for="item in socialLinks"
              :key="item.key"
              :href="item.href"
              :aria-label="item.label"
              class="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[var(--color-footer)] transition duration-200 hover:scale-110 max-[768px]:h-[42px] max-[768px]:w-[42px]"
            >
              <img :src="item.icon" alt="" class="h-[24px] w-[24px] max-[768px]:h-[20px] max-[768px]:w-[20px]" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
