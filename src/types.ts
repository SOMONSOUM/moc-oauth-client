export interface OAuthSuccess<T> {
  statusCode: number;
  success: true;
  message: string;
  data: T;
}

export interface OAuthError {
  success: false;
  error: {
    code: string;
    message: string;
    timestamp: string;
    path: string;
    requestId: string;
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
