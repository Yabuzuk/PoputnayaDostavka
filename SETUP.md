# Попутная Доставка - Telegram Mini App

Приложение для поиска попутных грузов и перевозчиков в Telegram.

## Настройка

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните SQL из файла `supabase-schema.sql` в SQL Editor
3. Скопируйте `.env.example` в `.env` и заполните:
   - `VITE_SUPABASE_URL` - URL вашего проекта
   - `VITE_SUPABASE_ANON_KEY` - Anon/Public ключ

### 3. Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Настройте Mini App:
   ```
   /newapp
   /setmenubutton - добавьте кнопку запуска
   ```
4. Укажите URL вашего приложения (после деплоя)

### 4. Запуск

```bash
npm run dev
```

### 5. Деплой

Рекомендуется использовать:
- Vercel
- Netlify
- Cloudflare Pages

После деплоя укажите URL в настройках бота.

## Структура БД

- `users` - пользователи Telegram
- `requests` - заявки на доставку/перевозку

## Функционал

- ✅ Авторизация через Telegram
- ✅ Создание заявок отправителя
- ✅ Создание заявок перевозчика
- ✅ Просмотр совпадений
- ✅ Контакты пользователей
