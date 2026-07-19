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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

function playSeq(items, gap = 0.05) {
  let now = Tone.now()
  for (const item of items) {
    synth.triggerAttackRelease(item.notes, item.dur * 0.9, now)
    now += item.dur + gap
  }
}

async function playMotif() {
  await initSynth()
  playSeq([
    { notes: 'C4', dur: 0.2 },
    { notes: 'D4', dur: 0.2 },
    { notes: 'E4', dur: 0.4 },
  ])
}

async function playPhrase() {
  await initSynth()
  playSeq([
    { notes: 'C4', dur: 0.2 }, { notes: 'D4', dur: 0.2 }, { notes: 'E4', dur: 0.3 },
    { notes: 'F4', dur: 0.2 }, { notes: 'E4', dur: 0.2 }, { notes: 'D4', dur: 0.2 }, { notes: 'C4', dur: 0.5 },
  ])
}

async function playPeriod() {
  await initSynth()
  playSeq([
    { notes: 'C4', dur: 0.2 }, { notes: 'D4', dur: 0.2 }, { notes: 'E4', dur: 0.3 }, { notes: 'G4', dur: 0.5 },
    { notes: 'F4', dur: 0.2 }, { notes: 'E4', dur: 0.2 }, { notes: 'D4', dur: 0.2 }, { notes: 'C4', dur: 0.6 },
  ])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 96: Мотив, фраза, период и секция</h2>
      <p class="text-textDim mb-6">Музыкальная форма устроена как матрёшка: мотивы складываются во фразы, фразы — в периоды, периоды — в секции трека.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три уровня масштаба</h3>
        <div class="space-y-3">
          <button @click="playMotif" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мотив — 1 такт
          </button>
          <button @click="playPhrase" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Фраза — 2 такта, законченная мысль
          </button>
          <button @click="playPeriod" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Период — вопрос + ответ, 4 такта
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Секция трека (куплет, припев) обычно состоит из нескольких периодов подряд. Понимание этой иерархии помогает планировать структуру не «на глаз»,
          а осознанно: сколько тактов займёт идея на каждом уровне и когда пора переходить к следующему.
        </p>
      </div>
    </div>
  </div>
</template>
