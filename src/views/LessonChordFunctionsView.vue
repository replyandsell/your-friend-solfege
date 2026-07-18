<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 28: Функции аккордов</h2>
      <p class="text-textDim mb-6">Разбираем роли основных аккордов: тоника (I), субдоминанта (IV) и доминанта (V).</p>
      <div class="space-y-4">
        <p>Тоника даёт ощущение покоя. Доминанта создаёт напряжение. Субдоминанта подводит к развязке.</p>
        <ul class="list-disc list-inside space-y-2 text-sm text-textDim">
          <li>Попробуй проанализировать простую последовательность I-IV-V-I.</li>
          <li>Обрати внимание, как меняется настроение от аккорда к аккорду.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
