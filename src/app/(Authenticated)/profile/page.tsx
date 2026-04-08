import ProfilePage from "@/features/profile/components/ProfilePage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <ProfilePage />
    </Suspense>
  );
}
