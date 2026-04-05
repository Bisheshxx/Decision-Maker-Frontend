"use client";

import { AuthenticationService } from "@/features/auth/services/authentication-service";
import { AvatarIcon } from "@/shared/components/AvatarIcon";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import ProfileUpdateForm from "../Form/profile-update-form";

export default function ProfilePage() {
  const { data, isLoading, isError } = useApiQuery({
    queryFn: () => AuthenticationService.getProfile(),
    queryKey: ["profile"],
  });
  if (isLoading || isError) return;
  return (
    <div className="container flex justify-center">
      <div className="w-xl px-10 py-5">
        <h1 className="text-xl font-semibold">Personal Info</h1>
        <div className="flex-center mt-4">
          <AvatarIcon
            src={data?.profilePictureUrl}
            name={data?.name}
            className="h-24 w-24"
          />
        </div>
        {data && <ProfileUpdateForm data={data} />}
      </div>
    </div>
  );
}
