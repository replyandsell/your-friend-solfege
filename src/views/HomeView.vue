<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mx-auto max-w-5xl p-8">
    <div class="rounded-3xl border border-surface2 bg-surface p-8 shadow-sm">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Онлайн-курс</p>
          <h2 class="mb-3 text-3xl font-semibold">Ваш друг - СОЛЬФЕДЖИО</h2>
          <p class="max-w-2xl text-textDim">
            Этот курс ведёт от чувства ритма и высоты звука к простым гармониям и аккордовым прогрессиям.
            Каждое упражнение можно слушать, пробовать и повторять в своём темпе.
          </p>
        </div>
        <div class="rounded-2xl border border-surface2 bg-surface2/70 px-4 py-3 text-sm text-textDim">
          <div class="font-medium text-text">25 уроков</div>
          <div class="mt-1">11 модулей • аудио-упражнения</div>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink
          to="/course"
          class="rounded-lg bg-accent px-5 py-2.5 font-medium text-bg transition hover:opacity-90"
        >
          Начать курс
        </RouterLink>
        <RouterLink
          to="/course/pulse/lesson-1"
          class="rounded-lg border border-surface2 px-5 py-2.5 text-sm font-medium transition hover:bg-surface2"
        >
          К первому уроку
        </RouterLink>
      </div>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-surface2 bg-surface p-5">
        <h3 class="mb-2 font-semibold">Ритм</h3>
        <p class="text-sm text-textDim">Учимся ощущать пульс, доли, синкопу и строить ритмический грув.</p>
      </div>
      <div class="rounded-2xl border border-surface2 bg-surface p-5">
        <h3 class="mb-2 font-semibold">Высота</h3>
        <p class="text-sm text-textDim">Разбираем направление мелодии, октавы, piano roll и интервалы.</p>
      </div>
      <div class="rounded-2xl border border-surface2 bg-surface p-5">
        <h3 class="mb-2 font-semibold">Гармония</h3>
        <p class="text-sm text-textDim">Переходим к тонике, ступеням, трезвучиям и расширенным аккордам.</p>
      </div>
    </div>

    <div class="mt-8 rounded-2xl border border-surface2 bg-surface p-6">
      <h3 class="mb-3 text-lg font-semibold">Как проходит обучение</h3>
      <ol class="list-decimal space-y-2 pl-5 text-sm text-textDim">
        <li>Сначала слушаешь и знакомишься с идеей урока.</li>
        <li>Потом пробуешь упражнение и сравниваешь звучание.</li>
        <li>В конце закрепляешь навык на простом музыкальном примере.</li>
      </ol>
    </div>
  </div>
</template>