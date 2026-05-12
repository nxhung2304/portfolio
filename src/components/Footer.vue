<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ currentYear }} Hung Nguyen. {{ t('footer.rightsReserved') }}
        </p>

        <div class="flex items-center gap-6">
          <a
            href="https://github.com/nxhung2304"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:mongtamquoc2015@gmail.com"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Email
          </a>
          <a
            href="tel:+84344445353"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            +84 344 445 353
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NAV_LINKS } from '../constants/nav'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>
