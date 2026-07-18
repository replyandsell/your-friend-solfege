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

async function playDrumGroove() {
  await initSynth()
  let now = Tone.now()
  const kicks = [0, 0.5, 1.0, 1.5]
  for (const kick of kicks) {
    synth.triggerAttackRelease('C2', '0.2', now + kick)
  }
}

async function playShuffleGroove() {
  await initSynth()
  let now = Tone.now()
  const shuffled = [0, 0.33, 0.67, 1.0]
  for (const kick of shuffled) {
    synth.triggerAttackRelease('C2', '0.2', now + kick)
  }
}

async function playSwingGroove() {
  await initSynth()
  let now = Tone.now()
  const notes = ['C4', 'E4', 'G4']
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.4
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 23: Groove и shuffle</h2>
      <p class="text-textDim mb-6">Groove — это смещение ритма от идеального grid'а. Shuffle делает музыку "живой" и танцевальной, вместо робо-звучания.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playDrumGroove" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прямой groove (механический)
          </button>
          <button @click="playShuffleGroove" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Shuffle groove (живой)
          </button>
          <button @click="playSwingGroove" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Swing (джазовый groove)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Для продюсера</h3>
        <p class="text-sm text-textDim">В большинстве DAW есть опция "humanize" или "groove". Это смещает ноты на 5-10% от точного grid'а, создавая живой звук. Даже 10% shuffle кардинально меняет feel трека.</p>
      </div>
    </div>
  </div>
</template>
