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

async function playPlain() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['D4', 'F4', 'A4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.7', now)
    now += 0.8
  }
}

async function playWithPassing() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['C#4', 'E4', 'G4', 'Bb4'],
    ['D4', 'F4', 'A4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.5', now)
    now += 0.55
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 69: Уменьшённые проходящие аккорды</h2>
      <p class="text-textDim mb-6">Маленький хроматический шаг между двумя диатоническими аккордами можно заполнить уменьшённым созвучием — оно звучит как «скольжение», а не самостоятельная гармония.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">С проходящим аккордом и без</h3>
        <div class="space-y-3">
          <button @click="playPlain" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Просто: I → ii (до → ре минор)
          </button>
          <button @click="playWithPassing" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С проходящим: I → #I dim7 → ii
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Проходящий уменьшённый аккорд строится на полтона выше предыдущего диатонического аккорда и ведёт бас плавным хроматическим шагом к следующему.
          Приём часто звучит на слабую долю такта, между двумя более важными аккордами — он добавляет движению баса «джазовую» гладкость, оставаясь чисто украшающим, а не структурным элементом.
        </p>
      </div>
    </div>
  </div>
</template>
