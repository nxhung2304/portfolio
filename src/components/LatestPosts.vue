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
      .limit(3) // Changed to 3 for 3-column layout

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
  const d = new Date(dateString)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short'
  })
}

const calculateReadingTime = (content: string | null) => {
  if (!content) return '1 phút'
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} phút`
}

onMounted(() => {
  fetchLatestPosts()
})
</script>

<template>
  <section ref="targetRef" class="py-20">
    <!-- Header -->
    <div 
      class="flex items-center justify-between mb-10 transition-all duration-700 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <div class="space-y-1">
        <h2 class="text-[20px] font-bold text-gray-900 dark:text-white">Bài viết mới nhất</h2>
        <p class="text-[13px] text-gray-500 dark:text-gray-400">Chia sẻ về công nghệ và kinh nghiệm lập trình</p>
      </div>
      <RouterLink 
        to="/blog" 
        class="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
      >
        Xem tất cả 
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </RouterLink>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-2xl animate-pulse"></div>
    </div>

    <!-- Grid Layout -->
    <div 
      v-else-if="posts.length > 0" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div 
        v-for="(post, i) in posts" 
        :key="post.id"
        class="transition-all duration-700 transform"
        :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
        :style="{ transitionDelay: `${(i + 1) * 100}ms` }"
      >
        <RouterLink 
          :to="{ name: 'blog-detail', params: { slug: post.slug } }"
          class="group block p-6 rounded-2xl border-[0.5px] border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50 hover:-translate-y-2 transition-all duration-300 h-full"
        >
          <div class="flex flex-col h-full">
            <div class="flex items-center justify-between mb-3">
              <span 
                v-if="post.tags && post.tags[0]"
                class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                {{ post.tags[0] }}
              </span>
              <time class="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                {{ formatDate(post.published_at) }}
              </time>
            </div>
            
            <h3 class="text-[15px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
              {{ post.title }}
            </h3>
            
            <p class="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
              {{ post.excerpt }}
            </p>

            <div class="mt-auto flex items-center gap-2">
              <span class="text-[11px] text-gray-400 dark:text-gray-500">
                {{ calculateReadingTime(post.content) }} đọc
              </span>
              <span class="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700"></span>
              <span class="text-[11px] font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Đọc tiếp →
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      Chưa có bài viết nào.
    </div>
  </section>
</template>

<style scoped>
.border-\[0\.5px\] {
  border-width: 0.5px;
}
</style>
