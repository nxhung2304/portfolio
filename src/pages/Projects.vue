<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-8 py-12">
    <!-- Header -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">{{ t('projects.title') }}</h1>
      <p class="text-gray-500 dark:text-gray-400 max-w-2xl">
        {{ t('projects.subtitle') }}
      </p>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse">
        <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl mb-4" />
        <div class="h-6 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-4" />
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2" />
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6 mb-4" />
        <div class="flex gap-2">
          <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-12" />
          <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-12" />
          <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-12" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 mb-4">
        <span aria-hidden="true">⚠️</span>
      </div>
      <p class="text-gray-600 dark:text-gray-400 mb-6">{{ t('projects.error') }}</p>
      <button 
        type="button"
        @click="fetchProjects"
        class="px-5 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-all font-medium text-sm"
      >
        {{ t('projects.retry') }}
      </button>
    </div>

    <!-- Tag Filter -->
    <div v-if="!loading && !error && (uniqueTags.length > 0 || projects.some(p => p.featured))" class="flex flex-wrap items-center gap-2 mb-8">
      <button
        type="button"
        @click="activeTag = null; onlyFeatured = false"
        :class="activeTag === null && !onlyFeatured ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        {{ t('projects.filter.all') }}
      </button>

      <div class="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

      <button
        type="button"
        @click="onlyFeatured = !onlyFeatured; activeTag = null"
        :class="onlyFeatured ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'"
        class="px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5"
      >
        <span v-if="onlyFeatured">★</span>
        {{ t('projects.filter.featured') }}
      </button>

      <div class="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

      <button
        v-for="tag in uniqueTags"
        :key="tag"
        type="button"
        @click="activeTag = tag; onlyFeatured = false"
        :class="activeTag === tag ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Empty State: no projects in DB -->
    <div v-if="!loading && !error && projects.length === 0" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 mb-4">
        <span aria-hidden="true">🔍</span>
      </div>
      <p class="text-gray-500 dark:text-gray-400">{{ t('projects.empty') }}</p>
    </div>

    <!-- Empty State: no match for active filter -->
    <div v-if="!loading && !error && projects.length > 0 && filteredProjects.length === 0" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 mb-4">
        <span aria-hidden="true">🔍</span>
      </div>
      <p class="text-gray-500 dark:text-gray-400">
        {{ t('projects.noResults.text') }} 
        <span v-if="onlyFeatured">{{ t('projects.noResults.featured') }}</span>
        <span v-if="activeTag">{{ t('projects.noResults.withTag') }} <span class="font-medium text-gray-700 dark:text-gray-300">{{ activeTag }}</span></span>.
      </p>
      <button
        type="button"
        @click="activeTag = null; onlyFeatured = false"
        class="mt-4 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-all font-medium text-sm"
      >
        {{ t('projects.noResults.viewAll') }}
      </button>
    </div>

    <!-- Grid Layout -->
    <div v-if="!loading && !error && filteredProjects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import type { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/database.types'
import ProjectCard from '../components/ProjectCard.vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('projects.meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('projects.meta.description')) },
    { property: 'og:title', content: computed(() => t('projects.meta.title')) },
    { property: 'og:description', content: computed(() => t('projects.meta.description')) },
  ],
})

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref<PostgrestError | Error | null>(null)
const activeTag = ref<string | null>(null)
const onlyFeatured = ref(false)

const uniqueTags = computed<string[]>(() =>
  [...new Set(projects.value.flatMap(p => p.tags ?? []))].sort()
)

const filteredProjects = computed<Project[]>(() => {
  let result = projects.value
  
  if (onlyFeatured.value) {
    result = result.filter(p => p.featured)
  }
  
  if (activeTag.value) {
    result = result.filter(p => p.tags?.includes(activeTag.value!))
  }
  
  return result
})

const fetchProjects = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: supabaseError } = await supabase
      .from('projects')
      .select('id, title, slug, description, thumbnail_url, tags, featured, created_at')
      .order('created_at', { ascending: false })

    if (supabaseError) throw supabaseError
    projects.value = data || []
  } catch (e) {
    console.error('Error fetching projects:', e)
    error.value = e as PostgrestError | Error
  } finally {
    loading.value = false
  }
}

onMounted(fetchProjects)
</script>
