<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.2, release: 0.15 },
  }).toDestination()
  isInitialized.value = true
}

async function playOstinato() {
  await initSynth()
  const pattern = ['C2', 'C3', 'C2', 'Eb3', 'C2', 'C3', 'G2', 'C3']
  let now = Tone.now()
  for (let rep = 0; rep < 2; rep++) {
    for (const note of pattern) {
      bassSynth.triggerAttackRelease(note, 0.12, now)
      now += 0.16
    }
  }
}

async function playOstinatoUnderChanges() {
  await initSynth()
  const pattern = ['C2', 'C3', 'C2', 'Eb3']
  let now = Tone.now()
  for (let rep = 0; rep < 4; rep++) {
    for (const note of pattern) {
      bassSynth.triggerAttackRelease(note, 0.12, now)
      now += 0.16
    }
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 89: Остинатный бас</h2>
      <p class="text-textDim mb-6">Остинато — короткий басовый рисунок, который повторяется без изменений снова и снова, становясь фундаментом всего трека.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Повторяющийся рисунок</h3>
        <div class="space-y-3">
          <button @click="playOstinato" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Восьмишаговый остинато-рифф, дважды
          </button>
          <button @click="playOstinatoUnderChanges" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тот же рифф, зациклен четыре раза подряд
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Остинато держит трек за счёт узнаваемости, а не разнообразия — весь интерес переносится на то, что происходит вокруг него: фильтры, дополнительные слои, автоматизация.
          Это основа техно, минимал-хауса и большинства бас-риффов в транс-музыке: один и тот же паттерн способен звучать «свежо» на протяжении всего трека, если умело менять его окружение.
        </p>
      </div>
    </div>
  </div>
</template>
