import { createRouter, createWebHistory } from 'vue-router'
import B2BPage from '../pages/B2BPage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import EventDecorPage from '../pages/EventDecorPage.vue'
import HomePage from '../pages/HomePage.vue'
import PortfolioPage from '../pages/PortfolioPage.vue'
import ProductPage from '../pages/ProductPage.vue'
import QuizPage from '../pages/QuizPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/professional-event-decor',
      name: 'professional-event-decor',
      component: EventDecorPage,
    },
    {
      path: '/b2b-partnership',
      name: 'b2b-partnership',
      component: B2BPage,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactPage,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
