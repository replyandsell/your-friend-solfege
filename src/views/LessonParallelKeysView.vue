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

function playScale(notes) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playCMajor() {
  await initSynth()
  playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
}

async function playARelativeMinor() {
  await initSynth()
  playScale(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'])
}

async function playCParallelMinor() {
  await initSynth()
  playScale(['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'])
}

async function playRelativeChords() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.8', now)
  synth.triggerAttackRelease(['A3', 'C4', 'E4'], '0.8', now + 1.0)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 44: Параллельные и одноимённые тональности</h2>
      <p class="text-textDim mb-6">Два вида родства тональностей легко перепутать. Разница — в том, что именно остаётся общим: ноты или тоника.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">До мажор и его «родственники»</h3>
        <div class="space-y-3">
          <button @click="playCMajor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            До мажор
          </button>
          <button @click="playARelativeMinor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ля минор — параллельный (те же ноты, другая тоника)
          </button>
          <button @click="playCParallelMinor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            До минор — одноимённый (та же тоника, другие ноты)
          </button>
          <button @click="playRelativeChords" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            До мажор → ля минор трезвучия подряд
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Параллельная тональность (до мажор / ля минор) использует ровно тот же набор нот — в DAW это значит, что можно свободно переключаться между
          мажорным и минорным трезвучием на этих нотах, не выходя за пределы гаммы (приём modal interchange в миниатюре).
          Одноимённая тональность (до мажор / до минор) сохраняет тонику, но меняет три ступени — этим приёмом часто «омрачают» яркий мажорный мотив, не меняя корневую ноту баса.
        </p>
      </div>
    </div>
  </div>
</template>
