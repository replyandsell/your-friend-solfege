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

async function playE() {
  await initSynth()
  synth.triggerAttackRelease('E4', '0.5', Tone.now())
}

async function playD() {
  await initSynth()
  synth.triggerAttackRelease('D4', '0.5', Tone.now())
}

async function playMajor() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('E4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('G4', '0.3', now)
}

async function playMinor() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('D4', '0.3', now)
  now += 0.4
  synth.triggerAttackRelease('G4', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 11: Третья ступень (ключ к мажору и минору)</h2>
      <p class="text-textDim mb-6">Одна нота определяет всё: Ми = мажор (светло), Ре = минор (грустно).</p>
      
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-sm text-textDim mb-3">Слушай две ноты отдельно</h3>
        <div class="space-y-2 mb-4">
          <button @click="playE" class="block w-full px-4 py-2 rounded-lg bg-surface2 text-text font-medium hover:bg-surface transition text-sm">
            Ми (E4) — мажорная третья
          </button>
          <button @click="playD" class="block w-full px-4 py-2 rounded-lg bg-surface2 text-text font-medium hover:bg-surface transition text-sm">
            Ре (D4) — минорная третья
          </button>
        </div>
      </div>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">С основной нотой (Соль)</h3>
        <div class="space-y-3">
          <button @click="playMajor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мажор: Ми + Соль (светло)
          </button>
          <button @click="playMinor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минор: Ре + Соль (грустно)
          </button>
        </div>
      </div>

      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">В трезвучии разница между мажором и минором — это одна нота (третья ступень). Ми = мажор. Ре = минор.</p>
      </div>
    </div>
  </div>
</template>