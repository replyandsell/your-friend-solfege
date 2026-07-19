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
    envelope: { attack: 0.01, decay: 0.15, sustain: 0, release: 0.2 },
  }).toDestination()
  isInitialized.value = true
}

async function playStraight() {
  await initSynth()
  const now = Tone.now()
  for (let i = 0; i < 8; i++) {
    synth.triggerAttackRelease('C4', 0.1, now + i * 0.2)
  }
}

async function playSwung() {
  await initSynth()
  const now = Tone.now()
  let t = now
  for (let i = 0; i < 4; i++) {
    synth.triggerAttackRelease('C4', 0.1, t)
    synth.triggerAttackRelease('C4', 0.1, t + 0.27)
    t += 0.4
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 130: Swing и groove templates</h2>
      <p class="text-textDim mb-6">Swing сдвигает каждую вторую восьмую чуть позже идеальной сетки — это добавляет ритму «покачивание».</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Ровные восьмые против swing</h3>
        <div class="space-y-3">
          <button @click="playStraight" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Ровные восьмые</button>
          <button @click="playSwung" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">С swing (~60%)</button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Параметр Swing в DAW обычно задаётся в процентах: 50% — идеально ровно, 66% — классический триольный свинг. Groove templates идут дальше и
          сдвигают не только чётные восьмые, но и меняют velocity каждой ноты по образцу, снятому с живого исполнения — их можно применить сразу ко всей MIDI-партии одним кликом.
        </p>
      </div>
    </div>
  </div>
</template>
