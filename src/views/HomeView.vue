<script setup>
  import { ref } from 'vue';
  import MealHeader from '@/components/MealHeader.vue';
  import Footer from '@/components/FooterView.vue';

  import MealsByIngredient from '@/components/MealsByIngredient.vue';
  import MealsByCategories from '@/components/MealsByCategories.vue';
  import MealByArea from '@/components/MealByArea.vue';

  import { ChevronDownIcon } from '@heroicons/vue/16/solid'
  import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/vue/20/solid'


  const tabs = ref([
    { name: "By Category", key: "category", current: true },
    { name: "By Area", key: "area", current: false },
    { name: "By Ingredients", key: "ingredient", current: false },
  ])

  const setActiveTab = (tabKey) => {
    tabs.value = tabs.value.map((tab) => ({
      ...tab,
      current: tab.key === tabKey,
    }))
  }
</script>
<template>
  <div class="px-4 sm:px-6 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col w-full max-w-full lg:max-w-[960px] flex-1">
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
              placeholder="Search for recipes or ingredients"
              class="form-input flex w-full min-w-0 flex-1 overflow-hidden rounded-xl text-[#181411] bg-[#f4f2f0] h-full placeholder:text-[#897461] px-4 rounded-l-none text-base focus:outline-none"
            />
          </div>
        </label>
      </div>

      <!-- Desktop Tabs -->
      <div class="hidden sm:block">
        <div class="border-b border-gray-200 dark:border-white/10">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              v-for="tab in tabs"
              :key="tab.key"
              href="#"
              @click.prevent="setActiveTab(tab.key)"
              :class="[
                tab.current
                  ? 'border-[#d57d1f] text-[#d57d1f] dark:border-[#d57d1f] dark:text-[#d57d1f]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300',
                'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium'
              ]"
            >
              <span>{{ tab.name }}</span>
            </a>
          </nav>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 p-2">
        <MealsByCategories />
        <MealByArea />
      </div>

      <div>
        <MealsByIngredient />
      </div>

      <div>
        <!-- Mobile Select -->
        <div class="grid grid-cols-1 sm:hidden">
        <select
          aria-label="Select a tab"
          class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
          @change="setActiveTab($event.target.value)"
        >
          <option
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.name"
            :selected="tab.current"
          >
            {{ tab.name }}
          </option>
        </select>
        <ChevronDownIcon
          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
          aria-hidden="true"
        />
        </div>
      </div>

    </div>
  </div>


</template>
