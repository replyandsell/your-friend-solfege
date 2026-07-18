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

async function playIonian() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playDorian() {
  await initSynth()
  const notes = ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playPhrygian() {
  await initSynth()
  const notes = ['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 15: Натуральные лады</h2>
      <p class="text-textDim mb-6">Лады — это разные последовательности полутонов в пределах одной октавы. Каждый лад имеет свой характер.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры ладов</h3>
        <div class="space-y-3">
          <button @click="playIonian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ионийский лад (мажор) — светлый
          </button>
          <button @click="playDorian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Дорийский лад — джазный минор
          </button>
          <button @click="playPhrygian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Фригийский лад — испанский минор
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Лады используются везде: в джазе (Dorian), в этнической музыке (Phrygian), в блюзе (Mixolydian). Освоив лады, ты получишь полный контроль над мелодией.</p>
      </div>
    </div>
  </div>
</template>
