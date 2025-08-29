<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axios';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'


const mealByCategories = ref([])
const selected = ref(null)

const getMealByCategories = async () => {
  try {
    const response = await api.get(`/categories.php`)
    if (response.data.categories) {
      mealByCategories.value = response.data.categories
      // set default selection
      // selected.value = mealByCategories.value[0]
    }
  } catch (error) {
    console.error("Failed to fetch meals:", error)
  }
}

onMounted(() => {
  getMealByCategories()
})
</script>


<template>
  <div class="w-full">
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-medium text-[#181411]">
        <span class="sr-only">Category</span>
      </ListboxLabel>
      <div class="relative">
        <!-- Button -->
        <ListboxButton
          class="flex w-full cursor-pointer items-center justify-between rounded-md bg-[#f4f2f0] py-2 pl-3 pr-2 text-left text-[#181411] shadow-sm ring-1 ring-[#e0ddd9] focus:outline-none sm:text-sm">
          <span class="flex items-center gap-2">
            <img v-if="selected" :src="selected.strCategoryThumb" alt=""
              class="h-5 w-5 rounded-full bg-gray-200" />
            <span class="block truncate font-semibold">
              {{ selected?.strCategory || 'Category' }}
            </span>
          </span>
          <ChevronDownIcon class="h-5 w-5 text-[#181411]" aria-hidden="true" />
        </ListboxButton>

        <!-- Options -->
        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#f4f2f0] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption
              as="template"
              v-for="(meal, index) in mealByCategories"
              :key="index"
              :value="meal"
              v-slot="{ active, selected }"
            >
              <li
                :class="[active ? 'bg-[#e8e5e1]' : 'text-[#181411]', 'relative cursor-pointer select-none py-2 pl-3 pr-9']"
              >
                <div class="flex items-center">
                  <img :src="meal.strCategoryThumb" alt=""
                    class="size-16 rounded-full object-contain"
                    :class="{
                      'bg-white dark:bg-gray-800': index % 2 === 0,
                      'bg-gray-200 dark:bg-gray-600': index % 2 !== 0
                    }" />
                  <span
                  :class="[selected ? 'font-semibold' : '']"
                  class="ml-4 block">
                    {{ meal.strCategory }}
                  </span>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
