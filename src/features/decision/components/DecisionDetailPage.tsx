"use client";

import { useQuery } from "@tanstack/react-query";
import { DecisionService } from "../services/decision-services";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import BorderLessInput from "@/shared/components/BorderLessInput";

interface IProps {
  id: string;
}

export default function DecisionDetailPage({ id }: IProps) {
  const [draftTitle, setDraftTitle] = useState<string | null>(null);
  const { data: response } = useQuery({
    queryFn: () => DecisionService.getDecisionDetails(id),
    queryKey: ["decision-detail", id],
  });

  const originalTitle = response?.data?.title ?? "";
  const title = draftTitle ?? originalTitle;
  const isTitleDirty = draftTitle !== null && draftTitle !== originalTitle;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDraftTitle(e.target.value);
  };

  return (
    <div className="container mx-auto pt-2">
      <div className="flex gap-1 items-end">
        <BorderLessInput value={title} onChangeHandler={onChangeHandler} />
        {/* {isTitleDirty && <Button variant={"ghost"}>Update</Button>} */}
      </div>
    </div>
  );
}

// this is for sortable components
// https://www.diceui.com/docs/components/radix/sortable#api-reference
