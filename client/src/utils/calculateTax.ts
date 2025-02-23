import { TaxCalculationError } from "../types/error";
import { TaxBracket, TaxBreakdown } from "../types/tax";

export const calculateTax = (
  income: number,
  brackets: TaxBracket[]
): TaxBreakdown | null => {
  if (!brackets?.length) {
    const error = new Error("No tax brackets available");
    (error as TaxCalculationError).status = 500;
    throw error;
  }
  if (income <= 0) return { bracketTax: [], totalTax: 0, effectiveRate: 0 };

  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);
  let totalTax = 0;
  const bracketTax = sortedBrackets.map((bracket) => {
    const bracketMax = bracket.max ?? Infinity;
    const bracketMin = bracket.min;

    const taxableInBracket = Math.min(
      Math.max(0, income - bracketMin),
      bracketMax - bracketMin
    );

    const tax = Math.round(taxableInBracket * bracket.rate * 100) / 100;
    totalTax += tax;

    return { min: bracketMin, max: bracket.max, tax };
  });

  return {
    bracketTax,
    totalTax,
    effectiveRate: (Math.round((totalTax / income) * 10) / 10) * 100,
  };
};
