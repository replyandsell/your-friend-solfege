# Наш друг - СОЛЬФЕДЖИО

Интерактивный учебник по сольфеджио для музыкантов, сочиняющих в DAW: 21 модуль, все 137 уроков курса полностью наполнены музыкальными упражнениями (звук через Tone.js) — от пульса и ритма до гармонии, мелодии, баса, аранжировки, развития слуха и практики в DAW. Модуль «Развитие слуха» (уроки 108–123) построен как интерактивный квиз со случайными вопросами, проверкой ответа и подсчётом очков. Прогресс прохождения сохраняется в браузере (localStorage).

## Живой сайт

https://your-friend-solfege.vercel.app

## Быстрый запуск локально

```bash
npm install
npm run dev
```

## Проверка сборки

```bash
npm run check
```

## Как развернуть

### Автодеплой через GitHub Actions (текущая настройка)
При каждом пуше в `main` workflow `.github/workflows/ci.yml` сначала проверяет сборку, а затем job `deploy` собирает и публикует проект в Vercel через Vercel CLI.
Для этого в репозитории (Settings → Secrets and variables → Actions) должны быть добавлены секреты:
- `VERCEL_TOKEN` — персональный токен (vercel.com/account/tokens)
- `VERCEL_ORG_ID` и `VERCEL_PROJECT_ID` — из настроек проекта на Vercel (Project Settings → General)

Pull request'ы деплоятся не будут — job `deploy` запускается только на push в `main`.

### Ручной деплой
```bash
npm install --global vercel
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

## Ветка по умолчанию

Проект использует `main` как основную ветку для деплоя и разработки.

## Что в проекте

- Vue 3 + Vite + Tailwind CSS
- SPA на `vue-router`
- SPA-переписка для Vercel в `vercel.json`
- production-ready сборка `npm run build`
- быстрый доступ к урокам и курсу

## Структура

- `src/App.vue` — основной каркас приложения
- `src/views/` — страницы и учебные уроки
- `src/router/index.js` — маршрутизация Vue
- `src/composables/useProgress.js` — сохранение прогресса прохождения (localStorage)
- `src/composables/useQuiz.js` — логика квиза (случайный вопрос, проверка ответа, счёт) для модуля ear training
- `src/components/LessonNav.vue` — навигация «предыдущий/следующий урок» и отметка прогресса
- `vercel.json` — правила Vercel для SPA
- `.github/workflows/ci.yml` — CI для сборки
