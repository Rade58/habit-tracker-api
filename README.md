# Habit Tracker API with express

Project made while following [this workshop](https://github.com/Hendrixer/api-design-node-v5)

## Node version

```
fnm i v25.0.0
fnm use v25.0.0
fnm default v25.0.0
```

## Dependancies

```bash
npm i express ts-node zod
```

- middlewares

```bash
# morgan - logging middleware
# helmet - securing with HTTP response headers
# cors - enabling CORS
npm install \
  morgan \
  helmet \
  cors
```

- authentication

```bash
npm i jose
```

```bash
# password hashing
npm i bcrypt
```

---

- environment stuff

```bash
npm i custom-env dotenv
```

---

- database stuff

```bash
npm i pg @epic-web/remember drizzle-orm drizzle-zod
```

---

## Dev Dependancies

- typescript

```bash
npm i -D typescript tsx \
  @types/node \
  @types/bcrypt \
  @types/cors \
  @types/express \
  @types/jest \
  @types/node \
  @types/supertest
```

- making sure environment variables works same on linux and windows

```bash
npm i -D cross-env
```

- database migrator cli

```bash
npm i -D drizzle-kit
```

- testing stuff

```bash
npm i -D vitest supertest
```
