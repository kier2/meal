<script setup></script>

<template>
  <div class="flex items-baseline justify-between border-b border-[#c5a1a1] pb-8 pt-24">
    <h1 class="text-4xl font-bold tracking-tight text-[#d57d1f]">Meals By Area</h1>

    <div class="flex items-center">
      <div class="relative inline-block text-left">
        <div>
          <button type="button" class="group inline-flex justify-center text-sm font-medium text-white hover:text-gray-300" id="menu-button">
            Sort
            <svg class="-mr-1 ml-1 h-5 w-5 shrink-0 text-white group-hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <!-- <div class="py-1" role="none">
            <a href="#" class="block px-4 py-2 text-sm font-medium text-gray-900" role="menuitem" tabindex="-1" id="menu-item-0">Area</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabindex="-1" id="menu-item-1">Categories</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabindex="-1" id="menu-item-2">Ingredients</a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
