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
  synth.triggerAttackRelease(b, '0.9', now + 0.8)
}

async function playExpected() {
  await playPair(['G4', 'B4', 'D5'], ['C4', 'E4', 'G4'])
}

async function playDeceptive() {
  await playPair(['G4', 'B4', 'D5'], ['A4', 'C5', 'E5'])
}

async function playDeceptiveAlt() {
  await playPair(['G4', 'B4', 'D5'], ['F4', 'A4', 'C5'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 68: Обманные разрешения</h2>
      <p class="text-textDim mb-6">Слух почти со стопроцентной уверенностью ждёт, что за доминантой последует тоника. Обманное разрешение сознательно эту уверенность нарушает.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Ожидание и обман</h3>
        <div class="space-y-3">
          <button @click="playExpected" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Ожидаемое: V → I (соль → до)
          </button>
          <button @click="playDeceptive" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Обманное: V → vi (соль → ля минор)
          </button>
          <button @click="playDeceptiveAlt" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Обманное: V → IV (соль → фа) — более редкий вариант
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Обманное разрешение работает только потому, что слух заранее выучил «правило» V→I — обман возможен лишь на фоне сильного ожидания.
          Используй его, когда нужно продлить фразу и не дать треку закончиться слишком рано: вместо ожидаемой точки слушатель получает новый поворот и внимание удерживается дольше.
        </p>
      </div>
    </div>
  </div>
</template>
