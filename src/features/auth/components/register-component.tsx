"use client";
import React from "react";
import z from "zod";
import { SchemaRegister } from "../schema/register.schema";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import RegisterForm from "../forms/register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { AuthenticationService } from "../services/authentication-service";

export default function RegisterComponent() {
  const router = useRouter();
  const Register = useApiMutation(AuthenticationService.register, {
    onSuccess: () => {
      console.log("success do the re-route");
    },
    onError: (error) => console.log(error.response),
  });
  const form = useForm<z.infer<typeof SchemaRegister>>({
    resolver: zodResolver(SchemaRegister),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof SchemaRegister>) => {
    const { first_name, last_name, confirm_password, ...restData } = data;
    await Register.mutateAsync({
      name: `${first_name} ${last_name}`,
      ...restData,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up to Decision Maker</CardTitle>
          <CardDescription>Helping you make decisions faster</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm form={form} handleRegister={handleRegister} />
        </CardContent>
      </Card>
    </div>
  );
}
