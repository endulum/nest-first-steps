# Accounts

Accounts are `User` objects that represent a client's identity. They are used to authenticate clients.

### `POST /account/signup`

Creates a new `User` object.

Required form:

- `username`: required string, represents the `username` of the `User` object to be created.
- `password`: required string, will be hashed and represents the `password` by which to authenticate a `User`
- `confirmPassword`: required string, must match `password`

Success payload:

```json
{
  "message": "Account successfully created.",
  "data": {
    "id": 1,
    "username": "bob"
  }
}
```

`data` represents the information of the created `User` object.

### `POST /account/login`

Authenticates client using correct credentials for the `User` account belonging to them.

Required form:

- `username`: required string, represents the `username` of the `User` object to be authenticated
- `password`: required string, will be compared with the hashed `password` of the target `User` object

Success payload:

```json
{
  "message": "Successfully logged in.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzUwODIzNjE5fQ.cye9f0O5Pl7KlHRWSalvYNoR7Eh4aG9IDlnyuS1TCuk"
  }
}
```

`data` holds an authentication token.

> This API utilizes a JSON Web Token to authenticate users. For protected routes, a JWT must be sent as a bearer token.

### `GET /account`

Fetches `User` data for the authenticated client.

- **Protected route:** responds with a 401 if no token provided.

Success payload:

```json
{
  "data": {
    "id": 1,
    "username": "bob",
    "joined": "2025-06-25T06:46:28.104Z"
  }
}
```

### `POST /account`

Updates `User` data for the authenticated client.

- **Protected route:** responds with a 401 if no token provided.

Required form:

- `username`: required string, represents the `username` of the authenticated `User
- `password`: optional string, the new password for the `User`
- `confirmPassword`: required if `password` is given, must match `password`
- `currentPassword`: required if `password` is given, will be compared with the hashed `password` of the `User`

Success payload:

```json
{
  "message": "Successfully changed account details.",
  "data": {
    "username": "alice",
    "updatedPassword": true
  }
}
```

`data` represents the updated information of the `User` object.
