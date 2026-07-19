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

function playSeq(notes, durations) {
  let now = Tone.now()
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, durations[i] * 0.85, now)
    now += durations[i]
  })
}

async function playComplex() {
  await initSynth()
  playSeq(
    ['C4', 'F4', 'A4', 'E4', 'G4', 'B3', 'D4', 'C4'],
    [0.2, 0.15, 0.3, 0.2, 0.25, 0.15, 0.3, 0.45]
  )
}

async function playHook() {
  await initSynth()
  playSeq(['C4', 'C4', 'G4', 'E4'], [0.2, 0.2, 0.2, 0.6])
}

async function playHookTwice() {
  await initSynth()
  playSeq(['C4', 'C4', 'G4', 'E4', 'C4', 'C4', 'G4', 'E4'], [0.2, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.6])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 83: Создание хука</h2>
      <p class="text-textDim mb-6">Хук — это фраза, которую хочется напеть после первого же прослушивания. Чем она проще и однозначнее, тем сильнее цепляет.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Сложная фраза против хука</h3>
        <div class="space-y-3">
          <button @click="playComplex" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Сложная, «текучая» фраза — интересно, но не запоминается с одного раза
          </button>
          <button @click="playHook" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Хук — узкий диапазон, простой ритм, чёткий контур
          </button>
          <button @click="playHookTwice" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тот же хук дважды — закрепление в памяти
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          У хорошего хука обычно узкий диапазон (в пределах квинты-сексты), простой ритм без сложных синкоп и повторяющийся элемент внутри самого хука
          (например, две одинаковые ноты подряд). Хук почти всегда стоит проиграть минимум дважды подряд при первом появлении — иначе слух не успеет его «зафиксировать».
        </p>
      </div>
    </div>
  </div>
</template>
