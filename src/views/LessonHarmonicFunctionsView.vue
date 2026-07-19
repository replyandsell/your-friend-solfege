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

async function playChord(notes) {
  await initSynth()
  synth.triggerAttackRelease(notes, '0.9', Tone.now())
}

async function playTSD() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.6', now)
    now += 0.75
  }
}

async function playSubstitute() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['A3', 'C4', 'E4'],
    ['D4', 'F4', 'A4'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.55', now)
    now += 0.65
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 58: Функции — тоника, субдоминанта, доминанта</h2>
      <p class="text-textDim mb-6">Все семь аккордов гаммы делятся на три группы по роли: «дом» (T), «шаг из дома» (S) и «напряжение перед возвращением» (D).</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три опоры до мажора</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            T — тоника (I), покой
          </button>
          <button @click="playChord(['F4', 'A4', 'C5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            S — субдоминанта (IV), движение в сторону
          </button>
          <button @click="playChord(['G4', 'B4', 'D5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            D — доминанта (V), напряжение
          </button>
          <button @click="playTSD" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            T → S → D → T целиком
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Заместители функций</h3>
        <button @click="playSubstitute" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          I → vi (тоже T) → ii (тоже S) → V (D) → I
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          vi и iii могут заменять I (та же группа T), ii может заменять IV (группа S), vii° может заменять V (группа D) — потому что у них общие ноты.
          Понимание функций даёт свободу: можно строить бесконечно разные прогрессии, оставаясь внутри понятной логики «дом — шаг — напряжение — дом».
        </p>
      </div>
    </div>
  </div>
</template>
