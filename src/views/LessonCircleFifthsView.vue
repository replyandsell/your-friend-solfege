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

async function playAscendingFifths() {
  await initSynth()
  const notes = ['C4', 'G4', 'D5', 'A5', 'E5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.3', now)
    now += 0.4
  }
}

async function playDescendingFifths() {
  await initSynth()
  const notes = ['C5', 'F4', 'Bb4', 'Eb4', 'Ab4']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.3', now)
    now += 0.4
  }
}

async function playProgression() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(['D4', 'F4', 'A4'], '0.6', now)
  synth.triggerAttackRelease(['G3', 'B3', 'D4'], '0.6', now + 0.7)
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.9', now + 1.4)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 45: Квинтовый круг на практике</h2>
      <p class="text-textDim mb-6">Квинтовый круг — это не теория ради теории, а карта, по которой строятся аккордовые прогрессии и удобные транспозиции.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Движение по квинтам</h3>
        <div class="space-y-3">
          <button @click="playAscendingFifths" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Вверх по чистым квинтам: до → соль → ре → ля → ми
          </button>
          <button @click="playDescendingFifths" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Вниз по квинтам (= вверх по квартам): до → фа → си♭ → ми♭ → ля♭
          </button>
          <button @click="playProgression" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прогрессия ii–V–I по квинтовому кругу (Dm → G → C)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Движение баса вниз по квинтам (или вверх по квартам) — самое сильное гармоническое движение в музыке: именно так устроена почти любая каденция ii–V–I.
          В DAW квинтовый круг удобен ещё и для транспозиции: соседние тональности на круге отличаются всего на одну ноту, поэтому переход между ними звучит естественно, а не «чужеродно».
        </p>
      </div>
    </div>
  </div>
</template>
