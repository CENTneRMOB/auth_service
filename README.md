### Тестовое задание "сервис авторизации"

Хранение сессий в Redis не успел реализовать!

Для запуска нужно:

1. > =Node18
2. Скачать локально репозиторий

Все нижеуказанные команды выполнять в терминале в корне проекта:

3. "Поднять" контейнер с БД командой:

```bash
npm run db-build
```

4. Выполнить миграции:

```bash
npm run db-migrate
```

5. Запустить проект:

```bash
npm run start
```

6. Перейти в браузер.

Проект будет доступен по адресу http://localhost:3000

Роут регистрации /auth/signup

Роут авторизации /auth/signin

После получения токена, можно проверить его по роуту /users/me, получив ответом id пользователя и почту
