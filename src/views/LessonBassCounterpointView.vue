<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let melodySynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

function playTwoLines(bassNotes, melodyNotes, step = 0.35) {
  let now = Tone.now()
  bassNotes.forEach((n, i) => bassSynth.triggerAttackRelease(n, step * 0.85, now + i * step))
  melodyNotes.forEach((n, i) => melodySynth.triggerAttackRelease(n, step * 0.85, now + i * step))
}

async function playParallel() {
  await initSynth()
  playTwoLines(['C2', 'D2', 'E2', 'F2'], ['C4', 'D4', 'E4', 'F4'])
}

async function playContrary() {
  await initSynth()
  playTwoLines(['C2', 'B1', 'A1', 'G1'], ['C4', 'D4', 'E4', 'F4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 90: Контрапункт баса и мелодии</h2>
      <p class="text-textDim mb-6">Бас и мелодия могут двигаться в одну сторону — а могут в противоположные. Второй вариант делает обе линии слышнее по отдельности.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Параллельное и противоположное движение</h3>
        <div class="space-y-3">
          <button @click="playParallel" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Параллельное — бас и мелодия идут вверх вместе
          </button>
          <button @click="playContrary" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Противоположное — мелодия вверх, бас вниз
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Когда бас и мелодия двигаются параллельно, они частично «сливаются» и слух хуже различает их как отдельные линии. Противоположное движение
          (контрапункт) визуально и на слух расширяет пространство между верхом и низом — оба голоса становятся отчётливее, а трек звучит объёмнее без добавления новых слоёв.
        </p>
      </div>
    </div>
  </div>
</template>
