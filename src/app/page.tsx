import DecisionPage from "@/features/decision/components/DecisionPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DecisionPage />
    </Suspense>
  );
}
