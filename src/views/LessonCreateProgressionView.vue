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

async function playProgression(chords, step = 0.75) {
  await initSynth()
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, step * 0.85, now)
    now += step
  }
}

async function playPop() {
  await playProgression([
    ['C4', 'E4', 'G4'],
    ['A3', 'C4', 'E4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
  ])
}

async function playJazzTurnaround() {
  await playProgression([
    ['D4', 'F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5', 'F5'],
    ['C4', 'E4', 'G4', 'B4'],
  ])
}

async function playSadLoop() {
  await playProgression([
    ['A3', 'C4', 'E4'],
    ['F4', 'A4', 'C5'],
    ['C4', 'E4', 'G4'],
    ['G4', 'B4', 'D5'],
  ])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 71: Создание собственной аккордовой последовательности</h2>
      <p class="text-textDim mb-6">Весь модуль про гармонию сводится к одному навыку — собрать из знакомых блоков свою прогрессию. Вот три проверенных каркаса, с которых удобно начать.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три рабочих каркаса</h3>
        <div class="space-y-3">
          <button @click="playPop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            I–vi–IV–V — универсальная поп/EDM прогрессия
          </button>
          <button @click="playJazzTurnaround" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ii7–V7–Imaj7 — джазовый оборот, движение по квинтам
          </button>
          <button @click="playSadLoop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            vi–IV–I–V — минорный/меланхоличный луп для интро
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как собрать свою</h3>
        <p class="text-sm text-textDim">
          1) Выбери тонику и лад под настроение (уроки 47, 51). 2) Возьми функции T–S–D (урок 58) и реши, куда движется прогрессия.
          3) Добавь один-два цветных приёма: обращение для плавного баса (уроки 55, 57), заимствованный аккорд для контраста (урок 67) или вторичную доминанту для яркого перехода (урок 66).
          4) Проверь гармонический ритм (урок 59) — подходит ли темп смены аккордов настроению трека. Этого набора шагов достаточно, чтобы написать рабочую прогрессию для любого жанра.
        </p>
      </div>
    </div>
  </div>
</template>
