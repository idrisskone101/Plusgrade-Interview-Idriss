import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaxCalculator } from "../components/TaxCalculator";

describe("TaxCalculator", () => {
  it("renders both the TaxForm component and the TaxResults component", () => {
    render(<TaxCalculator />);

    // Checks if the TaxForm component form elements exist
    expect(screen.getByLabelText("Annual Income")).toBeInTheDocument();
    expect(screen.getByLabelText("Tax Year")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate tax/i })
    ).toBeInTheDocument();

    // Checks if the TaxResults component exists
    expect(screen.getByTestId("tax-results")).toBeInTheDocument();
  });
});
