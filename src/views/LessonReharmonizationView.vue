<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let melodySynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

const melody = ['C5', 'D5', 'E5', 'C5']

async function playMelodyOnly() {
  await initSynth()
  let now = Tone.now()
  for (const note of melody) {
    melodySynth.triggerAttackRelease(note, '0.5', now)
    now += 0.55
  }
}

async function playSimpleHarmony() {
  await initSynth()
  const chords = [['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4'], ['C4', 'E4', 'G4']]
  let now = Tone.now()
  melody.forEach((note, i) => {
    melodySynth.triggerAttackRelease(note, '0.5', now)
    chordSynth.triggerAttackRelease(chords[i], '0.5', now)
    now += 0.55
  })
}

async function playReharmonized() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['A3', 'C4', 'E4', 'G4'],
    ['D4', 'F4', 'A4', 'C5'],
    ['G3', 'B3', 'D4', 'F4'],
  ]
  let now = Tone.now()
  melody.forEach((note, i) => {
    melodySynth.triggerAttackRelease(note, '0.5', now)
    chordSynth.triggerAttackRelease(chords[i], '0.5', now)
    now += 0.55
  })
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 70: Ре-гармонизация простой мелодии</h2>
      <p class="text-textDim mb-6">Одну и ту же мелодию можно поддержать совершенно разными аккордами. Ноты мелодии не меняются — а трек звучит как будто написан заново.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">До — ре — ми — до</h3>
        <div class="space-y-3">
          <button @click="playMelodyOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только мелодия, без гармонии
          </button>
          <button @click="playSimpleHarmony" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Простая гармонизация — один аккорд C на всю фразу
          </button>
          <button @click="playReharmonized" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ре-гармонизация — C, Am7, Dm7, G7 под те же ноты
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Ре-гармонизация — приём для «спасения» надоевшего лупа: если мелодия уже написана и звучит скучно, часто проще не менять её, а подобрать более интересную
          последовательность аккордов под те же самые ноты. Каждая нота мелодии просто должна оставаться хотя бы близкой к новому аккорду (входить в него или быть проходящей).
        </p>
      </div>
    </div>
  </div>
</template>
