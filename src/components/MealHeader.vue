<script setup>
  import { reactive, ref } from 'vue';
  import router from '@/router';
  import axios from 'axios';
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    },
    backBtn: {
      type: Boolean
    }
  });
  let showClose = ref()

  const filterForm = reactive({ area: '', category: '' })
  let config = {
      method: 'get',
      url: ''
  };

  const getCategory = () => {
    config.url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    axios.request(config)
      .then((response) => {
        if(response.data.categories){
          response.data.categories;
          filters.category = response.data.categories.map(category => ({
            value: category.strCategory,
            label: category.strCategory,
            checked: false,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getArea = () => {
    config.url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    axios.request(config)
      .then((response) => {
        if(response.data.meals){
          response.data.meals;
          filters.area = response.data.meals.map(area => ({
            value: area.strArea,
            label: area.strArea,
            checked: false,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const showAction = () => {
   return showClose.value = (showClose.value) ? false : true;
  }
  const getSelectedFilter = async () => {
    if(filterForm.area == '' && filterForm.category == ''){
      alert("Filter can't be empty!");
    }else if(filterForm.area){
      router.push(`/filters/area/meal/${filterForm.area}`);
    }else if(filterForm.category){
      console.log(filterForm.category)
      router.push(`/filters/category/meal/${filterForm.category}`);
    }
  }
  const filters = reactive({
    area: [],
    category: [],
  })
  const backToPage = () => {
    router.go(-1);
  }
</script>
<template>
  <div class="mt-10">
    <button @click="backToPage" type="button" v-if="backBtn">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
      </svg>
    </button>
  </div>
  <div class="flex flex-col lg:flex-row items-center justify-between border-b border-[#c5a1a1] pb-8 pt-6 gap-y-5">
    <h1 class="text-4xl font-bold tracking-tight text-[#d57d1f]">{{ props.pageTitle }}</h1>
    <form @submit.prevent="getSelectedFilter" method="post">
      <div class="flex items-center gap-3">
        <button v-if="showClose" type="submit" class="inline-flex w-full justify-center rounded-md bg-[#d57d1f] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c28d55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
        <div class="relative inline-block text-left">
            <!-- Filters -->
          <Disclosure as="section" aria-labelledby="filter-heading" class="grid items-center">
              <h2 id="filter-heading" class="sr-only">Filters</h2>
              <div class="relative col-start-1 row-start-1 py-4">
                <div class="mx-auto flex max-w-7xl space-x-6 divide-x divide-[#c5a1a1] text-sm">
                  <div @click="getCategory(), getArea(), showAction()">
                    <DisclosureButton class="group flex items-center font-medium text-white">
                      <svg class="mr-2 size-5 flex-none text-white" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" data-slot="icon">
                        <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clip-rule="evenodd" />
                      </svg>
                      Filters
                      <svg v-if="showClose" class="size-5 ml-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </DisclosureButton>
                  </div>
                </div>
              </div>
              <DisclosurePanel v-show="showClose" class="border-t border-gray-200 py-10 text bg-[#d4ac83] lg:absolute right-0 top-12 lg:w-[50rem] sm:w-[20rem] h-96 overflow-scroll overflow-x-hidden rounded z-50 shadow-md">
                <div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8 bg-[#2d2013 w-full">
                  <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                    <fieldset>
                      <legend class="block font-medium">Area</legend>
                      <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                        <div v-for="(option, optionIdx) in filters.area" :key="option.value" class="flex items-center text-base sm:text-sm">
                          <input v-model="filterForm.area" :id="`price-${optionIdx}`" name="filter" :value="option.value" type="radio" class="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                          <label :for="`price-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-900">{{ option.label }}</label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                    <fieldset>
                      <legend class="block font-medium">Category</legend>
                      <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                        <div v-for="(option, optionIdx) in filters.category" :key="option.value" class="flex items-center text-base sm:text-sm">
                          <input v-model="filterForm.category" :id="`category-${optionIdx}`" name="filter" :value="option.value" type="radio" class="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="option.checked" />
                          <label :for="`category-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-900">{{ option.label }}</label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </form>
  </div>
</template>
