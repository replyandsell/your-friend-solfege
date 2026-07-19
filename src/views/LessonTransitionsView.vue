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
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 },
  }).toDestination()
  isInitialized.value = true
}

async function playHardCut() {
  await initSynth()
  synth.volume.value = 0
  const now = Tone.now()
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.6', now)
  synth.triggerAttackRelease(['F4', 'A4', 'C5'], '0.6', now + 0.7)
}

async function playRiser() {
  await initSynth()
  synth.volume.value = -8
  const now = Tone.now()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
  let t = now
  notes.forEach((n) => {
    synth.triggerAttackRelease(n, 0.09, t)
    t += 0.1
  })
  synth.volume.setValueAtTime(0, t)
  synth.triggerAttackRelease(['F4', 'A4', 'C5'], '0.8', t)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 106: Переходы между разделами</h2>
      <p class="text-textDim mb-6">Из одной секции в другую можно перейти резко — или подготовить переход заранее, чтобы он ощущался естественно.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Резкий стык и подготовленный переход</h3>
        <div class="space-y-3">
          <button @click="playHardCut" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Резкий стык — аккорд сразу сменяется другим
          </button>
          <button @click="playRiser" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Райзер — восходящий пробег нот подводит к новой секции
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Резкий стык хорош, когда нужен эффект неожиданности или контраста. Райзер (восходящий пробег нот, шум или свип фильтра) готовит слух к перемене
          заранее — именно поэтому он так часто используется перед дропом в электронной музыке: он превращает границу секций в отдельное, ожидаемое событие, а не случайный обрыв.
        </p>
      </div>
    </div>
  </div>
</template>
