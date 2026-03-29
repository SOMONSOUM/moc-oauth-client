export interface ApiResponse<T> {
  data: T | null;
  error: ApiErrorResponse["error"] | null;
}

export interface ApiErrorResponse {
  status: number;
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/* ---------- RESPONSES ---------- */

export interface LookupUserProfileResponse {
  id: number;
  email: string;
  username?: string;
  isActive: boolean;
}

export interface LoginTokenResponse {
  redirectUri: string;
}

export interface ValidateAuthorizationCodePayloadResponse {
  id: number;
  email: string;
  username?: string;
  isActive: boolean;
  accessToken: string;
  refreshToken: string;
  domain: string;
}

export interface ValidateAuthorizationCodeResponse {
  isValid: boolean;
  payload: ValidateAuthorizationCodePayloadResponse | null;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
