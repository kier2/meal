<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/axios'
import SpinnerLoading from './utils/SpinnerLoading.vue'
import MealPopup from './MealPopup.vue'

const meals = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const mealSelected = ref(null)

const props = defineProps({
  activeFilter: {
    type: Object,
    default: null
  }
})

const fetchMeals = async (filter) => {
  isLoading.value = true
  try {
    let endpoint = ''

    if (!filter) {
      endpoint = `/filter.php?i=chicken_breast`
    } else if (filter.type === 'category') {
      endpoint = `/filter.php?c=${filter.value}`
    } else if (filter.type === 'area') {
      endpoint = `/filter.php?a=${filter.value}`
    } else if (filter.type === 'ingredient') {
      endpoint = `/filter.php?i=${filter.value}`
    }

    const response = await api.get(endpoint)
    meals.value = response.data.meals || []
  } catch (error) {
    console.error('Failed to fetch meals:', error)
    meals.value = []
  } finally {
    isLoading.value = false
  }
}

const getMealsSelected = (meal) => {
  mealSelected.value = meal
  isModalOpen.value = true
}

onMounted(() => {
  fetchMeals(null)
})


watch(
  () => props.activeFilter,
  (newFilter) => {
    fetchMeals(newFilter)
    console.log(newFilter)
  },
  { deep: true }
)
</script>

<template>
  <div v-if="isLoading" class="text-center text-gray-600">
    <SpinnerLoading />
  </div>

  <div
    v-else
    class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div class="grid grid-cols-3 gap-4 py-4 px-2">
      <div
        v-for="(meal, index) in meals"
        :key="index"
        class="flex h-full w-full flex-col gap-4 rounded-lg"
      >
        <div class="relative cursor-pointer" @click="getMealsSelected(meal.strMeal)">
          <img
            class="w-full object-contain p-2 rounded border border-gray-300"
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
          />
          <div class="mt-2">
            <p class="text-[#181411] text-base font-medium leading-normal">
              {{ meal.strMeal }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MealPopup
    :open="isModalOpen"
    :mealSelected="mealSelected"
    @close="isModalOpen = false"
  />
</template>
