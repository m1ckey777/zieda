<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import cartIconUrl from '../../assets/header-cart.svg'
import logoUrl from '../../assets/logo.svg'
import phoneIconUrl from '../../assets/header-phone.svg'
import { useLanguage } from '../../composables/useLanguage'
import { withBaseHref } from '../../utils/links'
import UiButton from './UiButton.vue'

const { currentLanguage, languages, setLanguage, t } = useLanguage()
const desktopNavItems = computed(() => t.value.header.desktopNav)
const mobileNavItems = computed(() => t.value.header.mobileNav)

const isMobileMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)
const headerRef = ref(null)
const languageMenuRef = ref(null)

const closeAllMenus = () => {
  isMobileMenuOpen.value = false
  isLanguageMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isLanguageMenuOpen.value = false
  }
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const selectLanguage = (language) => {
  setLanguage(language)
  isLanguageMenuOpen.value = false
}

const handleClickOutside = (event) => {
  const target = event.target

  if (languageMenuRef.value && !languageMenuRef.value.contains(target)) {
    isLanguageMenuOpen.value = false
  }

  if (headerRef.value && !headerRef.value.contains(target)) {
    isMobileMenuOpen.value = false
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeAllMenus()
  }
}

const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMobileMenuOpen.value = false
  }
}

watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header ref="headerRef" class="sticky top-0 z-[999] border-b border-black/5 bg-white/95 backdrop-blur max-[980px]:border-b-0 max-[980px]:bg-transparent max-[980px]:backdrop-blur-0">
    <div class="mx-auto w-[min(1320px,calc(100%-40px))] py-3 max-[768px]:w-[min(1320px,calc(100%-32px))] max-[768px]:py-3">
      <div class="relative">
        <div
          class="rounded-full bg-white shadow-none max-[980px]:relative max-[980px]:z-[2] max-[980px]:shadow-[0_14px_36px_rgba(34,17,46,0.12)]"
          :class="{ 'max-[980px]:shadow-none': isMobileMenuOpen }"
        >
        <div class="flex items-center justify-between gap-6 px-5 py-[15px] max-[768px]:gap-3 max-[768px]:px-4 max-[768px]:py-3">
          <a :href="withBaseHref('/')" class="inline-flex items-center" aria-label="Zida Ziedi">
            <img :src="logoUrl" alt="Zida Ziedi" class="block h-auto w-[178px] max-[768px]:w-[120px]" />
          </a>

          <nav class="flex items-center gap-8 max-[980px]:hidden" :aria-label="t.header.navAria">
            <a
              v-for="item in desktopNavItems"
              :key="item.label"
              :href="withBaseHref(item.href)"
              class="motion-link text-[14px] leading-[21px] text-[#333] transition-colors duration-200 hover:text-[var(--color-primary)]"
            >
              {{ item.label }}
            </a>
          </nav>

          <div class="flex items-center gap-[18px] max-[768px]:gap-4">
            <div ref="languageMenuRef" class="relative max-[768px]:hidden">
              <button
                class="flex min-h-[42px] min-w-[72px] items-center justify-center gap-2 rounded-full px-4 font-[var(--font-display)] text-[15px] text-[var(--color-heading)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                type="button"
                aria-haspopup="true"
                :aria-expanded="isLanguageMenuOpen"
                @click.stop="toggleLanguageMenu"
              >
                <span>{{ currentLanguage }}</span>
                <svg
                  class="h-3.5 w-3.5 transition-transform duration-200"
                  :class="{ 'rotate-180': isLanguageMenuOpen }"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M3 5.25 7 9l4-3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-2 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-2 opacity-0"
              >
              <div
                v-if="isLanguageMenuOpen"
                class="absolute right-0 top-[calc(100%+8px)] min-w-[78px] rounded-[18px] border border-[rgba(34,17,46,0.08)] bg-white px-4 py-3 shadow-[0_14px_30px_rgba(34,17,46,0.12)]"
              >
                <button
                  v-for="language in languages"
                  :key="language"
                  class="flex w-full items-center justify-center py-2 text-center font-[var(--font-display)] text-[14px] transition-colors duration-200 hover:text-[var(--color-primary)]"
                  :class="currentLanguage === language ? 'text-[var(--color-primary)] underline underline-offset-[5px]' : 'text-[var(--color-heading)]'"
                  type="button"
                  @click="selectLanguage(language)"
                >
                    <span>{{ language }}</span>
                  </button>
                </div>
              </transition>
            </div>

            <!-- <a
              href="#"
              class="inline-flex h-6 w-6 items-center justify-center text-[var(--color-primary)] transition-transform duration-200 hover:scale-105"
              aria-label="Корзина"
            >
              <img :src="cartIconUrl" alt="" class="block h-6 w-6" />
            </a> -->
            <a
              href="tel:+37100000000"
              class="inline-flex h-6 w-6 items-center justify-center text-[var(--color-primary)] transition-transform duration-200 hover:scale-105"
              :aria-label="t.header.callAria"
            >
              <img :src="phoneIconUrl" alt="" class="block h-6 w-6" />
            </a>

            <div class="max-[980px]:hidden">
              <UiButton :label="t.header.catalogCta" href="/catalog" />
            </div>

            <button
              class="motion-button flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-colors duration-200 hover:bg-[var(--color-primary-dark)] min-[981px]:hidden"
              type="button"
              :aria-expanded="isMobileMenuOpen"
              aria-controls="mobile-site-menu"
              :aria-label="isMobileMenuOpen ? t.header.closeMenu : t.header.openMenu"
              @click.stop="toggleMobileMenu"
            >
              <svg
                v-if="!isMobileMenuOpen"
                class="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                class="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="m4 4 8 8M12 4 4 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <div
            v-if="isMobileMenuOpen"
            id="mobile-site-menu"
            class="absolute left-0 right-0 top-0 z-[1] rounded-[28px] bg-white shadow-[0_22px_70px_rgba(34,17,46,0.16)] min-[981px]:hidden"
          >
            <div class="px-[22px] pb-8 pt-[84px] max-[768px]:px-[22px] max-[768px]:pb-8 max-[768px]:pt-[76px]">
              <nav class="flex flex-col gap-[30px]" :aria-label="t.header.mobileNavAria">
                <a
                  v-for="item in mobileNavItems"
                  :key="item.label"
                  :href="withBaseHref(item.href)"
                  class="font-[var(--font-display)] text-[20px] font-normal leading-none text-[var(--color-heading)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                  @click="closeAllMenus"
                >
                  {{ item.label }}
                </a>
              </nav>

              <div class="mt-10 rounded-[22px] bg-[#F6F6F6] p-2.5">
                <div class="flex items-center justify-between gap-3">
                  <span class="pl-3 font-[var(--font-display)] text-[16px] font-normal leading-none text-[#262626]">{{ t.header.languageLabel }}</span>
                  <div class="flex items-center gap-[10px]">
                    <button
                      v-for="language in languages"
                      :key="language"
                      class="flex h-[42px] w-[60px] items-center justify-center rounded-full font-[var(--font-display)] text-[15px] font-normal leading-none transition-colors duration-200"
                      :class="currentLanguage === language ? 'bg-[var(--color-footer)] text-white' : 'bg-white text-[var(--color-footer)]'"
                      type="button"
                      @click="selectLanguage(language)"
                    >
                      {{ language }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-4 rounded-[22px] bg-[#F6F6F6] p-2.5">
                <div class="flex items-center justify-between gap-3">
                  <span class="pl-3 font-[var(--font-display)] text-[16px] font-normal leading-none text-[#262626]">{{ t.header.socialLabel }}</span>
                  <div class="flex items-center gap-2">
                    <a
                      href="#"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-footer)] text-white transition-transform duration-200 hover:scale-105"
                      aria-label="Facebook"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M20 10C20 4.4775 15.5225 0 10 0C4.4775 0 0 4.4775 0 10C0 14.9917 3.65667 19.1283 8.4375 19.8783V12.8908H5.89833V9.99917H8.4375V7.7975C8.4375 5.29167 9.93083 3.90667 12.215 3.90667C13.3083 3.90667 14.4533 4.1025 14.4533 4.1025V6.56333H13.1917C11.9492 6.56333 11.5617 7.33417 11.5617 8.125V10H14.335L13.8917 12.8917H11.5617V19.8792C16.3433 19.1283 20 14.9908 20 10Z" fill="white"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-footer)] text-white transition-transform duration-200 hover:scale-105"
                      aria-label="Instagram"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M10 1.8025C12.67 1.8025 12.9867 1.8125 14.0417 1.86083C16.7517 1.98417 18.0175 3.27 18.1408 5.96C18.1892 7.01417 18.1983 7.33083 18.1983 10.0008C18.1983 12.6717 18.1883 12.9875 18.1408 14.0417C18.0167 16.7292 16.7542 18.0175 14.0417 18.1408C12.9867 18.1892 12.6717 18.1992 10 18.1992C7.33 18.1992 7.01333 18.1892 5.95917 18.1408C3.2425 18.0167 1.98333 16.725 1.86 14.0408C1.81167 12.9867 1.80167 12.6708 1.80167 10C1.80167 7.33 1.8125 7.01417 1.86 5.95917C1.98417 3.27 3.24667 1.98333 5.95917 1.86C7.01417 1.8125 7.33 1.8025 10 1.8025ZM10 0C7.28417 0 6.94417 0.0116667 5.8775 0.06C2.24583 0.226667 0.2275 2.24167 0.0608333 5.87667C0.0116667 6.94417 0 7.28417 0 10C0 12.7158 0.0116667 13.0567 0.06 14.1233C0.226667 17.755 2.24167 19.7733 5.87667 19.94C6.94417 19.9883 7.28417 20 10 20C12.7158 20 13.0567 19.9883 14.1233 19.94C17.7517 19.7733 19.775 17.7583 19.9392 14.1233C19.9883 13.0567 20 12.7158 20 10C20 7.28417 19.9883 6.94417 19.94 5.8775C19.7767 2.24917 17.7592 0.2275 14.1242 0.0608333C13.0567 0.0116667 12.7158 0 10 0ZM10 4.865C7.16417 4.865 4.865 7.16417 4.865 10C4.865 12.8358 7.16417 15.1358 10 15.1358C12.8358 15.1358 15.135 12.8367 15.135 10C15.135 7.16417 12.8358 4.865 10 4.865ZM10 13.3333C8.15917 13.3333 6.66667 11.8417 6.66667 10C6.66667 8.15917 8.15917 6.66667 10 6.66667C11.8408 6.66667 13.3333 8.15917 13.3333 10C13.3333 11.8417 11.8408 13.3333 10 13.3333ZM15.3383 3.4625C14.675 3.4625 14.1375 4 14.1375 4.6625C14.1375 5.325 14.675 5.8625 15.3383 5.8625C16.0008 5.8625 16.5375 5.325 16.5375 4.6625C16.5375 4 16.0008 3.4625 15.3383 3.4625Z" fill="white"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-footer)] text-white transition-transform duration-200 hover:scale-105"
                      aria-label="YouTube"
                    >
                      <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M19.2205 1.20826C18.4985 0.350064 17.1656 0 14.6201 0H5.37974C2.77594 0 1.42045 0.372645 0.701226 1.28632C0 2.17716 0 3.48974 0 5.30639V8.7689C0 12.2883 0.832 14.0752 5.37974 14.0752H14.6201C16.8276 14.0752 18.0508 13.7663 18.8422 13.009C19.6537 12.2323 20 10.9643 20 8.7689V5.30639C20 3.39058 19.9457 2.07026 19.2205 1.20826ZM12.8401 7.51568L8.64406 9.70865C8.55026 9.75768 8.44768 9.782 8.34523 9.782C8.22923 9.782 8.11348 9.75077 8.01097 9.68871C7.81793 9.57174 7.70006 9.36252 7.70006 9.13684V4.76497C7.70006 4.53968 7.81761 4.33064 8.01026 4.21361C8.20297 4.09658 8.44265 4.08858 8.64258 4.19245L12.8386 6.37129C13.0521 6.48213 13.1861 6.70252 13.1865 6.94297C13.1867 7.18361 13.0532 7.40432 12.8401 7.51568Z" fill="white"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div class="mt-[35px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <a href="tel:+37100000000" class="inline-flex items-center gap-[10px] text-[16px] font-normal leading-5 text-[var(--color-heading)] transition-colors duration-200 hover:text-[var(--color-primary)]">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8.10058 0.625022C8.10058 0.459261 8.16642 0.30029 8.28364 0.18308C8.40085 0.0658696 8.55982 2.15424e-05 8.72558 2.15424e-05C10.3826 0.00184129 11.9713 0.660906 13.143 1.83261C14.3147 3.00432 14.9738 4.59298 14.9756 6.25002C14.9756 6.41578 14.9097 6.57475 14.7925 6.69196C14.6753 6.80917 14.5163 6.87502 14.3506 6.87502C14.1848 6.87502 14.0258 6.80917 13.9086 6.69196C13.7914 6.57475 13.7256 6.41578 13.7256 6.25002C13.7241 4.9244 13.1968 3.65349 12.2595 2.71613C11.3221 1.77877 10.0512 1.25151 8.72558 1.25002C8.55982 1.25002 8.40085 1.18417 8.28364 1.06696C8.16642 0.949753 8.10058 0.790782 8.10058 0.625022ZM8.72558 3.75002C9.38862 3.75002 10.0245 4.01341 10.4933 4.48225C10.9622 4.9511 11.2256 5.58698 11.2256 6.25002C11.2256 6.41578 11.2914 6.57475 11.4086 6.69196C11.5258 6.80917 11.6848 6.87502 11.8506 6.87502C12.0163 6.87502 12.1753 6.80917 12.2925 6.69196C12.4097 6.57475 12.4756 6.41578 12.4756 6.25002C12.4746 5.25576 12.0792 4.30251 11.3761 3.59947C10.6731 2.89642 9.71983 2.50101 8.72558 2.50002C8.55982 2.50002 8.40085 2.56587 8.28364 2.68308C8.16642 2.80029 8.10058 2.95926 8.10058 3.12502C8.10058 3.29078 8.16642 3.44975 8.28364 3.56696C8.40085 3.68417 8.55982 3.75002 8.72558 3.75002ZM14.4087 10.4619C14.7709 10.8251 14.9743 11.3171 14.9743 11.83C14.9743 12.343 14.7709 12.835 14.4087 13.1981L13.84 13.8538C8.7212 18.7544 -3.73505 6.30127 1.08995 1.16627L1.8087 0.541272C2.17231 0.189195 2.65991 -0.00557278 3.16602 -0.000894182C3.67212 0.00378442 4.15604 0.207533 4.51308 0.566272C4.53245 0.585647 5.69058 2.09002 5.69058 2.09002C6.03422 2.45104 6.22552 2.9306 6.2247 3.42902C6.22389 3.92744 6.03102 4.40638 5.6862 4.76627L4.96245 5.67627C5.36298 6.64947 5.95187 7.53393 6.69527 8.27883C7.43867 9.02374 8.32194 9.6144 9.29433 10.0169L10.21 9.28877C10.5699 8.94422 11.0487 8.75158 11.547 8.75088C12.0453 8.75019 12.5247 8.94148 12.8856 9.28502C12.8856 9.28502 14.3893 10.4425 14.4087 10.4619ZM13.5487 11.3706C13.5487 11.3706 12.0531 10.22 12.0337 10.2006C11.9049 10.073 11.731 10.0013 11.5496 10.0013C11.3683 10.0013 11.1943 10.073 11.0656 10.2006C11.0487 10.2181 9.78808 11.2225 9.78808 11.2225C9.70312 11.2901 9.60202 11.3345 9.49473 11.3511C9.38744 11.3678 9.27766 11.3562 9.1762 11.3175C7.91649 10.8485 6.77229 10.1142 5.8211 9.16445C4.86991 8.21466 4.13395 7.07154 3.66308 5.81252C3.62133 5.70968 3.60771 5.59758 3.62364 5.48773C3.63957 5.37789 3.68446 5.27427 3.7537 5.18752C3.7537 5.18752 4.75808 3.92627 4.77495 3.91002C4.90262 3.78126 4.97425 3.60728 4.97425 3.42596C4.97425 3.24464 4.90262 3.07066 4.77495 2.9419C4.75558 2.92315 3.60495 1.42627 3.60495 1.42627C3.47426 1.30909 3.3037 1.24633 3.12823 1.25086C2.95276 1.2554 2.78567 1.32687 2.6612 1.45065L1.94245 2.07565C-1.5838 6.31565 9.21058 16.5113 12.9262 13L13.4956 12.3438C13.629 12.2202 13.7091 12.0496 13.7191 11.868C13.729 11.6864 13.6679 11.508 13.5487 11.3706Z" fill="#E93C60"/>
                  </svg>
                  <span>+371 00 000 000</span>
                </a>
                <a href="mailto:info@zidaziedi.lv" class="inline-flex items-center gap-[10px] text-[16px] font-normal leading-5 text-[var(--color-heading)] transition-colors duration-200 hover:text-[var(--color-primary)]">
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0.75 2L8.25 7L15.75 2M0.75 2C0.75 1.30964 1.30964 0.75 2 0.75H14.5C15.1904 0.75 15.75 1.30964 15.75 2M0.75 2V9.5C0.75 10.1904 1.30964 10.75 2 10.75H14.5C15.1904 10.75 15.75 10.1904 15.75 9.5V2" stroke="#E93C60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>info@zidaziedi.lv</span>
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
