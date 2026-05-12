<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t } = useI18n()
const { targetRef, isVisible } = useScrollReveal()

const technologies = [
  {
    name: 'Vue.js',
    icon: 'i-logos-vue',
    color: 'hover:text-[#42b883]',
    svg: `<svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="w-12 h-12"><path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" fill="#41B883"/><path d="M0 0l128 220.8L256 0h-51.2L128 132.48 51.2 0H0z" fill="#35495E"/></svg>`
  },
  {
    name: 'React',
    icon: 'i-logos-react',
    color: 'hover:text-[#61dafb]',
    svg: `<svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12"><circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`
  },
  {
    name: 'TypeScript',
    icon: 'i-logos-typescript-icon',
    color: 'hover:text-[#3178c6]',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12"><path d="M1.5 1.5h125v125H1.5V1.5z" fill="#3178c6"/><path d="M118.7 101.4c-1.3 7.8-13.6 8.3-17 4.1-1.3-1.4-1.9-4.1-1.9-4.1l-6.1 3.5s1.2 5.5 4.3 8.3c4.1 3.7 11.2 5.4 18.2 3.6 9.8-2.6 13.5-10.9 11.8-19.4-2.8-13.9-20.1-15.6-18-24.1.8-3.2 5.3-4.2 8.3-3.2 2.6.9 4.3 3.4 4.3 3.4l5.4-4.2s-2.8-5.3-7.5-6.9c-7.1-2.4-16.1-.1-18.4 8.5-2.8 11.1 11.6 15.6 16.6 20.6 5 4.9 3.9 10.9 1.4 13.9zM72 39.5h-31V48h11v65h10V48h10V39.5z" fill="#fff"/></svg>`
  },
  {
    name: 'Node.js',
    icon: 'i-logos-nodejs-icon',
    color: 'hover:text-[#339933]',
    svg: `<svg viewBox="0 0 256 284" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="w-12 h-12"><path d="M141.288 1.41L244.201 60.84a26.69 26.69 0 0 1 13.344 23.114v118.86a26.691 26.691 0 0 1-13.344 23.114L141.288 285.358a26.68 26.68 0 0 1-26.688 0L11.687 225.928a26.691 26.691 0 0 1-13.344-23.114V83.954a26.69 26.69 0 0 1 13.344-23.114L114.6 1.41a26.68 26.68 0 0 1 26.688 0z" fill="#339933"/><path d="M128 62.001c-14.935 0-26.688 11.753-26.688 26.688v35.584l35.584-21.35V88.69c0-5.338-4.448-8.896-8.896-8.896zm0 155.158c-14.935 0-26.688-11.753-26.688-26.688v-35.584l35.584 21.35v14.234c0 5.338-4.448 8.896-8.896 8.896zM154.688 152.001l-26.688 16.001v37.355l35.584-21.35V142.01L154.688 152zm-53.376-24.001l26.688-16.001V74.645L92.416 95.996v41.992l8.896-9.988z" fill="#fff"/></svg>`
  },
  {
    name: 'PostgreSQL',
    icon: 'i-logos-postgresql',
    color: 'hover:text-[#336791]',
    svg: `<svg viewBox="0 0 256 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="w-12 h-12"><path d="M246.335 125.834c-1.897-3.92-1.745-7.796-1.745-7.796 0-35.503-24.643-64.264-58.463-71.19a45.69 45.69 0 0 1 11.832-11.455 106.31 106.31 0 0 0-33.328-11.412c-10.741-1.711-21.417-1.424-21.417-1.424-2.833 0-23.498-1.554-46.066 8.784a123.67 123.67 0 0 0-46.225 38.604c-3.791 5.385-6.84 10.92-9.453 16.894-.492 1.127-1.782 1.458-2.693.684-2.887-2.454-5.263-5.286-7.147-8.311-1.122-1.801-3.665-1.571-4.48.406-2.585 6.275-4.57 12.83-5.694 19.664a106.1 106.1 0 0 0 2.222 42.175c2.193 9.492 6.46 18.91 10.57 25.433 3.655 5.802 8.528 11.966 14.862 18.067 1.134 1.092.934 2.924-.405 3.737-12.87 7.82-27.42 20.841-35.83 31.026-.856 1.036-.328 2.586.993 2.872a110.15 110.15 0 0 0 46.541 2.392c10.435-1.557 20.218-5.32 29.585-11.233.916-.578 2.05-.205 2.508.775 5.56 11.884 21.01 17.551 35.827 18.026 31.023.992 59.988-18.421 72.036-48.47a111.42 111.42 0 0 0 6.666-38.648c0-.792-.375-12.288-1.713-20.407 14.123 2.658 29.351-.016 38.016-19006.84-1.838.274-3.877-.442-5.36z" fill="#336791"/></svg>`
  },
  {
    name: 'Tailwind CSS',
    icon: 'i-logos-tailwindcss-icon',
    color: 'hover:text-[#06b6d4]',
    svg: `<svg viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="w-12 h-12"><path d="M128 0C93.09 0 71.217 17.433 62.38 52.3C76.347 34.867 92.07 27.893 109.548 31.38c9.967 1.988 17.1 9.24 24.987 17.25 12.85 13.047 27.7 28.114 53.465 28.114 34.91 0 56.783-17.433 65.62-52.3-13.967 17.434-29.69 24.407-47.168 20.92-9.967-1.988-17.1-9.24-24.987-17.25C168.615 15.067 153.765 0 128 0zM65.62 76.699c-34.91 0-56.783 17.434-65.62 52.301 13.967-17.434 29.69-24.407 47.168-20.92 9.967 1.987 17.1 9.24 24.987 17.25 12.85 13.047 27.7 28.114 53.465 28.114 34.91 0 56.783-17.434 65.62-52.301-13.967 17.434-29.69 24.407-47.168 20.92-9.967-1.987-17.1-9.24-24.987-17.25-12.85-13.047-27.7-28.114-53.465-28.114z" fill="#06B6D4"/></svg>`
  },
  {
    name: 'Supabase',
    icon: 'i-logos-supabase-icon',
    color: 'hover:text-[#3ecf8e]',
    svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="w-12 h-12"><path d="M152.81 254.12l80.25-104.53a16 16 0 0 0-12.81-25.84h-56.25V18.15a16 16 0 0 0-28.62-9.72L55.13 112.96a16 16 0 0 0 12.81 25.84h56.25v105.6a16 16 0 0 0 28.62 9.72z" fill="#3ECF8E"/></svg>`
  }
]
</script>

<template>
  <section 
    ref="targetRef"
    class="py-20 overflow-hidden"
  >
    <div class="container mx-auto px-4">
      <div 
        class="text-center mb-12 transition-all duration-1000 transform"
        :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
      >
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{{ t('home.techStack.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ t('home.techStack.subtitle') }}
        </p>
      </div>

      <!-- Marquee / Scrolling List -->
      <div 
        class="relative flex overflow-x-hidden transition-all duration-1000 delay-300 transform"
        :class="[isVisible ? 'opacity-100' : 'opacity-0']"
      >
        <div class="animate-marquee whitespace-nowrap flex items-center py-4">
          <div 
            v-for="tech in [...technologies, ...technologies]" 
            :key="tech.name"
            class="mx-8 flex flex-col items-center group transition-all duration-300"
          >
            <div 
              class="w-20 h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 mb-3 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 grayscale group-hover:grayscale-0"
              v-html="tech.svg"
            >
            </div>
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {{ tech.name }}
            </span>
          </div>
        </div>

        <!-- Gradient Overlays for smooth edges -->
        <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
        <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>