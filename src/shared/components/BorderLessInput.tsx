import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface IProps {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BorderLessInput({ value, onChangeHandler }: IProps) {
  const widthCh = Math.max((value || "Untitled").length, 8);
  //   console.log(widthCh);

  return (
    <Input
      value={value}
      onChange={onChangeHandler}
      placeholder="Untitled"
      style={{ width: `${widthCh}ch` }}
      className="h-auto border-0 bg-transparent dark:bg-transparent px-0 text-4xl font-semibold tracking-tight shadow-none rounded-none focus-visible:border-transparent focus-visible:ring-0 md:text-5xl py-0"
    />
  );
}
