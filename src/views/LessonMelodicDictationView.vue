<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 31: Мелодическая диктовка</h2>
      <p class="text-textDim mb-6">Слушаем короткую мелодию и учимся воспроизводить её по памяти.</p>
      <div class="space-y-4">
        <p>Мелодическая диктовка развивает способность запоминать музыкальные фразы и их направление.</p>
        <p>Проанализируй, как мелодия движется вверх и вниз — это поможет её записать.</p>
      </div>
    </div>
  </div>
</template>
