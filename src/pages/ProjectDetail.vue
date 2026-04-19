<template>
  <div>
    <h1>Project {{ slug }}</h1>
    <p>Project details</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
</script>

<style scoped>
</style>
