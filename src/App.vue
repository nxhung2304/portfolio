<template>
  <div id="app">
    <div class="p-4 bg-gray-100">
      <h2 class="text-lg font-bold mb-2">Supabase Connection Test</h2>
      <p>{{ message }}</p>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabase'

const message = ref('Testing Supabase connection...')

onMounted(async () => {
  try {
    // Test query: fetch one project
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1)

    if (error) {
      message.value = `Error: ${error.message}`
    } else {
      message.value = `✓ Connection successful! Projects: ${data?.length || 0}`
    }
  } catch (err) {
    message.value = `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
  }
})
</script>
