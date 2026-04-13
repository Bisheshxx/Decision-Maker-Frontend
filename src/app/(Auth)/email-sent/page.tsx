"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, MailCheck, TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";
import Google from "../../../../public/google.png";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex-center h-screen w-full">
      <div className="flex flex-col items-center justify-center gap-5">
        <MailCheck size={100} className="text-primary" />
        <p className="text-xl font-extralight">Email has been sent!</p>
        {/* <Button variant={"ghost"} asChild> */}
        <div className="flex gap-2 hover:border-b pb-1 border-primary hover:text-primary">
          <Link href="/login"> Back to Login</Link>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
