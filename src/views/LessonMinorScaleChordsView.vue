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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

const degrees = [
  { label: 'i — ля минор', notes: ['A3', 'C4', 'E4'] },
  { label: 'ii° — си уменьш.', notes: ['B3', 'D4', 'F4'] },
  { label: 'III — до мажор', notes: ['C4', 'E4', 'G4'] },
  { label: 'iv — ре минор', notes: ['D4', 'F4', 'A4'] },
  { label: 'v — ми минор (натур.)', notes: ['E4', 'G4', 'B4'] },
  { label: 'VI — фа мажор', notes: ['F4', 'A4', 'C5'] },
  { label: 'VII — соль мажор', notes: ['G4', 'B4', 'D5'] },
]

async function playChord(notes) {
  await initSynth()
  synth.triggerAttackRelease(notes, '0.9', Tone.now())
}

async function playAll() {
  await initSynth()
  let now = Tone.now()
  for (const d of degrees) {
    synth.triggerAttackRelease(d.notes, '0.5', now)
    now += 0.6
  }
}

async function playNaturalVvsHarmonicV() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(['E4', 'G4', 'B4'], '0.7', now)
  synth.triggerAttackRelease(['E4', 'G#4', 'B4'], '0.7', now + 0.9)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 54: Аккорды в минорной тональности</h2>
      <p class="text-textDim mb-6">В натуральном миноре аккорды другие, чем в мажоре — и, что важно, аккорд на V ступени здесь тоже минорный, а не мажорный.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Семь аккордов ля минора (натуральный)</h3>
        <div class="space-y-3">
          <button
            v-for="d in degrees"
            :key="d.label"
            @click="playChord(d.notes)"
            class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            {{ d.label }}
          </button>
          <button @click="playAll" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            Все семь по очереди
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Слабая v против сильной V</h3>
        <button @click="playNaturalVvsHarmonicV" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          v минорное (натуральный минор) → V мажорное (гармонический минор)
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Минорное трезвучие на V ступени звучит мягко и почти не тянет обратно в тонику — поэтому в реальных треках его часто заменяют на мажорное V
          из гармонического минора (см. урок 42), чтобы получить настоящее тяготение доминанты. В электронной музыке минорную v тоже используют осознанно — там, где нужна более «плоская», атмосферная гармония без резкого разрешения.
        </p>
      </div>
    </div>
  </div>
</template>
