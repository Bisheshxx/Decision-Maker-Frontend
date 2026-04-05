import { ALPHABETS_ONLY } from "@/shared/constant";
import { z } from "zod";

export const SchemaUpdateProfile = z.object({
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
  email: z.string(),
});
