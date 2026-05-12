<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
    <!-- Back Button -->
    <router-link 
      to="/projects" 
      class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors group"
    >
      <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
      {{ t('projects.detail.back') }}
    </router-link>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-24 mb-6"></div>
      <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
      <div class="h-6 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mb-8"></div>
      <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl mb-12"></div>
      <div class="space-y-4">
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Error/Not Found State -->
    <div v-else-if="error || !project" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 mb-4">
        <span aria-hidden="true">⚠️</span>
      </div>
      <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{{ t('projects.detail.notFound') }}</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">{{ t('projects.detail.notFoundDesc') }}</p>
      <router-link 
        to="/projects"
        class="px-6 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-all font-medium inline-block"
      >
        {{ t('projects.detail.viewAll') }}
      </router-link>
    </div>

    <!-- Content -->
    <article v-else class="fade-in">
      <header class="mb-12">
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium"
          >
            {{ tag }}
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">{{ project.title }}</h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-8">{{ project.description }}</p>
        
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 text-sm">
          <span v-if="project.created_at" class="text-gray-400 dark:text-gray-500">
            {{ new Date(project.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long' }) }}
          </span>
          <div class="flex flex-wrap gap-4">
            <a 
              v-if="project.github_url" 
              :href="project.github_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-900 dark:hover:border-gray-100 transition-all font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path></svg>
              {{ t('projects.detail.github') }}
            </a>
            <a 
              v-if="project.demo_url" 
              :href="project.demo_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-all font-medium shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              {{ t('projects.detail.demo') }}
            </a>
          </div>
        </div>
      </header>

      <!-- Thumbnail -->
      <div v-if="project.thumbnail_url" class="mb-12 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <img 
          :src="project.thumbnail_url" 
          :alt="project.title"
          class="w-full h-auto object-cover aspect-video"
          loading="lazy"
        />
      </div>

      <!-- Markdown Content -->
      <div 
        class="prose prose-gray dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-2xl mb-16"
        v-html="renderedContent"
      ></div>

      <!-- Social Share Section -->
      <footer class="pt-8 border-t border-gray-100 dark:border-gray-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <SocialShare v-if="project" :title="project.title" :url="currentUrl" />
          <router-link to="/projects" class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            {{ t('projects.detail.exploreMore') }}
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
import { useI18n } from 'vue-i18n'
import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/database.types'
import SocialShare from '../components/SocialShare.vue'

const route = useRoute()
const { t, locale } = useI18n()
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

const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)

const currentUrl = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : ''
})

const renderedContent = computed(() => {
  return project.value?.content ? md.render(project.value.content) : ''
})

// Update head metadata when project data is available
useHead(computed(() => ({
  title: project.value ? `${project.value.title} | Nguyen Hung` : 'Project Details | Nguyen Hung',
  meta: [
    { name: 'description', content: project.value?.description || 'Project details' },
    { property: 'og:title', content: project.value ? `${project.value.title} | Nguyen Hung` : 'Project Details' },
    { property: 'og:description', content: project.value?.description || 'Project details' },
    { property: 'og:image', content: project.value?.thumbnail_url || '' },
    { property: 'og:url', content: currentUrl.value },
  ],
})))

const fetchProject = async () => {
  try {
    loading.value = true
    const slug = route.params.slug as string
    
    const { data, error: supabaseError } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (supabaseError) throw supabaseError
    project.value = data as Project
    } catch (e) {
    console.error('Error fetching project:', e)
    error.value = e as Error
    } finally {

    loading.value = false
  }
}

onMounted(fetchProject)
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
