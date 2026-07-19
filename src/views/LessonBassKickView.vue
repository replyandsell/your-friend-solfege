<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let kick = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  kick = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
  }).toDestination()
  isInitialized.value = true
}

async function playColliding() {
  await initSynth()
  const now = Tone.now()
  for (let i = 0; i < 4; i++) {
    kick.triggerAttackRelease('C1', '32n', now + i * 0.4)
    bassSynth.triggerAttackRelease('C2', 0.35, now + i * 0.4)
  }
}

async function playInterlocking() {
  await initSynth()
  const now = Tone.now()
  for (let i = 0; i < 4; i++) {
    kick.triggerAttackRelease('C1', '32n', now + i * 0.4)
    bassSynth.triggerAttackRelease('C2', 0.15, now + i * 0.4 + 0.2)
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 91: Связь баса с бочкой</h2>
      <p class="text-textDim mb-6">Бочка (kick) и бас делят одну и ту же низкочастотную область. Если они бьют в одну точку одновременно, там становится тесно.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Столкновение и переплетение</h3>
        <div class="space-y-3">
          <button @click="playColliding" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Бас точно на бочке — низ звучит перегружено
          </button>
          <button @click="playInterlocking" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Бас смещён после бочки — оба элемента слышны раздельно
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          В клубной электронной музыке эту проблему обычно решают сайдчейн-компрессией: бас автоматически «проседает» точно в момент удара бочки, освобождая
          для неё место, а затем возвращается к полной громкости. Даже без компрессии тот же эффект можно получить ритмически — просто не ставить длинную ноту баса ровно на долю бочки, а сдвинуть её.
        </p>
      </div>
    </div>
  </div>
</template>
