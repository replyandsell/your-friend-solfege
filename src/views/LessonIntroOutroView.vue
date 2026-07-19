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
    envelope: { attack: 0.4, decay: 0.3, sustain: 0.6, release: 1.2 },
  }).toDestination()
  isInitialized.value = true
}

async function playIntro() {
  await initSynth()
  synth.volume.value = -14
  synth.triggerAttackRelease(['C4'], '2.5', Tone.now())
}

async function playFullSection() {
  await initSynth()
  synth.volume.value = 0
  synth.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '1.5', Tone.now())
}

async function playOutro() {
  await initSynth()
  const now = Tone.now()
  synth.volume.setValueAtTime(0, now)
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.8', now)
  synth.volume.setValueAtTime(-8, now + 1.0)
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.2', now + 1.0)
  synth.volume.setValueAtTime(-20, now + 2.0)
  synth.triggerAttackRelease(['C4'], '2.0', now + 2.0)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 99: Intro и outro</h2>
      <p class="text-textDim mb-6">Вход и выход из трека — не менее важны, чем его середина. Слушателя нужно аккуратно ввести в атмосферу и так же аккуратно вывести.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Начало, середина, конец</h3>
        <div class="space-y-3">
          <button @click="playIntro" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Intro — одна тихая нота, минимум информации
          </button>
          <button @click="playFullSection" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Основная секция для сравнения — полный аккорд, полная громкость
          </button>
          <button @click="playOutro" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Outro — постепенное затухание плотности и громкости
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Intro обычно вводит только один-два элемента будущего трека (например, бас или аккордовая педаль), не показывая сразу всю картину — это создаёт предвкушение.
          Outro чаще всего работает в обратную сторону: постепенно убирает слои один за другим, пока не останется тишина или единственный затухающий элемент.
        </p>
      </div>
    </div>
  </div>
</template>
