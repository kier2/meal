<script setup>
  import MealsByArea from '@/components/MealsByArea.vue';
  import MealHeader from '@/components/MealHeader.vue';
</script>

<template>
  <main>
    <div>
      <div>
        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MealHeader />
          <section class="pb-24 pt-6">
            <div class="mt-6">
              <div class="w-full">
                <div>
                  <MealsByArea />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </main>
</template>
