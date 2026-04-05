import { ALPHABETS_ONLY } from "@/shared/constant";
import { z } from "zod";
export const SchemaRegister = z
  .object({
    first_name: z
      .string()
      .max(50, "First name cannot be more than 50 characters")
      .min(3, "First name cannot be less than 3 characters ")
      .regex(ALPHABETS_ONLY, "First name must contain only alphabets"),
    last_name: z
      .string()
      .max(50, "Last name cannot be more than 50 characters")
      .min(3, "Last name cannot be less than 3 characters ")
      .regex(ALPHABETS_ONLY, "Last name must contain only alphabets"),
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&]/,
        "Password must contain at least one special character",
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
