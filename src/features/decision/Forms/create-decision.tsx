import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { SchemaCreateDecision } from "../Schema/create-decision.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LoadingButtonComponent from "@/shared/components/LoadingButtonComponent";

interface IProps {
  handleCreate: (data: z.infer<typeof SchemaCreateDecision>) => Promise<void>;
  form: UseFormReturn<z.infer<typeof SchemaCreateDecision>>;
}
export default function CreateDecisionForm({ handleCreate, form }: IProps) {
  return (
    <form id="form-create-decision" onSubmit={form.handleSubmit(handleCreate)}>
      <FieldGroup className="gap-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Field
                data-invalid={fieldState.invalid}
                orientation={"horizontal"}
              >
                <FieldLabel htmlFor="form-login-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your decision title"
                  autoComplete="off"
                />
              </Field>
              <div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            </>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="description"
                aria-invalid={fieldState.invalid}
                placeholder="Your decision description"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <LoadingButtonComponent
            isLoading={form.formState.isSubmitting}
            text="Create"
          />
        </Field>
      </FieldGroup>
    </form>
  );
}
