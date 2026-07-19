<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let mainSynth = null
let counterSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  mainSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  counterSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

function playLine(synth, notes, durations, startOffset = 0) {
  let now = Tone.now() + startOffset
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, durations[i] * 0.85, now)
    now += durations[i]
  })
}

async function playMainOnly() {
  await initSynth()
  playLine(mainSynth, ['C4', 'E4', 'G4', 'C5'], [0.4, 0.4, 0.4, 0.8])
}

async function playWithCounter() {
  await initSynth()
  playLine(mainSynth, ['C4', 'E4', 'G4', 'C5'], [0.4, 0.4, 0.4, 0.8])
  playLine(counterSynth, ['G4', 'A4', 'B3', 'E4'], [0.4, 0.4, 0.4, 0.8])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 85: Контрмелодия</h2>
      <p class="text-textDim mb-6">Контрмелодия — вторая, самостоятельная мелодическая линия, которая звучит одновременно с основной, не забивая её и двигаясь по-своему.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одна линия и две линии</h3>
        <div class="space-y-3">
          <button @click="playMainOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только основная мелодия
          </button>
          <button @click="playWithCounter" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Основная мелодия + контрмелодия одновременно
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Хорошая контрмелодия движется в противоположном направлении к основной линии там, где это возможно (одна идёт вверх, другая вниз), и держится
          в другом регистре, чтобы не сливаться с основной мелодией. В электронной музыке контрмелодию часто поручают отдельному синту или инструменту, который вступает во второй половине куплета, добавляя слой без переусложнения аранжировки.
        </p>
      </div>
    </div>
  </div>
</template>
