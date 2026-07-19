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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

function playSeq(notes, durations) {
  let now = Tone.now()
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, durations[i] * 0.85, now)
    now += durations[i]
  })
}

async function playSingleNote() {
  await initSynth()
  playSeq(['E4'], [0.6])
}

async function playMotif() {
  await initSynth()
  playSeq(['C4', 'D4', 'E4', 'C4'], [0.2, 0.2, 0.2, 0.4])
}

async function playMotifTwice() {
  await initSynth()
  playSeq(['C4', 'D4', 'E4', 'C4', 'C4', 'D4', 'E4', 'C4'], [0.2, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.4])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 72: Мотив как минимальная музыкальная идея</h2>
      <p class="text-textDim mb-6">Мотив — самая маленькая единица музыки, которую слух ещё способен узнать и запомнить. Меньше мотива — уже просто отдельная нота.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От ноты к мотиву</h3>
        <div class="space-y-3">
          <button @click="playSingleNote" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Одна нота — запомнить нечего
          </button>
          <button @click="playMotif" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мотив — четыре ноты с узнаваемым ритмом и контуром
          </button>
          <button @click="playMotifTwice" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мотив дважды подряд — слух сразу узнаёт повтор
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          У мотива есть контур высоты (вверх/вниз) и ритмический рисунок — вместе они образуют «отпечаток», который слух распознаёт даже в изменённом виде.
          Практически весь трек в электронной музыке часто строится из одного-двух мотивов длиной 2-4 ноты, которые повторяются и развиваются на протяжении всей композиции.
        </p>
      </div>
    </div>
  </div>
</template>
