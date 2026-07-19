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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

async function playFlatVelocity() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4']
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, 0.25, now, 0.8)
    now += 0.28
  }
}

async function playExpressiveVelocity() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4']
  const vels = [0.9, 0.4, 0.6, 0.3, 1.0]
  let now = Tone.now()
  notes.forEach((n, i) => {
    synth.triggerAttackRelease(n, 0.25, now, vels[i])
    now += 0.28
  })
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 127: Velocity как элемент музыкальной фразы</h2>
      <p class="text-textDim mb-6">Velocity — это не просто «громкость ноты», а способ показать, какие ноты важнее, а какие — лишь связки между ними.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одинаковая velocity против выразительной</h3>
        <div class="space-y-3">
          <button @click="playFlatVelocity" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Все ноты — одна и та же velocity
          </button>
          <button @click="playExpressiveVelocity" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Velocity расставлена вручную по фразе
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Ноты на сильных долях обычно получают более высокую velocity, а проходящие и вспомогательные — более низкую. Многие DAW по умолчанию ставят
          всем нотам, введённым мышью, одну и ту же velocity (например, 100) — стоит сознательно пройтись по фразе и вручную снизить velocity у нестержневых нот, чтобы мелодия зазвучала «сыграно», а не «нарисовано».
        </p>
      </div>
    </div>
  </div>
</template>
