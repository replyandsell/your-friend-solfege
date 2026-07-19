<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let chordSynth = null
let leadSynth = null
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
  leadSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

async function playLayer1() {
  await initSynth()
  bassSynth.triggerAttackRelease('C2', 1.5, Tone.now())
}

async function playLayer2() {
  await initSynth()
  const now = Tone.now()
  bassSynth.triggerAttackRelease('C2', 1.5, now)
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.4', now)
}

async function playLayer3() {
  await initSynth()
  const now = Tone.now()
  bassSynth.triggerAttackRelease('C2', 1.5, now)
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.4', now)
  leadSynth.triggerAttackRelease('E5', '0.4', now)
  leadSynth.triggerAttackRelease('G5', '0.4', now + 0.5)
  leadSynth.triggerAttackRelease('C6', '0.6', now + 1.0)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 103: Добавление и удаление музыкальных слоёв</h2>
      <p class="text-textDim mb-6">Проще всего управлять развитием трека, включая и выключая уже готовые слои, а не сочиняя новый материал на каждую секцию.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От одного слоя к трём</h3>
        <div class="space-y-3">
          <button @click="playLayer1" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Слой 1 — только бас
          </button>
          <button @click="playLayer2" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Слой 1+2 — бас и аккорды
          </button>
          <button @click="playLayer3" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Слой 1+2+3 — бас, аккорды и лид
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Такая структура — самый распространённый способ строить электронный трек: подготовь 3-5 законченных слоёв заранее, а форму трека потом собирай
          простым включением и выключением их дорожек в нужных местах таймлайна. Это гораздо быстрее, чем сочинять уникальный материал под каждую секцию с нуля.
        </p>
      </div>
    </div>
  </div>
</template>
