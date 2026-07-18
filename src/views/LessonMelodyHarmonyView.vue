<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 29: Мелодия над гармонией</h2>
      <p class="text-textDim mb-6">Учимся строить мелодию, которая легко ложится на аккорды и звучит естественно.</p>
      <div class="space-y-4">
        <p>Мелодия часто использует общие ноты аккорда или соседние ступени гаммы.</p>
        <p>Обрати внимание, какие ноты звучат устойчиво на каждом аккорде.</p>
      </div>
    </div>
  </div>
</template>
