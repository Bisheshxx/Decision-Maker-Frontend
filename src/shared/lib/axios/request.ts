import { api } from "@/shared/lib/axios/api";
import { ApiResponse } from "@/shared/types/global.types";
import { AxiosRequestConfig } from "axios";
import { ApiErrorHandler } from "./Api-Error-Handler";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<TRequest = Record<string, unknown>> {
  method: HttpMethod;
  url: string;
  data?: TRequest; // for POST/PUT
  params?: Record<string, unknown>;
  config?: AxiosRequestConfig;
}

export async function request<
  TResponse = Record<string, unknown>,
  TRequest = Record<string, unknown>,
>({
  method,
  url,
  data,
  params,
  config,
}: RequestOptions<TRequest>): Promise<ApiResponse<TResponse>> {
  try {
    const response = await api.request<ApiResponse<TResponse>>({
      url,
      method,
      data,
      params,
      headers: {
        ...config?.headers,
      },
    });

    const apiResponse = response?.data as
      | (ApiResponse<TResponse> & {
          Success?: boolean;
          Message?: string;
          Errors?: string | string[];
          ErrorType?: string;
        })
      | undefined;

    // Some APIs can return HTTP 200 with success=false.
    // Throw here so React Query sets isError and surfaces the message.
    const isSuccess = apiResponse?.success ?? apiResponse?.Success;
    if (isSuccess === false) {
      throw new ApiErrorHandler({
        success: false,
        errors:
          apiResponse?.errors ||
          apiResponse?.Errors ||
          apiResponse?.message ||
          apiResponse?.Message ||
          "Unknown error",
        message:
          apiResponse?.message ||
          apiResponse?.Message ||
          "An unexpected error occurred",
        errorType:
          apiResponse?.errorType ||
          apiResponse?.ErrorType ||
          "Unknown type of error",
      });
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof ApiErrorHandler) {
      throw error;
    }
    console.log(error);
    const apiResponse = error?.data;
    const errorMessage =
      apiResponse?.message ||
      apiResponse?.Message ||
      (error?.message === "Network Error"
        ? "Could not connect to the server"
        : "An unexpected error occurred");
    const errorType =
      apiResponse?.errorType ||
      apiResponse?.ErrorType ||
      "Unknown type of error";
    const errors =
      apiResponse?.errors ||
      apiResponse?.Errors ||
      // errorMessage ||
      "Unknown error";

    throw new ApiErrorHandler({
      success: false,
      errors,
      message: errorMessage,
      errorType: errorType,
    });
  }
}
