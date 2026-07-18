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

async function playMinimalTrack() {
  await initSynth()
  let now = Tone.now()
  const chords = [
    ['A4', 'C5', 'E5'],
    ['E4', 'G4', 'B4'],
  ]
  const melody = ['A5', 'G5', 'E5', 'G5']
  for (let i = 0; i < 2; i++) {
    for (const chord of chords) {
      for (const note of chord) {
        synth.triggerAttackRelease(note, '0.3', now)
      }
      now += 0.4
    }
  }
}

async function playWithMelody() {
  await initSynth()
  let now = Tone.now()
  const chords = [
    ['A4', 'C5', 'E5'],
    ['E4', 'G4', 'B4'],
  ]
  const melody = ['A5', 'G5', 'E5', 'D5']
  for (let i = 0; i < 2; i++) {
    for (const chord of chords) {
      for (const note of chord) {
        synth.triggerAttackRelease(note, '0.3', now)
      }
      now += 0.4
    }
  }
  for (const mel of melody) {
    synth.triggerAttackRelease(mel, '0.3', now)
    now += 0.5
  }
}

async function playFullArrangement() {
  await initSynth()
  let now = Tone.now()
  const intro = [['A4', 'C5', 'E5']]
  const verse = [
    ['A4', 'C5', 'E5'],
    ['E4', 'G4', 'B4'],
  ]
  const melody = ['A5', 'G5', 'E5', 'D5']
  
  for (const chord of intro) {
    for (const note of chord) {
      synth.triggerAttackRelease(note, '0.2', now)
    }
    now += 0.3
  }
  
  for (let i = 0; i < 2; i++) {
    for (const chord of verse) {
      for (const note of chord) {
        synth.triggerAttackRelease(note, '0.25', now)
      }
      now += 0.35
    }
  }
  
  for (const mel of melody) {
    synth.triggerAttackRelease(mel, '0.3', now)
    now += 0.4
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 25: Практика — пишем свой трек</h2>
      <p class="text-textDim mb-6">Заключение курса. Применяем всё, что выучили: гармонию, мелодию, ритм, аранжировку.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Варианты композиции</h3>
        <div class="space-y-3">
          <button @click="playMinimalTrack" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минимальный трек (только аккорды)
          </button>
          <button @click="playWithMelody" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С мелодией (аккорды + top line)
          </button>
          <button @click="playFullArrangement" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Полная аранжировка (intro + verse + melody)
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Что ты теперь знаешь</h3>
        <div class="text-sm text-textDim space-y-2">
          <p>✓ Пульс и ритм — основа музыки</p>
          <p>✓ Интервалы и аккорды — гармония</p>
          <p>✓ Лады и пентатоника — инструмент импровизации</p>
          <p>✓ Groove и фразировка — живой звук</p>
          <p>✓ Как строить луп и аранжировку</p>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semибold mb-3">Дальше</h3>
        <p class="text-sm text-textDim mb-4">Эти 25 уроков — фундамент. Дальше:</p>
        <p class="text-sm text-textDim">1. Открой свой DAW (Ableton, FL Studio, Reaper)</p>
        <p class="text-sm text-textDim">2. Создай луп из трёх-четырёх аккордов</p>
        <p class="text-sm text-textDim">3. Напиши мелодию на пентатонике</p>
        <p class="text-sm text-textDim">4. Добавь shuffle и варьируй</p>
        <p class="text-sm text-textDim">5. Слушай, как это звучит</p>
      </div>
    </div>
  </div>
</template>
