import z from "zod";

const SchemaDecisionItem = z.object({
  id: z.number(),
  title: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(80, "Must be less than 100 characters"),
});

export const SchemaUpsertDecisionItem = z.object({
  DecisionItems: z
    .array(SchemaDecisionItem)
    .min(3, "Add at least 3 options for the slot machine!")
    .superRefine((items, ctx) => {
      const indexByNormalizedTitle = new Map<string, number[]>();

      items.forEach((item, index) => {
        const normalizedTitle = item.title.trim().toLowerCase();
        if (!normalizedTitle) return;

        const matchedIndexes =
          indexByNormalizedTitle.get(normalizedTitle) ?? [];
        matchedIndexes.push(index);
        indexByNormalizedTitle.set(normalizedTitle, matchedIndexes);
      });

      indexByNormalizedTitle.forEach((indexes) => {
        if (indexes.length < 2) return;

        indexes.forEach((index) => {
          ctx.addIssue({
            code: "custom",
            message: "Option titles must be unique",
            path: [index, "title"],
          });
        });
      });
    }),
});
