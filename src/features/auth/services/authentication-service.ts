import { request } from "@/shared/lib/axios/request";
import { SchemaLogin } from "@/features/auth/schema/login.schema";
import { User } from "../types/user.types";
import z from "zod";
import { ApiResponse } from "@/shared/types/global.types";
import { SchemaRegister } from "../schema/register.schema";

export const AuthenticationService = {
  login: async (
    data: z.infer<typeof SchemaLogin>,
  ): Promise<ApiResponse<User>> => {
    return request<User>({
      method: "POST",
      url: "accounts/login",
      data,
    });
  },
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<null>> =>
    request<null>({
      method: "POST",
      url: "accounts/register",
      data,
    }),
  confirmEmail: async (params: {
    userId: string;
    token: string;
  }): Promise<ApiResponse<null>> =>
    request<null>({
      method: "POST",
      url: "accounts/confirm-email",
      params,
    }),
  logout: async (): Promise<ApiResponse<null>> =>
    request<null>({
      method: "POST",
      url: "accounts/logout",
    }),
};
