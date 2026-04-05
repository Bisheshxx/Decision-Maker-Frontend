"use client";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { SchemaUpdateProfile } from "../schema/update-profile-schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "@/features/auth/services/authentication-service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { User } from "@/features/auth/types/user.types";

interface IProps {
  data: User;
}
export default function ProfileUpdateForm({ data }: IProps) {
  const Update = useApiMutation(AuthenticationService.updateProfile, {
    onSuccess: () => console.log("success"),
    onError: (error) => console.log(error.response),
    invalidateQueries: ["profile"],
  });

  const form = useForm<z.infer<typeof SchemaUpdateProfile>>({
    resolver: zodResolver(SchemaUpdateProfile),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const handleUpdate = async (
    updateData: z.infer<typeof SchemaUpdateProfile>,
  ) => {
    const { first_name, last_name } = updateData;
    const name = `${first_name} ${last_name}`;
    if (name == data?.name) return;

    await Update.mutateAsync({ name });
  };

  useEffect(() => {
    if (!data) return;
    form.reset({
      email: data?.email,
      first_name: data?.name.split(" ")[0],
      last_name: data?.name.split(" ")[1],
    });
  }, [data, form]);

  return (
    <form
      id="form-register"
      onSubmit={form.handleSubmit(handleUpdate)}
      className="mt-6"
    >
      <FieldGroup className="gap-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
                disabled
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <LoadingButtonComponent
            isLoading={form.formState.isSubmitting}
            text="Update"
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
