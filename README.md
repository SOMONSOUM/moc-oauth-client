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
BASE_URL=https://identity.moc.gov.kh
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:3000/callback
```

## 🚀 Quick Start

```typescript
import { MocOAuthClient } from "moc-oauth-client";

const oauth = new MocOAuthClient();

// Authorize the client
const authorizationUrl = await oauth.authorize();
```

## 🔐 Authorize Client

```typescript
const response = await oauth.authorizeClient();

console.log(response.data.redirectUri);
```

✅ Success Response

```json
{
  "success": true,
  "data": {
    "redirectUri": "http://localhost:3000/login?loginToken=..."
  }
}
```

✅ Validate Access Token

```typescript
const result = await oauth.validateToken(accessToken);
```

✅ Success Response

```json
{
  "isValid": true,
  "accessToken": "...",
  "refreshToken": "..."
}
```

👤 Get Current User
Retrieve authenticated user information.

```typescript
const user = await oauth.getCurrentUser(accessToken);

console.log(user.data);
```

✅ Success Response

```json
{
  "email": "user@email.com",
  "firstName": "Sok",
  "lastName": "Dara"
}
```

🔄 Refresh Token
Generate a new access token using refresh token.

```typescript
const tokens = await oauth.refreshToken(refreshToken);
```

✅ Success Response

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

## ❌ Error Handling

All API errors follow a standardized format:

```json
{
  "success": false,
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
