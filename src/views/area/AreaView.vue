<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter, RouterLink } from 'vue-router';
  import axios from 'axios';
  import MealHeader from '@/components/MealHeader.vue';

  const router = useRouter();
  const route = useRoute();
  const areaId = route.params.area_id;
  const mealByArea = ref([]);
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
    <div v-for="meal in mealByArea"
      :key="meal.id"
      class="rounded-md cursor-pointer w-full h-full"
      >
      <div>
        <img class="w-full h-auto object-cover rounded-t-md"
         :src="meal.strMealThumb"
         :alt="meal.strMeal" />
      </div>
      <div class="p-4 bg-white flex justify-center rounded-b-md">
        <div class="text-center">
          <h4 class="text-[#d57d1f] font-semibold text-xl">
            {{ meal.strMeal }}
          </h4>
          <RouterLink :to="`/area/meal/${meal.idMeal}`"
          class="mt-4 text-sm font-semibold"
          >View Recipe</RouterLink>
        </div>
      </div>
    </div>
  </div>


</template>
