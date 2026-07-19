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

function playSeq(notes, step = 0.3) {
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, step * 0.85, now)
    now += step
  }
}

async function playOctaves() {
  await initSynth()
  playSeq(['C2', 'C3', 'C4', 'C5', 'C6'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 124: Ноты и октавы в piano roll</h2>
      <p class="text-textDim mb-6">Вертикальная ось piano roll — это высота, горизонтальная — время. Разобраться в нумерации октав нужно один раз, дальше это работает автоматически.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">До в пяти октавах</h3>
        <button @click="playOctaves" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          C2 → C3 → C4 → C5 → C6
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Важная ловушка</h3>
        <p class="text-sm text-textDim">
          «Средняя до» (C4 в этом курсе) в разных DAW может называться C3, C4 или C5 — единого стандарта нет: Ableton, FL Studio и Logic нумеруют октавы по-разному.
          Перед тем как ориентироваться по названиям нот в конкретной программе, проверь одну ноту на слух — это надёжнее, чем полагаться на подпись.
        </p>
      </div>
    </div>
  </div>
</template>
