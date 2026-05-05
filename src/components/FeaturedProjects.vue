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
  <section ref="targetRef" class="py-12">
    <!-- Header -->
    <div 
      class="flex items-center justify-between mb-8 transition-all duration-700 transform"
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <h2 class="text-[18px] font-semibold text-gray-900 dark:text-white">Featured projects</h2>
      <RouterLink 
        to="/projects" 
        class="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        xem tất cả →
      </RouterLink>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="h-64 bg-gray-50 dark:bg-gray-800/50 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="(project, i) in projects" 
        :key="project.id"
        class="transition-all duration-700 transform"
        :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
        :style="{ transitionDelay: `${(i + 1) * 120}ms` }"
      >
        <ProjectCard 
          :project="project"
          class="h-full !border-[0.5px] !shadow-none hover:!shadow-xl hover:!shadow-blue-500/10"
        />
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      Chưa có dự án nổi bật.
    </div>
  </section>
</template>

<style scoped>
:deep(.border), :deep(.border-2) {
  border-width: 0.5px !important;
}
</style>
