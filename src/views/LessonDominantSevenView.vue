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

async function playMajorTriad() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('E4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('G4', '0.3', now)
}

async function playDominantSeven() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('G4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('B4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('D5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('F5', '0.3', now)
}

async function compareResolution() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('G4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('B4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('D5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('F5', '0.3', now)
  now += 0.6
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('E4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('G4', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 13: Доминанта-септ</h2>
      <p class="text-textDim mb-6">Доминанта-септ (V7) — это аккорд, который создаёт сильное напряжение и требует разрешения в тонику.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playMajorTriad" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тоника (До мажор)
          </button>
          <button @click="playDominantSeven" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Доминанта-септ (G7)
          </button>
          <button @click="compareResolution" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            G7 → разрешение в C
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Структура</h3>
        <p class="text-sm text-textDim mb-2">Доминанта-септ = V + VII ступень (пониженная)</p>
        <p class="text-sm text-textDim">В До мажоре: G + B + D + F (квинта + доминанта с малой септой)</p>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">V7 создаёт максимальное напряжение в гармонии. После V7 мозг жаждет разрешения в I. Это используется везде: в джазе, блюзе, поп-музыке.</p>
      </div>
    </div>
  </div>
</template>