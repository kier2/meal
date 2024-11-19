<script setup>
import { useRoute } from 'vue-router';
import MealHeader from '@/components/MealHeader.vue';
import MealByFilters from '@/components/MealByFilters.vue';
import { onMounted, ref, watch } from 'vue';

const route = useRoute();
const filter = ref();
onMounted(() => {
  filter.value = route.params.category_id
})

watch(
  () => route.params.category_id,
    (newVal) => {
      filter.value = newVal;
    }
  );
</script>
<template>
  <MealHeader :page-title="`Meals by ${filter}`" back-btn />
  <MealByFilters />
</template>
