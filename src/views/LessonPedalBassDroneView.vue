<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.4, decay: 0.2, sustain: 0.9, release: 1.0 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playDrone() {
  await initSynth()
  bassSynth.triggerAttackRelease('C2', 3.0, Tone.now())
}

async function playDroneWithChanging() {
  await initSynth()
  const now = Tone.now()
  bassSynth.triggerAttackRelease('C2', 3.2, now)
  const chords = [
    ['C4', 'E4', 'G4'],
    ['C4', 'F4', 'A4'],
    ['B3', 'D4', 'G4'],
    ['C4', 'E4', 'G4'],
  ]
  let t = now
  for (const c of chords) {
    chordSynth.triggerAttackRelease(c, '0.7', t)
    t += 0.8
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 94: Pedal bass и drone</h2>
      <p class="text-textDim mb-6">Долгая, тянущаяся нота баса — drone — создаёт неподвижный фундамент, на фоне которого может происходить любое гармоническое движение сверху.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Дрон сам по себе и с гармонией</h3>
        <div class="space-y-3">
          <button @click="playDrone" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Просто дрон — одна долгая нота
          </button>
          <button @click="playDroneWithChanging" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Дрон + меняющиеся аккорды поверх него
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Дрон особенно хорош в интро, атмосферных брейках и эмбиенте — он даёт ощущение стабильности и «места», не отвлекая ритмом. Гармония наверху
          при этом может быть довольно смелой: даже необычные аккорды звучат оправданно, пока низкий дрон держит слушателя на одной устойчивой точке отсчёта.
        </p>
      </div>
    </div>
  </div>
</template>
