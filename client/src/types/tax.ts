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
