<script setup>
import AudioUnlock from '../components/AudioUnlock.vue'
import StepSequencer from '../components/StepSequencer.vue'
import { ref } from 'vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 2: Доли и деление доли</h2>
      <p class="text-textDim mb-6">Создай свой ритмический паттерн на 16 шагов (4 доли × 4 шага в каждой доле).</p>

      <StepSequencer />

      <div class="mt-8 border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Что здесь происходит</h3>
        <p class="text-sm text-textDim mb-4">
          Каждая доля делится на 4 равных части (sixteenth notes). Щёлкай кнопки, чтобы активировать звуки на каждом шаге.
          Три дорожки помогают построить полный ритм: низкий удар (kick), удар в центр (snare), металлический звук (hi-hat).
        </p>
        <p class="text-sm text-textDim">
          Попробуй создать классический бит: kick на 1 и 5, snare на 5 и 13, hi-hat на всех четных шагах.
        </p>
      </div>
    </div>
  </div>
</template>