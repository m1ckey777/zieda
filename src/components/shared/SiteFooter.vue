<script setup>
import logoUrl from '../../assets/logo.svg'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()

const phoneIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <g clip-path="url(#footer-phone-clip)">
      <path d="M8.12475 0.625998C8.12475 0.460238 8.19059 0.301267 8.30781 0.184056C8.42502 0.0668461 8.58399 0.000998105 8.74975 0.000998105C10.4068 0.00281785 11.9954 0.661883 13.1672 1.83359C14.3389 3.0053 14.9979 4.59395 14.9997 6.251C14.9997 6.41676 14.9339 6.57573 14.8167 6.69294C14.6995 6.81015 14.5405 6.876 14.3747 6.876C14.209 6.876 14.05 6.81015 13.9328 6.69294C13.8156 6.57573 13.7497 6.41676 13.7497 6.251C13.7483 4.92537 13.221 3.65447 12.2836 2.71711C11.3463 1.77975 10.0754 1.25249 8.74975 1.251C8.58399 1.251 8.42502 1.18515 8.30781 1.06794C8.19059 0.95073 8.12475 0.791758 8.12475 0.625998ZM8.74975 3.751C9.41279 3.751 10.0487 4.01439 10.5175 4.48323C10.9864 4.95207 11.2497 5.58796 11.2497 6.251C11.2497 6.41676 11.3156 6.57573 11.4328 6.69294C11.55 6.81015 11.709 6.876 11.8747 6.876C12.0405 6.876 12.1995 6.81015 12.3167 6.69294C12.4339 6.57573 12.4997 6.41676 12.4997 6.251C12.4988 5.25674 12.1033 4.30349 11.4003 3.60044C10.6973 2.8974 9.744 2.50199 8.74975 2.501C8.58399 2.501 8.42502 2.56685 8.30781 2.68406C8.19059 2.80127 8.12475 2.96024 8.12475 3.126C8.12475 3.29176 8.19059 3.45073 8.30781 3.56794C8.42502 3.68515 8.58399 3.751 8.74975 3.751ZM14.4329 10.4629C14.7951 10.8261 14.9985 11.3181 14.9985 11.831C14.9985 12.3439 14.7951 12.8359 14.4329 13.1991L13.8641 13.8547C8.74537 18.7554 -3.71088 6.30225 1.11412 1.16725L1.83287 0.542248C2.19648 0.190171 2.68408 -0.00459622 3.19019 8.2381e-05C3.69629 0.00476098 4.18021 0.20851 4.53725 0.567248C4.55662 0.586623 5.71475 2.091 5.71475 2.091C6.05839 2.45202 6.24969 2.93158 6.24887 3.43C6.24806 3.92842 6.05519 4.40736 5.71037 4.76725L4.98662 5.67725C5.38715 6.65044 5.97604 7.5349 6.71944 8.27981C7.46284 9.02471 8.34611 9.61538 9.3185 10.0179L10.2341 9.28975C10.5941 8.9452 11.0729 8.75256 11.5712 8.75186C12.0695 8.75116 12.5488 8.94246 12.9097 9.286C12.9097 9.286 14.4135 10.4435 14.4329 10.4629ZM13.5729 11.3716C13.5729 11.3716 12.0772 10.221 12.0579 10.2016C11.9291 10.074 11.7551 10.0023 11.5738 10.0023C11.3925 10.0023 11.2185 10.074 11.0897 10.2016C11.0729 10.2191 9.81225 11.2235 9.81225 11.2235C9.72729 11.2911 9.62619 11.3354 9.5189 11.3521C9.41161 11.3688 9.30183 11.3572 9.20037 11.3185C7.94066 10.8495 6.79646 10.1152 5.84527 9.16542C4.89408 8.21564 4.15812 7.07252 3.68725 5.8135C3.6455 5.71066 3.63188 5.59855 3.64781 5.48871C3.66374 5.37887 3.70863 5.27525 3.77787 5.1885C3.77787 5.1885 4.78225 3.92725 4.79912 3.911C4.92679 3.78224 4.99842 3.60826 4.99842 3.42694C4.99842 3.24561 4.92679 3.07163 4.79912 2.94287C4.77975 2.92412 3.62912 1.42725 3.62912 1.42725C3.49843 1.31007 3.32787 1.24731 3.1524 1.25184C2.97693 1.25637 2.80984 1.32785 2.68537 1.45162L1.96662 2.07662C-1.55963 6.31662 9.23475 16.5122 12.9504 13.001L13.5197 12.3447C13.6532 12.2212 13.7333 12.0505 13.7432 11.8689C13.7531 11.6873 13.692 11.509 13.5729 11.3716Z" fill="#E93C60"/>
    </g>
    <defs>
      <clipPath id="footer-phone-clip">
        <rect width="15" height="15" fill="white"/>
      </clipPath>
    </defs>
  </svg>
