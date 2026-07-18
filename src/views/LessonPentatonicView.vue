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

async function playMinorPent() {
  await initSynth()
  const notes = ['A4', 'C5', 'D5', 'E5', 'G5', 'A5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25', now)
    now += 0.3
  }
}

async function playMajorPent() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25', now)
    now += 0.3
  }
}

async function playBluesPent() {
  await initSynth()
  const notes = ['A4', 'C5', 'D5', 'D#5', 'E5', 'G5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25', now)
    now += 0.3
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 21: Пентатоника</h2>
      <p class="text-textDim mb-6">Пентатоника — гамма из 5 нот. Невозможно сыграть фальшиво на пентатонике. Идеально для импровизации.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playMinorPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорная пентатоника (А)
          </button>
          <button @click="playMajorPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мажорная пентатоника (С)
          </button>
          <button @click="playBluesPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Блюзовая пентатоника (с блюзовой нотой)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Для продюсера</h3>
        <p class="text-sm text-textDim">Пентатоника — король импровизации и мелодий в электронной музыке. Выучи две пентатоники (минорную и мажорную) и сможешь сыграть что угодно без фальши.</p>
      </div>
    </div>
  </div>
</template>
