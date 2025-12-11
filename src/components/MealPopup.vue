<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import api from '@/api/axios'
import { MapPinIcon, ShareIcon, HeartIcon } from '@heroicons/vue/16/solid'
import { HeartIcon as HeartIconOutline  } from '@heroicons/vue/24/outline'

const props = defineProps({
  open: Boolean,
  mealSelected: String
})

const emit = defineEmits(['close']);

const mealDetails = ref(null);
const isLoading = ref(false);
const ingredients = ref([]);

const likedMeals = ref({});

const showShare = ref(false);
const currentUrl = window.location.href;

const toggleLike = (mealId, meal, mealImg) => {
  likedMeals.value[mealId] = !likedMeals.value[mealId];

  if(likedMeals.value[mealId]) {
    saveLikedMeal(mealId, meal, mealImg);
  } else{
    removeLikedMeal(mealId);
  }
};

const saveLikedMeal = async (mealId, meal, mealImg) => {
  let stored = JSON.parse(localStorage.getItem('mealData')) || [];

  const exists = stored.find((m) => m.mealId === mealId);
  if (!exists) {
    stored.push({ mealId, meal, mealImg });
    localStorage.setItem('mealData', JSON.stringify(stored));
  }
}
const removeLikedMeal = async (mealId) => {
  let stored = JSON.parse(localStorage.getItem('mealData')) || [];

  stored = stored.filter((m) => m.mealId !== mealId);
  localStorage.setItem('mealData', JSON.stringify(stored));
}

const isMealLiked = (mealId) => {
  const stored = JSON.parse(localStorage.getItem("mealData")) || [];
  return stored.some((m) => m.mealId === mealId);
};

