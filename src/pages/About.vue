<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-8 py-12">

    <!-- Bio Header -->
    <section
      ref="bioRef"
      :class="['transition-all duration-700', bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start mb-14"
    >
      <div class="relative flex-shrink-0">
        <div class="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-3xl select-none">
          NH
        </div>
        <span class="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold tracking-tight mb-3">About me</h1>
        <p class="text-gray-500 leading-relaxed max-w-xl">
          Full Stack Developer & DevOps Engineer với hơn 5 năm kinh nghiệm. Mình tin vào việc xây dựng
          hệ thống đơn giản nhưng mạnh mẽ, tự động hóa mọi thứ có thể, và chia sẻ kiến thức với cộng đồng.
        </p>
      </div>
    </section>

    <!-- Stats Grid -->
    <section
      ref="statsRef"
      :class="['transition-all duration-700 delay-100', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
    >
      <div
        v-for="stat in STATS"
        :key="stat.label"
        class="p-5 rounded-xl border border-gray-200 bg-white hover:-translate-y-1 hover:border-blue-400 transition-all duration-300 text-center cursor-default"
      >
        <p class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          {{ stat.num }}
        </p>
        <p class="text-xs text-gray-500 mt-1">{{ stat.label }}</p>
      </div>
    </section>

    <!-- Timeline -->
    <section
      ref="timelineRef"
      :class="['transition-all duration-700 delay-150', timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
    >
      <h2 class="text-lg font-semibold mb-6">Kinh nghiệm</h2>

      <div class="relative">
        <!-- Vertical connector line centered behind the 32px icon dot -->
        <div class="absolute left-4 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent rounded" />

        <div
          v-for="item in TIMELINE"
          :key="item.role + item.year"
          class="flex gap-6 mb-7 last:mb-0"
        >
          <!-- Icon dot -->
          <div
            :class="[
              'w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-sm z-10 bg-white',
              item.type === 'work' ? 'border-blue-500' : 'border-cyan-400'
            ]"
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

  </div>
</template>

<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'

type StatItem = { num: string; label: string }
type TimelineItem = { year: string; role: string; company: string; desc: string; type: 'work' | 'edu' }

const STATS: StatItem[] = [
  { num: '5+', label: 'Năm kinh nghiệm' },
  { num: '30+', label: 'Dự án hoàn thành' },
  { num: '50K+', label: 'Users phục vụ' },
  { num: '99.9%', label: 'Uptime đạt được' },
]

const TIMELINE: TimelineItem[] = [
  {
    year: '2024 — nay',
    role: 'Senior DevOps Engineer',
    company: 'Tech Corp',
    desc: 'Thiết kế CI/CD pipeline, quản lý Kubernetes clusters, tối ưu infrastructure cost 40%.',
    type: 'work',
  },
  {
    year: '2022 — 2024',
    role: 'Full Stack Developer',
    company: 'Startup XYZ',
    desc: 'Phát triển SaaS platform với Vue + Node.js, phục vụ 50K+ users.',
    type: 'work',
  },
  {
    year: '2020 — 2022',
    role: 'Backend Developer',
    company: 'Agency ABC',
    desc: 'Xây dựng REST APIs, microservices, database optimization.',
    type: 'work',
  },
  {
    year: '2016 — 2020',
    role: 'Computer Science',
    company: 'Đại học Bách Khoa',
    desc: 'Tốt nghiệp loại giỏi, chuyên ngành Công nghệ phần mềm.',
    type: 'edu',
  },
]

const { targetRef: bioRef, isVisible: bioVisible } = useScrollReveal()
const { targetRef: statsRef, isVisible: statsVisible } = useScrollReveal()
const { targetRef: timelineRef, isVisible: timelineVisible } = useScrollReveal()
</script>
