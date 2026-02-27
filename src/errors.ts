import { AxiosError } from "axios";
import { OAuthError } from "./types";

export function handleError(error: unknown): OAuthError["error"] {
  const err = error as AxiosError<OAuthError>;

  if (err.response?.data?.error) {
    return {
      code: err.response.data.error.code,
      message: err.response.data.error.message,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: err.message ?? "Unknown error",
  };
}
