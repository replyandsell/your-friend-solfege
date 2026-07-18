<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 27: Ключи и тональный центр</h2>
      <p class="text-textDim mb-6">Изучаем, как ключ определяет, какие ноты образуют гамму, а тональный центр задаёт музыкальное направление.</p>
      <div class="space-y-4">
        <p>Каждая тональность имеет свою «домашнюю» ноту — тонику. Она как дом, к которому возвращается музыка.</p>
        <p>Сложи простой ряд: до-ре-ми фа-соль-ля-си. Это основа для большинства мелодий.</p>
      </div>
    </div>
  </div>
</template>
