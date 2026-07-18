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

async function playLinearMelody() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25', now)
    now += 0.3
  }
}

async function playSkippingMelody() {
  await initSynth()
  const notes = ['C4', 'E4', 'G4', 'C5', 'B4', 'A4', 'G4', 'F4']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.25', now)
    now += 0.3
  }
}

async function playPhrased() {
  await initSynth()
  let now = Tone.now()
  const phrase1 = ['C4', 'E4', 'G4', 'C5']
  const phrase2 = ['B4', 'A4', 'G4', 'F4']
  for (const note of phrase1) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
  now += 0.3
  for (const note of phrase2) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 18: Мелодическое движение и фразировка</h2>
      <p class="text-textDim mb-6">Мелодия может двигаться линейно (по соседним нотам) или скачками. Фразировка добавляет "дыхание".</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playLinearMelody" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Линейное движение (плавное)
          </button>
          <button @click="playSkippingMelody" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Скачки (энергичное)
          </button>
          <button @click="playPhrased" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С фразировкой (структурированное)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Отличные мелодии комбинируют линейное движение со скачками. Фразировка (с паузами) делает мелодию живой, как речь.</p>
      </div>
    </div>
  </div>
</template>
