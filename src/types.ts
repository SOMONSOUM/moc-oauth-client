export interface OAuthResult<T> {
  data: T | null;
  error: OAuthError["error"] | null;
}

export interface OAuthError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/* ---------- RESPONSES ---------- */

export interface AuthorizeResponse {
  redirectUri: string;
}

export interface ValidateTokenResponse {
  isValid: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface CurrentUser {
  email: string;
  firstName: string;
  lastName: string;
}
