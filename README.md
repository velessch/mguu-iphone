# МГУУ Web v0.36 — iPhone / Vercel

Веб/PWA-версия расписания МГУУ для iPhone. Эта сборка перенесла серверные маршруты расписания, рейтинга и СДО в Vercel Node.js Function.

## Публикация

1. Загрузите содержимое проекта в GitHub.
2. Импортируйте репозиторий в Vercel как **Other**.
3. После первого деплоя добавьте `MGUU_SESSION_SECRET` в **Settings → Environment Variables** и выполните Redeploy.
4. Откройте `/api/health`: `sessionSecretConfigured` должен быть `true`.
5. Используйте URL Vercel как основной адрес приложения на iPhone.

Подробнее: `00_VERCEL_START_RU.txt`.

## Безопасность СДО

Пароль не сохраняется. Moodle-токен шифруется AES-256-GCM и хранится в HttpOnly cookie. Ключ шифрования задаётся только через переменную окружения Vercel и не должен попадать в GitHub.
