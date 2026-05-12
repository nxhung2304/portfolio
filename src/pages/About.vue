<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">

    <!-- Bio Header -->
    <section
      ref="bioRef"
      :class="['transition-all duration-700', bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start mb-14"
      aria-labelledby="bio-heading"
    >
      <div class="relative flex-shrink-0">
        <div 
          role="img"
          aria-label="Nguyen Hung avatar"
          class="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-3xl select-none"
        >
          NH
        </div>
        <span class="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white" />
      </div>
      <div>
        <h1 id="bio-heading" class="text-3xl font-bold tracking-tight mb-3">{{ t('about.title') }}</h1>
        <p class="text-gray-500 leading-relaxed max-w-xl mb-6">
          {{ t('about.bio') }}
        </p>
        <a 
          href="/nxhung-cv.pdf"
          download="nxhung-cv.pdf"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 text-sm font-medium"
          aria-label="Download CV (PDF)"
        >
          <span aria-hidden="true">📄</span>
          {{ t('about.downloadCv') }}
        </a>
      </div>
    </section>

    <!-- Stats Grid -->
    <section
      ref="statsRef"
      :class="['transition-all duration-700 delay-100', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="mb-16"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" class="sr-only">{{ t('about.stats.heading') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="p-5 rounded-xl border border-gray-200 bg-white hover:-translate-y-1 hover:border-blue-400 transition-all duration-300 text-center cursor-default"
        >
          <p class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {{ stat.num }}
          </p>
          <p class="text-xs text-gray-500 mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section
      ref="timelineRef"
      :class="['transition-all duration-700 delay-150', timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="mb-16"
      aria-labelledby="timeline-heading"
    >
      <h2 id="timeline-heading" class="text-lg font-semibold mb-6">{{ t('about.timeline.heading') }}</h2>

      <div class="relative">
        <!-- Vertical connector line centered behind the 32px icon dot -->
        <div class="absolute left-4 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent rounded" />

        <div
          v-for="item in timelineItems"
          :key="item.role + item.year"
          class="flex gap-6 mb-7 last:mb-0"
        >
          <!-- Icon dot -->
          <div
            :class="[
              'w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-sm z-10 bg-white',
              item.type === 'work' ? 'border-blue-500' : 'border-cyan-400'
            ]"
            aria-hidden="true"
          >
            {{ item.type === 'work' ? '💼' : '🎓' }}
          </div>

          <!-- Card -->
          <div class="flex-1 p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:translate-x-1 transition-all duration-300 cursor-default">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
              <p class="text-sm font-semibold">{{ item.role }}</p>
              <span class="text-xs text-gray-400 font-mono">{{ item.year }}</span>
            </div>
            <p class="text-xs text-blue-500 font-medium mb-2">{{ item.company }}</p>
            <p class="text-xs text-gray-500 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section
      ref="skillsRef"
      :class="['transition-all duration-700 delay-200', skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="mb-16"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" class="text-lg font-semibold mb-6">{{ t('about.skills.heading') }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="skillGroup in SKILLS"
          :key="skillGroup.category"
          class="p-5 rounded-xl border border-gray-200 bg-white"
        >
          <h3 class="text-sm font-bold text-gray-700 mb-4">{{ skillGroup.category }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in skillGroup.items"
              :key="item"
              class="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-default"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, locale } = useI18n()

useHead({
  title: computed(() => t('about.meta.title')),
  meta: [
    { 
      name: 'description', 
      content: computed(() => t('about.meta.description')) 
    },
    { property: 'og:title', content: computed(() => t('about.meta.title')) },
    { 
      property: 'og:description', 
      content: computed(() => t('about.meta.description')) 
    },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

type StatItem = { num: string; label: string }
type TimelineItem = { year: string; role: string; company: string; desc: string; type: 'work' | 'edu' }
type SkillGroup = { category: string; items: string[] }

const stats = computed<StatItem[]>(() => [
  { num: '5+', label: t('about.stats.experience') },
  { num: '30+', label: t('about.stats.projects') },
  { num: '50K+', label: t('about.stats.users') },
  { num: '99.9%', label: t('about.stats.uptime') },
])

const timelineItems = computed<TimelineItem[]>(() => [
  {
    year: '2026',
    role: 'Software Developer',
    company: 'Rights-S',
    desc: locale.value === 'vi'
      ? 'Rails API CRUD, Flutter BLE, Microsoft B2C.'
      : 'Rails API CRUD, Flutter BLE, Microsoft B2C.',
    type: 'work',
  },
  {
    year: '2025',
    role: 'Software Developer',
    company: 'Rights-S',
    desc: locale.value === 'vi'
      ? 'Flutter BLE, Rails API; Microsoft & Google OAuth/Classroom API; iOS native (AppFlyer cloud setup + Onelink).'
      : 'Flutter BLE, Rails API; Microsoft & Google OAuth/Classroom API; iOS native (AppFlyer cloud setup + Onelink).',
    type: 'work',
  },
  {
    year: '2024',
    role: 'Software Developer',
    company: 'Rights-S',
    desc: locale.value === 'vi'
      ? 'Ruby on Rails, Flutter, iOS native (thích ứng API mới).'
      : 'Ruby on Rails, Flutter, iOS native (adapt new API).',
    type: 'work',
  },
  {
    year: '2021 — 2023',
    role: 'Software Developer',
    company: 'Rights-S',
    desc: locale.value === 'vi'
      ? 'Cordova + Vue.js (mobile apps: golf, camp, children); Vue.js + Rails web (Microsoft 365 mailboxes).'
      : 'Cordova + Vue.js (mobile apps: golf, camp, children); Vue.js + Rails web (Microsoft 365 mailboxes).',
    type: 'work',
  },
  {
    year: '2018 — 2021',
    role: locale.value === 'vi' ? 'Công nghệ thông tin' : 'Information Technology',
    company: locale.value === 'vi' ? 'Cao đẳng Công nghiệp Huế' : 'Hue Industrial College',
    desc: locale.value === 'vi'
      ? 'Tốt nghiệp chuyên ngành Công nghệ thông tin.'
      : 'Graduated majoring in Information Technology.',
    type: 'edu',
  },
])

const SKILLS: SkillGroup[] = [
  { category: 'Mobile', items: ['Flutter', 'Dart', 'iOS / UIKit', 'BLE / Garmin'] },
  { category: 'Frontend', items: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Nuxt.js'] },
  { category: 'Backend', items: ['Ruby on Rails', 'REST API', 'Canvas LMS'] },
  { category: 'Firebase', items: ['FCM', 'Analytics', 'App Distribution'] },
  { category: 'Auth & DevOps', items: ['Google OAuth', 'Microsoft B2C', 'VPS Deploy', 'Linux'] },
  { category: 'AI Tools', items: ['Claude Code', 'MCP', 'AI Skills'] },
]

const { targetRef: bioRef, isVisible: bioVisible } = useScrollReveal()
const { targetRef: statsRef, isVisible: statsVisible } = useScrollReveal()
const { targetRef: timelineRef, isVisible: timelineVisible } = useScrollReveal()
const { targetRef: skillsRef, isVisible: skillsVisible } = useScrollReveal()
</script>
