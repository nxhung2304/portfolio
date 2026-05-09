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
    class="px-2 py-1 text-sm font-medium transition-colors rounded-md hover:bg-white/10 text-white/80 hover:text-white border border-white/20"
  >
    {{ locale.toUpperCase() }}
  </button>
</template>
