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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playChord(notes) {
  await initSynth()
  synth.triggerAttackRelease(notes, '1.0', Tone.now())
}

async function playAllThree() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['E4', 'G4', 'C5'],
    ['G4', 'C5', 'E5'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.7', now)
    now += 0.85
  }
}

async function playSmoothBass() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['B3', 'D4', 'G4'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.6', now)
    now += 0.75
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 55: Обращения трезвучий</h2>
      <p class="text-textDim mb-6">Обращение — это тот же аккорд, но с другой нотой в басу. Ноты те же, звучание — другое: более гладкое или более напряжённое.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три положения до мажора</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Основной вид — до в басу (C-E-G)
          </button>
          <button @click="playChord(['E4', 'G4', 'C5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Первое обращение — терция в басу (E-G-C)
          </button>
          <button @click="playChord(['G4', 'C5', 'E5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Второе обращение — квинта в басу (G-C-E)
          </button>
          <button @click="playAllThree" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            Все три подряд
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Зачем это нужно на практике</h3>
        <button @click="playSmoothBass" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          C → G/B (обращение) → C — плавный бас вместо скачка
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Обращения нужны в первую очередь для баса: вместо того чтобы бас прыгал широкими интервалами между аккордами, обращение позволяет вести его
          плавно, шаг за шагом. Второе обращение (квинта в басу) звучит менее устойчиво, чем основной вид, и обычно используется как проходящее, а не опорное созвучие.
        </p>
      </div>
    </div>
  </div>
</template>
