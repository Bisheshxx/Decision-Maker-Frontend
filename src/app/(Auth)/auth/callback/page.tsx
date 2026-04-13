"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { saveToken } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const hashParams = new URLSearchParams(
        window.location.hash.replace(/^#/, ""),
      );

      const accessToken =
        searchParams.get("accessToken") || hashParams.get("accessToken");
      const refreshToken =
        searchParams.get("refreshToken") || hashParams.get("refreshToken");
      const error = searchParams.get("error") || hashParams.get("error");

      console.log(refreshToken);

      if (error || !accessToken || !refreshToken) {
        router.push("/login?error=oauth_failed");
        return;
      }

      saveToken(accessToken);

      await axios.post("/api/auth/set-refresh", {
        refreshToken,
      });

      router.push("/dashboard");
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className={"flex items-center justify-center w-full h-screen"}>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
        <span>Loading</span>
      </div>
    </div>
  );
}
