<template>
  <Layout>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p class="text-lg text-gray-600 max-w-2xl">
          Thoughts, tutorials and insights on software development, design and everything in between.
        </p>
      </header>

      <!-- Blog Posts Grid -->
      <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post"
        />
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoading" class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <div class="text-5xl mb-4">📭</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
        <p class="text-gray-500">Check back later for new content!</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div v-for="i in pageSize" :key="i" class="animate-pulse">
          <div class="aspect-video bg-gray-200 rounded-xl mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div class="flex gap-2">
            <div class="h-6 bg-gray-200 rounded w-16"></div>
            <div class="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="mt-12 text-center">
        <button
          @click="loadMore"
          :disabled="isLoading"
          class="px-8 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Loading...' : 'Load More Posts' }}
        </button>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Layout from '../components/Layout.vue'
import BlogCard from '../components/BlogCard.vue'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/database.types'

const posts = ref<Post[]>([])
const isLoading = ref(true)
const hasMore = ref(false)
const page = ref(0)
const pageSize = 6

const fetchPosts = async () => {
  isLoading.value = true
  const from = page.value * pageSize
  const to = from + pageSize - 1

  try {
    const { data, count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    if (data) {
      posts.value = [...posts.value, ...data]
      hasMore.value = count ? posts.value.length < count : false
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  page.value++
  fetchPosts()
}

onMounted(() => {
  fetchPosts()
})
</script>
