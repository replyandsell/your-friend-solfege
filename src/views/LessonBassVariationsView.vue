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
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

function playSeq(notes, step = 0.2) {
  let now = Tone.now()
  for (const note of notes) {
    bassSynth.triggerAttackRelease(note, step * 0.85, now)
    now += step
  }
}

async function playBase() {
  await initSynth()
  playSeq(['C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2'], 0.22)
}

async function playWithFill() {
  await initSynth()
  playSeq(['C2', 'C2', 'C2', 'C2', 'C2', 'D2', 'Eb2', 'E2'], 0.22)
}

async function playOctaveVariation() {
  await initSynth()
  playSeq(['C2', 'C2', 'C3', 'C2', 'C2', 'C2', 'C3', 'C2'], 0.22)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 93: Вариации басовой линии</h2>
      <p class="text-textDim mb-6">Даже самый простой повторяющийся бас начинает утомлять после нескольких повторов. Небольшая вариация раз в цикл держит внимание.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Базовый рисунок и его варианты</h3>
        <div class="space-y-3">
          <button @click="playBase" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Базовый паттерн — одна и та же нота восемь раз
          </button>
          <button @click="playWithFill" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С филом в конце — последние три ноты меняются
          </button>
          <button @click="playOctaveVariation" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С октавным прыжком — акцент на сильной доле
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Правило «7 из 8 одинаково, одна нота — другая» работает почти всегда: слух узнаёт паттерн как повтор, но каждый цикл получает маленький сюрприз.
          Октавный скачок — самый простой вид вариации: он не меняет гармонию, но резко добавляет энергии на нужном такте, часто перед сменой секции.
        </p>
      </div>
    </div>
  </div>
</template>
