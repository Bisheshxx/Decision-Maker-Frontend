import RegisterComponent from "@/features/auth/components/register-component";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterComponent />
      </div>
    </div>
  );
}
