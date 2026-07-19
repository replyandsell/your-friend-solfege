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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playPair(a, b) {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(a, '0.7', now)
  synth.triggerAttackRelease(b, '0.9', now + 0.85)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 60: Каденции</h2>
      <p class="text-textDim mb-6">Каденция — это музыкальная «точка» или «запятая»: пара аккордов в конце фразы, которая говорит слуху, закончилась мысль или нет.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Четыре типа окончаний</h3>
        <div class="space-y-3">
          <button @click="playPair(['G4', 'B4', 'D5'], ['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Автентическая: V → I — полное завершение
          </button>
          <button @click="playPair(['F4', 'A4', 'C5'], ['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Плагальная: IV → I — «церковная», мягкое завершение
          </button>
          <button @click="playPair(['C4', 'E4', 'G4'], ['G4', 'B4', 'D5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Половинная: I → V — запятая, а не точка
          </button>
          <button @click="playPair(['G4', 'B4', 'D5'], ['A4', 'C5', 'E5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Прерванная: V → vi — обманутое ожидание
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Автентическая каденция — самое сильное завершение, используй её в конце трека или крупной секции. Половинная каденция удобна в конце куплета —
          она оставляет ощущение незавершённости и тянет к припеву. Прерванная каденция — хороший способ продлить фразу, когда слушатель уже ждёт разрешения в тонику.
        </p>
      </div>
    </div>
  </div>
</template>
