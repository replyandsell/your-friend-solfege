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

async function playProgression(chords, step = 0.75) {
  await initSynth()
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, step * 0.85, now)
    now += step
  }
}

async function playSmooth() {
  await playProgression([
    ['C4', 'E4', 'G4'],
    ['C4', 'F4', 'A4'],
    ['B3', 'D4', 'G4'],
    ['C4', 'E4', 'G4'],
  ])
}

async function playJumpy() {
  await playProgression([
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
    ['G3', 'B3', 'D4'],
    ['C4', 'E4', 'G4'],
  ])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 61: Голосоведение между аккордами</h2>
      <p class="text-textDim mb-6">Одна и та же последовательность аккордов может звучать гладко или дёргано — всё зависит от того, как отдельные ноты переходят от одного аккорда к другому.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Сравни I–IV–I–I на слух</h3>
        <div class="space-y-3">
          <button @click="playSmooth" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Плавное голосоведение — общие ноты держатся на месте
          </button>
          <button @click="playJumpy" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Скачкообразное — все голоса прыгают на новые ноты
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Главное правило: если у двух соседних аккордов есть общая нота — оставь её на месте, а остальные голоса веди к ближайшим нотам следующего аккорда.
          В piano roll это значит: не пересобирай аккорд заново на каждом шаге, а двигай отдельные ноты минимально — тогда переход между аккордами звучит связно, а не как набор случайных созвучий.
        </p>
      </div>
    </div>
  </div>
</template>
