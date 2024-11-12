<script setup>
  import router from '@/router';
  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    }
  });

  const backToPage = () => {
    router.go('-1');
  }
</script>
<template>
  <div class="mt-24">
    <button @click="backToPage" type="button">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
      </svg>
    </button>

  </div>
  <div class="flex items-center justify-between border-b border-[#c5a1a1] pb-8 pt-6">
    <h1 class="text-4xl font-bold tracking-tight text-[#d57d1f]">{{ props.pageTitle }}</h1>

    <!-- <div class="flex items-center">
      <div class="relative inline-block text-left">
        <input
        type="text" name="search-meal" id="search-meal"
        class="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        placeholder="Search">
      </div>
    </div> -->
  </div>
</template>
