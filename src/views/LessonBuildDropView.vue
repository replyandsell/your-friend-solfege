<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let synth = null
let kick = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.15 },
  }).toDestination()
  kick = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
  }).toDestination()
  isInitialized.value = true
}

async function playBuildUp() {
  await initSynth()
  synth.volume.value = 0
  const now = Tone.now()
  const gaps = [0.5, 0.5, 0.25, 0.25, 0.125, 0.125, 0.0625, 0.0625]
  let t = now
  for (const gap of gaps) {
    synth.triggerAttackRelease('C5', gap * 0.9, t)
    t += gap
  }
}

async function playDrop() {
  await initSynth()
  synth.volume.value = 0
  const now = Tone.now()
  kick.triggerAttackRelease('C1', '8n', now)
  synth.triggerAttackRelease(['C4', 'Eb4', 'G4', 'C5'], '0.6', now)
}

async function playBreakdown() {
  await initSynth()
  synth.volume.value = -12
  synth.triggerAttackRelease(['C4', 'G4'], '2.0', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 100: Build-up, drop и breakdown</h2>
      <p class="text-textDim mb-6">Три ключевых состояния драматургии электронного трека: нарастание напряжения, взрыв энергии и минималистичный спад.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три фазы</h3>
        <div class="space-y-3">
          <button @click="playBuildUp" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Build-up — ускоряющийся ритм, нарастающее напряжение
          </button>
          <button @click="playDrop" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Drop — полный аккорд и бочка одновременно, разрядка энергии
          </button>
          <button @click="playBreakdown" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Breakdown — тихо, разрежено, минимум элементов
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Build-up нарастает не громкостью, а плотностью и скоростью событий — учащающийся ритм физически ощущается как нарастающее напряжение.
          Drop работает именно за счёт контраста с этим напряжением: чем сильнее было накопление, тем сильнее ощущается разрядка. Breakdown — обязательная передышка перед следующим циклом, без неё все дропы начинают звучать одинаково.
        </p>
      </div>
    </div>
  </div>
</template>
