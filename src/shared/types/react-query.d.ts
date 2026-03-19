import "@tanstack/react-query";
import type { ApiErrorHandler } from "@/shared/lib/axios/Api-Error-Handler";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiErrorHandler;
  }
}
