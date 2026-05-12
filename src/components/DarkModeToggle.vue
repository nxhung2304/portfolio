<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from '../composables/useDarkMode'

const { t } = useI18n()
const { isDark, init, toggle } = useDarkMode()

onMounted(() => {
  init()
})
</script>

<template>
  <button
    @click="toggle"
    class="flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold transition-all rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400 dark:hover:bg-gray-800 group shadow-sm"
    :aria-label="isDark ? t('common.switchToLight') : t('common.switchToDark')"
  >
    <!-- Sun Icon (for light mode) -->
    <svg
      v-if="isDark"
      class="w-4 h-4 group-hover:scale-110 transition-transform"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    </svg>

    <!-- Moon Icon (for dark mode) -->
    <svg
      v-else
      class="w-4 h-4 group-hover:scale-110 transition-transform"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>

    <span class="hidden sm:inline">
      {{ isDark ? t('common.dark') : t('common.light') }}
    </span>
  </button>
</template>
