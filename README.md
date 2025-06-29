# [Project Name] - API

This the server application for [Project Name], exposing an API for managing [Project Name]'s users and data.

## Endpoint reference

Response payloads are exclusively in JSON.

General payload: [`payload.schema`](./test/e2e/payload.schema.ts)

> This API utilizes a JSON Web Token to authenticate users. For **🔑 protected routes**, a JWT must be sent as a bearer token.

### Accounts

Client accounts are represented by `User` objects.

#### `POST /account/signup`

Create a `User`.

- Body: [`signup.dto`](./src/modules/account/dto/signup.dto.ts)
- Success payload: [`signup-success.schema`](./src/modules/account/payloads/signup-success.schema.ts)

#### `POST /account/login`

Authenticate self as a `User` and obtain a token.

- Body: [`login.dto`](./src/modules/account/dto/login.dto.ts)
- Success payload: [`login-success.schema`](./src/modules/account/payloads/login-success.schema.ts)

#### 🔑 `GET /account`

Get details of own `User`.

- Payload: [`get-account.schema`](./src/modules/account/payloads/get-account.schema.ts)

#### 🔑 `PATCH /account`

Update details of own `User`.

- Body: [`update.dto`](../src/modules/account/dto/update.dto.ts)
- Success payload: [`update-success.schema`](./src/modules/account/payloads/update-success.schema.ts)
