<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/styles'
import checkIconUrl from '../../assets/quiz/quiz-check.svg'
import SiteHeader from '../../components/shared/SiteHeader.vue'
import corporateImageUrl from '../../assets/quiz/event-corporate.png'
import decorHeroUrl from '../../assets/quiz/quiz-decor-pc.png'
import otherImageUrl from '../../assets/quiz/event-other.png'
import presentationImageUrl from '../../assets/quiz/event-presentation.png'
import weddingImageUrl from '../../assets/quiz/event-wedding.png'
import anniversaryImageUrl from '../../assets/quiz/event-anniversary.png'
import { useLanguage } from '../../composables/useLanguage'

const { t } = useLanguage()
const phase = ref('form')
const dateInputRef = ref(null)
const phoneInputRef = ref(null)
const latestSubmission = ref(null)
let itiInstance = null

const answers = reactive({
  eventType: 'birthday',
  date: '',
  venue: 'outdoor',
  guests: 'from50to100',
  decorate: ['welcome', 'main-table', 'photozone'],
  decorateOther: '',
  style: 'modern',
  fullness: 3,
  palette: 'brand',
  flowerType: 'mix',
  services: [],
  timeWindow: 'day',
  budget: 'medium',
  restrictions: '',
  documents: false,
  name: 'Aleksandr',
  phone: '',
  email: '',
  channels: [],
  reference: '',
})

const eventTypeImages = {
  wedding: weddingImageUrl,
  corporate: corporateImageUrl,
  birthday: presentationImageUrl,
  anniversary: anniversaryImageUrl,
  presentation: presentationImageUrl,
  other: otherImageUrl,
}

const optionFromMap = (labels, keys) => keys.map((value) => ({ value, label: labels[value] }))

const eventTypes = computed(() => optionFromMap(t.value.quiz.eventTypes, ['wedding', 'corporate', 'birthday', 'anniversary', 'presentation', 'other']).map((item) => ({
  ...item,
  image: eventTypeImages[item.value],
})))

const venueOptions = computed(() => optionFromMap(t.value.quiz.venues, ['restaurant', 'countryside', 'apartment', 'hotel', 'outdoor']))
const guestOptions = computed(() => optionFromMap(t.value.quiz.guests, ['upto20', 'from20to50', 'from50to100', 'from100to200', 'over200']))
const decorateOptions = computed(() => optionFromMap(t.value.quiz.decorate, ['welcome', 'photozone', 'ceremony', 'mainTable', 'guestTables', 'hanging', 'bouquet']))
const styleOptions = computed(() => optionFromMap(t.value.quiz.styles, ['classic', 'modern', 'minimal', 'luxury', 'boho']))

const paletteColors = {
  cream: ['#f8efe4', '#fffaf4', '#ffffff'],
  green: ['#f7f9ee', '#9bb957', '#38551b'],
  pastel: ['#d9b6a9', '#edc8bd', '#e9e6d8'],
  bright: ['#d62d73', '#ff7b00', '#ffc400'],
  bordeaux: ['#f3bf84', '#8e0d2d', '#67001f'],
  lavender: ['#6d5aa6', '#9285c9', '#c7cce9'],
  brand: ['#000000', '#ef7a00', '#ffffff'],
}

const paletteOptions = computed(() => optionFromMap(t.value.quiz.palettes, ['cream', 'green', 'pastel', 'bright', 'bordeaux', 'lavender', 'brand']).map((item) => ({
  ...item,
  colors: paletteColors[item.value],
})))

const flowerTypeImages = {
  decor: weddingImageUrl,
  live: corporateImageUrl,
  mix: weddingImageUrl,
}

const flowerTypeOptions = computed(() => optionFromMap(t.value.quiz.flowerTypes, ['decor', 'live', 'mix']).map((item) => ({
  ...item,
  image: flowerTypeImages[item.value],
})))

const serviceOptions = computed(() => optionFromMap(t.value.quiz.services, ['pickup', 'delivery', 'setup']))
const timeOptions = computed(() => optionFromMap(t.value.quiz.timeWindows, ['morning', 'day', 'evening']))
const budgetOptions = computed(() => optionFromMap(t.value.quiz.budgets, ['low', 'medium', 'high', 'premium', 'custom']))
const channelOptions = computed(() => optionFromMap(t.value.quiz.channels, ['phone', 'whatsapp', 'telegram', 'email']))

const budgetRanges = {
  low: [500, 800],
  medium: [1200, 1900],
  high: [2300, 3400],
  premium: [3600, 5600],
  custom: [1500, 2400],
}

