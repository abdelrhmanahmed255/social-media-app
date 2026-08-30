# Social Media App

Node.js + Express + TypeScript backend with class-based architecture, Zod validation, and access/refresh JWT tokens.

## Structure

```
src/
  common/          # shared enums, exceptions, interfaces, security, services
  config/          # env service
  database/        # models, repository, connection
  middleware/      # auth, checkRole, error handling
  module/
    auth/          # auth controller, service, zod validation
    posts/
    user/
  app.controller.ts
  main.ts
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env.dev` (MongoDB URI, JWT secrets, optional email/AWS).

3. Build and run:
```bash
npm run build
npm run start:dev
```

## Auth endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register (optional `file` upload) |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh-token` | Refresh access token |
| GET | `/api/auth/get-all-users/:id` | Protected route (Bearer token + role) |

### Signup body
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "secret1",
  "phone": "01000000000",
  "confirmEmail": "john@example.com",
  "gender": "male"
}
```

### Login body
```json
{
  "email": "john@example.com",
  "password": "secret1"
}
```

Use header: `Authorization: Bearer <accessToken>`
