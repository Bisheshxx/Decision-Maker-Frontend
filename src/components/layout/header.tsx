"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import AvatarDropdown from "@/shared/components/AvatarDropdown";
import { DASHBOARD_ROUTE } from "@/shared/constant/routes";

export default function Header() {
  const router = useRouter();
  return (
    <div className=" flex items-center justify-between h-12 px-5">
      <Image
        src={Logo}
        height={50}
        width={150}
        alt="Decision Maker Logo"
        className="h-10 object-cover cursor-pointer"
        onClick={() => router.push(DASHBOARD_ROUTE)}
      />
      <AvatarDropdown />
    </div>
  );
}