watch(
  () => props.mealSelected,
  async (newMeal) => {
    if (newMeal) {
      isLoading.value = true
      try {
        const response = await api.get(`/search.php?s=${newMeal}`);
        const meal = response.data.meals?.[0] || null;
        // console.log(meal);
        mealDetails.value = meal;

        if (meal) {
          const ingArr = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingArr.push(`${measure} ${ingredient}`.trim());
            }
          }
          ingredients.value = ingArr;
          likedMeals.value[meal.idMeal] = isMealLiked(meal.idMeal);
        } else {
          ingredients.value = [];
        }
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
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
            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
              <!-- Header -->
              <div class="flex justify-between items-start relative">
                <!-- <div>
                  <Dialog.Title class="text-2xl font-bold text-gray-900">
                    {{ mealDetails?.strMeal || 'Loading...' }}
                  </Dialog.Title>
                </div> -->
                <div>

                </div>
                <button
                  @click="emit('close')"
                  class="text-gray-800 text-2xl font-bold fixed z-10 right-5 top-5 h-10 w-10 rounded-full bg-white/95 flex items-center justify-center backdrop-blur-sm"
                >
                  <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                </button>
              </div>

              <!-- Body -->
              <div>
                <div v-if="isLoading" class="text-center py-6">Loading...</div>
                <div v-else-if="mealDetails">
                  <div class="relative h-72 w-full">
                    <img alt="Katsu Curry" class="absolute h-full w-full object-cover rounded-t-2xl "
                      :src="mealDetails.strMealThumb"
                    />
                  </div>

                  <div class="mt-4 px-6 py-3">
                    <div class="flex md:items-center justify-between flex-col md:flex-row gap-4">
                      <div>
                        <h2 class="text-3xl font-semibold text-[#181511] tracking-tight">
                          {{ mealDetails?.strMeal }}
                        </h2>
                      </div>
                      <div class="flex items-center gap-3">
                        <!-- Save Recipe Button -->
                        <a
                          target="_blank"
                          :href="mealDetails.strSource"
                          class="flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl py-2 px-6 bg-[#ec9513] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                        >
                          <span class="truncate">View Source</span>
                        </a>

                        <!-- Share Dropdown -->
                        <div class="relative">
                          <!-- Trigger Button -->
                          <button
                            @click="showShare = !showShare"
                            class="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition text-gray-700"
                          >
                            <ShareIcon class="w-5 h-5" />
                          </button>

                          <!-- Popup Menu -->
                          <div
                            v-if="showShare"
                            class="absolute right-0 mt-2 flex gap-3 bg-white border border-gray-200 shadow-lg rounded-xl p-3 z-50"
                          >
                            <!-- Facebook -->
                            <a
                              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                              target="_blank"
                              class="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                              <i class="fab fa-facebook-f"></i>
                            </a>

                            <!-- Instagram -->
                            <a
                              href="https://www.instagram.com/"
                              target="_blank"
                              class="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                            >
                              <i class="fab fa-instagram"></i>
                            </a>

                            <!-- TikTok -->
                            <a
                              href="https://www.tiktok.com/upload"
                              target="_blank"
                              class="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
                            >
                              <i class="fab fa-tiktok"></i>
                            </a>

                            <!-- Gmail -->
                            <a
                              :href="`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent('Check this recipe!')}&body=${encodeURIComponent(currentUrl)}`"
                              target="_blank"
                              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              <i class="fas fa-envelope"></i>
                            </a>
                          </div>
                        </div>

                          <button
                          @click="toggleLike(mealDetails.idMeal, mealDetails.strMeal, mealDetails.strMealThumb)"
                          class="transition"
                          type="button"
                          >
                            <HeartIcon
                            v-if="likedMeals[mealDetails.idMeal]" class="size-7 text-[#e48a04]"
                            />
                            <HeartIconOutline
                            v-else class="size-7 text-gray-700"
                            />
                          </button>
                      </div>
                    </div>
                    <!-- Category + Area -->
                    <div class="flex items-center gap-3 mt-6 mb-6 justify-between">
                      <div class="flex flex-wrap items-center gap-3">
                        <!-- Category -->
                        <span
                          class="flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <!-- Fork & Knife -->
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 3v6a2 2 0 002 2h2v10m6-18v6m0 0a2 2 0 002 2h2v10m-4-18v6" />
                          </svg>
                          {{ mealDetails.strCategory }}
                        </span>

                        <!-- Area -->
                        <span
                          class="flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          <MapPinIcon class="size-4" />
                          {{ mealDetails.strArea }}
                        </span>
                      </div>
                      <div>
                        <!-- Tags -->
                        <div v-if="mealDetails.strTags">
                          <div class="flex flex-wrap gap-2 justify-between">
                            <span
                              v-for="(tag, index) in mealDetails.strTags.split(',')"
                              :key="index"
                              class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm"
                            >
                              #{{ tag.trim() }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="mealDetails.strYoutube" class="mt-6">
                      <div class="rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          class="w-full h-96 aspect-retro"
                          :src="mealDetails.strYoutube.replace('watch?v=', 'embed/')"
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                    <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 pb-3">
                      <!-- Ingredients (1/3 width) -->
                      <div class="lg:col-span-1 bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                        <h4 class="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#ec9513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          Ingredients
                        </h4>
                        <ul class="space-y-2 text-gray-700">
                          <li
                            v-for="(item, idx) in ingredients"
                            :key="idx"
                            class="flex items-center gap-2"
                          >
                            <span class="h-2 w-2 rounded-full bg-[#ec9513]"></span>
                            <span>{{ item }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- Instructions (2/3 width) -->
                      <div class="lg:col-span-2 bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                        <h4 class="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#ec9513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                          </svg>
                          Instructions
                        </h4>
                        <ol class="space-y-5">
                          <li
                            v-for="(step, index) in mealDetails.strInstructions.split('\n').filter(s => s.trim() !== '')"
                            :key="index"
                            class="flex items-start gap-3"
                          >
                            <span
                              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ec9513] text-white font-semibold shadow-sm"
                            >
                              {{ index + 1 }}
                            </span>
                            <p class="text-gray-700 leading-7">{{ step.trim() }}</p>
                          </li>
                        </ol>
                      </div>
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
