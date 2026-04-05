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

export const getNameInitials = (value?: string | null): string => {
  if (typeof value !== "string") {
    return "N/A";
  }

  const normalized = value.trim();
  if (!normalized) {
    return "N/A";
  }

  const parts = normalized.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
};
