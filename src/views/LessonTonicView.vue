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

async function playTonic() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C3', '0.5', now)
}

async function playTonicWithOthers() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C3', '0.4', now)
  synth.triggerAttackRelease('D3', '0.4', now + 0.5)
  synth.triggerAttackRelease('E3', '0.4', now + 1.0)
  synth.triggerAttackRelease('C3', '0.4', now + 1.5)
}

async function playResolve() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('G3', '0.4', now)
  synth.triggerAttackRelease('F3', '0.4', now + 0.5)
  synth.triggerAttackRelease('E3', '0.4', now + 1.0)
  synth.triggerAttackRelease('C3', '0.4', now + 1.5)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 9: Тональный центр (тоника)</h2>
      <p class="text-textDim mb-6">В каждой музыкальной гамме есть центральная нота — тоника. Она звучит как дом, место отдыха.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playTonic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Одна тоника (До)
          </button>
          <button @click="playTonicWithOthers" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тоника среди других нот
          </button>
          <button @click="playResolve" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Путь в тонику (разрешение)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Тоника — это якорь музыки. Мелодия может уходить от тоники, создавая напряжение, но потом возвращается домой.</p>
      </div>
    </div>
  </div>
</template>