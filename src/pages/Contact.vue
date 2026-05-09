<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Hero Section -->
    <div 
      ref="heroRef"
      class="text-center mb-16 transition-all duration-1000 transform"
      :class="[heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {{ t('contact.title') }}
      </h1>
    </div>

    <!-- Social Links Section -->
    <div
      ref="socialRef"
      class="max-w-2xl mx-auto mb-20 transition-all duration-1000 delay-200 transform"
      :class="[socialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
        <div class="space-y-4 mb-8">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Ghé thăm ${social.name} - ${social.handle}`"
            class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
              :style="{ backgroundColor: social.color + '10', color: social.color }"
            >
              <!-- GitHub Icon -->
              <svg v-if="social.name === 'GitHub'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <!-- LinkedIn Icon -->
              <svg v-else-if="social.name === 'LinkedIn'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.047-8.733 0-9.654h3.554v1.367c.427-.659 1.191-1.598 2.897-1.598 2.117 0 3.704 1.388 3.704 4.374v5.511zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.771-1.715 1.921-1.715 1.147 0 1.918.762 1.918 1.715 0 .953-.771 1.715-1.924 1.715zm1.582 11.597H3.635V9.453h3.284v10.999zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
              <!-- Twitter (X) Icon -->
              <svg v-else-if="social.name === 'Twitter'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
              <!-- Gmail Icon -->
              <svg v-else-if="social.name === 'Gmail'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ social.name }}</p>
              <p class="text-sm text-gray-500">{{ social.desc }}</p>
            </div>
            <span class="text-xs font-mono text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ social.handle }}</span>
          </a>
        </div>
    </div>

    <!-- CTA Section -->
    <div 
      ref="ctaRef"
      class="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-10 text-center text-white relative overflow-hidden group transition-all duration-1000 transform"
      :class="[ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
    >
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
      <h3 class="text-2xl font-bold mb-4 relative z-10">{{ t('contact.cta.title') }}</h3>
      <p class="text-white/80 mb-8 max-w-md mx-auto relative z-10">
        {{ t('contact.cta.description') }}
      </p>
      <div class="flex flex-wrap justify-center gap-4 relative z-10">
        <a href="/nxhung-cv.pdf" target="_blank" rel="noopener noreferrer" class="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
          {{ t('contact.cta.viewCv') }}
        </a>
        <a href="https://linkedin.com/in/hung-nguyen-xuan" target="_blank" rel="noopener noreferrer" class="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
          {{ t('contact.cta.linkedin') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t } = useI18n()

useHead({
  title: 'Liên hệ | Hung Nguyen',
  meta: [
    { name: 'description', content: 'Kết nối với Hung Nguyen - Full Stack & DevOps Engineer qua GitHub, LinkedIn, Twitter hoặc Email.' },
    { property: 'og:title', content: 'Liên hệ | Hung Nguyen' },
    { property: 'og:description', content: 'Kết nối với Hung Nguyen - Full Stack & DevOps Engineer.' },
  ],
})

const { targetRef: heroRef, isVisible: heroVisible } = useScrollReveal()
const { targetRef: socialRef, isVisible: socialVisible } = useScrollReveal()
const { targetRef: ctaRef, isVisible: ctaVisible } = useScrollReveal()

const socials = [
  {
    name: 'GitHub',
    handle: 'nxhung2304',
    desc: t('contact.socials.github'),
    color: '#333333',
    link: 'https://github.com/nxhung2304'
  },
  {
    name: 'LinkedIn',
    handle: 'hung-nguyen-xuan',
    desc: t('contact.socials.linkedin'),
    color: '#0077B5',
    link: 'https://linkedin.com/in/hung-nguyen-xuan'
  },
  {
    name: 'Twitter',
    handle: '@nxhung2304',
    desc: t('contact.socials.twitter'),
    color: '#000000',
    link: 'https://x.com/nxhung2304'
  },
  {
    name: 'Gmail',
    handle: 'mongtamquoc2015@gmail.com',
    desc: t('contact.socials.gmail'),
    color: '#EA4335',
    link: 'mailto:mongtamquoc2015@gmail.com'
  }
]
</script>

<style scoped>
/* Any specific page transitions or additional custom styles can go here */
</style>


<style scoped>
/* Any specific page transitions or additional custom styles can go here */
</style>
