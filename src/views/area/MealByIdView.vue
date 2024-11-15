<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
  const route = useRoute();
  const mealParamId = route.params.meal_id;
  const mealById = ref();
  const ingredients = [];

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
        getMealIngredients(response.data.meals)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return mealById;
  }
  const getMealIngredients = (meals) => {
    for(let i = 1; i <= 20; i++) {
      const ingredient = meals[0][`strIngredient${i}`];
      const measure = meals[0][`strMeasure${i}`];

      if(ingredient && ingredient.trim()){
        ingredients.push({ ingredient, measure: measure ? measure.trim() : "" });
      }
    }
    return ingredients;
  }
  onMounted(() => {
    if(mealParamId > 0){
      getMealById(mealParamId)
      console.log(ingredients)
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
    <div v-if="mealById" class="mb-10">
      <div class="bg-white py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto flex max-w-2xl flex-col justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
            <div class="w-full lg:max-w-lg lg:flex-auto">
              <h2 class="text-pretty text-3xl font-semibold tracking-tight text-[#d57d1f] sm:text-4xl capitalize leading-8 mb-6">
                {{ mealById[0].strMeal }}
              </h2>
              <div class="mt-3 lg:gap-3 flex lg:items-center flex-col lg:flex-row">
                <div v-if="mealById[0].strTags"
                class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white py-2 text-sm font-semibold text-gray-600 focus:z-10">
                  <span class="font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-gray-600 mr-2">
                    <path fill-rule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                    Tags:
                  </span>

                  <span> {{ mealById[0].strTags.split(',').join(', ') }} </span>
                </div>
                <div v-if="mealById[0].strCategory"
                class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white py-2 text-sm font-semibold text-gray-600 focus:z-10">
                  <span class="font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-gray-600 mr-2">
                    <path fill-rule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                    Categories:
                  </span>
                  <span> {{ mealById[0].strCategory }} </span>
                </div>
              </div>
              <div class="gap-3 flex items-center">
                <RouterLink v-if="mealById[0].strArea" :to="`/area/${mealById[0].strArea}`"
                  class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white py-2 font-semibold text-gray-600 focus:z-10 text-sm">
                    <span class="font-bold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-gray-600 mr-2">
                      <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
                      </svg>
                      Area:
                    </span>
                    <span> {{ mealById[0].strArea }} </span>
                </RouterLink>
              </div>
              <img :src="mealById[0].strMealThumb" alt="" class="mt-8 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]">
            </div>
            <div class="w-full lg:max-w-xl lg:flex-auto">
              <ul class="-my-8 divide-y divide-gray-100">
                <li class="py-8">
                  <dl class="relative flex flex-wrap gap-x-3">
                    <dt class="sr-only">Role</dt>
                    <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                      <a href="#">
                        Ingredients & measurements
                      </a>
                    </dd>
                    <ul role="list" class="space-y-1 text-sm/6 text-gray-600 sm:mt-4 lg:columns-2 gap-10">
                      <li v-for="(item, i) in ingredients " :key="i" class="flex">
                        <strong class="mr-1 capitalize">{{ item.ingredient }}:</strong> {{ item.measure }}
                      </li>
                    </ul>
                  </dl>
                </li>
                <li class="py-8">
                  <dl class="relative flex flex-wrap gap-x-3">
                    <dt class="sr-only">Role</dt>
                    <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                      <a href="#">
                        Instructions
                      </a>
                    </dd>
                    <dd class="mt-2 w-full flex-none text-md text-gray-600 leading-7">
                      {{ mealById[0].strInstructions }}
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
