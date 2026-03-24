import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TemalarPage from '../views/TemalarPage.vue'
import TestlerPage from '../views/TestlerPage.vue'
import BizBaradaPage from '../views/BizBaradaPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ContactPage from '../views/ContactPage.vue'
import FakultetlerPage from '../views/FakultetlerPage.vue'
import SubjectDetailPage from '../views/SubjectDetailPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/temalar', name: 'Temalar', component: TemalarPage },
  { path: '/tema/:id', name: 'SubjectDetail', component: SubjectDetailPage },
  { path: '/testler', name: 'Testler', component: TestlerPage },
  { path: '/fakultetler', name: 'Fakultetler', component: FakultetlerPage },
  { path: '/biz-barada', name: 'BizBarada', component: BizBaradaPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/contact', name: 'Contact', component: ContactPage }
]

const router = createRouter({
  // Vite-da 'process.env.BASE_URL' deregine 'import.meta.env.BASE_URL' ulanylýar
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router