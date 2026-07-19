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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

async function playReference() {
  await initSynth()
  const steps = [
    { bass: 'A1', chord: ['A3', 'C4', 'E4'] },
    { bass: 'F1', chord: ['F3', 'A3', 'C4'] },
    { bass: 'C2', chord: ['C4', 'E4', 'G4'] },
    { bass: 'G1', chord: ['G3', 'B3', 'D4'] },
  ]
  let now = Tone.now()
  for (const s of steps) {
    bassSynth.triggerAttackRelease(s.bass, 0.6, now)
    chordSynth.triggerAttackRelease(s.chord, 0.6, now)
    now += 0.7
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 135: Анализ референсного трека</h2>
      <p class="text-textDim mb-6">Умение разобрать чужой трек «по косточкам» — гармонию, форму, плотность — ускоряет обучение сильнее, чем что-либо ещё.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Пример прогрессии для разбора</h3>
        <button @click="playReference" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Слушать (vi–IV–I–V, попробуй определить сам)
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Чек-лист разбора референса</h3>
        <p class="text-sm text-textDim">
          1) Тональность и лад (мажор/минор — урок 114). 2) Аккордовая прогрессия и её функции (уроки 58, 119). 3) Форма трека по секциям (уроки 96-98).
          4) Плотность и слои в каждой секции (урок 103). 5) Темп и характер ритмической сетки (свинг, синкопы — модуль 14). Пройдясь по этому списку на любимом треке,
          получаешь готовый план для собственной композиции — не копию, а понимание, из каких блоков она сделана.
        </p>
      </div>
    </div>
  </div>
</template>
