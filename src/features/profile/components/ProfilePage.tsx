"use client";

import { AuthenticationService } from "@/features/auth/services/authentication-service";
import { AvatarIcon } from "@/shared/components/AvatarIcon";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import ProfileUpdateForm from "../Form/profile-update-form";
import { ApiStatusHandler } from "@/shared/lib/ApiStatusHandler";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PASSWORD_TAB, PROFILE_TAB } from "../constants";
import useProfileUrlState from "../hooks/profile-url-state";
import { useCallback } from "react";
import { ProfileService } from "../services/profile-services";
import PasswordInput from "@/shared/components/PasswordInput";
import UpdatePasswordForm from "../Form/update-password-form";

export default function ProfilePage() {
  const { urlState, setUrlState } = useProfileUrlState();
  const onValueChangeHandler = useCallback(
    (tab: string) => {
      setUrlState({
        tab,
      });
    },
    [setUrlState],
  );

  return (
    <div className="container flex justify-center">
      <Tabs
        defaultValue={urlState.tab}
        onValueChange={onValueChangeHandler}
        className="w-xl px-10 py-5"
      >
        <TabsList>
          <TabsTrigger value={PROFILE_TAB}>Profile</TabsTrigger>
          <TabsTrigger value={PASSWORD_TAB}>Password</TabsTrigger>
        </TabsList>
        <TabsContent value={PROFILE_TAB}>
          <ProfileTab />
        </TabsContent>
        <TabsContent value={PASSWORD_TAB}>
          <PasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileTab() {
  const router = useRouter();
  const { data, isLoading, isError, isSuccess, error } = useApiQuery({
    queryFn: () => ProfileService.getProfile(),
    queryKey: ["profile"],
  });
  return (
    <ApiStatusHandler
      className="w-xl px-10 py-5 min-h-[70vh]"
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      error={error?.response?.message || error?.message}
      button={
        <Button variant={"destructive"} onClick={() => router.refresh()}>
          Refresh
        </Button>
      }
    >
      <>
        <h1 className="text-xl font-semibold">Personal Info</h1>
        <div className="flex-center mt-4">
          <AvatarIcon
            src={data?.profilePictureUrl}
            name={data?.name}
            className="h-24 w-24"
          />
        </div>
        {data && <ProfileUpdateForm data={data} />}
      </>
    </ApiStatusHandler>
  );
}

function PasswordTab() {
  return (
    <div className="w-xl px-10 py-5 min-h-[70vh]">
      <h1 className="text-xl font-semibold">Update Password</h1>
      <div className="flex-center mt-4">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
