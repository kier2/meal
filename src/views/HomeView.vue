<script setup>
  import { ref } from 'vue';
  import MealsView from '@/components/MealsView.vue';
  import MealsByFilter from '@/components/MealsByFilter.vue';

  const activeFilter = ref({})
  const searchKeyword = ref()
  const searchData = ref({})


  const onFilterSelected = (filter) => {
    activeFilter.value = filter
    return activeFilter
  }

  const sanitizeSearch = () => {
    searchData.value.value = searchKeyword.value.trim()
    searchData.value.type = 'search'

    return searchData
  }

</script>
<template>
  <div class="flex flex-1 justify-center py-12 w-full">
    <div class="layout-content-container flex flex-col w-full max-w-full flex-1">
      <!-- Search Bar -->
      <div class="py-3 px-4 sm:px-0">
        <label class="flex flex-col min-w-40 h-12 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              class="text-[#897461] flex border-none bg-[#f4f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              v-model="searchKeyword"
              @keyup="sanitizeSearch"
              placeholder="Search for recipes or ingredients"
              class="form-input flex w-full min-w-0 flex-1 overflow-hidden rounded-xl text-[#897461] bg-[#f4f2f0] h-full placeholder:text-[#897461] px-4 rounded-l-none text-base focus:outline-none"
            />
          </div>
        </label>
      </div>

      <div class="grid md:grid-cols-3 gap-3 p-2">
        <MealsByFilter
          @filter-selected="onFilterSelected"
        />
      </div>

      <div>
        <MealsView
          :activeFilter="activeFilter"
          :search-meals="searchData"
        />
      </div>
    </div>
  </div>
</template>
