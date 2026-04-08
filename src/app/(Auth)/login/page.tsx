import LoginComponent from "@/features/auth/components/login-component";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <LoginComponent />
        </Suspense>
      </div>
    </div>
  );
}
