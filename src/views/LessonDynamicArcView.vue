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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

async function playFlat() {
  await initSynth()
  synth.volume.value = -6
  const chord = ['C4', 'E4', 'G4']
  let now = Tone.now()
  for (let i = 0; i < 6; i++) {
    synth.triggerAttackRelease(chord, 0.3, now)
    now += 0.35
  }
}

async function playArc() {
  await initSynth()
  const chord = ['C4', 'E4', 'G4']
  const now = Tone.now()
  const volumes = [-20, -14, -8, -2, -8, -20]
  let t = now
  volumes.forEach((vol) => {
    synth.volume.setValueAtTime(vol, t)
    synth.triggerAttackRelease(chord, 0.3, t)
    t += 0.35
  })
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 105: Динамическая и эмоциональная дуга</h2>
      <p class="text-textDim mb-6">Громкость и энергия трека не должны быть плоской линией — путь от тихого к громкому и обратно ощущается как история с развитием.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Ровная громкость против дуги</h3>
        <div class="space-y-3">
          <button @click="playFlat" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ровная громкость — одинаково от начала до конца
          </button>
          <button @click="playArc" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Дуга — тихо, нарастание, пик, спад
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Постоянная громкость на всей длине трека быстро утомляет слух — даже если материал сам по себе хороший. Продумай общую дугу заранее:
          где в треке самая тихая точка, где кульминация, и как долго длится путь между ними. Динамическая дуга работает не только на уровне громкости, но и на уровне плотности, регистра и гармонического ритма одновременно.
        </p>
      </div>
    </div>
  </div>
</template>
