"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "../services/authentication-service";
import { ApiStatusHandler } from "@/shared/lib/ApiStatusHandler";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

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
        error={error?.response?.message || "An error occurred."}
      >
        Email confirmed successfully!
      </ApiStatusHandler>
    </div>
  );
}
