<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/api/axios';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'

import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const emit = defineEmits(['filter-selected'])

const mealByCategories = ref([])
const mealByArea = ref([])
const mealByIngredients = ref([])

const selectedCat = ref(null)
const selectedArea = ref(null)
const selectedIng = ref(null)

watch(selectedCat, (val) => {
  if (val) {
    selectedArea.value = null
    selectedIng.value = null
    emit('filter-selected', { type: 'category', value: val.strCategory })
  }
})

watch(selectedArea, (val) => {
  if (val) {
    selectedCat.value = null
    selectedIng.value = null
    emit('filter-selected', { type: 'area', value: val.strArea })
  }
})

watch(selectedIng, (val) => {
  if (val) {
    selectedCat.value = null
    selectedArea.value = null
    emit('filter-selected', { type: 'ingredient', value: val.strIngredient })
  }
})

// ---- API calls ----
const getMealByCategories = async () => {
  try {
    const response = await api.get(`/categories.php`)
    if (response.data.categories) {
      mealByCategories.value = response.data.categories
    }
  } catch (error) {
    console.error("Failed to fetch meals:", error)
  }
}

const getMealByArea = async () => {
  try {
    const response = await api.get(`/list.php?a=list`)
    if (response.data.meals) {
      mealByArea.value = response.data.meals
    }
  } catch (error) {
    console.error("Failed to fetch meals:", error)
  }
}

const getMealByIngredient = async () => {
  try {
    const response = await api.get(`/list.php?i=list`)
    if (response.data.meals) {
      mealByIngredients.value = response.data.meals
    }
  } catch (error) {
    console.error("Failed to fetch meals:", error)
  }
}

onMounted(() => {
  getMealByCategories()
  getMealByArea()
  getMealByIngredient()
})
</script>

<template>
  <!-- Category Filter -->
  <div class="w-full">
      <Listbox as="div" v-model="selectedCat">
        <ListboxLabel class="block text-sm font-medium text-[#181411]">
          <span class="sr-only">Category</span>
        </ListboxLabel>
        <div class="relative">
          <ListboxButton
            class="flex w-full cursor-pointer items-center justify-between rounded-md bg-[#f4f2f0] py-2 pl-3 pr-2 text-left text-[#181411] shadow-sm ring-1 ring-[#e0ddd9] focus:outline-none sm:text-sm"
          >
            <span class="flex items-center gap-2">
              <img
                v-if="selectedCat"
                :src="selectedCat.strCategoryThumb"
                alt=""
                class="h-5 w-5 rounded-full bg-gray-200"
              />
              <span class="block truncate font-semibold text-[#897461]">
                {{ selectedCat?.strCategory || 'Category' }}
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
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#f4f2f0] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
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
                    <img
                      :src="meal.strCategoryThumb"
                      alt=""
                      class="size-16 rounded-full object-contain"
                    />
                    <span
                      :class="[selected ? 'font-semibold' : '']"
                      class="ml-4 block"
                    >
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

  <!-- Area Filter -->
  <div class="w-full">
      <Listbox as="div" v-model="selectedArea">
        <ListboxLabel class="block text-sm font-medium text-[#181411]">
          <span class="sr-only">Area</span>
        </ListboxLabel>
        <div class="relative">
          <ListboxButton
            class="flex w-full cursor-pointer items-center justify-between rounded-md bg-[#f4f2f0] py-2 pl-3 pr-2 text-left text-[#181411] shadow-sm ring-1 ring-[#e0ddd9] focus:outline-none sm:text-sm"
          >
            <span class="flex items-center gap-2">
              <span class="block truncate font-semibold text-[#897461]">
                {{ selectedArea?.strArea || 'Area' }}
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
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#f4f2f0] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="(meal, index) in mealByArea"
                :key="index"
                :value="meal"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[active ? 'bg-[#e8e5e1]' : 'text-[#181411]', 'relative cursor-pointer select-none py-2 pl-3 pr-9']"
                >
                  <span
                    :class="[selected ? 'font-semibold' : '']"
                    class="ml-1 block"
                  >
                    {{ meal.strArea }}
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
  </div>

  <!-- Ingredient Filter -->
  <div class="w-full">

    <Listbox as="div" v-model="selectedIng">
      <ListboxLabel class="block text-sm font-medium text-[#181411]">
        <span class="sr-only">Ingredient</span>
      </ListboxLabel>
      <div class="relative">
        <ListboxButton
          class="flex w-full cursor-pointer items-center justify-between rounded-md bg-[#f4f2f0] py-2 pl-3 pr-2 text-left text-[#181411] shadow-sm ring-1 ring-[#e0ddd9] focus:outline-none sm:text-sm"
        >
          <span class="flex items-center gap-2">
            <span class="block truncate font-semibold text-[#897461]">
              {{ selectedIng?.strIngredient || 'Ingredient' }}
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
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#f4f2f0] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="(meal, index) in mealByIngredients"
              :key="index"
              :value="meal"
              v-slot="{ active, selected }"
            >
              <li
                :class="[active ? 'bg-[#e8e5e1]' : 'text-[#181411]', 'relative cursor-pointer select-none py-2 pl-3 pr-9']"
              >
                <span
                  :class="[selected ? 'font-semibold' : '']"
                  class="ml-1 block"
                >
                  {{ meal.strIngredient }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

