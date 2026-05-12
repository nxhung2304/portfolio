<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
