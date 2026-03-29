import { http } from "./http";
import { config } from "./config";
import {
  LoginTokenResponse,
  ValidateAuthorizationCodeResponse,
  LookupUserProfileResponse,
  ApiResponse,
  RefreshTokenResponse,
} from "./types";
import { handleError } from "./errors";
import { API_ENDPOINTS } from "./api-endpoint";

interface MOCOAuthClientBase {
  getLoginToken(): Promise<ApiResponse<LoginTokenResponse>>;
  validateAuthorizationCode(
    code: string,
  ): Promise<ApiResponse<ValidateAuthorizationCodeResponse>>;
  lookupUserProfile(
    accessToken: string,
  ): Promise<ApiResponse<LookupUserProfileResponse>>;
  refreshToken(
    refreshToken: string,
  ): Promise<ApiResponse<RefreshTokenResponse>>;
}

/**
 * MOCOAuthClient is a client library for interacting with the MOC OAuth API.
 * It provides methods for authorizing clients, validating tokens, refreshing tokens,
 * and retrieving the current user's information.
 */
export class MOCOAuthClient implements MOCOAuthClientBase {
  /**
   * Authorizes a client using the MOC OAuth API.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the authorization URL for the client.
   * @throws An error if the request to authorize the client fails.
   */
  async getLoginToken(): Promise<ApiResponse<LoginTokenResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.GET_LOGIN_TOKEN, {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
      });

      return {
        data: res.data.data,
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: handleError(e),
      };
    }
  }

  /**
   * Validates an authorization code using the MOC OAuth API.
   * @param code The authorization code to validate.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain information about whether the authorization code is valid,
   * and an access token and refresh token if it is.
   * @throws An error if the request to validate the authorization code fails.
   */
  async validateAuthorizationCode(
    code: string,
  ): Promise<ApiResponse<ValidateAuthorizationCodeResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.VALIDATE_AUTHORIZATION_CODE, {
        code,
      });

      return {
        data: res.data.data,
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: handleError(e),
      };
    }
  }

  /**
   * Retrieves the current user's information using the MOC OAuth API.
   * @param accessToken The JWT token to use for authentication.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the current user's email, first name, and last name.
   * @throws An error if the request to retrieve the user's information fails.
   */
  async lookupUserProfile(
    accessToken: string,
  ): Promise<ApiResponse<LookupUserProfileResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.LOOKUP_USER_PROFILE, {
        accessToken,
      });

      return {
        data: res.data.data,
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: handleError(e),
      };
    }
  }

  /**
   * Refreshes an access token using the MOC OAuth API.
   * @param refreshToken The JWT token to use for authentication.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the new access token and refresh token.
   * @throws An error if the request to refresh the access token fails.
   */
  async refreshToken(
    refreshToken: string,
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken,
      });

      return {
        data: res.data.data,
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: handleError(e),
      };
    }
  }
}
