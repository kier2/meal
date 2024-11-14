<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
  const route = useRoute();
  const mealParamId = route.params.meal_id;
  const mealById = ref();

  const backToPage = () => {
    router.go(-1);
  }
  const getMealById = (dataId) => {
    let config = {
      method: 'get',
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`,
    };
    if(dataId){
      axios.request(config)
      .then((response) => {
        mealById.value = response.data.meals;
        console.log(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return mealById;
  }
  onMounted(() => {
    if(mealParamId > 0){
      getMealById(mealParamId)
    }else {
      router.go(-1);
    }
  })
</script>

<template>
  <div class="mt-16">
    <button @click="backToPage" type="button">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
      </svg>
    </button>
  </div>

  <main class="mt-8">
    <div v-if="mealById">
      <h2 class="text-4xl font-semibold mb-4 text-white">{{ mealById[0].strMeal }}</h2>
      <div class="w-full overflow-hidden flex items-center bg-[#d57d1f]">
        <div>
          <img
          class=""
          :src="mealById[0].strMealThumb"
          alt="" />
        </div>
        <div class="text-white p-6 text-wrap">

          <div class="">
            <div class="bg-white w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#d57d1f]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
            </div>
          </div>

        </div>
      </div>

    </div>
  </main>

</template>
