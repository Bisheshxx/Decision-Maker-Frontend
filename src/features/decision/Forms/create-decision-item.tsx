import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SchemaUpsertDecisionItem } from "../Schema/decision-item.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DecisionItem,
  SchemaUpsertDecisionItemType,
} from "../types/decision.types";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { DecisionService } from "../services/decision-services";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Field, FieldError } from "@/components/ui/field";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import useUiState from "@/store/ui.store";

export default function CreateDecisionItemForm() {
  const { setOpenDialogName } = useUiState();
  const params = useParams<{ id: string }>();
  const decisionId = Number(params.id);

  const { data: decisionItems } = useApiQuery({
    queryFn: () => DecisionService.getDecisionItems(decisionId),
    queryKey: ["decision-items", decisionId],
    enabled: Number.isFinite(decisionId),
  });

  const form = useForm<SchemaUpsertDecisionItemType>({
    resolver: zodResolver(SchemaUpsertDecisionItem),
    defaultValues: { DecisionItems: [{ id: 0, title: "" }] },
  });

  useEffect(() => {
    if (!decisionItems || decisionItems.length === 0) return;
    form.reset({
      DecisionItems: decisionItems.map((item) => ({
        id: Number(item.id),
        title: item.title,
      })),
    });
  }, [decisionItems, form]);

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "DecisionItems",
  });

  const UpsertDecisionItem = useApiMutation(
    (data: Pick<DecisionItem, "id" | "title">[]) =>
      DecisionService.upsertDecisionItems(decisionId, data),
    {
      onSuccess: () => setOpenDialogName(null),
      invalidateQueries: ["decision-detail", decisionId.toString()],
    },
  );

  const handleCreate = async (data: SchemaUpsertDecisionItemType) => {
    await UpsertDecisionItem.mutateAsync(data.DecisionItems);
  };

  console.log(form.formState.errors);

  return (
    <form
      id="form-upsert-decision-items"
      onSubmit={form.handleSubmit(handleCreate)}
      className="flex-col flex"
    >
      <div className="space-y-2 h-80 overflow-y-scroll mb-3">
        {fields.map((_, index) => (
          <div className="flex gap-1" key={`add-option-${index}`}>
            <div className="flex-1">
              <Controller
                name={`DecisionItems.${index}.title`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || undefined}>
                    <Input
                      {...field}
                      placeholder="e.g. Chicken Salad"
                      className="bg-background"
                      id={`DecisionItems.${index}.title`}
                      aria-invalid={fieldState.invalid || undefined}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
            <Button
              type="button"
              className="h-7.5 text-muted-foreground hover:text-destructive"
              variant={"ghost"}
              onClick={() => remove(index)}
            >
              <Trash className="stroke-red-400" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          className="custom-button"
          onClick={() => append({ id: 0, title: "" })}
        >
          Add Value
        </Button>
      </div>

      {form.formState?.errors.DecisionItems?.root?.message && (
        <p className="text-destructive text-xs text-center">
          {form.formState?.errors.DecisionItems?.root?.message}
        </p>
      )}
      <LoadingButtonComponent
        isLoading={form.formState.isSubmitting}
        text="Submit"
        className="mt-2"
      />
    </form>
  );
}
