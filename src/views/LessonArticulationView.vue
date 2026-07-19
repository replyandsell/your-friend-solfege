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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

async function playStaccato() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4']
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, 0.08, now)
    now += 0.35
  }
}

async function playLegato() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4']
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, 0.36, now)
    now += 0.35
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 128: Длительность, articulation и legato</h2>
      <p class="text-textDim mb-6">Реальная длина ноты в piano roll (в отличие от её позиции по сетке) определяет, звучит фраза отрывисто или слитно.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одна и та же мелодия, две артикуляции</h3>
        <div class="space-y-3">
          <button @click="playStaccato" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Staccato — короткие, отрывистые ноты
          </button>
          <button @click="playLegato" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Legato — ноты почти сливаются друг с другом
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Позиция ноты на сетке и её реальная длина — разные вещи: можно поставить ноту на каждую долю, но сократить её блок до 20% от расстояния до
          следующей — получится staccato. Растянуть блок так, чтобы ноты соприкасались или чуть перекрывались, — получится legato. Этот приём работает независимо от quantize и добавляет фразе живую артикуляцию.
        </p>
      </div>
    </div>
  </div>
</template>
