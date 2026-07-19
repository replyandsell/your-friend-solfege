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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

const A = [['C4', 0.25], ['E4', 0.25], ['G4', 0.5]]
const B = [['F4', 0.25], ['A4', 0.25], ['D5', 0.5]]

function playIdea(idea) {
  let now = Tone.now()
  for (const [note, dur] of idea) {
    synth.triggerAttackRelease(note, dur * 0.9, now)
    now += dur
  }
  return now
}

async function playA() {
  await initSynth()
  playIdea(A)
}

async function playB() {
  await initSynth()
  playIdea(B)
}

async function playAB() {
  await initSynth()
  let now = Tone.now()
  for (const [note, dur] of [...A, ...B]) {
    synth.triggerAttackRelease(note, dur * 0.9, now)
    now += dur
  }
}

async function playABA() {
  await initSynth()
  let now = Tone.now()
  for (const [note, dur] of [...A, ...B, ...A]) {
    synth.triggerAttackRelease(note, dur * 0.9, now)
    now += dur
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 97: Формы AB, ABA и AABA</h2>
      <p class="text-textDim mb-6">Буквенные схемы описывают, в каком порядке чередуются знакомые (A) и контрастные (B) разделы трека.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Две идеи и их комбинации</h3>
        <div class="space-y-3">
          <button @click="playA" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Идея A
          </button>
          <button @click="playB" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Идея B (контрастная)
          </button>
          <button @click="playAB" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Форма AB — знакомое, затем новое
          </button>
          <button @click="playABA" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Форма ABA — знакомое, контраст, возвращение
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          ABA — самая устойчивая и приятная слуху форма: она даёт контраст (B) и одновременно чувство завершённости за счёт возврата к A.
          AABA — классическая форма куплетных песен: два раза знакомая идея, один раз контраст (бридж), и снова знакомая — легко узнаётся на любом расстоянии.
        </p>
      </div>
    </div>
  </div>
</template>
