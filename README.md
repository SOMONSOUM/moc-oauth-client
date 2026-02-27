# moc-oauth-client

Official OAuth Client SDK for integrating applications with the **Ministry of Commerce (MOC) Identity & OAuth Service**.

This package provides a simple, type-safe way to:

- Authorize OAuth clients
- Validate JWT access tokens
- Retrieve authenticated user information
- Refresh access tokens

Built with **TypeScript** and designed for **Node.js applications**.

---

## 📦 Installation

```bash
npm install moc-oauth-client
```

## ⚙️ Environment Configuration

Create a .env file in your application:

```bash
touch .env
```

Add the following environment variables to your .env file:

```bash
BASE_URL=https://api-dev-dentity.moc.gov.kh
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=https://example.com/callback
```

## 🚀 Quick Start

```typescript
import { MOCOAuthClient } from "moc-oauth-client";

const oauth = new MOCOAuthClient();
```

## 🔐 Authorize Client

```typescript
const result = await oauth.authorizeClient();

console.log(result);
```

✅ Success Response

```json
{
  "data": {
    "redirectUri": "http://localhost:3000/login?loginToken=..."
  },
  "error": null
}
```

✅ Validate Access Token

```typescript
const result = await oauth.validateToken(accessToken);

console.log(result);
```

✅ Success Response

```json
{
  "data": {
    "isValid": true,
    "accessToken": "...",
    "refreshToken": "..."
  },
  "error": null
}
```

👤 Get Current User
Retrieve authenticated user information.

```typescript
const result = await oauth.getCurrentUser(accessToken);

console.log(result);
```

✅ Success Response

```json
{
  "data": {
    "email": "user@email.com",
    "firstName": "Sok",
    "lastName": "Dara"
  },
  "error": null
}
```

🔄 Refresh Token
Generate a new access token using refresh token.

```typescript
const result = await oauth.refreshToken(refreshToken);

console.log(result);
```

✅ Success Response

```json
{
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  },
  "error": null
}
```

## ❌ Error Handling

All API errors follow a standardized format:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid token"
  }
}
```

Example handling:

```typescript
try {
  await oauth.validateToken(token);
} catch (error) {
  console.error(error.error.message);
}
```

## 🏗 Requirements

- Node.js >= 18
- Valid MOC OAuth Client credentials

## 🔐 Security Notes

- **MOC OAuth Client credentials** should be kept secret and not shared with any third parties.
- **Access tokens** should be handled securely and not exposed to untrusted clients.
- Never expose **CLIENT_SECRET** in frontend applications.
- This SDK is intended for backend/server-side usage.
