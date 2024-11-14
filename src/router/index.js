import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AreaView from '@/views/area/AreaView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MealByIdView from '@/views/area/MealByIdView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/area/:area_id',
      name: 'area-view',
      component: AreaView,
    },
    {
      path: '/area/meal/:meal_id',
      name: 'meal-id',
      component: MealByIdView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
})

export default router
