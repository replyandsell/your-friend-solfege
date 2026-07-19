<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let melodySynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playChordTones() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '2.0', now)
  const notes = ['C5', 'E5', 'G5', 'E5']
  let t = now
  for (const n of notes) {
    melodySynth.triggerAttackRelease(n, '0.4', t)
    t += 0.45
  }
}

async function playWithPassing() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '2.0', now)
  const notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'F5', 'E5']
  let t = now
  for (const n of notes) {
    melodySynth.triggerAttackRelease(n, '0.25', t)
    t += 0.3
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 78: Опорные и проходящие ноты</h2>
      <p class="text-textDim mb-6">Опорные ноты — те, что входят в звучащий аккорд, они устойчивы. Проходящие соединяют опорные ноты шагами, создавая плавность.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Мелодия над до мажором</h3>
        <div class="space-y-3">
          <button @click="playChordTones" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только опорные ноты — до, ми, соль (звучит «угловато»)
          </button>
          <button @click="playWithPassing" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С проходящими нотами — ре и фа соединяют скачки шагами
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Мелодия, состоящая только из опорных нот, звучит правильно, но угловато и предсказуемо. Проходящие ноты, которые не входят в аккорд, но заполняют
          промежутки между опорными нотами шагами, делают линию более певучей. Правило безопасности: проходящую ноту лучше ставить на слабую долю, а опорную — на сильную.
        </p>
      </div>
    </div>
  </div>
</template>
