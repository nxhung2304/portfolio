<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'vi' : 'en'
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <button
    @click="toggleLanguage"
    class="px-2 py-1 text-xs font-bold transition-all rounded-md border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50"
  >
    {{ locale.toUpperCase() }}
  </button>
</template>
