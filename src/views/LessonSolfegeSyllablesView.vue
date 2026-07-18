<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 26: Сольфеджио слоги</h2>
      <p class="text-textDim mb-6">Понимаем, как каждая ступень гаммы получает свой звук и имя: до, ре, ми, фа, соль, ля, си.</p>
      <div class="space-y-4">
        <p>Сольфеджио помогает лучше слышать мелодию и чувствовать отношения между нотами.</p>
        <p>Когда ты говоришь ступень вслух, это помогает связать слуховое восприятие и музыкальный образ.</p>
        <ol class="list-decimal list-inside space-y-2 text-sm text-textDim">
          <li>Повторяй слоги вместе с мелодией.</li>
          <li>Отличай тонику и доминанту по звучанию.</li>
          <li>Сравни звук 'до' и 'ре' в разных октавах.</li>
        </ol>
      </div>
    </div>
  </div>
</template>
