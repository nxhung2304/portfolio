<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-8 py-12">
    <!-- Header -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold tracking-tight mb-4">Dự án</h1>
      <p class="text-gray-500 max-w-2xl">
        Danh sách các dự án cá nhân và công việc mình đã thực hiện. Mỗi dự án là một cơ hội để học hỏi và áp dụng các công nghệ mới.
      </p>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="p-4 rounded-2xl border border-gray-100 bg-white animate-pulse">
        <div class="aspect-video bg-gray-100 rounded-xl mb-4" />
        <div class="h-6 bg-gray-100 rounded w-3/4 mb-4" />
        <div class="h-4 bg-gray-100 rounded w-full mb-2" />
        <div class="h-4 bg-gray-100 rounded w-5/6 mb-4" />
        <div class="flex gap-2">
          <div class="h-4 bg-gray-100 rounded w-12" />
          <div class="h-4 bg-gray-100 rounded w-12" />
          <div class="h-4 bg-gray-100 rounded w-12" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <span aria-hidden="true">⚠️</span>
      </div>
      <p class="text-gray-600 mb-6">Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
      <button 
        type="button"
        @click="fetchProjects"
        class="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-all font-medium text-sm"
      >
        Tải lại
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="projects.length === 0" class="py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-300 mb-4">
        <span aria-hidden="true">🔍</span>
      </div>
      <p class="text-gray-500">Chưa có dự án nào được hiển thị.</p>
    </div>

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import type { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/database.types'
import ProjectCard from '../components/ProjectCard.vue'

useHead({
  title: 'Projects | Nguyen Hung',
  meta: [
    { name: 'description', content: 'Portfolio của Nguyen Hung - Danh sách các dự án tiêu biểu.' },
    { property: 'og:title', content: 'Projects | Nguyen Hung' },
    { property: 'og:description', content: 'Portfolio của Nguyen Hung - Danh sách các dự án tiêu biểu.' },
  ],
})

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref<PostgrestError | Error | null>(null)

const fetchProjects = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: supabaseError } = await supabase
      .from('projects')
      .select('id, title, slug, description, thumbnail_url, tags, created_at')
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
