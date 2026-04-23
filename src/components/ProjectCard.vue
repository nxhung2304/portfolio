<template>
  <router-link
    :to="{ name: 'project-detail', params: { slug: project.slug } }"
    class="group block p-4 rounded-2xl border border-gray-200 bg-white hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-video mb-4 overflow-hidden rounded-xl bg-gray-100">
      <img
        v-if="project.thumbnail_url"
        :src="project.thumbnail_url"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-300"
      >
        <span class="text-4xl" aria-hidden="true">🖼️</span>
      </div>
    </div>

    <!-- Content -->
    <div>
      <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-500 transition-colors duration-300 mb-2">
        {{ project.title }}
      </h3>
      <p class="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-auto">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300"
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
