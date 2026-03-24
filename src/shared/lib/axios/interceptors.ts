import { api } from "./api";

export const setupInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // if (error.response?.status === 401) {
      //   if (
      //     typeof window !== "undefined" &&
      //     window.location.pathname !== "/login"
      //   ) {
      //     window.location.href = "/login?code=401";
      //   }
      // }
      // return Promise.reject(error);
    },
  );
};
