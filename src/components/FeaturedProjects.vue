<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import type { Project } from '../lib/database.types'
import ProjectCard from './ProjectCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const projects = ref<Project[]>([])
const loading = ref(true)

const { targetRef, isVisible } = useScrollReveal()

const fetchFeaturedProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) throw error
    projects.value = data || []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFeaturedProjects()
})
</script>

<template>
  <section ref="targetRef" class="py-12 border-t border-gray-100 dark:border-gray-800">
    <div 
      class="transition-all duration-1000 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
        <RouterLink 
          to="/projects" 
          class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
        >
          View all 
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </RouterLink>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
      </div>

      <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.id" 
          :project="project"
          class="h-full"
        />
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No featured projects found.
      </div>
    </div>
  </section>
</template>
