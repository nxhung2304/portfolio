<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500">
          &copy; {{ currentYear }} Hung Nguyen. All rights reserved.
        </p>

        <nav class="flex items-center gap-6">
          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.to"
            :to="link.to"
            class="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NAV_LINKS } from '../constants/nav'

const currentYear = new Date().getFullYear()
</script>
