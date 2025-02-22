interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export const fetchTaxBrackets = async (year: number): Promise<TaxBracket[]> => {
  const res = await fetch(
    `http://localhost:5001/tax-calculator/tax-year/${year}`
  );
  const data = await res.json();
  return data.tax_brackets;
};
