<script setup>
  import { ref, onMounted, watch } from 'vue';
  import SpinnerLoading from '@/components/utils/SpinnerLoading.vue';
  import MealPopup from '@/components/MealPopup.vue';

  const myRecipe = ref([])
  const isLoading = ref(false)
  const isModalOpen = ref(false)
  const mealSelected = ref(null)

  const fetchMyRecipe = () => {
    try{
      isLoading.value = true
      myRecipe.value = JSON.parse(localStorage.getItem("mealData")) || []
    }
    catch (error) {
      console.error('Failed to fetch meals:', error)
      myRecipe.value = []
    } finally {
      isLoading.value = false
    }
    // console.log(myRecipe.value)
  }

  const getMealsSelected = (meal) => {
    mealSelected.value = meal
    isModalOpen.value = true
  }

  onMounted(() => {
    fetchMyRecipe();
  })

  watch(() => isModalOpen, (newModalStatus) => {
    console.log(newModalStatus.value)
    fetchMyRecipe()
  }, { deep: true })
</script>

<template>
  <div class="py-10 md:py-24">
    <div v-if="isLoading" class="text-center text-gray-600">
      <SpinnerLoading />
    </div>

    <div
      v-else
      class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div class="grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 gap-y-8 py-4 px-2">
        <div
          v-for="(meal, index) in myRecipe"
          :key="index"
          class="flex h-full w-full flex-col gap-4 rounded-lg"
        >
          <div class="relative cursor-pointer" @click="getMealsSelected(meal.meal)">
            <img
              class="w-full object-contain p-2 rounded border border-gray-300"
              :src="meal.mealImg"
              :alt="meal.meal"
            />
            <div class="mt-2">
              <p class="text-[#181411] text-base font-medium leading-normal">
                {{ meal.meal }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="myRecipe.length == 0"
        class="w-full py-6 h-[50vh] flex items-center justify-center">
        <h2 class="text-6xl font-semibold text-center uppercase text-[#d57d1f]">404 not Found</h2>
      </div>
    </div>
  </div>

  <MealPopup
    :open="isModalOpen"
    :mealSelected="mealSelected"
    @close="isModalOpen = false"
  />
</template>
