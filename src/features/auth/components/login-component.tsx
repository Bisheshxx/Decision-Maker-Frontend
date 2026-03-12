"use client";

import { SchemaLogin } from "@/features/auth/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { LoginForm } from "../forms/login-form";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "../services/authentication-service";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const router = useRouter();
  const Login = useApiMutation(AuthenticationService.login, {
    onSuccess: () => router.push("/"),
    onError: (error) =>
      form.setError("root", {
        type: "server",
        message: error.response.message,
      }),
  });
  const form = useForm<z.infer<typeof SchemaLogin>>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof SchemaLogin>) => {
    await Login.mutateAsync(data);
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm form={form} handleLogin={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
}
