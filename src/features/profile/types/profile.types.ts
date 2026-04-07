import z from "zod";
import { SchemaUpdatePassword } from "../schema/update-password-schema";

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirm_password: string;
}

export type UpdatePasswordFormType = z.infer<typeof SchemaUpdatePassword>;
