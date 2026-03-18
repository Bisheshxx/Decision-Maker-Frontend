"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { SchemaLogin } from "@/features/auth/schema/login.schema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";
import { googleLogin } from "@/shared/lib/auth/google-login";

interface IProps {
  handleLogin: (data: { email: string; password: string }) => Promise<void>;
  form: UseFormReturn<z.infer<typeof SchemaLogin>>;
}

export function LoginForm({ form, handleLogin }: IProps) {
  return (
    <form id="form-login" onSubmit={form.handleSubmit(handleLogin)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="user@example.com"
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
              <div className="flex items-center">
                <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
                <Link
                  href="/forgot"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors?.root && (
          <FieldError
            errors={[{ message: form.formState.errors?.root?.message }]}
          />
        )}

        <Field>
          {/* <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Loading
              </div>
            ) : (
              "Login"
            )}
          </Button> */}
          <LoadingButtonComponent
            isLoading={form.formState.isSubmitting}
            text="Login"
          />
          <Button
            variant="outline"
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={() => googleLogin()}
          >
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
