<script setup>
import { RouterView } from 'vue-router'
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
</script>

<template>
  <HeaderView />
  <main class="mx-auto max-w-7xl mb-24 px-4 sm:px-6 lg:px-8">
    <RouterView />
  </main>
  <FooterView />
</template>
