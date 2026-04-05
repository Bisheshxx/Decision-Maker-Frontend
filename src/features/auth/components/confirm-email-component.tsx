"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "../services/authentication-service";
import { ApiStatusHandler } from "@/shared/lib/ApiStatusHandler";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGIN_ROUTE } from "@/shared/constant/routes";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const router = useRouter();

  const { mutateAsync, isPending, isSuccess, isError, error } = useApiMutation(
    AuthenticationService.confirmEmail,
    {
      onSuccess: () => console.log("Success"),
    },
  );

  useEffect(() => {
    if (token && userId) {
      mutateAsync({ userId, token });
    }
  }, [userId, token, mutateAsync]);

  if (!userId || !token) {
    return <div>Invalid confirmation link.</div>;
  }

  return (
    <div className="w-full h-screen">
      <ApiStatusHandler
        className="w-full h-full flex items-center justify-center"
        isLoading={isPending}
        isError={isError}
        isSuccess={isSuccess}
        error={error?.response?.message}
        button={
          <Button
            variant={"destructive"}
            onClick={() => router.push(LOGIN_ROUTE)}
          >
            Back to Login
          </Button>
        }
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <CircleCheck size={100} color="green" />
          <p className="text-xl font-extralight">
            Email has been successfully Confirmed
          </p>
          <Button
            variant={"destructive"}
            onClick={() => router.push(LOGIN_ROUTE)}
          >
            Login
          </Button>
        </div>
      </ApiStatusHandler>
    </div>
  );
}
