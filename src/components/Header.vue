<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors">
          <span class="text-indigo-600">&lt;</span>Hung<span class="text-indigo-600">/&gt;</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
            active-class="text-indigo-600 bg-indigo-50"
            exact-active-class="text-indigo-600 bg-indigo-50"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <Navbar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import { NAV_LINKS } from '../constants/nav'
</script>
