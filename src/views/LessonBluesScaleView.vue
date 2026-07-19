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

async function playMinorPent() {
  await initSynth()
  playScale(['A3', 'C4', 'D4', 'E4', 'G4', 'A4'])
}

async function playBluesScale() {
  await initSynth()
  playScale(['A3', 'C4', 'D4', 'Eb4', 'E4', 'G4', 'A4'])
}

async function playBlueNote() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('D4', '0.3', now)
  synth.triggerAttackRelease('Eb4', '0.3', now + 0.35)
  synth.triggerAttackRelease('E4', '0.5', now + 0.7)
}

async function playLick() {
  await initSynth()
  playScale(['A3', 'C4', 'D4', 'Eb4', 'D4', 'A3'], 0.2)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 49: Блюзовый звукоряд</h2>
      <p class="text-textDim mb-6">Блюзовый звукоряд — это минорная пентатоника плюс одна «грязная» добавленная нота, blue note. Именно она даёт узнаваемый надрыв.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От пентатоники к блюзу</h3>
        <div class="space-y-3">
          <button @click="playMinorPent" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорная пентатоника (без blue note)
          </button>
          <button @click="playBluesScale" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Блюзовый звукоряд (добавлена ♭5)
          </button>
          <button @click="playBlueNote" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Сама blue note крупным планом (ре → ми♭ → ми)
          </button>
          <button @click="playLick" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Короткая блюзовая фраза
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Blue note — это пониженная V ступень, зажатая между чистой квартой и чистой квинтой. Она звучит как «неправильная» нота, которая тут же
          проскальзывает мимо к соседней правильной. В электронной музыке этот приём часто используют в бас-линиях и вокальных сэмплах, чтобы добавить грув и «человечность» звучанию.
        </p>
      </div>
    </div>
  </div>
</template>
