import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyRecipe from '@/views/MyRecipe.vue'
import NotFoundView from '@/views/NotFoundView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/my-recipe',
      name: 'my_recipe',
      component: MyRecipe
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
})

export default router
