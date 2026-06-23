import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoveAppView from '../views/LoveAppView.vue'
import ManusView from '../views/ManusView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/love-app',
    name: 'love-app',
    component: LoveAppView,
  },
  {
    path: '/manus',
    name: 'manus',
    component: ManusView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
