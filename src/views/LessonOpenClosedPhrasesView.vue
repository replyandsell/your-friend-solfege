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

async function playOpen() {
  await initSynth()
  playSeq(['C4', 'E4', 'D4', 'G4'], [0.3, 0.3, 0.3, 0.8])
}

async function playClosed() {
  await initSynth()
  playSeq(['C4', 'E4', 'D4', 'C4'], [0.3, 0.3, 0.3, 0.8])
}

async function playBoth() {
  await initSynth()
  playSeq(
    ['C4', 'E4', 'D4', 'G4', 'F4', 'E4', 'D4', 'C4'],
    [0.3, 0.3, 0.3, 0.6, 0.3, 0.3, 0.3, 0.8]
  )
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 77: Открытые и закрытые фразы</h2>
      <p class="text-textDim mb-6">Фраза может закончиться «точкой» — на тонике, или «запятой» — на неустойчивой ноте, которая требует продолжения.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Точка и запятая</h3>
        <div class="space-y-3">
          <button @click="playOpen" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Открытая фраза — заканчивается на соль (V ступень), нужно продолжение
          </button>
          <button @click="playClosed" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Закрытая фраза — заканчивается на до (тоника), ощущение завершения
          </button>
          <button @click="playBoth" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Пара «вопрос-ответ»: открытая фраза, затем закрытая
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Классическая структура «период» строится именно так: первая фраза открытая (вопрос), вторая — закрытая (ответ). Это создаёт естественное дыхание музыки.
          В куплете песни первая половина часто открытая (держит внимание), а перед припевом ставится закрытая или, наоборот, максимально открытая фраза — чтобы усилить переход.
        </p>
      </div>
    </div>
  </div>
</template>
