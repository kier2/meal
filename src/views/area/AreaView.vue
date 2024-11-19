<script setup>
  import MealHeader from '@/components/MealHeader.vue';
  import MealByArea from '@/components/MealByArea.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const mealsLabel = route.params.area_id
  
</script>
<template>
  <MealHeader @search="searchResult" :page-title="`${mealsLabel} Meals`" back-btn />
  <MealByArea />
</template>
