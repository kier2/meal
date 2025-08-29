<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/api/axios';

  const mealByIngredient = ref([]);
  const isLoading = ref(true);

  const getMealByIngredient = async () => {
    try{
      const response = await api.get(`/filter.php?c=Seafood`)
      if (response.data.meals) {
        mealByIngredient.value = response.data.meals;
      }
    }
    catch (error) {
      console.error("Failed to fetch meals:", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getMealByIngredient()
  })

</script>

<template>
  <!-- Display a loading message while data is being fetched -->
  <div v-if="isLoading" class="text-center text-gray-600">
    Loading...
  </div>
  <div
  v-else
   class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
    <div class="grid grid-cols-3 gap-4 py-4 px-2">
      <div
      v-for="(meal, index) in mealByIngredient"
      :key="index"
      class="flex h-full w-full flex-col gap-4 rounded-lg">
        <div class="relative">
          <!-- <RouterLink
          :to="`/filters/category/${meal.strCategory}`"
          class="absolute w-full h-full z-10"></RouterLink> -->
          <!-- <div
            class="w-full rounded-xl flex flex-col"> -->
          <img
            class="w-full object-contain p-2 rounded border border-gray-300"
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
          />
          <!-- </div> -->
          <div class="mt-2">
            <p class="text-[#181411] text-base font-medium leading-normal">{{ meal.strMeal }}</p>
            <!-- <p class="text-[#897461] text-sm font-normal leading-normal">Quick & Easy </p> -->
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
