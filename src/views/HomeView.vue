<script setup>
  import MealHeader from '@/components/MealHeader.vue';
  import Footer from '@/components/FooterView.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const router = useRouter();
  const redirectToArea = (area_id) => {
    area_id = area_id.target.dataset.area;
    router.push({name: 'area-view', params: { area_id } });
  }
  let config = {};
  const mealsByArea = ref('');

  const getMealsByArea = () => {
    config = {
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    };

    axios.request(config)
    .then((response) => {
      mealsByArea.value = response.data.meals;

    })
    .catch((error) => {
      console.log(error);
    });

    return mealsByArea;
  }
  onMounted(() => {
    getMealsByArea();
  });
</script>
<template>
  <MealHeader page-title="Meals By Area" />
  <section class="pb-24 pt-6">
    <div class="w-full mt-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
        <button @click="redirectToArea"
          v-for="area in mealsByArea" :data-area="area.strArea" :key="area.id"
          type="button"
          class="text-[#d57d1f] hover:bg-[#d57d1f] hover:text-white rounded-md border border-[#c5a1a1] p-4 font-semibold">
            {{ area.strArea }}
        </button>
      </div>
    </div>
  </section>
</template>
