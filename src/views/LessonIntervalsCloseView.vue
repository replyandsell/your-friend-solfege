<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const exerciseActive = ref(false)
const exerciseFeedback = ref('')

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

async function playSecond() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C3', '0.4', now)
  synth.triggerAttackRelease('D3', '0.4', now + 0.5)
}

async function playThird() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C3', '0.4', now)
  synth.triggerAttackRelease('E3', '0.4', now + 0.5)
}

async function playFourth() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C3', '0.4', now)
  synth.triggerAttackRelease('F3', '0.4', now + 0.5)
}

async function startExercise() {
  exerciseActive.value = true
  exerciseFeedback.value = ''
  await initSynth()
  const intervals = ['second', 'third']
  const choice = intervals[Math.floor(Math.random() * intervals.length)]
  
  await new Promise(r => setTimeout(r, 500))
  
  if (choice === 'second') {
    await playSecond()
  } else {
    await playThird()
  }
}

function answerSecond() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  exerciseFeedback.value = '✓ Секунда!'
}

function answerThird() {
  if (!exerciseActive.value) return
  exerciseActive.value = false
  exerciseFeedback.value = '✓ Терция!'
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 7: Близкие интервалы</h2>
      <p class="text-textDim mb-6">Интервал — расстояние между двумя нотами. Начнём с близких: секунда и терция.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры близких интервалов</h3>
        <div class="space-y-3">
          <button @click="playSecond" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ▶ Секунда (До → Ре)
          </button>
          <button @click="playThird" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ▶ Терция (До → Ми)
          </button>
          <button @click="playFourth" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            ▶ Кварта (До → Фа)
          </button>
        </div>
      </div>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Упражнение: Определи интервал</h3>
        <p class="text-sm text-textDim mb-4">Слушай две ноты. Это секунда или терция?</p>
        
        <button v-if="!exerciseActive" @click="startExercise" class="px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Начать
        </button>

        <div v-else class="space-y-2">
          <button @click="answerSecond" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Секунда
          </button>
          <button @click="answerThird" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Терция
          </button>
        </div>

        <p v-if="exerciseFeedback" class="mt-3 text-accent font-medium">{{ exerciseFeedback }}</p>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Запомни</h3>
        <p class="text-sm text-textDim">
          <strong>Секунда:</strong> расстояние в 2 клавиши (До-Ре, Ми-Фа). Звучит близко, напряжённо.<br>
          <strong>Терция:</strong> расстояние в 3 клавиши (До-Ми, Фа-Ля). Звучит мягче, консонансно.
        </p>
      </div>
    </div>
  </div>
</template>