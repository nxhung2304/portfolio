<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <span class="text-indigo-600">&lt;</span>Hung<span class="text-indigo-600">/&gt;</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            active-class="text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/50"
            exact-active-class="text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/50"
          >
            {{ t(link.key) }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-2">
          <Navbar />
          <LanguageToggle />
          <DarkModeToggle />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Navbar from './Navbar.vue'
import LanguageToggle from './LanguageToggle.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { NAV_LINKS } from '../constants/nav'

const { t } = useI18n()
</script>
