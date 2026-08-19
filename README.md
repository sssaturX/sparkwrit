# Sparkwrit

AI Micro-SaaS для 2-дневного интенсива **«Vibe Coding: От идеи до работающего сервиса»** (тема 1).

Генератор постов / блоков резюме / сопроводительных писем с выбором тональности. Работает локально и в проде; без `OPENAI_API_KEY` — демо-режим.

## Стек

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4**
- **OpenAI Chat Completions** (`gpt-4o-mini`) на серверном route
- **localStorage** для истории генераций
- Деплой: **Vercel**

## Возможности MVP

- 3 типа контента: пост, резюме, сопроводительное письмо
- 5 тонов: профессиональный, дружелюбный, смелый, острый, лаконичный
- Loading / error / toast
- История в браузере (до 30 записей) + восстановление
- Demo fallback, если нет API-ключа
- Ключ OpenAI только на сервере (`OPENAI_API_KEY`)

## Локальный запуск

```bash
cd sparkwrit
npm install
cp .env.example .env.local
# опционально: вставьте OPENAI_API_KEY=sk-...
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Без ключа всё равно можно генерировать — приложение вернёт демо-текст и пометку `Demo`.

## Переменные окружения

| Переменная         | Обязательна | Описание                          |
|--------------------|-------------|-----------------------------------|
| `OPENAI_API_KEY`   | нет         | Ключ OpenAI. Без него — demo mode |
| `OPENAI_MODEL`     | нет         | По умолчанию `gpt-4o-mini`        |

## Git

```bash
cd sparkwrit
git init
git add .
git commit -m "feat: Sparkwrit MVP — AI writing studio"
# создайте репозиторий на GitHub, затем:
git remote add origin https://github.com/<YOU>/sparkwrit.git
git branch -M main
git push -u origin main
```

## Деплой на Vercel

### Вариант A — через CLI (быстро)

```bash
npm i -g vercel   # или: npx vercel
cd sparkwrit
vercel            # первый логин / привязка проекта
vercel --prod     # прод
```

В Dashboard → Project → Settings → Environment Variables добавьте `OPENAI_API_KEY` (Production + Preview), затем Redeploy.

### Вариант B — через GitHub

1. Запушьте репозиторий на GitHub.
2. Зайдите на [vercel.com/new](https://vercel.com/new).
3. Import репозиторий `sparkwrit`.
4. Framework Preset: **Next.js** (определится сам).
5. Env: `OPENAI_API_KEY` (опционально).
6. Deploy → получите URL вида `https://sparkwrit-xxx.vercel.app`.

**Live demo:** https://sparkwrit.vercel.app  
**GitHub:** https://github.com/sssaturX/sparkwrit  
**Inspect:** https://vercel.com/sssaturxs-projects/sparkwrit

## Структура

```
src/
  app/
    api/generate/route.ts   # POST генерация + demo/OpenAI
    page.tsx                # UI студии
    globals.css             # визуальный язык
  components/
    Generator.tsx
    Toast.tsx
  lib/
    types.ts
    demo.ts                 # demo-тексты + system prompt
    history.ts              # localStorage
PROMPTS.md                  # ключевые промпты Дня 1
PLAN_DAY2.md                # план/чек-лист Дня 2
```

## Чек-лист сдачи (из Удачи.docx)

**День 1**
- [x] `PROMPTS.md`
- [x] Работающий локальный фронт
- [x] План на День 2 → `PLAN_DAY2.md`

**День 2**
- [x] API + loading/error
- [x] Полировка (toast, favicon, анимации, без ключей в клиенте)
- [x] README + деплой Vercel
- [x] Git-история

## Live Demo (питч 5 мин)

1. Открыть прод-URL → показать бренд + студию.
2. Сгенерировать пост без ключа (Demo) → копирование → история.
3. (Если ключ есть) сгенерировать с OpenAI и сравнить.
4. Коротко: промпты в `PROMPTS.md`, edge cases в `PLAN_DAY2.md`.

## Лицензия

Учебный MVP для стажировки.
