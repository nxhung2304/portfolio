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
  <section ref="targetRef" class="py-12 border-t border-gray-100 dark:border-gray-800">
    <!-- Header -->
    <div 
      class="flex items-center justify-between mb-8 transition-all duration-700 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <h2 class="text-[18px] font-semibold text-gray-900 dark:text-white">Bài viết mới</h2>
      <RouterLink 
        to="/blog" 
        class="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        xem tất cả →
      </RouterLink>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-pulse"></div>
    </div>

    <!-- List -->
    <div 
      v-else-if="posts.length > 0" 
      class="border-[0.5px] border-gray-100 dark:border-gray-800 rounded-[14px] overflow-hidden bg-white dark:bg-gray-900 shadow-sm transition-all duration-700 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
      :style="{ transitionDelay: '100ms' }"
    >
      <div 
        v-for="(post, index) in posts" 
        :key="post.id"
        class="group transition-colors hover:bg-blue-50/30 dark:hover:bg-blue-900/10"
      >
        <RouterLink 
          :to="{ name: 'blog-detail', params: { slug: post.slug } }"
          class="flex items-center justify-between p-[18px_22px]"
          :class="[index !== posts.length - 1 ? 'border-b-[0.5px] border-gray-100 dark:border-gray-800' : '']"
        >
          <div class="flex-1 min-w-0 pr-4">
            <h3 class="text-[14px] font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate mb-1">
              {{ post.title }}
            </h3>
            <div class="flex items-center gap-2">
              <span 
                v-if="post.tags && post.tags[0]"
                class="text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
              >
                {{ post.tags[0] }}
              </span>
              <span class="text-[11px] text-gray-400 dark:text-gray-500">
                {{ calculateReadingTime(post.content) }} đọc
              </span>
            </div>
          </div>
          <time class="text-[12px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {{ formatDate(post.published_at) }}
          </time>
        </RouterLink>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      Chưa có bài viết nào.
    </div>
  </section>
</template>

<style scoped>
/* Ensure 0.5px border feel */
.border-\[0\.5px\] {
  border-width: 0.5px;
}
.border-b-\[0\.5px\] {
  border-bottom-width: 0.5px;
}
</style>
