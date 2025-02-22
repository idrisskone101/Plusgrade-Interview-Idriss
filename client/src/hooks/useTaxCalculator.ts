import { useState, useEffect } from 'react';

interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

interface TaxBreakdown {
  bracketTax: { min: number; max?: number; tax: number }[];
  totalTax: number;
  effectiveRate: number;
}

export const useTaxCalculator = (income: number, year: number) => {
  const [brackets, setBrackets] = useState<TaxBracket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [taxInfo, setTaxInfo] = useState<TaxBreakdown | null>(null);

  useEffect(() => {
    const fetchBrackets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`);
        const data = await res.json();
        setBrackets(data.tax_brackets);
      } catch (_err) {
        setError('Failed to fetch tax brackets');
      } finally {
        setLoading(false);
      }
    };

    fetchBrackets();
  }, [year]);

  useEffect(() => {
    if (!brackets.length || !income) return;

    const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);
    let totalTax = 0;
    const bracketTax = sortedBrackets.map((bracket) => {
      const bracketMax = bracket.max ?? Infinity;
      const bracketMin = bracket.min;
      
      // Calculate taxable amount in this bracket
      const taxableInBracket = Math.min(
        Math.max(0, income - bracketMin), // Amount above bracket minimum
        bracketMax - bracketMin // Bracket range
      );
      
      const tax = taxableInBracket * bracket.rate;
      totalTax += tax;

      return {
        min: bracketMin,
        max: bracket.max,
        tax
      };
    });

    setTaxInfo({
      bracketTax,
      totalTax,
      effectiveRate: totalTax / income
    });
  }, [brackets, income]);

  return {
    loading,
    error,
    taxInfo
  };
}; 