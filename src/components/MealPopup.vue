<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import api from '@/api/axios'

const props = defineProps({
  open: Boolean,
  mealSelected: String
})
const emit = defineEmits(['close'])

const mealDetails = ref(null)
const isLoading = ref(false)

watch(
  () => props.mealSelected,
  async (newMeal) => {
    if (newMeal) {
      isLoading.value = true
      try {
        const response = await api.get(`/search.php?s=${newMeal}`)
        mealDetails.value = response.data.meals?.[0] || null
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }
  }
)
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="emit('close')">
      <!-- Background overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
              <!-- Header -->
              <div class="flex justify-between items-start">
                <div>
                  <Dialog.Title class="text-2xl font-bold text-gray-900">
                    {{ mealDetails?.strMeal || 'Loading...' }}
                  </Dialog.Title>
                  <h3 class="font-semibold text-xl">{{ mealDetails?.strMeal }}</h3>
                  <p class="text-gray-600 mt-1 text-sm">
                    Category: {{ mealDetails?.strCategory || '-' }} | Area: {{ mealDetails?.strArea || '-' }}
                  </p>
                </div>
                <button
                  @click="emit('close')"
                  class="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <!-- Body -->
              <div class="mt-4">
                <div v-if="isLoading" class="text-center py-6">Loading...</div>
                <div v-else-if="mealDetails">
                  <img
                    :src="mealDetails.strMealThumb"
                    :alt="mealDetails.strMeal"
                    class="aspect-square rounded-lg object-cover h-auto"
                  />
                  <div class="mt-4 flex">
                    <div>
                      <strong>Ingredients:</strong>

                    </div>
                    <div>
                      <strong>Instructions:</strong>
                      <p class="mt-4 text-gray-700 whitespace-pre-line">
                        {{ mealDetails.strInstructions }}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
