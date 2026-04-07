import { useApiMutation } from "@/shared/hooks/useApiMutation";
import React from "react";
import { ProfileService } from "../services/profile-services";
import { Controller, useForm } from "react-hook-form";
import { SchemaUpdatePassword } from "../schema/update-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordFormType } from "../types/profile.types";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PasswordInput from "@/shared/components/PasswordInput";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";

export default function UpdatePasswordForm() {
  const UpdatePassword = useApiMutation(ProfileService.updatePassword, {
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
  });

  const form = useForm<UpdatePasswordFormType>({
    resolver: zodResolver(SchemaUpdatePassword),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      confirm_password: "",
    },
  });

  const handleUpdatePassword = async (data: UpdatePasswordFormType) => {
    const { confirm_password, ...password } = data;
    await UpdatePassword.mutateAsync(password);
  };
  return (
    <form
      id="form-update-password"
      onSubmit={form.handleSubmit(handleUpdatePassword)}
      className="w-full"
    >
      <FieldGroup className="gap-4">
        <Controller
          name="oldPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password">
                Old Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="oldPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*********"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password">
                New Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="newPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*********"
                autoComplete="new-password"
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
              <FieldLabel htmlFor="form-login-password">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="confirm_password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*********"
                autoComplete="new-password"
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
            text="Change Password"
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
