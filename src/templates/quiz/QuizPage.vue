<script setup>
import { computed, reactive, ref } from 'vue'
import cartIconUrl from '../../assets/header-cart.svg'
import checkIconUrl from '../../assets/quiz/quiz-check.svg'
import corporateImageUrl from '../../assets/quiz/event-corporate.png'
import decorHeroUrl from '../../assets/quiz/quiz-decor.png'
import logoUrl from '../../assets/logo.svg'
import otherImageUrl from '../../assets/quiz/event-other.png'
import phoneIconUrl from '../../assets/header-phone.svg'
import presentationImageUrl from '../../assets/quiz/event-presentation.png'
import weddingImageUrl from '../../assets/quiz/event-wedding.png'
import anniversaryImageUrl from '../../assets/quiz/event-anniversary.png'

const phase = ref('start')

const answers = reactive({
  eventType: 'birthday',
  date: '',
  venue: 'outdoor',
  guests: '50 - 100',
  decorate: ['welcome', 'main-table', 'photozone'],
  decorateOther: '',
  style: 'Modern',
  fullness: 3,
  palette: 'Под бренд',
  flowerType: 'Микс',
  services: [],
  timeWindow: 'День',
  budget: '€700–1500',
  restrictions: '',
  documents: false,
  name: 'Александр',
  phone: '',
  email: '',
  channels: [],
  reference: '',
})

const eventTypes = [
  { label: 'Свадьба', value: 'wedding', image: weddingImageUrl },
  { label: 'Корпоратив', value: 'corporate', image: corporateImageUrl },
  { label: 'День рождения', value: 'birthday', image: presentationImageUrl },
  { label: 'Юбилей', value: 'anniversary', image: anniversaryImageUrl },
  { label: 'Презентация', value: 'presentation', image: presentationImageUrl },
  { label: 'Другое', value: 'other', image: otherImageUrl },
]

const venueOptions = [
  'Ресторан',
  'Загород',
  'Квартира',
  'Отель',
  'Открытая площадка',
]

const guestOptions = ['до 20', '20 - 50', '50 - 100', '100 - 200', '200 +']

const decorateOptions = [
  { label: 'Welcome-зона / вход', value: 'welcome' },
  { label: 'Фотозона (стена / арка / неон)', value: 'photozone' },
  { label: 'Арка / зона церемонии', value: 'ceremony' },
  { label: 'Президиум / main table', value: 'main-table' },
  { label: 'Гостевые столы (центральные композиции)', value: 'guest-tables' },
  { label: 'Потолочные / подвесные композиции', value: 'hanging' },
  { label: 'Букет / бутоньерки', value: 'bouquet' },
]

const styleOptions = ['Классика', 'Modern', 'Минимал', 'Luxury', 'Boho']

const paletteOptions = [
  { label: 'Белый / Крем', value: 'Белый / Крем', colors: ['#f8efe4', '#fffaf4', '#ffffff'] },
  { label: 'Белый + Зелень', value: 'Белый + Зелень', colors: ['#f7f9ee', '#9bb957', '#38551b'] },
  { label: 'Пастель', value: 'Пастель', colors: ['#d9b6a9', '#edc8bd', '#e9e6d8'] },
  { label: 'Яркая', value: 'Яркая', colors: ['#d62d73', '#ff7b00', '#ffc400'] },
  { label: 'Бордо', value: 'Бордо', colors: ['#f3bf84', '#8e0d2d', '#67001f'] },
  { label: 'Лаванда', value: 'Лаванда', colors: ['#6d5aa6', '#9285c9', '#c7cce9'] },
  { label: 'Под бренд', value: 'Под бренд', colors: ['#000000', '#ef7a00', '#ffffff'] },
]

const flowerTypeOptions = [
  { label: 'Декор', value: 'Декор', image: weddingImageUrl },
  { label: 'Живые', value: 'Живые', image: corporateImageUrl },
  { label: 'Микс', value: 'Микс', image: weddingImageUrl },
]

const serviceOptions = ['Самовывоз', 'Доставка', 'Монтаж']
const timeOptions = ['Утро', 'День', 'Вечер']
const budgetOptions = ['€300–700', '€700–1500', '€1500–3000', '€3000+', 'Хочу понять по факту']
const channelOptions = ['Телефон', 'WhatsApp', 'Telegram', 'Email']

const resultRows = computed(() => [
  ['Тип мероприятия', selectedEventLabel.value],
  ['Формат', answers.venue],
  ['Количество гостей', answers.guests],
  ['Что украсить', selectedDecorLabels.value.join(' / ') || 'Не выбрано'],
  ['Стиль', answers.style],
  ['Пышность', fullnessLabel.value],
  ['Цветовая палитра', answers.palette],
  ['Цветы', answers.flowerType],
  ['Приоритет', answers.timeWindow],
  ['Ограничения', answers.restrictions ? 'Есть' : 'Нет'],
])

