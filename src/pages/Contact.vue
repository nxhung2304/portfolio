<template>
  <Layout>
    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- Hero Section -->
      <div v-reveal class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Liên hệ
        </h1>
        <p class="text-gray-400 max-w-lg mx-auto">
          Có dự án muốn hợp tác? Hay chỉ muốn nói chuyện về tech? Mình luôn sẵn sàng.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <!-- Contact Form Section -->
        <div v-reveal>
          <div v-if="sent" class="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center mb-6 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Đã gửi thành công!</h3>
            <p class="text-gray-400 mb-6">Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi trong vòng 24 giờ.</p>
            <button 
              @click="resetForm"
              class="px-6 py-2 rounded-lg border border-gray-700 hover:border-blue-500 text-blue-400 transition-colors"
            >
              Gửi tin nhắn khác
            </button>
          </div>

          <div v-else class="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h2 class="text-xl font-bold mb-8">Gửi tin nhắn</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Tên</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Tên của bạn"
                  class="w-full bg-transparent border rounded-xl px-4 py-3 outline-none transition-all duration-300"
                  :class="errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'"
                />
                <p v-if="errors.name" class="mt-2 text-sm text-red-500">{{ errors.name }}</p>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full bg-transparent border rounded-xl px-4 py-3 outline-none transition-all duration-300"
                  :class="errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'"
                />
                <p v-if="errors.email" class="mt-2 text-sm text-red-500">{{ errors.email }}</p>
              </div>

              <!-- Message Field -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-400 mb-2">Nội dung</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Mình muốn hợp tác về..."
                  class="w-full bg-transparent border rounded-xl px-4 py-3 outline-none transition-all duration-300 resize-none"
                  :class="errors.message ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'"
                ></textarea>
                <p v-if="errors.message" class="mt-2 text-sm text-red-500">{{ errors.message }}</p>
              </div>

              <button 
                type="submit"
                :disabled="sending"
                class="w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                :class="isFormValid ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/20 hover:-translate-y-1' : 'bg-gray-800 text-gray-500 cursor-not-allowed'"
              >
                <template v-if="sending">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </template>
                <template v-else>
                  Gửi tin nhắn
                </template>
              </button>
            </form>
          </div>
        </div>

        <!-- Social Links Section -->
        <div v-reveal="{ delay: 0.2 }">
          <h2 class="text-xl font-bold mb-6">Kết nối</h2>
          <div class="space-y-4 mb-8">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.link"
              target="_blank"
              class="flex items-center gap-4 p-4 rounded-xl border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
            >
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors"
                :style="{ backgroundColor: social.color + '10', color: social.color }"
              >
                <i :class="social.icon"></i>
              </div>
              <div class="flex-1">
                <p class="font-bold group-hover:text-blue-400 transition-colors">{{ social.name }}</p>
                <p class="text-sm text-gray-500">{{ social.desc }}</p>
              </div>
              <span class="text-xs font-mono text-gray-600 group-hover:text-blue-400">{{ social.handle }}</span>
            </a>
          </div>

          <!-- Status Card -->
          <div class="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
            <p class="text-sm font-bold mb-4">Response time</p>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-sm text-gray-400">Thường phản hồi trong 24 giờ</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">
              Timezone: GMT+7 (Việt Nam). Mình check email và messages hàng ngày.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div v-reveal class="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-10 text-center text-white relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
        <h3 class="text-2xl font-bold mb-4 relative z-10">Đang tìm Full Stack / DevOps Engineer?</h3>
        <p class="text-white/80 mb-8 max-w-md mx-auto relative z-10">
          Mình luôn open cho các cơ hội thú vị. Hãy kết nối nhé!
        </p>
        <div class="flex flex-wrap justify-center gap-4 relative z-10">
          <a href="/cv.pdf" target="_blank" class="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
            Xem CV ↓
          </a>
          <a href="https://linkedin.com" target="_blank" class="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Layout from '../components/Layout.vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const sent = ref(false)
const sending = ref(false)

const socials = [
  { 
    name: 'GitHub', 
    handle: '@yourname', 
    desc: 'Open source & side projects', 
    color: '#94a3b8', 
    icon: 'fab fa-github',
    link: 'https://github.com'
  },
  { 
    name: 'LinkedIn', 
    handle: 'in/yourname', 
    desc: 'Professional network', 
    color: '#0a66c2', 
    icon: 'fab fa-linkedin',
    link: 'https://linkedin.com'
  },
  { 
    name: 'Twitter', 
    handle: '@yourname', 
    desc: 'Tech thoughts & threads', 
    color: '#1d9bf0', 
    icon: 'fab fa-twitter',
    link: 'https://twitter.com'
  },
  { 
    name: 'Email', 
    handle: 'hello@yourname.dev', 
    desc: 'Liên hệ trực tiếp', 
    color: '#06b6d4', 
    icon: 'fas fa-envelope',
    link: 'mailto:hello@yourname.dev'
  }
]

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = () => {
  let isValid = true
  
  if (!form.name.trim()) {
    errors.name = 'Tên không được để trống.'
    isValid = false
  } else {
    errors.name = ''
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email không được để trống.'
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = 'Định dạng email không hợp lệ.'
    isValid = false
  } else {
    errors.email = ''
  }
  
  if (!form.message.trim()) {
    errors.message = 'Nội dung không được để trống.'
    isValid = false
  } else {
    errors.message = ''
  }
  
  return isValid
}

const isFormValid = computed(() => {
  return form.name.trim() && form.email.trim() && validateEmail(form.email) && form.message.trim()
})

const handleSubmit = async () => {
  if (!validate()) return
  
  sending.value = true
  
  // Simulation of submission - Supabase integration will be in Task 6.2
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    sent.value = true
    // Task 6.2: submit to Supabase
  } catch (error) {
    console.error('Submission failed:', error)
  } finally {
    sending.value = false
  }
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.message = ''
  sent.value = false
}
</script>

<style scoped>
/* Any specific page transitions or additional custom styles can go here */
</style>
