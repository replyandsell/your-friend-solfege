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

async function playAmVIIloop() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('A4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('G4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('A4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('G4', '0.3', now)
}

async function playEmVIIloop() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('E4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('D4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('E4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('D4', '0.3', now)
}

async function playDmVIIloop() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('D4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('D4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('C4', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 17: Прогрессия i-VII в миноре</h2>
      <p class="text-textDim mb-6">В миноре движение i (минорная тоника) к VII (большой мажорный аккорд) создает особую атмосферу — меланхолию с надеждой.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playAmVIIloop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Am → G (классическое движение)
          </button>
          <button @click="playEmVIIloop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Em → D (нежное)
          </button>
          <button @click="playDmVIIloop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Dm → C (мощное)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Для продюсера</h3>
        <p class="text-sm text-textDim">Эта прогрессия используется везде: в роке (Metallica), в инди-роке, в электронной музыке. Создает движение без разрешения — идеально для лупов.</p>
      </div>
    </div>
  </div>
</template>
