<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const mealByFilter = ref([]);
const filter = ref('');

const fetchMeals = (type, filterValue) => {
  let url;
  if (type === 'area') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterValue}`;
  } else if (type === 'category') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterValue}`;
  }

  if (filterValue) {
    axios
      .get(url)
      .then((response) => {
        mealByFilter.value = response.data.meals || [];
        filter.value = filterValue;
      })
      .catch((error) => {
        console.error(error);
        router.push({ name: 'not-found' });
      });
  }
};

onMounted(() => {
  const type = route.params.area_id ? 'area' : 'category';
  const filterValue = route.params.area_id || route.params.category_id;
  fetchMeals(type, filterValue);
});


watch(
  () => route.params, // Watch changes in route parameters
  (newParams) => {
    const type = newParams.area_id ? 'area' : 'category';
    const filterValue = newParams.area_id || newParams.category_id;
    fetchMeals(type, filterValue);
  }
);
</script>

<template>
   <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
    <div
      v-for="meal in mealByFilter"
      :key="meal.idMeal"
      class="rounded-md cursor-pointer w-full h-full bg-white"
    >
      <div>
        <img
          class="w-full h-auto object-cover rounded-t-md"
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
        />
      </div>
      <div class="p-4 flex justify-center rounded-b-md">
        <div class="text-center">
          <h4 class="text-[#d57d1f] font-semibold text-xl mb-6">
            {{ meal.strMeal }}
          </h4>

          <RouterLink :to="`/area/meal/${meal.idMeal}`"
          class="mt-4 text-sm font-semibold text-gray-600 flex items-center justify-center mb-2"
          >
            <span class="mr-1">
              View Recipe
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="text-gray-900 size-4 font-semibold">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
