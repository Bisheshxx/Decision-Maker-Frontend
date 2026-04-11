"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { googleLogin } from "../lib/auth/google-login";
import Image from "next/image";
import Google from "../../../public/google.png";

interface IProps {
  isDisabled: boolean;
}

export default function GoogleLoginButton({ isDisabled }: IProps) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isDisabled}
      onClick={() => googleLogin()}
    >
      <Image src={Google} height={16} width={16} alt="Google Logo" />
      Sign up with Google
    </Button>
  );
}
