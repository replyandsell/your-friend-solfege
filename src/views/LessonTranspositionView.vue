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

function playMelody(notes) {
  let now = Tone.now()
  const durations = [0.25, 0.25, 0.25, 0.5]
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, durations[i] * 0.9, now)
    now += durations[i]
  })
}

async function playInC() {
  await initSynth()
  playMelody(['C4', 'E4', 'G4', 'C5'])
}

async function playInD() {
  await initSynth()
  playMelody(['D4', 'F#4', 'A4', 'D5'])
}

async function playInG() {
  await initSynth()
  playMelody(['G4', 'B4', 'D5', 'G5'])
}

async function playChordInC() {
  await initSynth()
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.8', Tone.now())
}

async function playChordInEb() {
  await initSynth()
  synth.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], '0.8', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 46: Транспонирование мелодии и аккордов</h2>
      <p class="text-textDim mb-6">Транспонирование — это перенос одной и той же музыкальной идеи в другую тональность. Форма остаётся, меняется только высота.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одна мелодия, три тональности</h3>
        <div class="space-y-3">
          <button @click="playInC" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мелодия в до мажоре
          </button>
          <button @click="playInD" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Та же мелодия в ре мажоре (+2 полутона)
          </button>
          <button @click="playInG" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Та же мелодия в соль мажоре (+7 полутонов)
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Аккорд тоже можно транспонировать</h3>
        <div class="space-y-3">
          <button @click="playChordInC" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Трезвучие до мажор
          </button>
          <button @click="playChordInEb" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            То же трезвучие, перенесённое в ми♭ мажор
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          В DAW транспонирование чаще всего делают простым выделением нот в piano roll и сдвигом мышью или горячей клавишей на нужное число полутонов —
          интервальные отношения между нотами сохраняются автоматически. Полезно транспонировать под диапазон вокалиста, под удобную тональность для сведения слоёв, или чтобы «освежить» повторяющийся луп.
        </p>
      </div>
    </div>
  </div>
</template>
