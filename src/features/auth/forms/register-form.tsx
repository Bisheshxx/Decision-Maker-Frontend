import React from "react";
import z from "zod";
import { SchemaRegister } from "../schema/register.schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";
import Link from "next/link";
import { googleLogin } from "@/shared/lib/auth/google-login";
import { LOGIN_ROUTE } from "@/shared/constant/routes";
import PasswordInput from "@/shared/components/PasswordInput";
import Image from "next/image";
import Google from "../../../../public/google.png";
import GoogleLoginButton from "@/shared/components/GoogleLoginButton";

interface IProps {
  handleRegister: (data: z.infer<typeof SchemaRegister>) => Promise<void>;
  form: UseFormReturn<z.infer<typeof SchemaRegister>>;
}

export default function RegisterForm({ handleRegister, form }: IProps) {
  return (
    <form id="form-register" onSubmit={form.handleSubmit(handleRegister)}>
      <FieldGroup className="gap-3">
        <div className="w-full pb-5 border-b flex justify-center items-center">
          <GoogleLoginButton isDisabled={form.formState.isSubmitting} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-first_name">
                  First Name
                </FieldLabel>
                <Input
                  {...field}
                  id="first_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="First Name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-last_name">
                  Last Name
                </FieldLabel>
                <Input
                  {...field}
                  id="last_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Last Name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*********"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-confirm_password">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="confirm_password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*********"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          {form.formState.errors?.root && (
            <FieldError
              errors={[{ message: form.formState.errors?.root?.message }]}
            />
          )}
          <LoadingButtonComponent
            isLoading={form.formState.isSubmitting}
            text="Register"
          />
          <FieldDescription className="text-center">
            Already have an account? <Link href={LOGIN_ROUTE}>Sign in</Link>
          </FieldDescription>
          <FieldDescription className="text-center text-xs ">
            By continuing, you agree to Decision Maker&apos;s Terms of Service
            and Privacy Policy, and to receive periodic emails with updates.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
