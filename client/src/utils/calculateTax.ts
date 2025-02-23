import { TaxCalculationError } from "../types/error";
import { TaxBracket, TaxBreakdown } from "../types/tax";

export const calculateTax = (
  income: number,
  brackets: TaxBracket[]
): TaxBreakdown | null => {
  // Return server error if no brackets are available
  if (!brackets?.length) {
    const error = new Error("No tax brackets available");
    (error as TaxCalculationError).status = 500;
    throw error;
  }
  // Return 0 tax if income is negative or 0
  if (income <= 0) return { bracketTax: [], totalTax: 0, effectiveRate: 0 };

  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);
  let totalTax = 0;
  const bracketTax = sortedBrackets.map((bracket) => {
    // Using the max value of the bracket or Infinity if no max value (for Math.min to work)
    const bracketMax = bracket.max ?? Infinity;
    const bracketMin = bracket.min;

    // Calculate tax amount per bracket
    const taxableInBracket = Math.min(
      Math.max(0, income - bracketMin),
      bracketMax - bracketMin
    );

    const tax = Math.round(taxableInBracket * bracket.rate * 100) / 100;
    // Add tax amount per bracket to total tax
    totalTax += tax;

    return { min: bracketMin, max: bracket.max, tax };
  });

  return {
    bracketTax,
    totalTax,
    effectiveRate: (Math.round((totalTax / income) * 10) / 10) * 100,
  };
};
