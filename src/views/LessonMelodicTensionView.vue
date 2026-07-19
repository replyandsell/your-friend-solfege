<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let melodySynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playTensionOnly() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['G4', 'B4', 'D5'], '0.9', now)
  melodySynth.triggerAttackRelease('F5', '0.8', now)
}

async function playTensionAndResolution() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['G4', 'B4', 'D5'], '0.8', now)
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.0', now + 0.9)
  melodySynth.triggerAttackRelease('F5', '0.7', now)
  melodySynth.triggerAttackRelease('E5', '0.9', now + 0.9)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 80: Напряжение и разрешение в мелодии</h2>
      <p class="text-textDim mb-6">Мелодическая нота, которая не совпадает с аккордом, создаёт трение. Слух ждёт, когда она сдвинется на соседнюю, более спокойную ноту.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Напряжённая нота без и с разрешением</h3>
        <div class="space-y-3">
          <button @click="playTensionOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Фа над соль-мажором — диссонанс, оставленный «висеть»
          </button>
          <button @click="playTensionAndResolution" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Та же нота, но со сходом в ми над до-мажором — разрешение
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Напряжение без разрешения звучит незаконченным и, если использовать это осознанно, держит слушателя в подвешенном состоянии — полезно перед дропом
          или сменой секции. Но если каждая фраза остаётся неразрешённой, трек начинает звучать утомительно. Баланс «создал напряжение → разрешил» — это то, что делает мелодию драматургически живой.
        </p>
      </div>
    </div>
  </div>
</template>
