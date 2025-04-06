# MPIT FINAL 2024 | Backend

Сервер для приложения созданного в рамках финала хакатона Моя профессия – ИТ

## 📖 Содежрание

1. [🛠 Технологии](#-технологии)
2. [📦 Установка](#-установка)
3. [💻 Разработка](#-разработка)
4. [🔧 Запуск](#-запуск)
5. [⚙️ Поддержка сервера](#️-поддержка-сервера)
6. [❓ Частые вопросы](#️-частые-вопросы)
7. [🤝 Команда](#-команда)

## 🛠 Технологии

- [TypeScript](https://www.typescriptlang.org/) - основной язык
- [Node.js](https://nodejs.org) - среда выполнения JavaScript
- [Yarn](https://yarnpkg.com/) - пакетный менеджер
- [Nest.js](https://nestjs.com/) - фреймворк
- [Prisma](https://www.prisma.io/) - ORM
- [Passport.js](https://www.prisma.io/) - библиотека для аутентификации
- [@nestjs/swagger](https://github.com/nestjs/swagger) - модуль для поддержки OpenAPI (Swagger) в Nest.js
- [@itgorillaz/configify](https://github.com/it-gorillaz/configify) - библиотека для упрощённого создания класса конфигурации для Nest.js

## 📦 Установка

```bash
## 1. Клонируйте репозиторий:
git clone https://github.com/toastmanager/mpit_final_2024_backend.git
## 2. Перейдите в папку с сервером:
cd mpit_final_2024_backend
## 3. Установите зависимости:
yarn install
## 4. Скопируйте .env.example в .env:
cp .env.example .env
## 5. Запустите сервер:
yarn start
```

## 💻 Разработка

```bash
## 1. Запустите внешние сервисы (база данных, s3 хранилище и т.д.)
docker compose -f docker-compose-dev up -d
## 2. Запустите сервер в режиме разработки (перезапуска после изменения файлов)
yarn start:dev
```

## 🔧 Запуск

1. Настройте `.env` файл
2. Скопируйте файл `Caddyfile.example` в `Caddyfile`
3. Настройте `Caddyfile` ([Документация](https://caddyserver.com/docs/caddyfile))
4. Запустите сервер
   ```bash
   docker compose up -d --build backend
   ```
   - `-d` запускает контейнеры в фоновом режиме
   - `--build backend` создаёт новую сборку сервера

## ⚙️ Поддержка сервера

### Перенос базы данных

Возможно, вам потребуется перенести данные в другое место. Здесь представлен способ переноса данных из одного postgres контейнера, запущенного docker-compose, в другой. Но по тому же принципу можно перенести данные в экземпляр postgres запущенном не в docker-compose.

1. Создайте dump файл. В нём будут находится все команды нужные для восстановления базы данных.
   ```bash
   docker compose exec db pg_dump -U username -F t dbname > dump.sql
   ```
2. Перенесите `dump.sql` в папку где находится новая база данных.
3. Очистите новую базу данных. **Восстановить удалённые данные из новой базы данных не получится.**
   ```bash
   docker compose exec db dropdb 'dbname'
   docker compose exec db createdb 'dbname'
   ```
4. Внесите изменения в новую базу данных из dump файла.
   ```bash
   docker compose exec -T db psql -U username dbname < dump.sql
   ```

## ❓ Частые вопросы

### "Protobuf parsing error", ошибки связанные с "onnx" и т.д.

Это может произойти из-за повреждения файла модели для эмбеддинга. Например, во время первоначального скачивания модели после запуска в режиме разработчика. В этом случае, нужно либо самостоятельно скачать модель с HuggingFace и вставить в `node_modules/@huggingface/transformers/.cache/sentence-transformers`, либо удалить модель в той же директории и заново запустить сервер через `yarn start` или `yarn start:prod`.

## 🤝 Команда

| Фамилия Имя      | Роль        |
| ---------------- | ----------- |
| Лаптева Милана   | Менеджер    |
| Корякин Владимир | Дизайнер    |
| Габышев Николай  | Разработчик |
