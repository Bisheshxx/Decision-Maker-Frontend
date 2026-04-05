import React, { JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useApiMutation } from "../hooks/useApiMutation";
import { AuthenticationService } from "@/features/auth/services/authentication-service";
import { LOGIN_ROUTE } from "../constant/routes";
import { useApiQuery } from "../hooks/useApiQuery";
import { getNameInitials } from "../lib/hook-form-utils/index.util";

export default function AvatarDropdown() {
  const router = useRouter();

  const routeToLogin = () => {
    router.push(LOGIN_ROUTE);
  };
  const Logout = useApiMutation(AuthenticationService.logout, {
    onSuccess: routeToLogin,
    onError: routeToLogin,
  });
  const handleLogout = async () => {
    await Logout.mutate({});
  };

  const { data } = useApiQuery({
    queryFn: () => AuthenticationService.getProfile(),
    queryKey: ["profile"],
  });

  const options: {
    option: string;
    icon: JSX.Element;
    onClick: () => Promise<void>;
  }[] = [
    {
      option: "Log out",
      icon: <LogOut />,
      onClick: handleLogout,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <AvatarIcon src={data?.profilePictureUrl} name={data?.name} />
          <div className="absolute z-10 top-5 -right-0.75 rounded-full border-2 dark:border-black dark:bg-gray-600 bg-muted">
            <ChevronDown size={15} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <AvatarIcon src={data?.profilePictureUrl} name={data?.name} />
              <div className="flex flex-col gap-0">
                <h1 className="capitalize">{data?.name}</h1>
                <span className="text-xs">{data?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          {/* <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {options.map((_, index) => (
            <DropdownMenuItem key={index} onClick={_.onClick}>
              {_.icon} {_.option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarIcon({
  src,
  name,
}: {
  src?: string | null;
  name: string | undefined;
}) {
  const [isAvatarLoading, setIsAvatarLoading] = React.useState(true);
  return (
    <Avatar>
      <AvatarImage
        src={src ?? undefined}
        onLoadingStatusChange={(status) => {
          setIsAvatarLoading(status === "loading");
        }}
      />
      {isAvatarLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-muted">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : null}
      <AvatarFallback className="bg-primary text-white dark:text-black">
        {getNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
