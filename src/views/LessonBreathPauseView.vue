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

async function playNoPause() {
  await initSynth()
  let now = Tone.now()
  const notes = ['C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'E4']
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playWithPause() {
  await initSynth()
  let now = Tone.now()
  const notes = ['C4', 'E4', 'G4', 'E4']
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
  now += 0.4
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playDramatic() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('G4', '0.3', now)
  now += 1.0
  synth.triggerAttackRelease('C5', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 19: Дыхание и пауза</h2>
      <p class="text-textDim mb-6">Паузы в музыке — не отсутствие звука, а часть композиции. Они создают напряжение и ожидание.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playNoPause" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Без пауз (монотонно)
          </button>
          <button @click="playWithPause" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С паузами (структурированно)
          </button>
          <button @click="playDramatic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Драматическая пауза
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semибold mb-3">Для продюсера</h3>
        <p class="text-sm text-textDim">Паузы — инструмент драматургии. Используй их перед кульминацией, перед drop'ом, перед главной мелодией. Пауза в 2-3 секунды создает напряжение.</p>
      </div>
    </div>
  </div>
</template>
