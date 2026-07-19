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

async function playSlow() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '1.4', now)
    now += 1.6
  }
}

async function playFast() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['A3', 'C4', 'E4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
  ]
  let now = Tone.now()
  for (let i = 0; i < 2; i++) {
    for (const chord of chords) {
      synth.triggerAttackRelease(chord, '0.35', now)
      now += 0.4
    }
  }
}

async function playAccelerating() {
  await initSynth()
  const chord = ['C4', 'E4', 'G4']
  const chord2 = ['G4', 'B4', 'D5']
  let now = Tone.now()
  const gaps = [1.2, 1.2, 0.6, 0.6, 0.3, 0.3, 0.15, 0.15]
  gaps.forEach((gap, i) => {
    synth.triggerAttackRelease(i % 2 === 0 ? chord : chord2, gap * 0.9, now)
    now += gap
  })
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 59: Гармонический ритм</h2>
      <p class="text-textDim mb-6">Гармонический ритм — это то, как часто меняются аккорды. Одни и те же аккорды звучат совсем по-разному в зависимости от темпа их смены.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Медленно и быстро</h3>
        <div class="space-y-3">
          <button @click="playSlow" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Медленный гармонический ритм — по аккорду на такт
          </button>
          <button @click="playFast" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Быстрый гармонический ритм — аккорд на долю
          </button>
          <button @click="playAccelerating" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ускоряющийся гармонический ритм — приём нагнетания перед дропом
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Медленный гармонический ритм даёт ощущение простора — типично для эмбиента и интро. Быстрый создаёт напряжение и энергию — типично для драйвовых куплетов.
          Ускорение смены аккордов к концу фразы — классический приём билдапа в электронной музыке: слух чувствует нарастание даже без изменения громкости или темпа.
        </p>
      </div>
    </div>
  </div>
</template>
