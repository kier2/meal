<script setup>
  import { reactive, defineEmits } from 'vue';
  import router from '@/router';
  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    },
    backBtn: {
      type: Boolean
    }
  });

  const emits = defineEmits(['search']);

  const searchForm = reactive({ input: '' })

  const mealSearch = async () => {
    if(searchForm.input.length > 0){
      const param = searchForm.input.trim()
      const capitalizeParam = param.charAt(0).toUpperCase() + searchForm.input.slice(1)
      const targetRoute =  { name: 'area-view', params: { area_id: capitalizeParam } }
      const currentRoute = router.currentRoute.value;

      emits('search', capitalizeParam);
      searchForm.input = '';
      if (currentRoute.name !== targetRoute.name || currentRoute.params.area_id !== targetRoute.params.area_id) {
        await router.push(targetRoute); // Navigate to the new route
      }else{
        await router.replace(targetRoute);
      }
    }
  }
  const backToPage = () => {
    router.replace('/');
  }
</script>
<template>
  <div class="mt-24">
    <button @click="backToPage" type="button" v-if="backBtn">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
      </svg>
    </button>
  </div>
  <div class="flex flex-col lg:flex-row items-center justify-between border-b border-[#c5a1a1] pb-8 pt-6 gap-y-5">
    <h1 class="text-4xl font-bold tracking-tight text-[#d57d1f]">{{ props.pageTitle }}</h1>
    <div class="flex items-center">
      <div class="relative inline-block text-left">
        <form @submit.prevent="mealSearch">
          <div class="flex items-center gap-2">
            <input v-model="searchForm.input"
            type="text" name="search-meal" id="search-meal"
            class="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 capitalize"
            placeholder="Search">
            <button type="submit" class="block rounded-md bg-[#d57d1f] px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c5843e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
