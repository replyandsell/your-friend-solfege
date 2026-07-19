<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let hat = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  hat = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
  }).toDestination()
  isInitialized.value = true
}

async function playSameRhythm() {
  await initSynth()
  const now = Tone.now()
  for (let i = 0; i < 8; i++) {
    hat.triggerAttackRelease('16n', now + i * 0.2)
    bassSynth.triggerAttackRelease('C2', 0.15, now + i * 0.2)
  }
}

async function playContrastRhythm() {
  await initSynth()
  const now = Tone.now()
  for (let i = 0; i < 8; i++) {
    hat.triggerAttackRelease('16n', now + i * 0.2)
  }
  const bassTimes = [0, 0.3, 0.5, 0.9, 1.2, 1.4]
  for (const t of bassTimes) {
    bassSynth.triggerAttackRelease('C2', 0.15, now + t)
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 92: Ритмический контраст баса и ударных</h2>
      <p class="text-textDim mb-6">Если бас повторяет ритм ударных один в один, трек звучит плоско. Разные ритмические рисунки создают ощущение груva и объёма.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одинаковый ритм против контраста</h3>
        <div class="space-y-3">
          <button @click="playSameRhythm" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Бас повторяет ритм хай-хэта — монотонно
          </button>
          <button @click="playContrastRhythm" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Бас со своим рисунком поверх ровного хай-хэта — грувовее
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Хороший грув часто строится на контрасте плотностей: один слой держит ровный, предсказуемый пульс (например, хай-хэт восьмыми), а другой —
          бас — двигается более прихотливо, с паузами и синкопами. Этот контраст даёт слуху за что зацепиться, вместо того чтобы все элементы били в одну и ту же сетку.
        </p>
      </div>
    </div>
  </div>
</template>
