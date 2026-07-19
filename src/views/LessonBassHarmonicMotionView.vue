<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playBassAlone() {
  await initSynth()
  const notes = ['C2', 'A1', 'F1', 'G1']
  let now = Tone.now()
  for (const n of notes) {
    bassSynth.triggerAttackRelease(n, 0.7, now)
    now += 0.8
  }
}

async function playBassWithImpliedChords() {
  await initSynth()
  const steps = [
    { bass: 'C2', chord: ['E4', 'G4'] },
    { bass: 'A1', chord: ['C4', 'E4'] },
    { bass: 'F1', chord: ['A4', 'C5'] },
    { bass: 'G1', chord: ['B4', 'D5'] },
  ]
  let now = Tone.now()
  for (const s of steps) {
    bassSynth.triggerAttackRelease(s.bass, 0.7, now)
    chordSynth.triggerAttackRelease(s.chord, 0.7, now)
    now += 0.8
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 95: Бас как источник гармонического движения</h2>
      <p class="text-textDim mb-6">Иногда именно бас первым «объявляет» смену гармонии — остальные инструменты просто следуют за его движением.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Бас ведёт за собой гармонию</h3>
        <div class="space-y-3">
          <button @click="playBassAlone" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Один только бас — уже слышно движение i–VI–IV–V
          </button>
          <button @click="playBassWithImpliedChords" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С лёгкими штрихами гармонии сверху, следующими за басом
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Басовая линия сама по себе, даже без единого аккорда сверху, способна намекать на гармоническое движение — слух достраивает недостающие ноты.
          Приём удобен при написании трека «снизу вверх»: сначала находишь интересную басовую линию, а уже потом добавляешь аккорды и мелодию, которые её поддерживают.
        </p>
      </div>
    </div>
  </div>
</template>