const eventAdjustments = {
  wedding: 260,
  corporate: 180,
  birthday: 120,
  anniversary: 140,
  presentation: 160,
  other: 100,
}

const venueAdjustments = {
  restaurant: 0,
  countryside: 180,
  apartment: -80,
  hotel: 90,
  outdoor: 240,
}

const guestAdjustments = {
  upto20: -100,
  from20to50: 0,
  from50to100: 260,
  from100to200: 640,
  over200: 1120,
}

const decorateAdjustments = {
  welcome: 180,
  photozone: 360,
  ceremony: 420,
  'main-table': 300,
  'guest-tables': 420,
  hanging: 620,
  bouquet: 120,
}

const styleMultipliers = {
  classic: 1,
  modern: 1.05,
  minimal: 0.92,
  luxury: 1.35,
  boho: 1.12,
}

const paletteAdjustments = {
  cream: 0,
  green: 80,
  pastel: 60,
  bright: 120,
  bordeaux: 120,
  lavender: 90,
  brand: 180,
}

const flowerTypeAdjustments = {
  decor: -80,
  live: 320,
  mix: 180,
}

const serviceAdjustments = {
  pickup: -80,
  delivery: 120,
  setup: 220,
}

const fullnessLabels = computed(() => t.value.quiz.fullness)

const resultRows = computed(() => [
  [t.value.quiz.resultLabels.eventType, selectedEventLabel.value],
  [t.value.quiz.resultLabels.date, formattedDate.value],
  [t.value.quiz.resultLabels.venue, selectedVenueLabel.value],
  [t.value.quiz.resultLabels.guests, selectedGuestLabel.value],
  [t.value.quiz.resultLabels.decorate, selectedDecorLabels.value.join(' / ') || t.value.quiz.notSelected],
  [t.value.quiz.resultLabels.style, selectedStyleLabel.value],
  [t.value.quiz.resultLabels.fullness, fullnessLabel.value],
  [t.value.quiz.resultLabels.palette, selectedPaletteLabel.value],
  [t.value.quiz.resultLabels.flowers, selectedFlowerTypeLabel.value],
  [t.value.quiz.resultLabels.services, selectedServiceLabels.value.join(' / ') || t.value.quiz.notSelectedPlural],
  [t.value.quiz.resultLabels.timeWindow, selectedTimeWindowLabel.value],
  [t.value.quiz.resultLabels.budget, selectedBudgetLabel.value],
  [t.value.quiz.resultLabels.contact, contactSummary.value],
  [t.value.quiz.resultLabels.channels, selectedChannelLabels.value.join(' / ') || t.value.quiz.notSelected],
  [t.value.quiz.resultLabels.documents, answers.documents ? t.value.quiz.needed : t.value.quiz.notNeeded],
  [t.value.quiz.resultLabels.restrictions, answers.restrictions ? t.value.quiz.yes : t.value.quiz.no],
  [t.value.quiz.resultLabels.reference, answers.reference || t.value.quiz.notSpecified],
])

const selectedEventLabel = computed(() => eventTypes.value.find((item) => item.value === answers.eventType)?.label ?? t.value.quiz.eventTypes.other)
const selectedVenueLabel = computed(() => venueOptions.value.find((item) => item.value === answers.venue)?.label ?? t.value.quiz.notSelected)
const selectedGuestLabel = computed(() => guestOptions.value.find((item) => item.value === answers.guests)?.label ?? t.value.quiz.notSelected)
const selectedStyleLabel = computed(() => styleOptions.value.find((item) => item.value === answers.style)?.label ?? t.value.quiz.notSelected)
const selectedPaletteLabel = computed(() => paletteOptions.value.find((item) => item.value === answers.palette)?.label ?? t.value.quiz.notSelected)
const selectedFlowerTypeLabel = computed(() => flowerTypeOptions.value.find((item) => item.value === answers.flowerType)?.label ?? t.value.quiz.notSelected)
const selectedTimeWindowLabel = computed(() => timeOptions.value.find((item) => item.value === answers.timeWindow)?.label ?? t.value.quiz.notSelected)
const selectedBudgetLabel = computed(() => budgetOptions.value.find((item) => item.value === answers.budget)?.label ?? t.value.quiz.notSelected)
const selectedDecorLabels = computed(() => decorateOptions.value.filter((item) => answers.decorate.includes(item.value)).map((item) => item.label))
const selectedServiceLabels = computed(() => serviceOptions.value.filter((item) => answers.services.includes(item.value)).map((item) => item.label))
const selectedChannelLabels = computed(() => channelOptions.value.filter((item) => answers.channels.includes(item.value)).map((item) => item.label))
const fullnessLabel = computed(() => fullnessLabels.value[answers.fullness - 1] ?? fullnessLabels.value[0])
const formattedDate = computed(() => {
  if (!answers.date) return t.value.quiz.dateNotSelected

  const [year, month, day] = answers.date.split('-')
  return `${day}.${month}.${year}`
})
const contactSummary = computed(() => {
  const parts = [answers.name, answers.phone, answers.email].filter(Boolean)
  return parts.join(' / ') || t.value.quiz.contactEmpty
})

