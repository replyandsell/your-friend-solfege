<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4">Урок 30: Интервальная диктовка</h2>
      <p class="text-textDim mb-6">Тренируем слух: слышим и называем интервалы между двумя нотами.</p>
      <div class="space-y-4">
        <p>Интервал отличается от аккорда тем, что это расстояние между двумя звуками.</p>
        <p>Попытайся различить маленькие и большие интервалы по ощущению.</p>
      </div>
    </div>
  </div>
</template>
