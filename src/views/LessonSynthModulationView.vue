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

async function playDryChord() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.5', now)
  synth.triggerAttackRelease('E4', '0.5', now)
  synth.triggerAttackRelease('G4', '0.5', now)
}

async function playWithPort() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('C4', '0.5', now)
  synth.triggerAttackRelease('E4', '0.5', now)
  synth.triggerAttackRelease('G4', '0.5', now)
  now += 0.7
  synth.triggerAttackRelease('F4', '0.5', now)
  synth.triggerAttackRelease('A4', '0.5', now)
  synth.triggerAttackRelease('C5', '0.5', now)
}

async function playSweepChord() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('G4', '0.4', now)
  now += 0.45
  synth.triggerAttackRelease('E4', '0.4', now)
  now += 0.45
  synth.triggerAttackRelease('C4', '0.4', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 22: Синтезатор и модуляция</h2>
      <p class="text-textDim mb-6">В электронной музыке аккорды часто "модулируют" — плавно переходят от одного аккорда к другому через сдвиг всех нот.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playDryChord" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Два аккорда отдельно (скачок)
          </button>
          <button @click="playWithPort" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Два аккорда с переходом
          </button>
          <button @click="playSweepChord" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Арпеджио аккорда (sweep)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">В DAW ты можешь автоматизировать параметры синтезатора, чтобы аккорды звучали как живые, с порламентó и свуп-эффектами. Это создает органичность электронной музыки.</p>
      </div>
    </div>
  </div>
</template>
