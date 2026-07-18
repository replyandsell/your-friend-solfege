<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let synth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

async function playProgression1() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    for (const note of chord) {
      synth.triggerAttackRelease(note, '0.5', now)
    }
    now += 0.8
  }
}

async function playProgression2() {
  await initSynth()
  const chords = [
    ['A4', 'C5', 'E5'],
    ['D4', 'F4', 'A4'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    for (const note of chord) {
      synth.triggerAttackRelease(note, '0.5', now)
    }
    now += 0.8
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 12: Применение аккордов в музыке</h2>
      <p class="text-textDim mb-6">Последовательность аккордов создаёт гармонию. Это основа музыкальной прогрессии.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры прогрессий</h3>
        <div class="space-y-3">
          <button @click="playProgression1" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прогрессия 1: C → F → G → C
          </button>
          <button @click="playProgression2" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прогрессия 2: Am → Dm → G → C
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Почему это работает</h3>
        <p class="text-sm text-textDim mb-3">
          Первая прогрессия классическая: начало (C) → переход (F, G) → разрешение в C.
        </p>
        <p class="text-sm text-textDim">
          Вторая прогрессия меньше веселья: Am и Dm дают напряжение, G готовит возврат в C.
        </p>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Большинство популярной музыки основано на 2-4 аккордах. Это закономерно: мозг любит предсказуемость и разрешение напряжения.</p>
      </div>
    </div>
  </div>
</template>