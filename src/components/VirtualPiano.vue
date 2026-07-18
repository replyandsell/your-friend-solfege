<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'

const synth = ref(null)
const activeNote = ref(null)

const notes = [
  { name: 'C', key: 'C3' },
  { name: 'D', key: 'D3' },
  { name: 'E', key: 'E3' },
  { name: 'F', key: 'F3' },
  { name: 'G', key: 'G3' },
  { name: 'A', key: 'A3' },
  { name: 'B', key: 'B3' },
  { name: 'C', key: 'C4' },
]

function initSynth() {
  if (!synth.value && Tone.Synth) {
    synth.value = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
    }).toDestination()
  }
}

function playNote(key) {
  try {
    initSynth()
    if (synth.value) {
      activeNote.value = key
      synth.value.triggerAttack(key)
    }
  } catch (e) {
    console.error('Play note error:', e)
  }
}

function stopNote(key) {
  try {
    if (synth.value && activeNote.value === key) {
      synth.value.triggerRelease(key)
      activeNote.value = null
    }
  } catch (e) {
    console.error('Stop note error:', e)
  }
}
</script>

<template>
  <div class="border border-surface2 rounded-lg p-4 bg-surface">
    <div class="text-sm text-textDim mb-3">Кликай на клавиши</div>
    <div class="flex gap-1 justify-center flex-wrap">
      <button
        v-for="note in notes"
        :key="note.key"
        @mousedown.prevent="playNote(note.key)"
        @mouseup.prevent="stopNote(note.key)"
        @mouseleave="stopNote(note.key)"
        class="w-14 h-24 rounded text-sm font-semibold transition-colors select-none"
        :class="activeNote === note.key ? 'bg-accent text-bg border-2 border-accent' : 'bg-surface2 text-text border-2 border-surface2'"
      >
        {{ note.name }}
      </button>
    </div>
  </div>
</template>