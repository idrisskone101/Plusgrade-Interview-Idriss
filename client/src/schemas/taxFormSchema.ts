import { z } from "zod";

export const taxFormSchema = z.object({
  income: z.number().min(0, "Income must be non-negative"),
  taxYear: z
    .number()
    .int("Tax year must be an integer")
    .min(2019, "Tax data only available from 2019")
    .max(2022, "Tax data only available up to 2022"),
});

export type TaxFormInputs = z.infer<typeof taxFormSchema>;
