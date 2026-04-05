import DashboardPage from "@/features/decision/components/DecisionPage";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <DashboardPage />
    </Suspense>
  );
}
