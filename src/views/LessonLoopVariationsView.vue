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

function playSeq(notes, step = 0.2) {
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, step * 0.85, now)
    now += step
  }
}

async function playLoopA() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'E4'])
}
async function playLoopB() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'A4', 'G4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 133: Создание вариаций loop</h2>
      <p class="text-textDim mb-6">Самый быстрый способ получить вариацию — скопировать существующий луп и изменить в копии одну-две ноты, а не сочинять с нуля.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Оригинал и его вариация</h3>
        <div class="space-y-3">
          <button @click="playLoopA" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Луп A — оригинал</button>
          <button @click="playLoopB" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Луп B — последние две ноты изменены</button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Практический совет</h3>
        <p class="text-sm text-textDim">
          В DAW удобно держать луп в отдельном клипе, дублировать его (Ctrl/Cmd+D) на следующий цикл и вносить точечные правки в копию: сдвинуть одну ноту
          по высоте, изменить длительность последней ноты, добавить проходящий звук. Оригинал остаётся нетронутым — всегда можно вернуться к нему как к «якорной» версии.
        </p>
      </div>
    </div>
  </div>
</template>
