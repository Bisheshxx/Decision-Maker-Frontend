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

export async function request<TResponse = Record<string, unknown>>({
  method,
  url,
  data,
  params,
  config,
}: RequestOptions): Promise<ApiResponse<TResponse>> {
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

    return response.data;
  } catch (error: any) {
    // console.log("[[ API request error: ]]", error.response.data);
    const apiResponse = error?.response?.data;
    const errorMessage = apiResponse?.message || "An unexpected error occurred";
    const errorType = apiResponse?.errorType || "Unknown type of error";
    const errors = apiResponse?.errors || "Unknown type of error";

    throw new ApiErrorHandler({
      success: false,
      errors,
      message: errorMessage,
      errorType: errorType,
    });
  }
}
