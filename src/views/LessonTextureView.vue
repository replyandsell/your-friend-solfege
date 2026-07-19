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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playSparse() {
  await initSynth()
  synth.triggerAttackRelease(['C3'], '2.0', Tone.now())
}

async function playDense() {
  await initSynth()
  synth.triggerAttackRelease(['C2', 'C3', 'E3', 'G3', 'C4', 'E4', 'G4', 'C5'], '2.0', Tone.now())
}

async function playWideRegister() {
  await initSynth()
  synth.triggerAttackRelease(['C2', 'G5'], '2.0', Tone.now())
}

async function playNarrowRegister() {
  await initSynth()
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '2.0', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 104: Плотность, регистр и фактура</h2>
      <p class="text-textDim mb-6">Не только ноты и ритм формируют характер трека — то, сколько звуков звучит одновременно и в каком диапазоне высот, тоже сильно влияет на ощущение.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Плотность звучания</h3>
        <div class="space-y-3">
          <button @click="playSparse" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Разреженная фактура — одна нота
          </button>
          <button @click="playDense" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Плотная фактура — восемь нот одновременно
          </button>
        </div>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Диапазон регистра</h3>
        <div class="space-y-3">
          <button @click="playNarrowRegister" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Узкий регистр — все ноты рядом
          </button>
          <button @click="playWideRegister" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Широкий регистр — крайний низ и крайний верх
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Плотность и ширина регистра — независимый от гармонии инструмент драматургии: можно держать одну и ту же гармонию, но менять от секции к секции
          «объём» звучания. Куплеты и брейкдауны обычно разреженные и узкие по регистру, дропы и кульминации — плотные и растянутые от самого низа до самого верха.
        </p>
      </div>
    </div>
  </div>
</template>
