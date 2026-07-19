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

function playRiff(notes, step = 0.22) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, step * 0.9, now)
    now += step
  }
}

async function playIonianMood() {
  await initSynth()
  playRiff(['C4', 'E4', 'G4', 'C5', 'G4', 'E4'])
}

async function playAeolianMood() {
  await initSynth()
  playRiff(['C4', 'Eb4', 'G4', 'C5', 'G4', 'Eb4'])
}

async function playDorianMood() {
  await initSynth()
  playRiff(['C4', 'Eb4', 'G4', 'A4', 'G4', 'Eb4'])
}

async function playPhrygianMood() {
  await initSynth()
  playRiff(['C4', 'Db4', 'G4', 'C5', 'G4', 'Db4'])
}

async function playLydianMood() {
  await initSynth()
  playRiff(['C4', 'E4', 'F#4', 'G4', 'F#4', 'E4'])
}

async function playMixolydianMood() {
  await initSynth()
  playRiff(['C4', 'E4', 'G4', 'Bb4', 'G4', 'E4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 51: Выбор лада для нужного характера трека</h2>
      <p class="text-textDim mb-6">Один и тот же короткий рифф от одной и той же ноты «до» — но лад меняет всё настроение. Сравни на слух и выбирай под задачу трека.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Один рифф, разные лады</h3>
        <div class="space-y-3">
          <button @click="playIonianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ионийский — ярко, позитивно, «поп-мажор»
          </button>
          <button @click="playAeolianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Эолийский — грустно, серьёзно, классический минор
          </button>
          <button @click="playDorianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Дорийский — минорный, но с надеждой; deep house, lo-fi
          </button>
          <button @click="playPhrygianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Фригийский — напряжённо, экзотично, восточный колорит
          </button>
          <button @click="playLydianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Лидийский — воздушно, мечтательно, кинематографично
          </button>
          <button @click="playMixolydianMood" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Миксолидийский — грувово, уверенно, фанк/блюз
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Перед тем как писать мелодию, полезно спросить: какое настроение нужно треку? Дальше выбор лада — не случайность, а инструмент.
          Хочешь мрачный техно-бас — бери эолийский или фригийский. Нужен светлый, но не приторный house-лид — попробуй дорийский. Для атмосферных брейков и интро отлично работает лидийский.
        </p>
      </div>
    </div>
  </div>
</template>
