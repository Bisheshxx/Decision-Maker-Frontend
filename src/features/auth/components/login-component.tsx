"use client";

import { SchemaLogin } from "@/features/auth/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect } from "react";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoginForm } from "../forms/login-form";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "../services/authentication-service";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/shared/constant/routes";

export default function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code") === "401") {
      const timer = window.setTimeout(() => {
        toast.error("Please login to continue");
        window.history.replaceState({}, "", LOGIN_ROUTE);
      }, 50);

      return () => window.clearTimeout(timer);
    }
  }, [router, searchParams]);

  const Login = useApiMutation(AuthenticationService.login, {
    onSuccess: () => router.push(DASHBOARD_ROUTE),
    onError: (error) => {
      const responseErrors = error.response?.errors;
      form.setError("root", {
        type: "server",
        message: Array.isArray(responseErrors)
          ? responseErrors[0]
          : responseErrors,
      });
    },
  });
  const form = useForm<z.infer<typeof SchemaLogin>>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = useCallback(
    async (data: z.infer<typeof SchemaLogin>) => {
      await Login.mutateAsync(data);
    },
    [Login],
  );

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
