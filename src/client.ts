import { http } from "./http";
import { config } from "./config";
import {
  OAuthSuccess,
  AuthorizeResponse,
  ValidateTokenResponse,
  CurrentUser,
} from "./types";
import { handleError } from "./errors";
import { API_ENDPOINTS } from "./api-endpoint";

/**
 * MocOAuthClient is a client library for interacting with the Moc OAuth API.
 * It provides methods for authorizing clients, validating tokens, refreshing tokens,
 * and retrieving the current user's information.
 */
export class MocOAuthClient {
  /**
   * Authorize a client using the OAuth API.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain a redirectUri which can be used to redirect the user to the Moc OAuth API's authorization page.
   * @throws An error if the authorization request fails.
   */
  async authorizeClient(): Promise<OAuthSuccess<AuthorizeResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.AUTHORIZE, {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
      });

      return res.data;
    } catch (e) {
      handleError(e);
    }
  }

  /**
   * Validates a JWT token using the Moc OAuth API.
   * @param accessToken The JWT token to validate.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain a boolean indicating whether the token is valid or not,
   * an access token, and a refresh token.
   * @throws An error if the validation request fails.
   */
  async validateToken(
    accessToken: string,
  ): Promise<OAuthSuccess<ValidateTokenResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.VALIDATE_TOKEN, {
        accessToken,
      });

      return res.data;
    } catch (e) {
      handleError(e);
    }
  }

  /**
   * Retrieves the current user's information using the Moc OAuth API.
   * @param accessToken The JWT token to use for authentication.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain the current user's email, first name, and last name.
   * @throws An error if the request to retrieve the current user's information fails.
   */
  async getCurrentUser(
    accessToken: string,
  ): Promise<OAuthSuccess<CurrentUser>> {
    try {
      const res = await http.get(API_ENDPOINTS.USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data;
    } catch (e) {
      handleError(e);
    }
  }

  /**
   * Refreshes a JWT token using the Moc OAuth API.
   * @param refreshToken The refresh token to use for authentication.
   * @returns A promise resolving to an object containing the response data.
   * The response data will contain a boolean indicating whether the token is valid or not,
   * an access token, and a refresh token.
   * @throws An error if the request to refresh the token fails.
   */
  async refreshToken(
    refreshToken: string,
  ): Promise<OAuthSuccess<ValidateTokenResponse>> {
    try {
      const res = await http.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken,
      });

      return res.data;
    } catch (e) {
      handleError(e);
    }
  }
}
