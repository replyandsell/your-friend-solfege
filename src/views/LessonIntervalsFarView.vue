<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)

let synth = null

async function initSynth() {
  if (!synth) {
    await Tone.start()
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.5 },
    }).toDestination()
  }
}

async function playFourth() {
  await initSynth()
  synth.triggerAttackRelease('C3', '0.5')
  await new Promise(r => setTimeout(r, 600))
  synth.triggerAttackRelease('F3', '0.5')
}

async function playFifth() {
  await initSynth()
  synth.triggerAttackRelease('C3', '0.5')
  await new Promise(r => setTimeout(r, 600))
  synth.triggerAttackRelease('G3', '0.5')
}

async function playOctave() {
  await initSynth()
  synth.triggerAttackRelease('C3', '0.5')
  await new Promise(r => setTimeout(r, 600))
  synth.triggerAttackRelease('C4', '0.5')
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 8: Дальние интервалы</h2>
      <p class="text-textDim mb-6">Дальние интервалы звучат больше и пространнее. Самый важный — квинта и октава.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры дальних интервалов</h3>
        <div class="space-y-3">
          <button @click="playFourth" class="block w-full px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition">
            ▶ Кварта (До → Фа) — пустоватая
          </button>
          <button @click="playFifth" class="block w-full px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition">
            ▶ Квинта (До → Соль) — мощная
          </button>
          <button @click="playOctave" class="block w-full px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition">
            ▶ Октава (До → До выше) — полнота
          </button>
        </div>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Почему это важно</h3>
        <p class="text-sm text-textDim mb-4">
          <strong>Квинта</strong> звучит стабильно и мощно. Это основа для басов и драм в электронной музыке.<br>
          <strong>Октава</strong> — это как удвоение. Первая нота и её октава звучат как одна и та же нота, но разных регистров.
        </p>
        <p class="text-sm text-textDim">
          Когда ты слышишь в басовом треке глубокий удар, часто это квинта — два звука вместе.
        </p>
      </div>
    </div>
  </div>
</template>