const roundTo50 = (value) => Math.max(0, Math.round(value / 50) * 50)

const estimate = computed(() => {
  const baseRange = budgetRanges[answers.budget] ?? budgetRanges.custom
  const decorateScope = answers.decorate.reduce((sum, item) => sum + (decorateAdjustments[item] ?? 0), 0)
  const servicesScope = answers.services.reduce((sum, item) => sum + (serviceAdjustments[item] ?? 0), 0)
  const baseScope =
    (eventAdjustments[answers.eventType] ?? 0) +
    (venueAdjustments[answers.venue] ?? 0) +
    (guestAdjustments[answers.guests] ?? 0) +
    decorateScope +
    servicesScope +
    (paletteAdjustments[answers.palette] ?? 0) +
    (flowerTypeAdjustments[answers.flowerType] ?? 0)

  const fullnessScope = 1 + (answers.fullness - 3) * 0.12
  const styleScope = styleMultipliers[answers.style] ?? 1
  const scopedPrice = Math.max(0, baseScope * fullnessScope * styleScope)
  const lower = roundTo50(baseRange[0] + scopedPrice * 0.38)
  const upper = roundTo50(baseRange[1] + scopedPrice * 0.72)

  return [lower, Math.max(upper, lower + 300)]
})

const packages = computed(() => [
  {
    name: 'Base',
    price: estimate.value[0],
    description: `${t.value.quiz.packages.baseDescriptionStart} "${selectedVenueLabel.value}" ${t.value.quiz.packages.baseDescriptionEnd}`,
    items: [
      selectedDecorLabels.value[0] || t.value.quiz.packages.mainZone,
      selectedDecorLabels.value[1] || `${t.value.quiz.packages.palette}: ${selectedPaletteLabel.value}`,
      `${t.value.quiz.packages.style}: ${selectedStyleLabel.value}`,
    ],
  },
  {
    name: 'Wow',
    price: estimate.value[1],
    description: `${t.value.quiz.packages.wowDescriptionStart} "${fullnessLabel.value.toLowerCase()}" ${t.value.quiz.packages.wowDescriptionEnd}`,
    items: [
      ...selectedDecorLabels.value,
      selectedServiceLabels.value.length ? `${t.value.quiz.packages.services}: ${selectedServiceLabels.value.join(', ')}` : t.value.quiz.packages.coordination,
      `${t.value.quiz.packages.flowers}: ${selectedFlowerTypeLabel.value}`,
    ].slice(0, 5),
  },
])

const quizSubmission = computed(() => ({
  source: 'quiz',
  estimate: {
    from: estimate.value[0],
    to: estimate.value[1],
    label: `${formatCurrency(estimate.value[0])} — ${formatCurrency(estimate.value[1])}`,
  },
  answers: Object.fromEntries(resultRows.value),
  rawAnswers: { ...answers, decorate: [...answers.decorate], services: [...answers.services], channels: [...answers.channels] },
  packages: packages.value,
}))

const formatCurrency = (value) => `€ ${value.toLocaleString('en-US')}`

const toggleArrayValue = (array, value) => {
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return
  }

  array.push(value)
}

