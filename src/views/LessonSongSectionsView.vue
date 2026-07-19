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

async function playVerse() {
  await initSynth()
  chordSynth.volume.value = -10
  const now = Tone.now()
  bassSynth.triggerAttackRelease('A1', 1.5, now)
  chordSynth.triggerAttackRelease(['A3', 'C4'], '1.4', now)
}

async function playChorus() {
  await initSynth()
  chordSynth.volume.value = 0
  const now = Tone.now()
  bassSynth.triggerAttackRelease('C2', 1.5, now)
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '1.4', now)
}

async function playBridge() {
  await initSynth()
  chordSynth.volume.value = -4
  const now = Tone.now()
  bassSynth.triggerAttackRelease('F1', 1.5, now)
  chordSynth.triggerAttackRelease(['F3', 'Ab3', 'C4'], '1.4', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 98: Куплет, припев, бридж и инструментальная секция</h2>
      <p class="text-textDim mb-6">У каждой части современного трека своя роль: куплет рассказывает, припев запоминается, бридж даёт передышку и контраст.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три характера одной тональности</h3>
        <div class="space-y-3">
          <button @click="playVerse" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Куплет — минорный оттенок, тише, разреженнее
          </button>
          <button @click="playChorus" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Припев — полный мажорный аккорд, громче и плотнее
          </button>
          <button @click="playBridge" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Бридж — другой аккорд, средняя плотность, контраст
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Припев обычно самый плотный, громкий и гармонически простой раздел — он должен запоминаться с одного раза. Куплет чуть более разрежен, оставляя
          место для текста или деталей. Бридж — единственное место, где уместно временно уйти от привычной гармонии, чтобы вернуть слушателя к финальному припеву с новой энергией.
        </p>
      </div>
    </div>
  </div>
</template>
