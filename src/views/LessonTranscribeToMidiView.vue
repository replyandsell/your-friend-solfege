<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const revealed = ref(false)
let synth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

const idea = ['G4', 'E4', 'C4', 'D4', 'E4']

async function playIdea() {
  await initSynth()
  let now = Tone.now()
  for (const n of idea) {
    synth.triggerAttackRelease(n, '0.22', now)
    now += 0.28
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 136: Перенос услышанной идеи в MIDI</h2>
      <p class="text-textDim mb-6">Финальный шаг практического ear training: услышать идею в голове и сразу набрать её в piano roll, не теряя времени на подбор мышью.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Практика переноса</h3>
        <div class="space-y-3">
          <button @click="playIdea" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Слушать идею
          </button>
          <button @click="revealed = !revealed" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            {{ revealed ? 'Скрыть ответ' : 'Показать ноты' }}
          </button>
          <p v-if="revealed" class="text-sm text-text bg-surface2/70 rounded-lg px-4 py-3">соль – ми – до – ре – ми</p>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Три способа ввода в DAW</h3>
        <p class="text-sm text-textDim">
          Карандашом по сетке — надёжно, но медленно для сложных идей. С MIDI-клавиатуры в реальном времени — быстрее всего для тех, кто уже слышит
          идею целиком. Пошаговая запись (step input) — компромисс: жмёшь клавишу за клавишей без учёта тайминга, а ритм расставляешь потом. Для начинающих обычно быстрее всего комбинация: сначала пропеть идею вслух, затем медленно подобрать по одной ноте на клавиатуре.
        </p>
      </div>
    </div>
  </div>
</template>
