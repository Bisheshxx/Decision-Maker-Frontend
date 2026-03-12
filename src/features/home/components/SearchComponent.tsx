"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardComponent from "@/shared/components/CardComponent";
import { Plus, Search } from "lucide-react";
import { CreateDecisionDialog } from "./CreateDecisionDialog";

const dummyData = [
  {
    id: 1,
    title: "What should i have for breakfast?",
    description: "For when i don't know what i want to eat for breakfast",
    created_at: "2025-12-22",
  },
  {
    id: 2,
    title: "What should i have for lunch?",
    description: "For when i don't know what i want to eat for lunch",
    created_at: "2025-12-22",
  },
  {
    id: 3,
    title: "What should i have for dinner?",
    description: "For when i don't know what i want to eat for dinner",
    created_at: "2025-12-22",
  },
];

export default function SearchComponent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between pt-8 items-center">
        <div className="relative">
          <Input
            className="md:w-[230px] w-[150px] text-xs md:text-xs h-[26px] pl-7"
            placeholder="Search for a decision"
          />
          <Search size={20} className="absolute top-0 h-[26px] pl-2" />
        </div>

        <CreateDecisionDialog />
      </div>
      <CardComponentGrid />
    </div>
  );
}

function CardComponentGrid() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {dummyData?.map((data) => (
        <CardComponent data={data} key={data?.id} />
      ))}
    </div>
  );
}
