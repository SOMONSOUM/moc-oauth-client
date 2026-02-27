import { http } from "./http";
import { config } from "./config";
import {
  AuthorizeResponse,
  ValidateTokenResponse,
  CurrentUser,
  OAuthResult,
} from "./types";
import { handleError } from "./errors";
import { API_ENDPOINTS } from "./api-endpoint";

/**
 * MOCOAuthClient is a client library for interacting with the MOC OAuth API.
 * It provides methods for authorizing clients, validating tokens, refreshing tokens,
 * and retrieving the current user's information.
 */
export class MOCOAuthClient {
  /**
   * Authorizes a client using the MOC OAuth API.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the authorization URL for the client.
   * @throws An error if the request to authorize the client fails.
   */
  async authorizeClient(): Promise<OAuthResult<AuthorizeResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.AUTHORIZE, {
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
   * Validates a JWT token using the MOC OAuth API.
   * @param accessToken The JWT token to validate.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain a boolean indicating whether the token is valid or not,
   * an access token, and a refresh token.
   * @throws An error if the request to validate the token fails.
   */
  async validateToken(
    accessToken: string,
  ): Promise<OAuthResult<ValidateTokenResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.VALIDATE_TOKEN, {
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
   * Retrieves the current user's information using the MOC OAuth API.
   * @param accessToken The JWT token to use for authentication.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the current user's email, first name, and last name.
   * @throws An error if the request to retrieve the user's information fails.
   */
  async getCurrentUser(accessToken: string): Promise<OAuthResult<CurrentUser>> {
    try {
      const res = await http.get(API_ENDPOINTS.USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
  ): Promise<OAuthResult<ValidateTokenResponse>> {
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
