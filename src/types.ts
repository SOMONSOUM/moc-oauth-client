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

export interface ValidateJwtPayloadResponse {
  accessToken: string;
  refreshToken: string;
  domain: string;
  id: number;
  email: string;
  username?: string;
  isActive: boolean;
}

export interface ValidateJwtResponse {
  isValid: boolean;
  payload: ValidateJwtPayloadResponse | null;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
