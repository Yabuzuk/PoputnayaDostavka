# Деплой на GitHub Pages

## Шаги:

1. **Создай репозиторий на GitHub** с именем `PoputnayaDostavka`

2. **Добавь секреты в GitHub:**
   - Settings → Secrets and variables → Actions → New repository secret
   - Добавь:
     - `VITE_SUPABASE_URL` = https://eivnittqoctsrbliuyfv.supabase.co
     - `VITE_SUPABASE_ANON_KEY` = твой ключ

3. **Загрузи код:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ТвойUsername/PoputnayaDostavka.git
   git push -u origin main
   ```

4. **Включи GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages → / (root) → Save

5. **Готово!** Приложение будет доступно по адресу:
   `https://ТвойUsername.github.io/PoputnayaDostavka/`

## Автоматический деплой

После настройки каждый push в main будет автоматически деплоить приложение.
