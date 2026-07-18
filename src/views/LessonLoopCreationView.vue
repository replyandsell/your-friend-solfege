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

async function playSimpleLoop() {
  await initSynth()
  let now = Tone.now()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
  ]
  for (let i = 0; i < 2; i++) {
    for (const chord of chords) {
      for (const note of chord) {
        synth.triggerAttackRelease(note, '0.4', now)
      }
      now += 0.6
    }
  }
}

async function playMinorLoop() {
  await initSynth()
  let now = Tone.now()
  const chords = [
    ['A4', 'C5', 'E5'],
    ['E4', 'G4', 'B4'],
  ]
  for (let i = 0; i < 2; i++) {
    for (const chord of chords) {
      for (const note of chord) {
        synth.triggerAttackRelease(note, '0.4', now)
      }
      now += 0.6
    }
  }
}

async function playLoopWithVar() {
  await initSynth()
  let now = Tone.now()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['A3', 'C4', 'E4'],
    ['F3', 'A3', 'C4'],
    ['G3', 'B3', 'D4'],
  ]
  for (const chord of chords) {
    for (const note of chord) {
      synth.triggerAttackRelease(note, '0.4', now)
    }
    now += 0.6
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 24: Создание лупа из аккордов</h2>
      <p class="text-textDim mb-6">Луп (loop) — повторяющаяся последовательность аккордов. Основа любой современной электронной музыки.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playSimpleLoop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Простой луп (C - F повтор)
          </button>
          <button @click="playMinorLoop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорный луп (Am - E повтор)
          </button>
          <button @click="playLoopWithVar" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Луп с вариациями (4 аккорда)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semибold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Отличный луп можно повторять часами и не надоест. Два-три аккорда, хороший грув, плюс вариации в мелодии. Вот формула. Послушай Daft Punk или Disclosure — везде простые лупы.</p>
      </div>
    </div>
  </div>
</template>
