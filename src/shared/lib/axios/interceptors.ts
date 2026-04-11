import { LOGIN_ROUTE } from "@/shared/constant/routes";
import { api } from "./api";

type RetryableRequestConfig = {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
  _isRefreshRequest?: boolean;
  url?: string;
} & Record<string, any>;

const REFRESH_TOKEN_URL =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH || "accounts/Refresh";

let responseInterceptorId: number | null = null;
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
const retriedRequests = new Set<string>();

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === LOGIN_ROUTE) return;
  window.location.href = "/login?code=401";
};

const getRequestKey = (config: any): string => {
  return `${config.method}:${config.url}`;
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
      const isRefreshRequest = originalRequest?._isRefreshRequest;
      const requestKey = originalRequest ? getRequestKey(originalRequest) : "";

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest.skipAuthRefresh
      ) {
        return Promise.reject(error.response);
      }

      // If refresh token endpoint itself fails, stop immediately
      if (isRefreshRequest || isLoginRequest) {
        redirectToLogin();
        retriedRequests.clear();
        isRefreshing = false;
        return Promise.reject(error);
      }

      if (retriedRequests.has(requestKey)) {
        redirectToLogin();
        retriedRequests.clear();
        return Promise.reject(error.response);
      }

      retriedRequests.add(requestKey);

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api
            .request({
              method: "POST",
              url: REFRESH_TOKEN_URL,
              skipAuthRefresh: true,
              _isRefreshRequest: true,
            } as RetryableRequestConfig)
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
              retriedRequests.clear();
            });
        }

        await refreshPromise;
        return await api.request(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        retriedRequests.clear();
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    },
  );
};
