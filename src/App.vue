<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen bg-bg">
    <aside class="flex w-64 shrink-0 flex-col border-r border-surface2 bg-surface/95 p-5">
      <div class="mb-6 rounded-2xl border border-surface2 bg-surface2/70 p-4">
        <p class="text-[11px] uppercase tracking-[0.3em] text-accent">Онлайн-курс</p>
        <h1 class="mt-2 text-lg font-semibold">Ваш друг - СОЛЬФЕДЖИО</h1>
        <p class="mt-1 text-sm text-textDim">Практическое сольфеджио</p>
      </div>

      <div class="mb-3 text-[11px] uppercase tracking-[0.25em] text-textDim">Навигация</div>
      <RouterLink
        to="/"
        class="rounded-xl px-3 py-2 text-sm transition hover:bg-surface2"
        active-class="bg-surface2 text-accent"
      >
        Главная
      </RouterLink>
      <RouterLink
        to="/course"
        class="mt-1 rounded-xl px-3 py-2 text-sm transition hover:bg-surface2"
        active-class="bg-surface2 text-accent"
      >
        Курс
      </RouterLink>

      <div class="mt-auto rounded-2xl border border-surface2 bg-surface2/70 p-4">
        <p class="text-sm font-medium">Путь по курсу</p>
        <p class="mt-1 text-xs leading-5 text-textDim">От ритма и высоты к гармонии, ладам и собственному треку.</p>
      </div>
    </aside>

    <main class="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.04),_transparent_35%)]">
      <RouterView />
    </main>
  </div>
</template>