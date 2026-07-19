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

function playSeq(notes, step = 0.25) {
  let now = Tone.now()
  for (const note of notes) {
    bassSynth.triggerAttackRelease(note, step * 0.85, now)
    now += step
  }
}

async function playDirectJump() {
  await initSynth()
  playSeq(['C2', 'C2', 'F2', 'F2'], 0.4)
}

async function playDiatonicPassing() {
  await initSynth()
  playSeq(['C2', 'D2', 'E2', 'F2'], 0.3)
}

async function playChromaticPassing() {
  await initSynth()
  playSeq(['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2'], 0.2)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 88: Проходящие и хроматические ноты в басу</h2>
      <p class="text-textDim mb-6">Между двумя корневыми нотами бас может прыгнуть напрямую — а может «дойти» до цели шагами, диатоническими или хроматическими.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три способа перейти от до к фа</h3>
        <div class="space-y-3">
          <button @click="playDirectJump" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прямой скачок — до сразу в фа
          </button>
          <button @click="playDiatonicPassing" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Диатонический ход — до, ре, ми, фа
          </button>
          <button @click="playChromaticPassing" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Хроматический ход — все полутона подряд, «джазовый» съезд
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Хроматический проходящий бас — узнаваемый приём фанка, диско и хауса: он добавляет ощущение скольжения и уверенного движения вперёд.
          Используй его на слабую долю перед сменой аккорда — так он звучит как естественная «подводка», а не случайная нота мимо гармонии.
        </p>
      </div>
    </div>
  </div>
</template>
