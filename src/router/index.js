import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AreaView from '@/views/area/AreaView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MealByIdView from '@/views/area/MealByIdView.vue'
import FilterCatView from '@/views/filters/FilterCategoryView.vue'
import FilterAreaView from '@/views/filters/FilterAreaView.vue'


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
      path: '/filters/area/meal/:area_id',
      name: 'filter-area',
      component: FilterAreaView
    },
    {
      path: '/filters/category/meal/:category_id',
      name: 'filter-cat',
      component: FilterCatView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
})

export default router
