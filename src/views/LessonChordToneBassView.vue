<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

function playSeq(notes, step = 0.2) {
  let now = Tone.now()
  for (const note of notes) {
    bassSynth.triggerAttackRelease(note, step * 0.85, now)
    now += step
  }
}

async function playRootOnly() {
  await initSynth()
  playSeq(['C2', 'C2', 'C2', 'C2'], 0.3)
}

async function playRootThirdFifth() {
  await initSynth()
  playSeq(['C2', 'E2', 'G2', 'E2'], 0.25)
}

async function playMovingBassLine() {
  await initSynth()
  playSeq(['C2', 'E2', 'G2', 'F2', 'A2', 'C3', 'G2', 'D3'], 0.22)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 87: Бас по звукам аккорда</h2>
      <p class="text-textDim mb-6">Бас необязательно должен стоять на одной ноте. Он может двигаться внутри аккорда — по корню, терции и квинте — оставаясь гармонически «правильным».</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От статики к движению</h3>
        <div class="space-y-3">
          <button @click="playRootOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только корень — статично
          </button>
          <button @click="playRootThirdFifth" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Корень-терция-квинта внутри одного аккорда
          </button>
          <button @click="playMovingBassLine" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Полная басовая линия по звукам двух аккордов (C и F)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Пока бас использует только ноты текущего аккорда, ошибиться почти невозможно — любая из них будет звучать созвучно. Это самый безопасный способ
          сделать басовую партию более живой и мелодичной, чем просто держать одну ноту, не рискуя выйти за рамки гармонии.
        </p>
      </div>
    </div>
  </div>
</template>
