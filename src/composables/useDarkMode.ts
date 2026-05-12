import { ref } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  function init() {
    isDark.value = document.documentElement.classList.contains('dark')
  }

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  return { isDark, init, toggle }
}