const selectedEventLabel = computed(() => eventTypes.find((item) => item.value === answers.eventType)?.label ?? 'Другое')
const selectedDecorLabels = computed(() => decorateOptions.filter((item) => answers.decorate.includes(item.value)).map((item) => item.label))
const fullnessLabel = computed(() => ['Минимум', 'Умеренно', 'Минимум', 'Пышно', 'Максимум'][answers.fullness - 1] ?? 'Минимум')
const estimate = computed(() => {
  const baseByBudget = {
    '€300–700': [700, 1000],
    '€700–1500': [1600, 2200],
    '€1500–3000': [2400, 3400],
    '€3000+': [3600, 5200],
    'Хочу понять по факту': [1600, 2200],
  }

  return baseByBudget[answers.budget] ?? [1600, 2200]
})

const packages = computed(() => [
  {
    name: 'Base',
    price: estimate.value[0],
    description: 'Недорого, но со вкусом. Стильные композиции и точные акценты для камерного события.',
    items: ['Фон для стола молодоженов', 'Фотозона'],
  },
  {
    name: 'Wow',
    price: estimate.value[1],
    description: 'Больше объёма, цветов и деталей для выразительного оформления площадки.',
    items: ['Центральная зона церемонии', 'Фон для фото', 'Фотозона'],
  },
])

const formatCurrency = (value) => `€ ${value.toLocaleString('en-US')}`

const toggleArrayValue = (array, value) => {
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return
  }

  array.push(value)
}

