<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 5: Октава и регистр</h2>
      <p class="text-textDim mb-6">Октава — это расстояние между двумя нотами с одинаковым названием на разных высотах.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Что такое октава?</h3>
        <p class="text-sm text-textDim mb-4">
          Если ты поёшь ноту До, а потом поёшь До выше — это разница в одну октаву.
        </p>
        <p class="text-sm text-textDim mb-4">
          Каждая октава содержит 8 белых клавиш: До, Ре, Ми, Фа, Соль, Ля, Си, До (снова).
        </p>
        <p class="text-sm text-textDim">
          Когда ноты переходят в высокий регистр (высокие голоса в хоре) или низкий регистр (басы) — это изменение октавы.
        </p>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Слушать разницу</h3>
        <p class="text-sm text-textDim">
          Хороший способ почувствовать октаву — найти на пианино две ноты До (низкую и высокую) и услышать, 
          как вторая До звучит точно так же, но выше.
        </p>
      </div>
    </div>
  </div>
</template>