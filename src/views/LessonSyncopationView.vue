<script setup>
import { ref } from 'vue'
import { audioEngine } from '../audio/AudioEngine'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const isPlayingStraight = ref(false)
const isPlayingSyncopated = ref(false)
const exerciseActive = ref(false)
const exerciseFeedback = ref('')

function toggleStraightRhythm() {
  if (isPlayingStraight.value) {
    audioEngine.stopMetronome()
    isPlayingStraight.value = false
  } else {
    audioEngine.stopMetronome()
    isPlayingStraight.value = true
    isPlayingSyncopated.value = false
    audioEngine.startMetronome()
  }
}

function toggleSyncopatedRhythm() {
  if (isPlayingSyncopated.value) {
    audioEngine.stopMetronome()
    isPlayingSyncopated.value = false
  } else {
    audioEngine.stopMetronome()
    isPlayingSyncopated.value = true
    isPlayingStraight.value = false
    audioEngine.startSyncopatedMetronome()
  }
}
function startExercise() {
  exerciseActive.value = true
  exerciseFeedback.value = ''
  audioEngine.startMetronome()
}

function answerOnBeat() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  audioEngine.stopMetronome()
  exerciseFeedback.value = '✓ Правильно! Это был on-beat (на доле).'
}

function answerOffBeat() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  audioEngine.stopMetronome()
  exerciseFeedback.value = '✓ Правильно! Это был off-beat (между долями).'
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 3: Синкопа и движение между долями</h2>
      <p class="text-textDim mb-6">Синкопа — это смещение акцента с сильной доли на слабую. Это придаёт ритму энергию и неожиданность.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Сравнение: прямой ритм vs синкопа</h3>
        <p class="text-sm text-textDim mb-4">Слушай разницу между обычным битом и тем же битом со смещением на офф-бит.</p>
        <div class="space-y-3">
          <button 
            @click="toggleStraightRhythm"
            :class="isPlayingStraight ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:opacity-90'"
            class="px-4 py-2 rounded-lg text-bg font-medium transition"
          >
            {{ isPlayingStraight ? '⏸ Прямой ритм' : '▶ Прямой ритм' }}
          </button>
          <button 
            @click="toggleSyncopatedRhythm"
            :class="isPlayingSyncopated ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:opacity-90'"
            class="px-4 py-2 rounded-lg text-bg font-medium transition"
          >
            {{ isPlayingSyncopated ? '⏸ Синкопированный ритм' : '▶ Синкопированный ритм' }}
          </button>
        </div>
      </div>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Упражнение: Определи синкопу</h3>
        <p class="text-sm text-textDim mb-4">Слушай паттерн. Где находится основной удар — на доле или между долями?</p>
        
        <div v-if="!exerciseActive">
          <button 
            @click="startExercise"
            class="px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            Начать упражнение
          </button>
        </div>

        <div v-else class="space-y-3">
          <button 
            @click="answerOnBeat"
            class="block w-full px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition"
          >
            На доле (on-beat)
          </button>
          <button 
            @click="answerOffBeat"
            class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            Между долями (off-beat)
          </button>
        </div>

        <p v-if="exerciseFeedback" class="mt-3 text-accent font-medium">{{ exerciseFeedback }}</p>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Синкопа заставляет слушателя ожидать удара на сильной доле, а вместо этого получает его на слабой или между долями. 
          Это создаёт ощущение «качания» и неустойчивости, которое разрешается, когда ритм вернётся в норму.
        </p>
      </div>
    </div>
  </div>
</template>