<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
    <!-- Back Button -->
    <router-link 
      to="/projects" 
      class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
    >
      <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
      Back to projects
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
    <div v-else-if="error || !project" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <span aria-hidden="true">⚠️</span>
      </div>
      <h2 class="text-2xl font-bold mb-2">Project not found</h2>
      <p class="text-gray-600 mb-8">The project you're looking for doesn't exist or has been moved.</p>
      <router-link 
        to="/projects"
        class="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-all font-medium inline-block"
      >
        View all projects
      </router-link>
    </div>

    <!-- Content -->
    <article v-else class="fade-in">
      <header class="mb-12">
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium"
          >
            {{ tag }}
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{{ project.title }}</h1>
        <p class="text-xl text-gray-500 mb-8">{{ project.description }}</p>
        
        <div class="flex items-center gap-6 text-sm text-gray-400">
          <span v-if="project.created_at">
            {{ new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
          </span>
          <div class="flex gap-4">
            <a 
              v-if="project.github_url" 
              :href="project.github_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              GitHub ↗
            </a>
            <a 
              v-if="project.demo_url" 
              :href="project.demo_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              Live Demo ↗
            </a>
          </div>
        </div>
      </header>

      <!-- Thumbnail -->
      <div v-if="project.thumbnail_url" class="mb-12 overflow-hidden rounded-2xl border border-gray-100">
        <img 
          :src="project.thumbnail_url" 
          :alt="project.title"
          class="w-full h-auto object-cover aspect-video"
        />
      </div>

      <!-- Markdown Content -->
      <div 
        class="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-2xl"
        v-html="renderedContent"
      ></div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import MarkdownIt from 'markdown-it'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/database.types'

const route = useRoute()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<any>(null)

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
    project.value = data
  } catch (e) {
    console.error('Error fetching project:', e)
    error.value = e
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
