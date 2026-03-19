import { ApiErrorHandler } from "../axios/Api-Error-Handler";

export const toServerFieldError = (error: ApiErrorHandler) => {
  const apiErrors = error?.response?.errors;
  const fieldMessage = Array.isArray(apiErrors)
    ? apiErrors.find(Boolean)
    : apiErrors;
  return {
    type: "server",
    message:
      fieldMessage ||
      error?.response?.message ||
      "Unable to create decision. Please try again.",
  };
};
