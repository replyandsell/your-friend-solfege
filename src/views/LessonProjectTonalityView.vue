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

async function playInScale() {
  await initSynth()
  synth.triggerAttackRelease('E4', '0.6', Tone.now())
}
async function playOutOfScale() {
  await initSynth()
  synth.triggerAttackRelease('Eb4', '0.6', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 125: Тональность проекта и подсветка гаммы</h2>
      <p class="text-textDim mb-6">Большинство DAW умеют подсвечивать в piano roll ноты выбранной гаммы — это не костыль, а полезный ориентир, особенно на старте.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">В гамме и вне гаммы (до мажор)</h3>
        <div class="space-y-3">
          <button @click="playInScale" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Ми — нота гаммы</button>
          <button @click="playOutOfScale" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Ми♭ — вне гаммы</button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Установи тональность проекта в настройках DAW (Scale Highlight в Ableton, In-Key в FL Studio, аналог в Logic) — piano roll подсветит подходящие ноты серым,
          а остальные оставит тёмными. Это не запрещает выходить за пределы гаммы, а просто помогает видеть, где ты сейчас находишься — особенно полезно, когда ещё не выработан абсолютный слух.
        </p>
      </div>
    </div>
  </div>
</template>
