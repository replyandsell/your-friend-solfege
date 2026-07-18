<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const exerciseActive = ref(false)
const exerciseFeedback = ref('')

let synth = null

async function initSynth() {
  if (!synth) {
    await Tone.start()
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.5 },
    }).toDestination()
  }
}

async function playMelodyUp() {
  await initSynth()
  const notes = ['C3', 'D3', 'E3', 'F3', 'G3']
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25')
    await new Promise(r => setTimeout(r, 300))
  }
}

async function playMelodyDown() {
  await initSynth()
  const notes = ['G3', 'F3', 'E3', 'D3', 'C3']
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25')
    await new Promise(r => setTimeout(r, 300))
  }
}

async function startExercise() {
  exerciseActive.value = true
  exerciseFeedback.value = ''
  const direction = Math.random() > 0.5 ? 'up' : 'down'
  if (direction === 'up') {
    await playMelodyUp()
  } else {
    await playMelodyDown()
  }
}

function answerUp() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  exerciseFeedback.value = '✓ Мелодия поднималась вверх!'
}

function answerDown() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  exerciseFeedback.value = '✓ Мелодия опускалась вниз!'
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 4: Направление мелодии</h2>
      <p class="text-textDim mb-6">Мелодия может подниматься вверх (↑), опускаться вниз (↓) или оставаться на одной высоте (→).</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Упражнение: Определи направление</h3>
        <p class="text-sm text-textDim mb-4">Слушай короткую мелодию. Поднимается ли она вверх или опускается вниз?</p>
        
        <button v-if="!exerciseActive" @click="startExercise" class="px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Начать упражнение
        </button>

        <div v-else class="space-y-2">
          <button @click="answerUp" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ↑ Поднимается вверх
          </button>
          <button @click="answerDown" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ↓ Опускается вниз
          </button>
        </div>

        <p v-if="exerciseFeedback" class="mt-3 text-accent font-medium">{{ exerciseFeedback }}</p>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Слух развивается через внимание. Когда мелодия поднимается, ноты становятся выше. Когда опускается — ниже. 
          Это базовый навык для музыкантов.
        </p>
      </div>
    </div>
  </div>
</template>