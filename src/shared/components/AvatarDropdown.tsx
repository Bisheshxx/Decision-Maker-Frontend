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
import { ChevronDown, Loader2, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useApiMutation } from "../hooks/useApiMutation";
import { AuthenticationService } from "@/features/auth/services/authentication-service";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../constant/routes";
import { useApiQuery } from "../hooks/useApiQuery";
import { getNameInitials } from "../lib/hook-form-utils/index.util";
import { AvatarIcon } from "./AvatarIcon";
import { ProfileService } from "@/features/profile/services/profile-services";
import { clearToken } from "@/lib/auth";
import axios from "axios";

export default function AvatarDropdown() {
  const router = useRouter();

  const handleLogout = async () => {
    clearToken();
    await axios.post("/api/auth/logout");
    router.push(LOGIN_ROUTE);
  };

  const { data } = useApiQuery({
    queryFn: () => ProfileService.getProfile(),
    queryKey: ["profile"],
  });

  const options: {
    option: string;
    icon: JSX.Element;
    onClick: () => void;
  }[] = [
    {
      option: "Profile",
      icon: <User />,
      onClick: () => router.push(PROFILE_ROUTE),
    },
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
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <AvatarIcon src={data?.profilePictureUrl} name={data?.name} />
              <div className="flex flex-col gap-0">
                <h1 className="capitalize">{data?.name}</h1>
                <span className="text-xs truncate">{data?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
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
