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

function playSeq(notes, step = 0.25) {
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, step * 0.85, now)
    now += step
  }
}

async function playOriginal() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'C5'])
}
async function playUp5() {
  await initSynth()
  playSeq(['F4', 'A4', 'C5', 'F5'])
}
async function playDown3() {
  await initSynth()
  playSeq(['A3', 'C#4', 'E4', 'A4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 126: Транспонирование MIDI</h2>
      <p class="text-textDim mb-6">В DAW транспонирование — это выделить клип и сдвинуть на нужное число полутонов. Все интервалы внутри клипа сохраняются автоматически.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Один клип, три позиции</h3>
        <div class="space-y-3">
          <button @click="playOriginal" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">Оригинал</button>
          <button @click="playUp5" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">+5 полутонов</button>
          <button @click="playDown3" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">-3 полутона</button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Практический совет</h3>
        <p class="text-sm text-textDim">
          Горячие клавиши транспонирования (обычно Ctrl/Cmd + стрелки вверх/вниз) двигают выделенные ноты на полутон, а с Shift — сразу на октаву.
          Транспонируй целыми клипами, а не отдельными нотами, если хочешь сохранить форму мелодии или аккорда — иначе легко случайно сломать интервалы внутри идеи.
        </p>
      </div>
    </div>
  </div>
</template>
