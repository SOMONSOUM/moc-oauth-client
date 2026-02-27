import { AxiosError } from "axios";
import { OAuthError } from "./types";

export function parseError(error: unknown): OAuthError["error"] {
  const err = error as AxiosError<OAuthError>;

  if (err.response?.data?.error) {
    return err.response.data.error;
  }

  return {
    code: "UNKNOWN_ERROR",
    message: err.message ?? "Unknown error",
  };
}
