import { z } from "zod";

export const taxFormSchema = z.object({
  income: z.number().min(0, "Income must be positive"),
  taxYear: z
    .number()
    .min(2019, "Tax data only available from 2019")
    .max(2022, "Tax data only available up to 2022"),
});

export type TaxFormInputs = z.infer<typeof taxFormSchema>;
