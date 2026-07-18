<script setup>
import { ref } from 'vue'
import { audioEngine } from '../audio/AudioEngine'

const emit = defineEmits(['unlocked'])
const loading = ref(false)
const error = ref('')

async function unlock() {
  loading.value = true
  error.value = ''
  try {
    await audioEngine.init()
    emit('unlocked')
  } catch (e) {
    console.error('Audio init failed', e)
    error.value = 'Не удалось активировать звук. Попробуй ещё раз.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
    <div class="rounded-2xl border border-surface2 bg-surface px-6 py-5 shadow-sm">
      <p class="max-w-sm text-textDim">
        Браузер разрешает звук только после нажатия кнопки.
        Нажми, чтобы включить звук и продолжить.
      </p>
      <button
        @click="unlock"
        :disabled="loading"
        class="mt-4 rounded-lg bg-accent px-6 py-3 font-medium text-bg transition hover:opacity-90 disabled:opacity-50"
      >
        {{ loading ? 'Включаю…' : 'Включить звук' }}
      </button>
      <p v-if="error" class="mt-3 text-sm text-red-400">{{ error }}</p>
    </div>
  </div>
</template>