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

function playScale(notes, step = 0.22) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, step * 0.9, now)
    now += step
  }
}

async function playMajorPent() {
  await initSynth()
  playScale(['C4', 'D4', 'E4', 'G4', 'A4', 'C5'])
}

async function playMinorPent() {
  await initSynth()
  playScale(['A3', 'C4', 'D4', 'E4', 'G4', 'A4'])
}

async function playLeadRiff() {
  await initSynth()
  playScale(['C5', 'A4', 'G4', 'E4', 'G4', 'A4', 'C5'], 0.18)
}

async function playBassRiff() {
  await initSynth()
  playScale(['A3', 'A3', 'C4', 'E4', 'D4', 'A3'], 0.2)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 48: Пентатоника на практике</h2>
      <p class="text-textDim mb-6">Пентатоника — пять ступеней без полутонов между соседними нотами. Из-за этого в ней почти невозможно взять «неправильную» ноту.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Мажорная и минорная пентатоника</h3>
        <div class="space-y-3">
          <button @click="playMajorPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мажорная пентатоника (до, ре, ми, соль, ля)
          </button>
          <button @click="playMinorPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорная пентатоника (ля, до, ре, ми, соль)
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Применение в треке</h3>
        <div class="space-y-3">
          <button @click="playLeadRiff" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Пример лид-риффа на пентатонике
          </button>
          <button @click="playBassRiff" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Пример басового паттерна на пентатонике
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Пентатоника — быстрый способ написать мелодию, которая гарантированно «звучит музыкально», даже если случайно нажать ноты в произвольном порядке.
          Именно поэтому лид-синты, вокальные хуки и басовые риффы в электронной музыке так часто строятся именно на пентатонике — она прощает импровизацию.
        </p>
      </div>
    </div>
  </div>
</template>
