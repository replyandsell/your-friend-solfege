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

async function playMotifOnly() {
  await initSynth()
  playSeq(['C4', 'D4', 'E4', 'C4'], [0.2, 0.2, 0.2, 0.4])
}

async function playFullPhrase() {
  await initSynth()
  playSeq(
    ['C4', 'D4', 'E4', 'C4', 'F4', 'E4', 'D4', 'E4', 'D4', 'C4'],
    [0.2, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.4, 0.4, 0.8]
  )
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 76: Фраза и музыкальное предложение</h2>
      <p class="text-textDim mb-6">Несколько мотивов, соединённых вместе и доведённых до завершения, образуют фразу — законченную музыкальную мысль, как предложение в тексте.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">От мотива к фразе</h3>
        <div class="space-y-3">
          <button @click="playMotifOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только мотив — это ещё не законченная мысль
          </button>
          <button @click="playFullPhrase" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Полная фраза — мотив развит и приходит к завершению
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Если мотив — это слово, то фраза — это предложение: она содержит начало, развитие и точку (каденцию). Обычно фраза занимает 2-4 такта.
          В аранжировке именно на уровне фразы удобно планировать структуру: куплет обычно состоит из двух-четырёх фраз, которые вместе образуют более крупный раздел.
        </p>
      </div>
    </div>
  </div>
</template>
