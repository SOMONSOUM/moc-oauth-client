import { AxiosError } from "axios";
import { ApiErrorResponse } from "./types";

export function handleError(error: unknown): ApiErrorResponse["error"] {
  const err = error as AxiosError<ApiErrorResponse>;

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
