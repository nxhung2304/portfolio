<template>
  <router-link
    :to="{ name: 'blog-detail', params: { slug: post.slug } }"
    class="group block p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Cover Image -->
    <div class="relative aspect-video mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
      <img
        v-if="post.cover_image_url"
        :src="post.cover_image_url"
        :alt="post.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-300 dark:text-gray-600"
      >
        <span class="text-4xl" aria-hidden="true">✍️</span>
      </div>
    </div>

    <!-- Content -->
    <div>
      <div class="flex items-center gap-2 mb-2">
        <time :datetime="post.published_at || post.created_at" class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {{ formatDate(post.published_at || post.created_at) }}
        </time>
      </div>

      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors duration-300 mb-2">
        {{ post.title }}
      </h3>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
        {{ post.excerpt }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-auto">
        <span
          v-for="tag in post.tags"
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
import type { Post } from '../lib/database.types'

defineProps<{
  post: Post
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