const scrollToQuiz = () => {
  document.querySelector('.quiz-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openDatePicker = () => {
  const input = dateInputRef.value
  input?.focus()

  try {
    input?.showPicker?.()
  } catch {
    // Some browsers only allow showPicker directly from a trusted click.
  }
}

const syncPhoneValue = () => {
  answers.phone = phoneInputRef.value?.value ?? ''
}

const destroyPhoneInput = () => {
  if (phoneInputRef.value) {
    phoneInputRef.value.removeEventListener('input', syncPhoneValue)
  }

  itiInstance?.destroy()
  itiInstance = null
}

const bindPhoneInput = () => {
  if (!phoneInputRef.value) return

  destroyPhoneInput()

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
  phoneInputRef.value.value = answers.phone
  phoneInputRef.value.addEventListener('input', syncPhoneValue)
}

const showResult = () => {
  syncPhoneValue()
  latestSubmission.value = quizSubmission.value
  destroyPhoneInput()
  phase.value = 'result'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const restartQuiz = () => {
  phase.value = 'form'
  window.scrollTo({ top: 0, behavior: 'smooth' })

  requestAnimationFrame(() => {
    bindPhoneInput()
  })
}

onMounted(() => {
  bindPhoneInput()
})

onBeforeUnmount(() => {
  destroyPhoneInput()
})
</script>

<template>
  <div class="quiz-page">
    <SiteHeader />

    <main>
      <section v-if="phase === 'form'" v-reveal="{ variant: 'fade', threshold: 0.05 }" class="quiz-start quiz-intro">
        <img :src="decorHeroUrl" alt="" class="quiz-start-decor" />
        <div v-reveal="{ delay: 80 }" class="quiz-start-content">
          <p>{{ t.quiz.introBadge }}</p>
          <h1>{{ t.quiz.introTitle }}</h1>
          <button type="button" @click="scrollToQuiz">{{ t.quiz.start }}</button>
        </div>
      </section>

      <section v-if="phase === 'form'" v-reveal="{ variant: 'scale' }" class="quiz-form-card">
        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>1</span>
            <h2>{{ t.quiz.steps.eventType }}</h2>
          </div>
          <div class="quiz-image-grid">
            <button
            v-for="(item, index) in eventTypes"
            :key="item.value"
            type="button"
            class="quiz-image-option"
            v-reveal="{ delay: (index % 6) * 45, variant: 'scale' }"
              :class="{ 'is-selected': answers.eventType === item.value }"
              @click="answers.eventType = item.value"
            >
              <span class="quiz-image-wrap">
                <img :src="item.image" :alt="item.label" />
                <img v-if="answers.eventType === item.value" :src="checkIconUrl" alt="" class="quiz-check-icon" />
              </span>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>2</span>
            <h2>{{ t.quiz.steps.venue }}</h2>
          </div>
          <label class="quiz-date-field" @click="openDatePicker">
            <span class="sr-only">{{ t.quiz.dateLabel }}</span>
            <input ref="dateInputRef" v-model="answers.date" type="date" @click="openDatePicker" />
          </label>
          <div class="quiz-placeholder-grid">
            <button
              v-for="item in venueOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.venue === item.value }"
              @click="answers.venue = item.value"
            >
              <span></span>
              <em>{{ item.label }}</em>
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>3</span>
            <h2>{{ t.quiz.steps.guests }}</h2>
          </div>
          <div class="quiz-button-grid">
            <button
              v-for="item in guestOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.guests === item.value }"
              @click="answers.guests = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>4</span>
            <h2>{{ t.quiz.steps.decorate }}</h2>
          </div>
          <div class="quiz-checkbox-list">
            <label
              v-for="item in decorateOptions"
              :key="item.value"
              class="quiz-checkbox-row"
            >
              <input
                type="checkbox"
                :checked="answers.decorate.includes(item.value)"
                @change="toggleArrayValue(answers.decorate, item.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
          <input v-model="answers.decorateOther" class="quiz-text-input" type="text" :placeholder="t.quiz.otherPlaceholder" />
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>5</span>
            <h2>{{ t.quiz.steps.style }}</h2>
          </div>
          <div class="quiz-stack-buttons">
            <button
              v-for="item in styleOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.style === item.value }"
              @click="answers.style = item.value"
            >
              {{ item.label }}
            </button>
          </div>
          <p class="quiz-slider-label">{{ t.quiz.fullnessLabel }}</p>
          <div class="quiz-scale">
            <button
              v-for="index in 5"
              :key="index"
              type="button"
              :class="{ 'is-selected': answers.fullness >= index }"
              @click="answers.fullness = index"
            >
              {{ answers.fullness >= index ? '✓' : index }}
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>6</span>
            <h2>{{ t.quiz.steps.palette }}</h2>
          </div>
          <div class="quiz-palette-list">
            <button
              v-for="item in paletteOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.palette === item.value }"
              @click="answers.palette = item.value"
            >
              <span>{{ item.label }}</span>
              <em>
                <i v-for="color in item.colors" :key="color" :style="{ backgroundColor: color }"></i>
              </em>
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>7</span>
            <h2>{{ t.quiz.steps.flowers }}</h2>
          </div>
          <div class="quiz-image-grid quiz-image-grid-compact">
            <button
            v-for="(item, index) in flowerTypeOptions"
            :key="item.value"
            type="button"
            class="quiz-image-option"
            v-reveal="{ delay: index * 60, variant: 'scale' }"
              :class="{ 'is-selected': answers.flowerType === item.value }"
              @click="answers.flowerType = item.value"
            >
              <span class="quiz-image-wrap">
                <img :src="item.image" :alt="item.label" />
              </span>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>8</span>
            <h2>{{ t.quiz.steps.services }}</h2>
          </div>
          <div class="quiz-checkbox-list">
            <label v-for="item in serviceOptions" :key="item.value" class="quiz-checkbox-row">
              <input
                type="checkbox"
                :checked="answers.services.includes(item.value)"
                @change="toggleArrayValue(answers.services, item.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
          <p class="quiz-slider-label">{{ t.quiz.timeLabel }}</p>
          <div class="quiz-segmented">
            <button
              v-for="item in timeOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.timeWindow === item.value }"
              @click="answers.timeWindow = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>9</span>
            <h2>{{ t.quiz.steps.budget }}</h2>
          </div>
          <div class="quiz-stack-buttons">
            <button
              v-for="item in budgetOptions"
              :key="item.value"
              type="button"
              :class="{ 'is-selected': answers.budget === item.value }"
              @click="answers.budget = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div v-reveal class="quiz-step">
          <div class="quiz-step-title">
            <span>10</span>
            <h2>{{ t.quiz.steps.restrictions }}</h2>
          </div>
          <label class="quiz-textarea-label">
            <span>{{ t.quiz.restrictionsLabel }}</span>
            <textarea v-model="answers.restrictions"></textarea>
          </label>
          <label class="quiz-checkbox-row">
            <input v-model="answers.documents" type="checkbox" />
            <span>{{ t.quiz.documentsLabel }}</span>
          </label>
        </div>

        <div v-reveal class="quiz-step quiz-step-last">
          <div class="quiz-step-title">
            <span>11</span>
            <h2>{{ t.quiz.steps.contacts }}</h2>
          </div>
          <div class="quiz-contact-fields">
            <input v-model="answers.name" type="text" :placeholder="t.quiz.namePlaceholder" />
            <input ref="phoneInputRef" v-model="answers.phone" type="tel" name="phone" class="quiz-phone-input" />
            <input v-model="answers.email" type="email" placeholder="Email" />
          </div>
          <p class="quiz-slider-label">{{ t.quiz.channelLabel }}</p>
          <div class="quiz-channel-grid">
            <label v-for="item in channelOptions" :key="item.value" class="quiz-checkbox-row">
              <input
                type="checkbox"
                :checked="answers.channels.includes(item.value)"
                @change="toggleArrayValue(answers.channels, item.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
          <input v-model="answers.reference" class="quiz-text-input" type="text" :placeholder="t.quiz.referencePlaceholder" />
          <button type="button" class="quiz-submit-button" @click="showResult">{{ t.quiz.submit }}</button>
        </div>
      </section>

      <section v-else v-reveal="{ variant: 'fade', threshold: 0.05 }" class="quiz-result">
        <div v-reveal class="quiz-result-summary">
          <p>{{ t.quiz.resultTitle }}</p>
          <h1>{{ formatCurrency(estimate[0]) }} — {{ formatCurrency(estimate[1]) }}</h1>
          <dl>
            <template v-for="row in resultRows" :key="row[0]">
              <dt>{{ row[0] }}</dt>
              <dd>{{ row[1] }}</dd>
            </template>
          </dl>
        </div>

        <div class="quiz-package-row">
          <article v-for="(item, index) in packages" :key="item.name" v-reveal="{ delay: index * 80, variant: 'scale' }" class="quiz-package">
            <p>{{ t.quiz.packageLabel }}</p>
            <div>
              <h2>{{ item.name }}</h2>
              <strong>{{ formatCurrency(item.price) }}</strong>
            </div>
            <p>{{ item.description }}</p>
            <h3>{{ t.quiz.includesTitle }}</h3>
            <ul>
              <li v-for="included in item.items" :key="included">{{ included }}</li>
            </ul>
          </article>
        </div>

        <div class="quiz-result-actions">
          <a href="/contacts">{{ t.quiz.exactCalculation }}</a>
          <button type="button" @click="restartQuiz">{{ t.quiz.requestDate }}</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  overflow-x: hidden;
  background: #fdf9f6;
  color: #22112e;
}

.quiz-start {
  position: relative;
  width: min(100%, 430px);
  min-height: 760px;
  margin: 0 auto;
  padding-top: 38px;
  text-align: center;
}

.quiz-start-decor {
  display: block;
  width: 540px;
  max-width: none;
  margin-left: 50%;
  transform: translateX(-50%);
}

.quiz-start-content {
  position: relative;
  z-index: 2;
  width: min(100% - 70px, 340px);
  margin: -250px auto 0;
}

.quiz-start-content p {
  display: inline-flex;
  margin: 0;
  padding: 9px 12px;
  border-radius: 4px;
  background: #43205c;
  color: #fff;
  font-family: var(--font-display);
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
}

.quiz-start-content h1 {
  margin: 36px auto 0;
  color: #000;
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
  line-height: 44px;
}

.quiz-start-content button,
.quiz-submit-button,
.quiz-result-actions a,
.quiz-result-actions button {
  display: inline-flex;
  min-height: 55px;
  align-items: center;
  justify-content: center;
  border: 4px solid #fff;
  border-radius: 999px;
  background: #e93c60;
  box-shadow: 0 5px 13px rgba(34, 17, 46, 0.18);
  color: #fff;
  font-family: var(--font-display);
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    background-color 0.24s ease;
}

.quiz-start-content button {
  min-width: 200px;
  margin-top: 40px;
}

.quiz-form-card,
.quiz-result {
  width: min(100% - 28px, 380px);
  margin: 34px auto 60px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(34, 17, 46, 0.08);
}

.quiz-step {
  padding: 22px 18px;
  border-bottom: 1px dashed rgba(34, 17, 46, 0.08);
}

.quiz-step-last {
  border-bottom: 0;
}

.quiz-step-title {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 16px;
}

.quiz-step-title span {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #ffb800;
  color: #22112e;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}

.quiz-step-title h2 {
  margin: 0;
  color: #171119;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.quiz-image-grid,
.quiz-placeholder-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 10px;
}

.quiz-image-option,
.quiz-placeholder-grid button {
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  transition: transform 0.24s ease;
}

.quiz-image-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 4px;
  transition:
    border-color 0.24s ease,
    box-shadow 0.24s ease;
}

.quiz-image-option.is-selected .quiz-image-wrap {
  border-color: #e93c60;
}

.quiz-image-wrap > img:first-child {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.quiz-check-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 25px;
  transform: translate(-50%, -50%);
}

.quiz-image-option > span:last-child,
.quiz-placeholder-grid em {
  display: block;
  margin-top: 7px;
  color: #3b3142;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
}

.quiz-date-field input,
.quiz-text-input,
.quiz-contact-fields input,
.quiz-textarea-label textarea {
  width: 100%;
  border: 1px solid #eaded8;
  border-radius: 6px;
  background: #f6f6f6;
  color: #4f4557;
  font-family: var(--font-sans);
  font-size: 12px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.quiz-date-field,
.quiz-date-field input {
  cursor: pointer;
}

.quiz-date-field input,
.quiz-text-input,
.quiz-contact-fields input {
  height: 38px;
  padding: 0 14px;
}

.quiz-placeholder-grid {
  margin-top: 17px;
}

.quiz-placeholder-grid button span {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: #d8d8d8;
}

.quiz-placeholder-grid button.is-selected span {
  outline: 2px solid #e93c60;
}

.quiz-button-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px 12px;
}

.quiz-button-grid button,
.quiz-stack-buttons button,
.quiz-palette-list button,
.quiz-segmented button {
  min-height: 38px;
  border: 1px solid #eaded8;
  border-radius: 6px;
  background: #f6f6f6;
  color: #645d67;
  font-size: 12px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.quiz-button-grid button.is-selected,
.quiz-stack-buttons button.is-selected,
.quiz-segmented button.is-selected {
  border-color: #e93c60;
  background: #fff4f7;
  color: #e93c60;
}

.quiz-checkbox-list {
  display: grid;
  gap: 18px;
}

.quiz-checkbox-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2f2941;
  font-size: 12px;
  line-height: 17px;
}

.quiz-checkbox-row input {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  appearance: none;
  border: 1px solid #e1d2ca;
  border-radius: 2px;
  background: #fff;
}

.quiz-checkbox-row input:checked {
  border-color: #e93c60;
  background: #e93c60;
  box-shadow: inset 0 0 0 3px #fff;
}

.quiz-text-input {
  margin-top: 18px;
}

.quiz-stack-buttons {
  display: grid;
  gap: 10px;
}

.quiz-slider-label {
  margin: 18px 0 10px;
  color: #756d7b;
  font-size: 11px;
  line-height: 16px;
}

.quiz-scale {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quiz-scale::before {
  position: absolute;
  right: 20px;
  left: 20px;
  top: 50%;
  height: 2px;
  background: #eaded8;
  content: '';
}

.quiz-scale button {
  position: relative;
  z-index: 1;
  width: 25px;
  height: 25px;
  border: 1px solid #eaded8;
  border-radius: 50%;
  background: #fff;
  color: #8b8092;
  font-size: 11px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.quiz-scale button.is-selected {
  border-color: #e93c60;
  background: #e93c60;
  color: #fff;
}

.quiz-palette-list {
  display: grid;
  gap: 11px;
}

.quiz-palette-list button {
  display: flex;
  min-height: 45px;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  text-align: left;
}

.quiz-palette-list button.is-selected {
  border-color: #e93c60;
}

.quiz-palette-list em {
  display: flex;
  margin-left: 12px;
  font-style: normal;
}

.quiz-palette-list i {
  width: 26px;
  height: 26px;
  margin-left: -4px;
  border: 1px solid #eaded8;
  border-radius: 50%;
}

.quiz-image-grid-compact {
  gap: 10px;
}

.quiz-segmented {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.quiz-segmented button {
  border-radius: 0;
}

.quiz-segmented button:first-child {
  border-radius: 6px 0 0 6px;
}

.quiz-segmented button:last-child {
  border-radius: 0 6px 6px 0;
}

.quiz-textarea-label span {
  display: block;
  margin-bottom: 10px;
  color: #6c6473;
  font-size: 11px;
  line-height: 15px;
}

.quiz-textarea-label textarea {
  height: 110px;
  padding: 12px;
  resize: vertical;
}

.quiz-contact-fields {
  display: grid;
  gap: 10px;
}

.quiz-channel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 22px;
}

.quiz-submit-button {
  width: 100%;
  margin-top: 22px;
  border: 0;
  box-shadow: none;
}

.quiz-result {
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.quiz-result-summary,
.quiz-package {
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(34, 17, 46, 0.08);
}

.quiz-result-summary {
  padding: 34px 25px 28px;
}

.quiz-result-summary > p {
  margin: 0;
  color: #6d6474;
  font-size: 11px;
  line-height: 15px;
  text-align: center;
}

.quiz-result-summary h1 {
  margin: 10px 0 32px;
  color: #171119;
  font-family: var(--font-display);
  font-size: 35px;
  font-weight: 400;
  line-height: 42px;
  text-align: center;
}

.quiz-result-summary dl {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px 20px;
  margin: 0;
}

.quiz-result-summary dt,
.quiz-result-summary dd {
  color: #4f4557;
  font-size: 12px;
  line-height: 17px;
}

.quiz-result-summary dd {
  margin: 0;
  color: #2f2941;
  text-align: right;
}

.quiz-package-row {
  display: flex;
  gap: 22px;
  margin-top: 22px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.quiz-package-row::-webkit-scrollbar {
  display: none;
}

.quiz-package {
  min-width: 310px;
  padding: 24px 20px;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease;
}

.quiz-package p:first-child {
  margin: 0;
  color: #7b7086;
  font-size: 12px;
}

.quiz-package div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  margin-top: 8px;
}

.quiz-package h2,
.quiz-package strong {
  color: #171119;
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
  line-height: 36px;
}

.quiz-package p {
  margin: 14px 0 0;
  color: #625a68;
  font-size: 13px;
  line-height: 22px;
}

.quiz-package h3 {
  margin: 22px 0 12px;
  color: #171119;
  font-size: 13px;
}

.quiz-package ul {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-package li {
  position: relative;
  padding-left: 20px;
  color: #4f4557;
  font-size: 12px;
  line-height: 17px;
}

.quiz-package li::before {
  position: absolute;
  left: 0;
  color: #e93c60;
  content: '✦';
}

.quiz-result-actions {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.quiz-result-actions a,
.quiz-result-actions button {
  width: 100%;
  min-height: 52px;
  border: 0;
  box-shadow: 0 5px 13px rgba(34, 17, 46, 0.18);
}

.quiz-result-actions button {
  background: #43205c;
}

.quiz-image-option.is-selected .quiz-image-wrap::before {
    opacity: .4;
    visibility: visible;
}

.quiz-image-option .quiz-image-wrap::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background: #e93c60;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.24s ease,
      visibility 0.24s ease;
}

@media (hover: hover) and (pointer: fine) {
  .quiz-start-content button:hover,
  .quiz-submit-button:hover,
  .quiz-result-actions a:hover,
  .quiz-result-actions button:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(233, 60, 96, 0.2);
  }

  .quiz-image-option:hover,
  .quiz-placeholder-grid button:hover {
    transform: translateY(-3px);
  }

  .quiz-image-option:hover .quiz-image-wrap {
    border-color: rgba(233, 60, 96, 0.35);
    box-shadow: 0 14px 28px rgba(34, 17, 46, 0.12);
  }

  .quiz-image-option:hover .quiz-image-wrap > img:first-child {
    transform: scale(1.045);
  }

  .quiz-button-grid button:hover,
  .quiz-stack-buttons button:hover,
  .quiz-palette-list button:hover,
  .quiz-segmented button:hover,
  .quiz-scale button:hover {
    transform: translateY(-1px);
    border-color: rgba(233, 60, 96, 0.42);
    background: #fff;
  }

  .quiz-date-field input:focus,
  .quiz-text-input:focus,
  .quiz-contact-fields input:focus,
  .quiz-textarea-label textarea:focus {
    border-color: rgba(233, 60, 96, 0.5);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(233, 60, 96, 0.08);
  }

  .quiz-package:hover {
    transform: translateY(-5px);
    box-shadow: 0 22px 46px rgba(34, 17, 46, 0.12);
  }
}

@media (min-width: 900px) {
  .quiz-start {
    display: grid;
    width: min(100% - 64px, 1120px);
    min-height: auto;
    grid-template-columns: minmax(360px, 0.86fr) minmax(420px, 1fr);
    gap: 28px 54px;
    align-items: center;
    padding: 54px 0 70px;
    text-align: left;
  }

  .quiz-start-decor {
    grid-column: 2;
    grid-row: 1;
    width: min(100%, 480px);
    margin: 0;
    transform: none;
  }

  .quiz-start-content {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    margin: 0;
  }

  .quiz-start-content p {
    font-size: 18px;
    line-height: 22px;
  }

  .quiz-start-content h1 {
    max-width: 520px;
    margin: 30px 0 0;
    font-size: 39px;
    line-height: 42px;
  }

  .quiz-start-content button {
    min-width: 228px;
    margin-top: 38px;
  }

  .quiz-form-card {
    display: grid;
    width: min(100% - 64px, 1040px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: hidden;
  }

  .quiz-result {
    width: min(100% - 64px, 1040px);
  }

  .quiz-step {
    min-width: 0;
    padding: 30px;
    border-right: 1px dashed rgba(34, 17, 46, 0.08);
  }

  .quiz-step:nth-child(2n),
  .quiz-step-last {
    border-right: 0;
  }

  .quiz-step:nth-last-child(2) {
    border-bottom: 0;
  }

  .quiz-step-last {
    grid-column: 1 / -1;
    padding: 34px 30px 36px;
  }

  .quiz-step-last .quiz-contact-fields {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .quiz-step-last .quiz-channel-grid {
    max-width: 520px;
  }

  .quiz-step-title h2 {
    font-size: 22px;
    line-height: 30px;
  }

  .quiz-image-grid,
  .quiz-placeholder-grid {
    gap: 18px 14px;
  }

  .quiz-placeholder-grid button span {
    aspect-ratio: 1.12;
  }

  .quiz-button-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .quiz-stack-buttons {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quiz-palette-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quiz-textarea-label textarea {
    height: 150px;
  }

  .quiz-submit-button {
    max-width: 360px;
  }

  .quiz-result-summary {
    padding: 42px 46px;
  }

  .quiz-result-summary h1 {
    font-size: 46px;
    line-height: 56px;
  }

  .quiz-result-summary dl {
    grid-template-columns: 220px minmax(0, 1fr) 220px minmax(0, 1fr);
    gap: 18px 24px;
  }

  .quiz-result-summary dd {
    text-align: left;
  }

  .quiz-package-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    padding-bottom: 0;
  }

  .quiz-package {
    min-width: 0;
    padding: 30px;
  }

  .quiz-result-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 380px) {
  .quiz-start-content h1 {
    font-size: 29px;
    line-height: 39px;
  }

  .quiz-result-summary h1 {
    font-size: 31px;
  }
}
</style>
