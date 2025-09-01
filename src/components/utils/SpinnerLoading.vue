<script setup></script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
    <div class="spinner w-20 h-20 border-8 border-gray-200 border-t-[var(--color-custom-orange)] rounded-full animate-spin-custom mb-5"></div>
    <p class="text-xl font-bold text-[var(--color-custom-orange)]">Loading...</p>
  </div>
</template>
<style scoped>
  @keyframes spin {
    to {
        transform: rotate(360deg);
    }
  }
  .animate-spin-custom {
      animation: spin 1s ease-in-out infinite;
  }
</style>
