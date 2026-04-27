<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
    <!-- Back Button -->
    <router-link 
      to="/blog" 
      class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
    >
      <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
      Back to blog
    </router-link>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="h-4 bg-gray-100 rounded w-24 mb-6"></div>
      <div class="h-10 bg-gray-100 rounded w-3/4 mb-4"></div>
      <div class="h-6 bg-gray-100 rounded w-1/2 mb-8"></div>
      <div class="aspect-video bg-gray-100 rounded-2xl mb-12"></div>
      <div class="space-y-4">
        <div class="h-4 bg-gray-100 rounded w-full"></div>
        <div class="h-4 bg-gray-100 rounded w-full"></div>
        <div class="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Error/Not Found State -->
    <div v-else-if="error || !post" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <span aria-hidden="true">⚠️</span>
      </div>
      <h2 class="text-2xl font-bold mb-2">Post not found</h2>
      <p class="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
      <router-link 
        to="/blog"
        class="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-all font-medium inline-block"
      >
        View all posts
      </router-link>
    </div>

    <!-- Content -->
    <article v-else class="fade-in">
      <header class="mb-12">
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium"
          >
            {{ tag }}
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{{ post.title }}</h1>
        <p class="text-xl text-gray-500 mb-8">{{ post.excerpt }}</p>
        
        <div class="flex items-center gap-6 text-sm text-gray-400">
          <span v-if="post.published_at">
            {{ new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
          <span v-else-if="post.created_at">
            {{ new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
        </div>
      </header>

      <!-- Cover Image -->
      <div v-if="post.cover_image_url" class="mb-12 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <img 
          :src="post.cover_image_url" 
          :alt="post.title"
          class="w-full h-auto object-cover aspect-video"
          loading="lazy"
        />
      </div>

      <!-- Markdown Content -->
      <div 
        class="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-2xl mb-16"
        v-html="renderedContent"
      ></div>

      <!-- Social Share Section -->
      <footer class="pt-8 border-t border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <span class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Share</span>
            <div class="flex gap-2">
              <button class="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-blue-500 hover:border-blue-100 hover:bg-blue-50 transition-all" title="Share on Twitter" @click="shareOnTwitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </button>
              <button class="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-blue-700 hover:border-blue-100 hover:bg-blue-50 transition-all" title="Share on LinkedIn" @click="shareOnLinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button class="p-2 rounded-full border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 hover:bg-gray-50 transition-all" title="Copy Link" @click="copyLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </button>
            </div>
          </div>
          <router-link to="/blog" class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Read more articles →
          </router-link>
        </div>
      </footer>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'
import { supabase } from '../lib/supabase'
import type { Post } from '../lib/database.types'

const route = useRoute()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// Add lazy loading to images in markdown
/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultImageRender = md.renderer.rules.image || function(tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: any) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.image = function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: any) {
  tokens[idx].attrPush(['loading', 'lazy'])
  return defaultImageRender(tokens, idx, options, env, self)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)

const renderedContent = computed(() => {
  return post.value?.content ? md.render(post.value.content) : ''
})

// Update head metadata when post data is available
useHead(computed(() => ({
  title: post.value ? `${post.value.title} | Blog | Nguyen Hung` : 'Blog Post | Nguyen Hung',
  meta: [
    { name: 'description', content: post.value?.excerpt || 'Read this blog post on Nguyen Hung\'s portfolio.' },
    { property: 'og:title', content: post.value ? `${post.value.title} | Blog | Nguyen Hung` : 'Blog Post' },
    { property: 'og:description', content: post.value?.excerpt || 'Read this blog post on Nguyen Hung\'s portfolio.' },
    { property: 'og:image', content: post.value?.cover_image_url || '' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})))

const fetchPost = async () => {
  try {
    loading.value = true
    const slug = route.params.slug as string
    
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (supabaseError) throw supabaseError
    post.value = data as Post
  } catch (e) {
    console.error('Error fetching post:', e)
    error.value = e as Error
  } finally {
    loading.value = false
  }
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = `Check out this post: ${post.value?.title}`
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('Link copied to clipboard!')
}

onMounted(fetchPost)
</script>

<script lang="ts">
export default {
  name: 'BlogDetail'
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom prose styles if needed */
:deep(.prose img) {
  margin-left: auto;
  margin-right: auto;
}
</style>
