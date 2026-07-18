# Наш друг - СОЛЬФЕДЖИО

Интерактивный учебник по сольфеджио с 31 уроком, музыкальными упражнениями и удобной навигацией.

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

### Vercel
1. Подключите репозиторий `replyandsell/your-friend-solfege` к Vercel.
2. Убедитесь, что деплой идёт из ветки `main`.
3. Запустите деплой.

### GitHub Actions
В репозитории настроен CI, который проверяет сборку на каждом пуше и pull request.

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
- `vercel.json` — правила Vercel для SPA
- `.github/workflows/ci.yml` — CI для сборки
