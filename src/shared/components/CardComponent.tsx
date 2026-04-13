"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Decision } from "@/features/decision/types/decision.types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatRelativeOrNZDate } from "../lib/date-utils/date.util";
import { SINGLE_DECISION_ROUTE } from "../constant/routes";

interface IProps {
  data: Decision;
}

export default function CardComponent({ data }: IProps) {
  const href = `${SINGLE_DECISION_ROUTE}/${data?.id}`;

  return (
    <Link href={href} className="block w-full max-w-sm">
      <Card className="shadow-lg group hover:cursor-pointer">
        <CardHeader>
          <CardTitle className="text-sm truncate">{data?.title}</CardTitle>
          <CardDescription className="text-xs min-h-20 overflow-hidden">
            {data?.description}
          </CardDescription>
          <CardFooter className="px-0 text-[10px] text-gray-500">
            {formatRelativeOrNZDate(data?.createdAt)}
          </CardFooter>
          <CardAction className="h-full">
            <ChevronRight className="dark:stroke-gray-500 dark:group-hover:stroke-white transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
