import { AxiosError } from "axios";
import { OAuthError } from "./types";

export function handleError(error: unknown): never {
  const err = error as AxiosError<OAuthError>;

  if (err.response?.data) {
    throw err.response.data;
  }

  throw {
    success: false,
    error: {
      code: "UNKNOWN_ERROR",
      message: err.message,
    },
  };
}
