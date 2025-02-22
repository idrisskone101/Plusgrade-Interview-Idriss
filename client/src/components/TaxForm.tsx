import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculateTax, TaxBreakdown } from "../utils/calculateTax";
import { fetchTaxBrackets } from "../utils/fetchTaxBrackets";
import { taxFormSchema, TaxFormInputs } from "../schemas/taxFormSchema";

const TaxForm = ({
  setTaxInfo,
  setError,
  loading,
  setLoading,
}: {
  setTaxInfo: (taxInfo: TaxBreakdown | null) => void;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxFormInputs>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      income: 0,
      taxYear: 2022,
    },
  });

  const onSubmit = async (data: TaxFormInputs) => {
    setLoading(true);
    setError("");
    setTaxInfo(null);
    try {
      const brackets = await fetchTaxBrackets(data.taxYear);
      const result = calculateTax(data.income, brackets);
      setTaxInfo(result);
    } catch (err) {
      console.log("err", err);
      setError("Failed to calculate tax");
    } finally {
      setLoading(false);
    }
  };

  const availableTaxYears = [2019, 2020, 2021, 2022];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="income" className="block text-sm font-medium">
          Annual Income
        </label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-2">$</span>
          <input
            type="number"
            id="income"
            {...register("income", { valueAsNumber: true })}
            className="block w-full rounded-md border-gray-300 shadow-sm py-2 pl-7 pr-3"
          />
        </div>
        {errors.income && (
          <p className="mt-1 text-sm text-red-600">{errors.income.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="taxYear" className="block text-sm font-medium">
          Tax Year
        </label>
        <select
          id="taxYear"
          {...register("taxYear", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3"
        >
          {availableTaxYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors.taxYear && (
          <p className="mt-1 text-sm text-red-600">{errors.taxYear.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Calculate Tax"}
      </button>
    </form>
  );
};

export default TaxForm;
