<script setup lang="ts">
import { useHead } from '@vueuse/head'
import HeroCanvas from '../components/HeroCanvas.vue'
import TerminalText from '../components/TerminalText.vue'
import TechStack from '../components/TechStack.vue'
import FeaturedProjects from '../components/FeaturedProjects.vue'
import LatestPosts from '../components/LatestPosts.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const { targetRef: heroRef, isVisible: heroVisible } = useScrollReveal()

useHead({
  title: 'Home | Nguyễn Xuân Hùng - Senior Software Engineer',
  meta: [
    { name: 'description', content: 'Portfolio of Nguyễn Xuân Hùng, a Senior Software Engineer specializing in full-stack development, cloud architecture, and modern web experiences.' },
    { property: 'og:title', content: 'Nguyễn Xuân Hùng | Senior Software Engineer' },
    { property: 'og:description', content: 'Explore my projects, blog posts, and technical expertise in building scalable systems.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <section 
      ref="heroRef"
      class="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
    >
      <!-- Background Canvas -->
      <HeroCanvas class="absolute inset-0" />

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <!-- Content -->
          <div 
            class="flex-1 text-center lg:text-left transition-all duration-1000 transform"
            :class="[heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
          >
            <h2 class="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4">
              Welcome to my portfolio
            </h2>
            
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              I'm 
              <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Nguyễn Xuân Hùng
              </span>
            </h1>

            <div class="h-12 mb-8 flex items-center justify-center lg:justify-start">
              <TerminalText 
                full-text="Building scalable systems and modern web experiences..."
                :speed="50"
                :delay="1000"
                class="text-xl md:text-2xl"
              />
            </div>

            <p class="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0">
              Senior Software Engineer specializing in full-stack development, cloud architecture, and creating user-centric digital solutions.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <RouterLink 
                to="/projects"
                class="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                View Projects
              </RouterLink>
              <RouterLink 
                to="/contact"
                class="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Contact Me
              </RouterLink>
            </div>
          </div>

          <!-- Avatar Placeholder -->
          <div 
            class="flex-1 relative transition-all duration-1000 delay-300 transform"
            :class="[heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90']"
          >
            <div class="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl rotate-6 opacity-20 animate-pulse"></div>
              <div class="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
                <div class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg class="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-32">
      <TechStack />
      <FeaturedProjects />
      <LatestPosts />
    </div>
  </div>
</template>

<style scoped>
</style>
