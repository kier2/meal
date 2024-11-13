<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import MealHeader from '@/components/MealHeader.vue';

  const route = useRoute();
  const areaId = route.params.area_id;
  const mealByArea = ref([]);
  const popup = ref(false);
  const popUpMeal = ref(null);
  const popUpImg = ref(null);
  const searchByArea = ref();
  const mealsLabel = ref();

  const getMealByArea = (areaId) => {
    let config = {
      method: 'get',
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`,
    };
    if(areaId){
      axios.request(config)
      .then((response) => {
        mealByArea.value = response.data.meals;
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return mealByArea;
  }
  const searchResult = (searchKeyword) => {
    searchByArea.value = searchKeyword
    return searchKeyword
  }
  const getMealPopup = (e) => {
    popUpMeal.value = e.target.dataset.meal
    popUpImg.value = e.target.dataset.img
    popup.value = true;
  }
  const closePopup = () => {
    popup.value = false;
  }
  onMounted(() => {
    if(areaId.length > 0){
      getMealByArea(areaId);
      mealsLabel.value = areaId
    }
  });
  watch(searchByArea, (newSearchResult) => {
    // console.log(newSearchResult);
    if(newSearchResult){
      getMealByArea(newSearchResult);
      mealsLabel.value = newSearchResult
    }
  });
</script>
<template>
  <MealHeader @search="searchResult" :page-title="`${mealsLabel} Meals`" back-btn />
  <div class="grid grid-cols-4 gap-6 py-8">
    <div @click="getMealPopup" v-for="meal in mealByArea" :key="meal.id">
      <div>
        <img class="w-full h-auto object-cover cursor-zoom-in"
         :data-meal="meal.strMeal.trim()"
         :data-img="meal.strMealThumb"
         :src="meal.strMealThumb"
         :alt="meal.strMeal" />
      </div>
      <div class="p-3">
        <div>
          <h4 class="text-[#d57d1f] font-semibold text-center text-lg">
            {{ meal.strMeal }}
          </h4>
        </div>
      </div>
    </div>
  </div>

  <div v-if="popup" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" aria-hidden="true"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-2">
          <div class="absolute right-0 top-0 hidden sm:block">
            <button @click="closePopup" type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="block">
            <img class="w-full h-auto object-cover" :src="popUpImg" :alt="popUpMeal">
            <div class="p-2">
                <h4 class="font-semibold text-lg">{{ popUpMeal }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