const goToForm = () => {
  phase.value = 'form'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showResult = () => {
  phase.value = 'result'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const restartQuiz = () => {
  phase.value = 'form'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="quiz-page">
    <header class="quiz-header">
      <a href="/" class="quiz-logo" aria-label="Zida Ziedi">
        <img :src="logoUrl" alt="Zida Ziedi" />
      </a>

      <div class="quiz-header-actions">
        <a href="/catalog" aria-label="Каталог">
          <img :src="cartIconUrl" alt="" />
        </a>
        <a href="tel:+37100000000" aria-label="Позвонить">
          <img :src="phoneIconUrl" alt="" />
        </a>
        <button type="button" aria-label="Открыть меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>

    <main>
      <section v-if="phase === 'start'" class="quiz-start">
        <img :src="decorHeroUrl" alt="" class="quiz-start-decor" />
        <div class="quiz-start-content">
          <p>Всего за 1 минуту</p>
          <h1>Подберём декор и покажем ориентировочную смету</h1>
          <button type="button" @click="goToForm">Начать</button>
        </div>
        <div class="quiz-next-card-hint"></div>
      </section>

      <section v-else-if="phase === 'form'" class="quiz-form-card">
        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>1</span>
            <h2>Какой тип мероприятия вы планируете?</h2>
          </div>
          <div class="quiz-image-grid">
            <button
              v-for="item in eventTypes"
              :key="item.value"
              type="button"
              class="quiz-image-option"
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

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>2</span>
            <h2>Дата и формат площадки</h2>
          </div>
          <label class="quiz-date-field">
            <span class="sr-only">Выберите дату</span>
            <input v-model="answers.date" type="date" />
          </label>
          <div class="quiz-placeholder-grid">
            <button
              v-for="item in venueOptions"
              :key="item"
              type="button"
              :class="{ 'is-selected': answers.venue === item }"
              @click="answers.venue = item"
            >
              <span></span>
              <em>{{ item }}</em>
            </button>
          </div>
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>3</span>
            <h2>Количество гостей</h2>
          </div>
          <div class="quiz-button-grid">
            <button
              v-for="item in guestOptions"
              :key="item"
              type="button"
              :class="{ 'is-selected': answers.guests === item }"
              @click="answers.guests = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>4</span>
            <h2>Что нужно украсить?</h2>
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
          <input v-model="answers.decorateOther" class="quiz-text-input" type="text" placeholder="Напишите свое" />
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>5</span>
            <h2>Стиль и пышность</h2>
          </div>
          <div class="quiz-stack-buttons">
            <button
              v-for="item in styleOptions"
              :key="item"
              type="button"
              :class="{ 'is-selected': answers.style === item }"
              @click="answers.style = item"
            >
              {{ item }}
            </button>
          </div>
          <p class="quiz-slider-label">Планируемая пышность</p>
          <div class="quiz-scale">
            <button
              v-for="index in 5"
              :key="index"
              type="button"
              :class="{ 'is-selected': answers.fullness >= index }"
              @click="answers.fullness = index"
            >
              {{ index < 4 ? '✓' : `0${index}` }}
            </button>
          </div>
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>6</span>
            <h2>Цветовая палитра</h2>
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

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>7</span>
            <h2>Искусственные или живые</h2>
          </div>
          <div class="quiz-image-grid quiz-image-grid-compact">
            <button
              v-for="item in flowerTypeOptions"
              :key="item.value"
              type="button"
              class="quiz-image-option"
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

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>8</span>
            <h2>Услуги</h2>
          </div>
          <div class="quiz-checkbox-list">
            <label v-for="item in serviceOptions" :key="item" class="quiz-checkbox-row">
              <input
                type="checkbox"
                :checked="answers.services.includes(item)"
                @change="toggleArrayValue(answers.services, item)"
              />
              <span>{{ item }}</span>
            </label>
          </div>
          <p class="quiz-slider-label">Окна времени</p>
          <div class="quiz-segmented">
            <button
              v-for="item in timeOptions"
              :key="item"
              type="button"
              :class="{ 'is-selected': answers.timeWindow === item }"
              @click="answers.timeWindow = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>9</span>
            <h2>Бюджет и ожидания</h2>
          </div>
          <div class="quiz-stack-buttons">
            <button
              v-for="item in budgetOptions"
              :key="item"
              type="button"
              :class="{ 'is-selected': answers.budget === item }"
              @click="answers.budget = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="quiz-step">
          <div class="quiz-step-title">
            <span>10</span>
            <h2>Условия и ограничения</h2>
          </div>
          <label class="quiz-textarea-label">
            <span>Есть ли запреты площадки (свечи, крепления к стенам, конфетти и т.п.)</span>
            <textarea v-model="answers.restrictions"></textarea>
          </label>
          <label class="quiz-checkbox-row">
            <input v-model="answers.documents" type="checkbox" />
            <span>Нужны ли документы (счёт/договор)</span>
          </label>
        </div>

        <div class="quiz-step quiz-step-last">
          <div class="quiz-step-title">
            <span>11</span>
            <h2>Контакты для сметы</h2>
          </div>
          <div class="quiz-contact-fields">
            <input v-model="answers.name" type="text" placeholder="Ваше имя" />
            <input v-model="answers.phone" type="tel" placeholder="+371 00 000 000" />
            <input v-model="answers.email" type="email" placeholder="Email" />
          </div>
          <p class="quiz-slider-label">Предпочтительный канал связи</p>
          <div class="quiz-channel-grid">
            <label v-for="item in channelOptions" :key="item" class="quiz-checkbox-row">
              <input
                type="checkbox"
                :checked="answers.channels.includes(item)"
                @change="toggleArrayValue(answers.channels, item)"
              />
              <span>{{ item }}</span>
            </label>
          </div>
          <input v-model="answers.reference" class="quiz-text-input" type="text" placeholder="Ссылка на референс (Pinterest и т.п.)" />
          <button type="button" class="quiz-submit-button" @click="showResult">Получить предложение</button>
        </div>
      </section>

      <section v-else class="quiz-result">
        <div class="quiz-result-summary">
          <p>Ориентировочная стоимость</p>
          <h1>{{ formatCurrency(estimate[0]) }} — {{ formatCurrency(estimate[1]) }}</h1>
          <dl>
            <template v-for="row in resultRows" :key="row[0]">
              <dt>{{ row[0] }}</dt>
              <dd>{{ row[1] }}</dd>
            </template>
          </dl>
        </div>

        <div class="quiz-package-row">
          <article v-for="item in packages" :key="item.name" class="quiz-package">
            <p>Пакет</p>
            <div>
              <h2>{{ item.name }}</h2>
              <strong>{{ formatCurrency(item.price) }}</strong>
            </div>
            <p>{{ item.description }}</p>
            <h3>Что входит</h3>
            <ul>
              <li v-for="included in item.items" :key="included">{{ included }}</li>
            </ul>
          </article>
        </div>

        <div class="quiz-result-actions">
          <a href="/contacts">Получить точный расчёт</a>
          <button type="button" @click="restartQuiz">Запросить свободную дату</button>
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

.quiz-header {
  position: relative;
  z-index: 5;
  display: flex;
  width: min(100% - 40px, 386px);
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin: 48px auto 0;
  padding: 10px 13px 10px 22px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(34, 17, 46, 0.08);
}

.quiz-logo img {
  display: block;
  width: 128px;
}

.quiz-header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quiz-header-actions a {
  display: inline-flex;
  width: 19px;
  height: 19px;
  align-items: center;
  justify-content: center;
}

.quiz-header-actions a img {
  display: block;
  width: 19px;
  height: 19px;
}

.quiz-header-actions button {
  display: inline-flex;
  width: 42px;
  height: 42px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  border-radius: 50%;
  background: #e93c60;
}

.quiz-header-actions button span {
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
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
}

.quiz-start-content button {
  min-width: 200px;
  margin-top: 40px;
}

.quiz-next-card-hint {
  width: min(100% - 70px, 360px);
  height: 94px;
  margin: 92px auto 0;
  border-radius: 24px 24px 0 0;
  background: #fff;
  box-shadow: 0 -10px 28px rgba(34, 17, 46, 0.08);
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
}

.quiz-image-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 4px;
}

.quiz-image-option.is-selected .quiz-image-wrap {
  border-color: #e93c60;
}

.quiz-image-wrap > img:first-child {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
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
