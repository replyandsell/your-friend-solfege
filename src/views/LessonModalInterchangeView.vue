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
  synth.triggerAttackRelease(notes, '0.9', Tone.now())
}

async function playBorrowedProgression() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'Ab4', 'C5'],
    ['Ab4', 'C5', 'Eb5'],
    ['G4', 'B4', 'D5'],
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
      <h2 class="text-2xl font-semibold mb-2">Урок 67: Заимствованные аккорды (modal interchange)</h2>
      <p class="text-textDim mb-6">В мажорной тональности можно «одолжить» аккорд из одноимённого минора — тоника останется той же, а цвет резко потемнеет.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Свой IV против заимствованного iv</h3>
        <div class="space-y-3">
          <button @click="playChord(['F4', 'A4', 'C5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            IV из до мажора — фа мажор
          </button>
          <button @click="playChord(['F4', 'Ab4', 'C5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            iv, заимствованный из до минора — фа минор
          </button>
          <button @click="playChord(['Ab4', 'C5', 'Eb5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ♭VI, заимствованный из до минора — ля♭ мажор
          </button>
          <button @click="playBorrowedProgression" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прогрессия с заимствованиями: C → Fm → A♭ → G
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Самые популярные заимствования — iv (минорная субдоминанта) и ♭VI, ♭VII из одноимённого минора. Они добавляют «кинематографичную» грусть в мажорную гармонию,
          не меняя тонику — этим приёмом активно пользуются и в поп-балладах, и в атмосферных электронных треках для эмоционального контраста внутри одной тональности.
        </p>
      </div>
    </div>
  </div>
</template>
