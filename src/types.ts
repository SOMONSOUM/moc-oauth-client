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

export interface LoginTokenResponse {
  redirectUri: string;
}

export interface ValidateJwtResponse {
  isValid: boolean;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LookupUserProfileResponse {
  id: number;
  email: string;
  username?: string;
  isActive: boolean;
}
