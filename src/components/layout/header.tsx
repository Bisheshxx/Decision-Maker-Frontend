"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import AvatarDropdown from "@/shared/components/AvatarDropdown";
import { DASHBOARD_ROUTE } from "@/shared/constant/routes";
import ThemeSelector from "@/shared/components/ThemeSelector";

export default function Header() {
  const router = useRouter();
  return (
    <div className=" flex items-center justify-between h-12 px-1  mb-2">
      <Image
        src={Logo}
        height={50}
        width={50}
        alt="Decision Maker Logo"
        className="h-auto w-22.5 cursor-pointer object-contain"
        onClick={() => router.push(DASHBOARD_ROUTE)}
      />
      <div className="flex gap-4 items-center">
        <ThemeSelector />
        <AvatarDropdown />
      </div>
    </div>
  );
}
