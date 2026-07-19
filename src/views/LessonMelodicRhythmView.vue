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

function playAt(notes, times) {
  const now = Tone.now()
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, '0.2', now + times[i])
  })
}

async function playOnBeat() {
  await initSynth()
  playAt(['C4', 'E4', 'G4', 'C5'], [0, 0.5, 1.0, 1.5])
}

async function playSyncopated() {
  await initSynth()
  playAt(['C4', 'E4', 'G4', 'C5'], [0, 0.375, 0.875, 1.5])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 82: Мелодический ритм</h2>
      <p class="text-textDim mb-6">Одни и те же ноты можно разместить точно на долях — или сдвинуть, чтобы они попадали между ними. Это две совершенно разные мелодии на слух.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Те же четыре ноты, другое размещение</h3>
        <div class="space-y-3">
          <button @click="playOnBeat" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ровно на долях — предсказуемо и устойчиво
          </button>
          <button @click="playSyncopated" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Со сдвигом — живее и грувовее
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Высота нот — только половина мелодии. Ритм, в котором эти ноты появляются, определяет, звучит ли фраза расслабленно, грувово или напряжённо.
          В piano roll полезно экспериментировать: возьми готовую мелодию и просто подвинь пару нот на полдоли вперёд или назад — характер фразы часто меняется сильнее, чем от смены самих нот.
        </p>
      </div>
    </div>
  </div>
</template>
