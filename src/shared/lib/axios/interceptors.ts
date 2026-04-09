import { LOGIN_ROUTE } from "@/shared/constant/routes";
import { api } from "./api";

type RetryableRequestConfig = {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
  url?: string;
} & Record<string, any>;

const REFRESH_TOKEN_URL =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH || "accounts/Refresh";

let responseInterceptorId: number | null = null;

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === LOGIN_ROUTE) return;
  window.location.href = "/login?code=401";
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
      const isLoginRequest = originalRequest?.url?.includes("accounts/login");
      const isRefreshRequest =
        originalRequest?.url?.includes(REFRESH_TOKEN_URL);

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest.skipAuthRefresh
      ) {
        return Promise.reject(error.response);
      }

      if (isLoginRequest || isRefreshRequest) {
        redirectToLogin();
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        redirectToLogin();
        return Promise.reject(error.response);
      }

      originalRequest._retry = true;

      try {
        await api.request({
          method: "POST",
          url: REFRESH_TOKEN_URL,
          skipAuthRefresh: true,
        } as RetryableRequestConfig);

        return await api.request(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    },
  );
};
