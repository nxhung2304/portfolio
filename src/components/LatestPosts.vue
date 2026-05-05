<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/database.types'
import { useScrollReveal } from '../composables/useScrollReveal'

const posts = ref<Post[]>([])
const loading = ref(true)

const { targetRef, isVisible } = useScrollReveal()

const fetchLatestPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) throw error
    posts.value = data || []
  } catch (error) {
    console.error('Error fetching latest posts:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

// Simple estimate: 200 words per minute
const calculateReadingTime = (content: string | null) => {
  if (!content) return '1 min'
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

onMounted(() => {
  fetchLatestPosts()
})
</script>

<template>
  <section ref="targetRef" class="py-12 border-t border-gray-100 dark:border-gray-800">
    <div 
      class="transition-all duration-1000 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
        <RouterLink 
          to="/blog" 
          class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
        >
          View all 
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </RouterLink>
      </div>

      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
      </div>

      <div v-else-if="posts.length > 0" class="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
        <div 
          v-for="(post, index) in posts" 
          :key="post.id"
          :class="[
            'group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50',
            index !== posts.length - 1 ? 'border-bottom border-gray-100 dark:border-gray-800' : ''
          ]"
        >
          <RouterLink 
            :to="{ name: 'blog-detail', params: { slug: post.slug } }"
            class="flex items-center justify-between p-6"
          >
            <div class="flex-1 min-w-0 pr-4">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate mb-1">
                {{ post.title }}
              </h3>
              <div class="flex items-center gap-3">
                <span 
                  v-if="post.tags && post.tags[0]"
                  class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                >
                  {{ post.tags[0] }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ calculateReadingTime(post.content) }} read
                </span>
              </div>
            </div>
            <time class="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
              {{ formatDate(post.published_at) }}
            </time>
          </RouterLink>
          <div v-if="index !== posts.length - 1" class="mx-6 border-b border-gray-100 dark:border-gray-800"></div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No posts found.
      </div>
    </div>
  </section>
</template>
