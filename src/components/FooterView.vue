<script setup>
  import { ref } from 'vue';
  const currentYear = ref();
  currentYear.value = new Date().getFullYear();
</script>
<template >
  <footer class="bg-[#23180d] bottom">
    <div class="mx-auto w-full overflow-hidden px-6 py-10 sm:py-10 lg:px-10">
      <p class="text-center text-sm/6 text-white mb-3">© {{ currentYear }} <a class="text-[#d57d1f]" href="https://kieren-portfolio.netlify.app/">kieren-portfolio.netlify.app</a></p>
      <p class="text-center text-sm/6 text-white">Powered by <a class="text-[#d57d1f]" href="https://www.themealdb.com/api.php">TheMealDB</a> API</p>
    </div>
  </footer>
</template>
