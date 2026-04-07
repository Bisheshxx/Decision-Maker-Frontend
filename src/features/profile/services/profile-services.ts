import { User } from "@/features/auth/types/user.types";
import { request } from "@/shared/lib/axios/request";
import { ApiResponse } from "@/shared/types/global.types";
import { UpdatePassword } from "../types/profile.types";

export const ProfileService = {
  getProfile: async (): Promise<ApiResponse<User>> =>
    request<User>({
      method: "GET",
      url: "accounts/profile",
    }),
  updateProfile: async (
    data: Partial<Pick<User, "name" | "profilePictureUrl">>,
  ): Promise<ApiResponse<User>> =>
    request<User>({
      method: "PUT",
      url: "accounts",
      data,
    }),
  updatePassword: async (
    data: Pick<UpdatePassword, "newPassword" | "oldPassword">,
  ) =>
    request<null, Pick<UpdatePassword, "newPassword" | "oldPassword">>({
      method: "PUT",
      url: "/accounts/password",
      data,
    }),
};
