<template>
  <router-link
    :to="{ name: 'project-detail', params: { slug: project.slug } }"
    class="group block p-4 rounded-2xl border bg-white dark:bg-gray-900 hover:-translate-y-1 transition-all duration-300"
    :class="[
      project.featured 
        ? 'border-blue-100 dark:border-blue-900/50 ring-4 ring-blue-50/30 dark:ring-blue-900/20' 
        : 'border-gray-200 dark:border-gray-800'
    ]"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-video mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
      <div 
        v-if="project.featured"
        class="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm"
      >
        Featured
      </div>
      <img
        v-if="project.thumbnail_url"
        :src="project.thumbnail_url"
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-300 dark:text-gray-600"
      >
        <span class="text-4xl" aria-hidden="true">🖼️</span>
      </div>
    </div>

    <!-- Content -->
    <div>
      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors duration-300 mb-2">
        {{ project.title }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-auto">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Project } from '../lib/database.types'

defineProps<{
  project: Project
}>()
</script>
