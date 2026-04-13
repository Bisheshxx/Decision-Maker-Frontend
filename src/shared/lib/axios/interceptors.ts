import { LOGIN_ROUTE } from "@/shared/constant/routes";
import { api } from "./api";
import axios, { InternalAxiosRequestConfig } from "axios";
import { clearToken, getToken, saveToken } from "@/lib/auth";

// type RetryableRequestConfig = {
//   _retry?: boolean;
//   skipAuthRefresh?: boolean;
//   _isRefreshRequest?: boolean;
//   url?: string;
// } & Record<string, any>;

// const REFRESH_TOKEN_URL =
//   process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH || "api/accounts/refresh";

let responseInterceptorId: number | null = null;
let refreshPromise: Promise<string> | null = null;
// let isRefreshing = false;
// let refreshPromise: Promise<any> | null = null;
// const retriedRequests = new Set<string>();

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === LOGIN_ROUTE) return;
  window.location.href = "/login?code=401";
};

// const getRequestKey = (config: any): string => {
//   return `${config.method}:${config.url}`;
// };

export const setupInterceptors = () => {
  if (responseInterceptorId !== null) return;

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes("/api/auth/refresh")) {
        return Promise.reject(error);
      }

      const requestWithRetry = originalRequest as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !requestWithRetry._retry) {
        requestWithRetry._retry = true;

        try {
          if (!refreshPromise) {
            refreshPromise = axios
              .post<{ accessToken: string }>("/api/auth/refresh")
              .then(({ data }) => {
                saveToken(data.accessToken);
                return data.accessToken;
              })
              .finally(() => {
                refreshPromise = null;
              });
          }

          const accessToken = await refreshPromise;
          requestWithRetry.headers.Authorization = `Bearer ${accessToken}`;
          return api(requestWithRetry);
        } catch (refreshError) {
          clearToken();
          redirectToLogin();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
