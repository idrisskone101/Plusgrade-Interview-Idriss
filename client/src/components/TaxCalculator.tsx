import { useState } from "react";
import TaxForm from "./TaxForm";
import TaxResults from "./TaxResults";
import { TaxBreakdown } from "../types/tax";

export const TaxCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [taxInfo, setTaxInfo] = useState<TaxBreakdown | null>(null);

  return (
    <>
      <TaxForm
        setTaxInfo={setTaxInfo}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />
      <TaxResults taxInfo={taxInfo} loading={loading} error={error} />
    </>
  );
};
