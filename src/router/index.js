import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BiodataView from '../views/BiodataView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/biodata', name: 'biodata', component: BiodataView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
