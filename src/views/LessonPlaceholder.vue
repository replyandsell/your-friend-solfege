<template>
  <div class="mx-auto max-w-3xl p-8">
    <h1 class="text-2xl card-heading mb-4">{{ title }}</h1>
    <p class="text-textDim" v-if="description">{{ description }}</p>
    <div class="mt-6">
      <slot />
    </div>
    <router-link to="/course" class="mt-6 inline-block gradient-border-btn">Вернуться к курсу</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const title = route.meta.title || `Урок`
const description = route.meta.description || ''
</script>

<style scoped>
</style>
