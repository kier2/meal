<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/api/axios'
import SpinnerLoading from './utils/SpinnerLoading.vue'
import MealPopup from './MealPopup.vue'

const meals = ref([])
const isLoading = ref(false)
const isModalOpen = ref(false)
const mealSelected = ref(null)

const currentPage = ref(1)
const itemsPerPage = 6

const props = defineProps({
  activeFilter: {
    type: Object,
    default: null
  },
  searchMeals: {
    type: Object,
    default: null,
    required: false
  }
})

const totalPages = computed(() => {
    return Math.ceil(meals.value.length / itemsPerPage)
})

const paginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return meals.value.slice(start, end)
})

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const fetchMeals = async (filter) => {
  try {
    isLoading.value = true
    let endpoint = ''

    if (!filter) {
      endpoint = `/filter.php?i=chicken_breast`
    } else if (filter.type === 'category') {
      endpoint = `/filter.php?c=${filter.value}`
    } else if (filter.type === 'area') {
      endpoint = `/filter.php?a=${filter.value}`
    } else if (filter.type === 'ingredient') {
      endpoint = `/filter.php?i=${filter.value}`
    } else if (filter.type === 'search') {
      endpoint = `/search.php?s=${filter.value}`
    }

    const response = await api.get(endpoint)
    meals.value = response.data.meals || []
    console.log(meals.value)
    currentPage.value = 1
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
    // console.log(newFilter)
  },
  { deep: true }
)
watch(
  () => props.searchMeals,
  (newFilter) => {
    // console.log('New Searched', newFilter)
    fetchMeals(newFilter)
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
    <div class="grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 gap-y-8 py-4 px-2">
      <div
        v-for="(meal, index) in paginatedMeals"
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

    <div
      v-if="meals.length == 0"
      class="w-full py-6 h-[30vh] flex items-center justify-center">
      <h2 class="text-6xl font-semibold text-center uppercase text-[#d57d1f]">404 not Found</h2>
    </div>
  </div>

  <div v-if="totalPages > 1" class="flex justify-center items-center my-8 space-x-2">

        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium border rounded-md"
        >
            &larr; Previous
        </button>

        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
                'px-4 py-2 text-sm font-medium border rounded-md',
                {'bg-[#d57d1f] text-white': currentPage === page, 'hover:bg-gray-100': currentPage !== page}
            ]"
        >
            {{ page }}
        </button>

        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium border rounded-md"
        >
            Next &rarr;
        </button>
  </div>

  <MealPopup
    :open="isModalOpen"
    :mealSelected="mealSelected"
    @close="isModalOpen = false"
  />
</template>
