<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  fullText?: string
  speed?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  fullText: "building scalable systems...",
  speed: 60,
  delay: 0
})

const text = ref('')

onMounted(() => {
  setTimeout(() => {
    let i = 0
    const timer = setInterval(() => {
      text.value = props.fullText.slice(0, ++i)
      if (i >= props.fullText.length) {
        clearInterval(timer)
      }
    }, props.speed)
  }, props.delay)
})
</script>

<template>
  <span class="font-mono text-blue-400/80 dark:text-blue-300/80">
    <span class="text-gray-500 mr-1">$</span>
    {{ text }}<span class="animate-pulse inline-block w-2 h-5 bg-blue-500 ml-1 align-middle"></span>
  </span>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
