<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Header -->
    <header class="mb-12">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p class="text-lg text-gray-600 max-w-2xl">
            Thoughts, tutorials and insights on software development, design and everything in between.
          </p>
        </div>
        
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            class="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>
    </header>

    <!-- Tag Cloud -->
    <div v-if="allTags.length > 0" class="flex flex-wrap items-center gap-2 mb-8">
      <button
        type="button"
        @click="selectedTags = []"
        :class="selectedTags.length === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
      >
        All Posts
      </button>

      <div class="h-4 w-px bg-gray-200 mx-1" />

      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        @click="toggleTag(tag)"
        :class="selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Active Filters -->
    <div v-if="selectedTags.length > 0" class="flex items-center gap-2 mb-6">
      <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Active Tags:</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in selectedTags"
          :key="tag"
          @click="toggleTag(tag)"
          class="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:bg-blue-100 transition-colors"
        >
          {{ tag }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
      />
    </div>

    <!-- Empty State / No Results -->
    <div v-else-if="!isLoading" class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <div class="text-5xl mb-4">{{ debouncedQuery || selectedTags.length > 0 ? '🔍' : '📭' }}</div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">
        {{ debouncedQuery || selectedTags.length > 0 ? 'No results found' : 'No posts yet' }}
      </h3>
      <p class="text-gray-500">
        {{ debouncedQuery || selectedTags.length > 0 ? "We couldn't find any posts matching your criteria" : 'Check back later for new content!' }}
      </p>
      <button 
        v-if="debouncedQuery || selectedTags.length > 0"
        @click="clearFilters"
        class="mt-6 text-blue-500 font-medium hover:underline"
      >
        Clear all filters
      </button>
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/database.types'

const posts = ref<Post[]>([])
const isLoading = ref(true)
const hasMore = ref(false)
const page = ref(0)
const pageSize = 6

const searchQuery = ref('')
const debouncedQuery = ref('')
const selectedTags = ref<string[]>([])
const allTags = ref<string[]>([])
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const fetchTags = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('tags')
      .eq('published', true)
    
    if (error) throw error
    
    if (data) {
      const tags = data.flatMap(post => post.tags || [])
      allTags.value = [...new Set(tags)].sort()
    }
  } catch (error) {
    console.error('Error fetching tags:', error)
  }
}

const fetchPosts = async () => {
  isLoading.value = true
  const from = page.value * pageSize
  const to = from + pageSize - 1

  try {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true)

    if (debouncedQuery.value) {
      query = query.or(`title.ilike.%${debouncedQuery.value}%,excerpt.ilike.%${debouncedQuery.value}%`)
    }

    if (selectedTags.value.length > 0) {
      // Use contains for AND logic (must have all selected tags)
      query = query.contains('tags', selectedTags.value)
    }

    const { data, count, error } = await query
      .order('published_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    if (data) {
      if (page.value === 0) {
        posts.value = data
      } else {
        posts.value = [...posts.value, ...data]
      }
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

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  debouncedQuery.value = ''
  selectedTags.value = []
}

watch(selectedTags, () => {
  page.value = 0
  fetchPosts()
}, { deep: true })

watch(searchQuery, (newQuery) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedQuery.value = newQuery
    page.value = 0
    fetchPosts()
  }, 500)
})

onMounted(() => {
  fetchTags()
  fetchPosts()
})
</script>
