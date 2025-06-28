# [Project Name] - API

This the server application for [Project Name], exposing an API for managing [Project Name]'s users and data.

## Response Payloads

Response payloads are exclusively in JSON and the top-level JSON object follows this format:

- `message?`: a string; a notable message about the success or failure of a response.
- `data?`: where any data goes.
- `fieldErrors?`: an object; where field validation errors go, if the request was a form submission.
- `links?`: an object; where URIs for links go, especially for pagination.

All payloads have at least one of these properties.

### The `fieldErrors` property

The value of `fieldErrors` is a key-value object wherein the keys are input paths, and their values are their validation error message.

```json
{
  "message": "There are some validation errors with your submission.",
  "fieldErrors": {
    "username": "Usernames must be between 2 and 16 characters long.",
    "confirmPassword": "Passwords do not match."
  }
}
```

## Endpoint Reference

> This API utilizes a JSON Web Token to authenticate users. For **🔑 protected routes**, a JWT must be sent as a bearer token.

### Accounts

Client accounts are represented by `User` objects.

#### `POST /account/signup`

Create a `User`.

Body: [`create-account.dto`](../src/modules/account/dto/create-account.dto.ts)

Success payload:

```json
{
  "message": "Account successfully created.",
  "data": {
    "newUser": {
      "id": 1,
      "username": "bob"
    }
  }
}
```

#### `POST /account/login`

Authenticate self as a `User` and obtain a token.

Body: [`login.dto.ts`](./src/modules/account/dto/login.dto.ts)

Success payload: [`login-success.schema.ts`](./src/modules/account/payloads/login-success.schema.ts)

#### 🔑 `GET /account`

Get details of own `User`.

Payload:

```json
{
  "data": {
    "user": {
      "id": 1,
      "username": "bob"
    }
  }
}
```

#### 🔑 `POST /account`

Update details of own `User`.

Body: [`update-account.dto`](../src/modules/account/dto/update-account.dto.ts)

Success payload:

```json
{
  "message": "Successfully changed account details.",
  "data": {
    "updatedUser": {
      "id": 1,
      "username": "alice"
    },
    "updatedPassword": true
  }
}
```
