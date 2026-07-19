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
  synth.triggerAttackRelease(notes, '1.2', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 63: Аккордовые расширения — 9, 11, 13</h2>
      <p class="text-textDim mb-6">Если продолжать складывать терции поверх септаккорда, получаются расширенные аккорды — они добавляют цвет и объём, не меняя базовую функцию.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От septаккорда к 13-му</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4', 'Bb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C7 — база
          </button>
          <button @click="playChord(['C4', 'E4', 'G4', 'Bb4', 'D5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C9 — добавлена нона (D), мягче и цветнее
          </button>
          <button @click="playChord(['C4', 'G4', 'Bb4', 'D5', 'F5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C11 (практическая voicing, без терции) — «подвешенный» современный звук
          </button>
          <button @click="playChord(['C4', 'E4', 'Bb4', 'D5', 'A5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C13 (практическая voicing) — насыщенный джазовый цвет
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          На практике редко играют все ноты расширенного аккорда сразу — обычно оставляют терцию и септиму (они определяют качество аккорда) и одно-два расширения сверху,
          пропуская лишние ноты, чтобы не превращать аккорд в кашу. В электронных жанрах 9-е аккорды особенно любят в неосоуле, лоу-фае и меланхоличном хаусе.
        </p>
      </div>
    </div>
  </div>
</template>
