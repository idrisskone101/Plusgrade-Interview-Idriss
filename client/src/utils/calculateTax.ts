export type TaxBreakdown = {
  bracketTax: { min: number; max?: number; tax: number }[];
  totalTax: number;
  effectiveRate: number;
};

export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export const calculateTax = (
  income: number,
  brackets: TaxBracket[]
): TaxBreakdown | null => {
  if (!brackets.length || !income) return null;

  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);
  let totalTax = 0;
  const bracketTax = sortedBrackets.map((bracket) => {
    const bracketMax = bracket.max ?? Infinity;
    const bracketMin = bracket.min;

    const taxableInBracket = Math.min(
      Math.max(0, income - bracketMin),
      bracketMax - bracketMin
    );

    const tax = Math.round(taxableInBracket * bracket.rate);
    totalTax += tax;

    return { min: bracketMin, max: bracket.max, tax };
  });

  return {
    bracketTax,
    totalTax: Math.round(totalTax),
    effectiveRate: (Math.round((totalTax / income) * 10) / 10) * 100,
  };
};
