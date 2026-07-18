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

async function playPerfect() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.4', now)
  now += 0.45
  synth.triggerAttackRelease('G4', '0.4', now)
}

async function playTriton() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.4', now)
  now += 0.45
  synth.triggerAttackRelease('F#4', '0.4', now)
}

async function playDiabolus() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('F#4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('C4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('G4', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 16: Тритон — диаболус в музыке</h2>
      <p class="text-textDim mb-6">Тритон (F# от До) исторически считался самым напряженным интервалом. В средневековье его запрещали!</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playPerfect" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Квинта (До-Соль) — стабильно
          </button>
          <button @click="playTriton" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тритон (До-Фа#) — напряженно
          </button>
          <button @click="playDiabolus" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тритон и разрешение
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semибold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Тритон создает максимальное напряжение. Это используется в металле, хоррорах, саундтреках. Один из самых узнаваемых интервалов в кино.</p>
      </div>
    </div>
  </div>
</template>
