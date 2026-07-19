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

function playScale(notes) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playIonian() {
  await initSynth()
  playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
}
async function playDorian() {
  await initSynth()
  playScale(['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5'])
}
async function playPhrygian() {
  await initSynth()
  playScale(['E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'])
}
async function playLydian() {
  await initSynth()
  playScale(['F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5'])
}
async function playMixolydian() {
  await initSynth()
  playScale(['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'])
}
async function playAeolian() {
  await initSynth()
  playScale(['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'])
}
async function playLocrian() {
  await initSynth()
  playScale(['B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 47: Семь диатонических ладов</h2>
      <p class="text-textDim mb-6">Это одни и те же белые клавиши (ноты до мажора), но каждая начинается со своей ступени — и звучит совершенно по-разному.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Все семь ладов от «своей» ноты</h3>
        <div class="space-y-3">
          <button @click="playIonian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ионийский (от до) — обычный мажор, устойчивый и светлый
          </button>
          <button @click="playDorian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Дорийский (от ре) — минор с приподнятой VI ступенью, джазовый
          </button>
          <button @click="playPhrygian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Фригийский (от ми) — минор с пониженной II, испанский колорит
          </button>
          <button @click="playLydian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Лидийский (от фа) — мажор с повышенной IV, «парящий», кинематографичный
          </button>
          <button @click="playMixolydian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Миксолидийский (от соль) — мажор с пониженной VII, блюзовый и рок-звук
          </button>
          <button @click="playAeolian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Эолийский (от ля) — обычный натуральный минор
          </button>
          <button @click="playLocrian" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Локрийский (от си) — уменьшённая V ступень, неустойчивый, почти не используется как основной лад
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Все семь ладов — это одна и та же гамма до мажора, просто «прочитанная» с разных ступеней. В электронной музыке чаще всего встречаются
          эолийский (минор для мрачных треков), дорийский (минорный, но не такой тяжёлый — популярен в deep house и lo-fi) и миксолидийский (грувовый, с блюзовым оттенком).
        </p>
      </div>
    </div>
  </div>
</template>
