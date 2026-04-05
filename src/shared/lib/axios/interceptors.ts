import { LOGIN_ROUTE } from "@/shared/constant/routes";
import { api } from "./api";

type RetryableRequestConfig = {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
  url?: string;
} & Record<string, any>;

const REFRESH_TOKEN_URL =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH || "accounts/refresh-token";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
let responseInterceptorId: number | null = null;

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === LOGIN_ROUTE) return;
  window.location.href = "/login?code=401";
};

const refreshAccessToken = async () => {
  await api.request({
    method: "POST",
    url: REFRESH_TOKEN_URL,
    skipAuthRefresh: true,
  } as RetryableRequestConfig);
};

export const setupInterceptors = () => {
  if (responseInterceptorId !== null) return;

  responseInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error?.config as
        | RetryableRequestConfig
        | undefined;
      const status = error?.response?.status;

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest.skipAuthRefresh
      ) {
        return Promise.reject(error);
      }

      if (
        originalRequest._retry ||
        originalRequest.url?.includes(REFRESH_TOKEN_URL)
      ) {
        redirectToLogin();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        await refreshPromise;
        return api.request(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    },
  );
};
