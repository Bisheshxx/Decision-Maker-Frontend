import z from "zod";

const SchemaDecisionItem = z.object({
  id: z.number(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be less than 100 characters"),
});

export const SchemaUpsertDecisionItem = z.object({
  DecisionItems: z
    .array(SchemaDecisionItem)
    .min(3, "Add at least 3 options for the slot machine!"),
});
