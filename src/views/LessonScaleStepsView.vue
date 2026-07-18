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

async function playScale() {
  await initSynth()
  const notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.3', now)
    now += 0.4
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 10: Ступени гаммы</h2>
      <p class="text-textDim mb-6">Гамма состоит из 8 ступеней. Каждая имеет номер и функцию.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Гамма До мажор</h3>
        <button @click="playScale" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Играть гамму
        </button>
      </div>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Ступени и функции</h3>
        <div class="text-sm text-textDim space-y-2">
          <p>I (До) — Тоника: центр, отдых</p>
          <p>IV (Фа) — Субдоминанта: переход</p>
          <p>V (Соль) — Доминанта: напряжение</p>
          <p>VII (Си) — Вводный тон: хочет разрешиться</p>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">Чередование напряжения и разрешения создаёт грув и интерес в музыке.</p>
      </div>
    </div>
  </div>
</template>