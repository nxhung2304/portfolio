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
    class="flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold transition-all rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 group shadow-sm"
  >
    <!-- US Flag SVG (for English) -->
    <svg v-if="locale === 'en'" class="w-4 h-3 rounded-sm shadow-sm" viewBox="0 0 741 390">
      <path fill="#fff" d="M0 0h741v390H0z"/>
      <path fill="#b22234" d="M0 0h741v30H0zm0 60h741v30H0zm0 60h741v30H0zm0 60h741v30H0zm0 60h741v30H0zm0 60h741v30H0zm0 60h741v30H0z"/>
      <path fill="#3c3b6e" d="M0 0h296.4v210H0z"/>
      <g fill="#fff">
        <g id="s">
          <g id="p">
            <path id="t" d="M30 22l5.882 18.098-15.397-11.188h19.03l-15.397 11.188z"/>
            <use xlink:href="#t" y="42"/>
            <use xlink:href="#t" y="84"/>
            <use xlink:href="#t" y="126"/>
            <use xlink:href="#t" y="168"/>
          </g>
          <use xlink:href="#p" x="52.4" y="21"/>
        </g>
        <use xlink:href="#s" x="49.4"/>
        <use xlink:href="#s" x="98.8"/>
        <use xlink:href="#s" x="148.2"/>
        <use xlink:href="#s" x="197.6"/>
        <use xlink:href="#p" x="247"/>
      </g>
    </svg>

    <!-- VN Flag SVG (for Vietnamese) -->
    <svg v-else class="w-4 h-3 rounded-sm shadow-sm" viewBox="0 0 900 600">
      <rect width="900" height="600" fill="#da251d"/>
      <polygon fill="#ff0" points="450,110 486,220 602,220 508,289 544,399 450,331 356,399 392,289 298,220 414,220"/>
    </svg>

    <span class="group-hover:scale-110 transition-transform">
      {{ locale === 'en' ? 'EN' : 'VI' }}
    </span>
  </button>
</template>
