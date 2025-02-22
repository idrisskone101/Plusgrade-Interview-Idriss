import { useEffect, useState } from "react";

interface TaxBracket {
    min: number;
    max?: number;
    rate: number;
  }
  
  export const TaxCalculator = () => {
    const [brackets, setBrackets] = useState<TaxBracket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchBrackets = async () => {
        try {
          setLoading(true);
          const res = await fetch('http://localhost:5001/tax-calculator/');
          const data = await res.json();
          setBrackets(data.tax_brackets);
        } catch (_err) {
          setError('Failed to fetch tax brackets');
        } finally {
          setLoading(false);
        }
      };
  
      fetchBrackets();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h2>Tax Brackets</h2>
        {brackets.map((bracket, index) => (
          <div key={index}>
            ${bracket.min} - {bracket.max || '∞'}: {bracket.rate * 100}%
          </div>
        ))}
      </div>
    );
  };