`

const mailIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2.5 6.25L10 11.25L17.5 6.25M2.5 6.25C2.5 5.55964 3.05964 5 3.75 5H16.25C16.9404 5 17.5 5.55964 17.5 6.25M2.5 6.25V13.75C2.5 14.4404 3.05964 15 3.75 15H16.25C16.9404 15 17.5 14.4404 17.5 13.75V6.25" stroke="#E93C60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

const socialLinks = [
  {
    key: 'facebook',
    href: '#',
    label: 'Facebook',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <g clip-path="url(#footer-fb-clip)">
          <path d="M20 10.0605C20 4.53805 15.5225 0.0605469 10 0.0605469C4.4775 0.0605469 0 4.53805 0 10.0605C0 15.0522 3.65667 19.1889 8.4375 19.9389V12.9514H5.89833V10.0597H8.4375V7.85805C8.4375 5.35221 9.93083 3.96721 12.215 3.96721C13.3083 3.96721 14.4533 4.16305 14.4533 4.16305V6.62388H13.1917C11.9492 6.62388 11.5617 7.39471 11.5617 8.18555V10.0605H14.335L13.8917 12.9522H11.5617V19.9397C16.3433 19.1889 20 15.0514 20 10.0605Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="footer-fb-clip">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `,
  },
  {
    key: 'instagram',
    href: '#',
    label: 'Instagram',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <g clip-path="url(#footer-ig-clip)">
          <path d="M10 1.8025C12.67 1.8025 12.9867 1.8125 14.0417 1.86083C16.7517 1.98417 18.0175 3.27 18.1408 5.96C18.1892 7.01417 18.1983 7.33083 18.1983 10.0008C18.1983 12.6717 18.1883 12.9875 18.1408 14.0417C18.0167 16.7292 16.7542 18.0175 14.0417 18.1408C12.9867 18.1892 12.6717 18.1992 10 18.1992C7.33 18.1992 7.01333 18.1892 5.95917 18.1408C3.2425 18.0167 1.98333 16.725 1.86 14.0408C1.81167 12.9867 1.80167 12.6708 1.80167 10C1.80167 7.33 1.8125 7.01417 1.86 5.95917C1.98417 3.27 3.24667 1.98333 5.95917 1.86C7.01417 1.8125 7.33 1.8025 10 1.8025ZM10 0C7.28417 0 6.94417 0.0116667 5.8775 0.06C2.24583 0.226667 0.2275 2.24167 0.0608333 5.87667C0.0116667 6.94417 0 7.28417 0 10C0 12.7158 0.0116667 13.0567 0.06 14.1233C0.226667 17.755 2.24167 19.7733 5.87667 19.94C6.94417 19.9883 7.28417 20 10 20C12.7158 20 13.0567 19.9883 14.1233 19.94C17.7517 19.7733 19.775 17.7583 19.9392 14.1233C19.9883 13.0567 20 12.7158 20 10C20 7.28417 19.9883 6.94417 19.94 5.8775C19.7767 2.24917 17.7592 0.2275 14.1242 0.0608333C13.0567 0.0116667 12.7158 0 10 0ZM10 4.865C7.16417 4.865 4.865 7.16417 4.865 10C4.865 12.8358 7.16417 15.1358 10 15.1358C12.8358 15.1358 15.135 12.8367 15.135 10C15.135 7.16417 12.8358 4.865 10 4.865ZM10 13.3333C8.15917 13.3333 6.66667 11.8417 6.66667 10C6.66667 8.15917 8.15917 6.66667 10 6.66667C11.8408 6.66667 13.3333 8.15917 13.3333 10C13.3333 11.8417 11.8408 13.3333 10 13.3333ZM15.3383 3.4625C14.675 3.4625 14.1375 4 14.1375 4.6625C14.1375 5.325 14.675 5.8625 15.3383 5.8625C16.0008 5.8625 16.5375 5.325 16.5375 4.6625C16.5375 4 16.0008 3.4625 15.3383 3.4625Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="footer-ig-clip">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `,
  },
  {
    key: 'youtube',
    href: '#',
    label: 'YouTube',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M19.2205 4.17115C18.4985 3.31295 17.1656 2.96289 14.6201 2.96289H5.37974C2.77594 2.96289 1.42045 3.33554 0.701226 4.24921C0 5.14005 0 6.45263 0 8.26928V11.7318C0 15.2512 0.832 17.0381 5.37974 17.0381H14.6201C16.8276 17.0381 18.0508 16.7292 18.8422 15.9719C19.6537 15.1952 20 13.9271 20 11.7318V8.26928C20 6.35347 19.9457 5.03315 19.2205 4.17115ZM12.8401 10.4786L8.64406 12.6715C8.55026 12.7206 8.44768 12.7449 8.34523 12.7449C8.22923 12.7449 8.11348 12.7137 8.01097 12.6516C7.81793 12.5346 7.70006 12.3254 7.70006 12.0997V7.72786C7.70006 7.50257 7.81761 7.29354 8.01026 7.1765C8.20297 7.05947 8.44265 7.05147 8.64258 7.15534L12.8386 9.33418C13.0521 9.44502 13.1861 9.66541 13.1865 9.90586C13.1867 10.1465 13.0532 10.3672 12.8401 10.4786Z" fill="white"/>
      </svg>
    `,
  },
]
</script>

<template>
  <footer class="bg-[var(--color-footer)] pt-[80px] pb-[90px] text-white max-[768px]:py-[34px]">
    <div class="mx-auto w-[min(1200px,calc(100%-64px))] max-[768px]:w-[min(1200px,calc(100%-28px))]">
      <div class="flex flex-wrap items-start gap-x-[60px] gap-y-[34px] max-[768px]:block">
        <div class="w-[255px] shrink-0 max-[768px]:flex max-[768px]:w-full max-[768px]:items-center max-[768px]:gap-4">
          <a href="#hero" class="inline-flex items-center shrink-0" aria-label="Zida Ziedi">
            <img :src="logoUrl" alt="Zida Ziedi" class="block h-auto w-[136px] brightness-0 invert max-[768px]:w-[150px]" />
          </a>
          <p class="mt-[12px] max-w-[220px] text-[12px] font-normal leading-[16px] text-white/70 max-[768px]:mt-0 max-[768px]:max-w-[230px]  max-[768px]:leading-[20px]">
            {{ t.footer.tagline }}
          </p>
        </div>

        <div class="w-[255px] shrink-0 max-[768px]:hidden">
          <div class="flex flex-col gap-[10px] max-[768px]:gap-[12px]">
            <h3 class="mb-[16px] font-[var(--font-display)] text-[16px] font-normal leading-[24px] text-white max-[768px]:text-[18px] max-[768px]:font-semibold">{{ t.footer.servicesTitle }}</h3>
            <a v-for="link in t.footer.serviceLinks" :key="link" href="#services" class="text-[14px] font-normal leading-[20px] text-white/70 transition duration-200 hover:text-white max-[768px]:text-[16px] max-[768px]:leading-[1.9]">{{ link }}</a>
          </div>
        </div>

        <div class="w-[255px] shrink-0 max-[768px]:hidden">
          <div class="flex flex-col gap-[10px] max-[768px]:gap-[12px]">
            <h3 class="mb-[16px] font-[var(--font-display)] text-[16px] font-normal leading-[24px] text-white max-[768px]:text-[18px] max-[768px]:font-semibold">{{ t.footer.companyTitle }}</h3>
            <a v-for="link in t.footer.companyLinks" :key="link" href="#" class="text-[14px] font-normal leading-[20px] text-white/70 transition duration-200 hover:text-white max-[768px]:text-[16px] max-[768px]:leading-[1.9]">{{ link }}</a>
          </div>
        </div>

        <div class="hidden max-[768px]:mt-[34px] max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-x-[14px]">
          <div class="min-w-0">
            <div class="flex flex-col gap-[12px]">
              <h3 class="mb-[5px] font-[var(--font-display)] text-[16px] font-normal leading-[24px] text-white">{{ t.footer.servicesTitle }}</h3>
              <a v-for="link in t.footer.serviceLinks" :key="`mobile-${link}`" href="#services" class="text-[14px] font-normal leading-[20px] text-white/70 transition duration-200 hover:text-white">{{ link }}</a>
            </div>
          </div>

          <div class="min-w-0">
            <div class="flex flex-col gap-[12px]">
              <h3 class="mb-[5px] font-[var(--font-display)] text-[16px] font-normal leading-[24px] text-white">{{ t.footer.companyTitle }}</h3>
              <a v-for="link in t.footer.companyLinks" :key="`mobile-company-${link}`" href="#" class="text-[14px] font-normal leading-[20px] text-white/70 transition duration-200 hover:text-white">{{ link }}</a>
            </div>
          </div>
        </div>

        <div class="w-[255px] shrink-0 max-[768px]:mt-[34px] max-[768px]:w-full">
          <div class="flex flex-col gap-[10px] max-[768px]:gap-[14px]">
            <div class="mb-[16px] font-[var(--font-display)] text-[16px] font-normal leading-[24px] text-white max-[768px]:hidden">{{ t.footer.contactsTitle }}</div>
            <div class="flex flex-col gap-[10px] max-[768px]:flex-row max-[768px]:items-center max-[768px]:gap-6">
              <a href="tel:+37100000000" class="inline-flex items-center gap-[10px] whitespace-nowrap text-[16px] font-normal leading-[24px] text-white/70 transition duration-200 hover:text-white max-[768px]:font-[var(--font-body)] max-[768px]:text-[14px] max-[768px]:leading-[20px] max-[768px]:text-white/70">
                <span class="inline-flex shrink-0" v-html="phoneIcon" />
                <span>+371 00 000 000</span>
              </a>
              <a href="mailto:info@zidaziedi.lv" class="inline-flex items-center gap-[10px] whitespace-nowrap text-[16px] font-normal leading-[24px] text-white/70 transition duration-200 hover:text-white max-[768px]:font-[var(--font-body)] max-[768px]:text-[14px] max-[768px]:leading-[20px] max-[768px]:text-white/70">
                <span class="inline-flex shrink-0" v-html="mailIcon" />
                <span>info@zidaziedi.lv</span>
              </a>
            </div>
            <div class="mt-[8px] flex gap-[12px] max-[768px]:mt-[10px] max-[768px]:gap-[14px]">
              <a
                v-for="item in socialLinks"
                :key="item.key"
                :href="item.href"
                :aria-label="item.label"
                class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/10 transition duration-200 hover:bg-white/15 max-[768px]:h-[44px] max-[768px]:w-[44px]"
              >
                <span class="inline-flex h-5 w-5 items-center justify-center" v-html="item.icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-[60px] border-t border-white/10 pt-[12px] max-[768px]:mt-[18px] max-[768px]:border-t-0 max-[768px]:pt-[0]">
        <div class="flex items-center justify-between gap-6 text-[14px] font-normal leading-[20px] text-white/50 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px] max-[768px]:text-[14px] max-[768px]:leading-5">
          <p class="m-0 order-1 max-[768px]:order-2">{{ t.footer.copyright }}</p>
          <div class="order-2 flex items-center gap-[40px] max-[768px]:order-1 max-[768px]:w-full max-[768px]:flex-row max-[768px]:items-center max-[768px]:justify-between max-[768px]:gap-4">
            <a href="#" class="transition duration-200 hover:text-white">{{ t.footer.terms }}</a>
            <a href="#" class="transition duration-200 hover:text-white">{{ t.footer.privacy }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
