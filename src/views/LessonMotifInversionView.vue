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

function playSeq(notes, durations) {
  let now = Tone.now()
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, durations[i] * 0.85, now)
    now += durations[i]
  })
}

async function playOriginal() {
  await initSynth()
  playSeq(['C4', 'E4', 'D4'], [0.25, 0.25, 0.4])
}

async function playInverted() {
  await initSynth()
  playSeq(['C4', 'Ab3', 'Bb3'], [0.25, 0.25, 0.4])
}

async function playAugmented() {
  await initSynth()
  playSeq(['C4', 'E4', 'D4'], [0.5, 0.5, 0.8])
}

async function playDiminished() {
  await initSynth()
  playSeq(['C4', 'E4', 'D4'], [0.125, 0.125, 0.2])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 75: Инверсия, увеличение и уменьшение</h2>
      <p class="text-textDim mb-6">Три классических способа переработать мотив: перевернуть его контур, растянуть по времени или сжать.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Один мотив, три трансформации</h3>
        <div class="space-y-3">
          <button @click="playOriginal" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Исходный мотив — вверх на терцию, вниз на секунду
          </button>
          <button @click="playInverted" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Инверсия — те же интервалы, но зеркально: вниз на терцию, вверх на секунду
          </button>
          <button @click="playAugmented" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Увеличение (augmentation) — те же ноты, вдвое медленнее
          </button>
          <button @click="playDiminished" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Уменьшение (diminution) — те же ноты, вдвое быстрее
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Инверсия отлично работает как «ответ» на исходный мотив — вопрос-ответная структура фраз. Увеличение подходит для перехода от энергичного куплета
          к спокойному брейку — тот же материал, но вдвое медленнее звучит совсем иначе. В DAW обе трансформации делаются буквально растяжением или сжатием выделенных нот в piano roll по горизонтали.
        </p>
      </div>
    </div>
  </div>
</template>
