import { TaxBreakdown } from "../utils/calculateTax";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const TaxResults = ({
  taxInfo,
  loading,
  error,
}: {
  taxInfo: TaxBreakdown | null;
  loading: boolean;
  error: string;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {taxInfo && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Tax Results</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Tax</p>
              <p className="text-xl font-bold text-blue-600">
                ${taxInfo.totalTax.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Effective Tax Rate</p>
              <p className="text-xl font-bold text-green-600">
                {taxInfo.effectiveRate}%
              </p>
            </div>
          </div>
          {taxInfo.bracketTax.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Tax Breakdown
              </h3>
              <div className="space-y-2">
                {taxInfo.bracketTax.map((bracket) => (
                  <div
                    key={bracket.min}
                    className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
                  >
                    <span className="text-gray-600">
                      ${bracket.min.toLocaleString()} -{" "}
                      {bracket.max ? `$${bracket.max.toLocaleString()}` : "∞"}
                    </span>
                    <span className="font-medium text-gray-800">
                      ${bracket.tax.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxResults;
