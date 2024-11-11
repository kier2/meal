<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const areaId = route.params.area_id;
  const mealByArea = ref([]);
  // console.log(areaId)

  const getMealByArea = () => {
    let config = {
      method: 'get',
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`,
    };
    if(areaId){
      axios.request(config)
      .then((response) => {
        mealByArea.value = response.data.meals;
        console.log(response.data.meals)
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return mealByArea;
  }
  onMounted(() => {
    getMealByArea();
  });

</script>

<template>
  <div class="grid grid-cols-5 gap-3 p-8">
    <div v-for="meal in mealByArea" :key="meal.id">
      <div>
        <img :src="meal.strMealThumb" alt="">
      </div>
      <div class="p-5">
        <div>
          <h4 class="text-[#d57d1f] font-semibold">{{ meal.strMeal }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
