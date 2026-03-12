import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
interface IProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  text: string;
}
export default function LoadingButtonComponent<T extends FieldValues>({
  form,
  text,
}: IProps<T>) {
  return (
    <Button disabled={form.formState.isSubmitting} type="submit">
      {form.formState.isSubmitting ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading
        </div>
      ) : (
        text
      )}
    </Button>
  );
}
