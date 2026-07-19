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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

async function playStatic() {
  await initSynth()
  synth.volume.value = -6
  synth.triggerAttackRelease(['C3', 'E3', 'G3'], '3.0', Tone.now())
}

async function playAutomated() {
  await initSynth()
  const now = Tone.now()
  synth.volume.setValueAtTime(-24, now)
  synth.volume.linearRampToValueAtTime(0, now + 3.0)
  synth.triggerAttackRelease(['C3', 'E3', 'G3'], '3.0', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 134: Automation как музыкальное развитие</h2>
      <p class="text-textDim mb-6">Automation lane позволяет плавно менять параметр звука во времени — громкость, фильтр, панораму — превращая статичный слой в развивающийся.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Статичный аккорд против автоматизированного</h3>
        <div class="space-y-3">
          <button @click="playStatic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Без автоматизации — громкость постоянна
          </button>
          <button @click="playAutomated" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С автоматизацией — плавное нарастание громкости
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Automation превращает один и тот же материал в развивающееся событие без единой новой ноты. Самые ходовые цели для автоматизации: громкость,
          частота среза фильтра (для классического «открытия» звука в билдапе), панорама и посыл на реверб. Часто хватает 2-3 плавных линий автоматизации, чтобы 8-тактовый луп звучал живо на протяжении всего трека.
        </p>
      </div>
    </div>
  </div>
</template>
