import { render, screen } from "@testing-library/react";
import TaxResults from "../components/TaxResults";

describe("TaxResults", () => {
  it("shows loading spinner", () => {
    render(<TaxResults taxInfo={null} loading={true} error="" />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("displays tax breakdown correctly", () => {
    const mockTaxInfo = {
      bracketTax: [
        { min: 0, max: 50000, tax: 7500 },
        { min: 50000, max: 100000, tax: 10000 },
      ],
      totalTax: 17500,
      effectiveRate: 15,
    };

    render(<TaxResults taxInfo={mockTaxInfo} loading={false} error="" />);
    expect(screen.getByText("$17,500")).toBeInTheDocument();
    expect(screen.getByText("15%")).toBeInTheDocument();
    expect(screen.getByText("$7,500")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
  });
});
