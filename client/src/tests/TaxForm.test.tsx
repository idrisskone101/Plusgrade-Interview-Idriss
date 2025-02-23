import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaxForm from "../components/TaxForm";

describe("TaxForm", () => {
  // Mock all the props the component needs
  const mockSetTaxInfo = jest.fn();
  const mockSetError = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  it("validates negative income", async () => {
    render(
      <TaxForm
        setTaxInfo={mockSetTaxInfo}
        setError={mockSetError}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    // Simulate user typing negative income
    const input = screen.getByLabelText("Annual Income");
    fireEvent.change(input, { target: { value: "-1000" } });
    // wrapped in act since submit updates React state
    await act(async () => {
      fireEvent.submit(screen.getByTestId("tax-form"));
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Income must be non-negative"
      );
    });

    // Verify form submission wasn't processed
    expect(mockSetTaxInfo).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("handles successful submission", async () => {
    // Mock successful API call
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ tax_brackets: [] }),
      } as Response)
    );

    render(
      <TaxForm
        setTaxInfo={mockSetTaxInfo}
        setError={mockSetError}
        loading={false}
        setLoading={mockSetLoading}
      />
    );

    // Simulate valid form submission
    await userEvent.type(screen.getByLabelText("Annual Income"), "50000");
    // wrapped in act since submit updates React state
    await act(async () => {
      fireEvent.submit(screen.getByTestId("tax-form"));
    });

    // Verify loading state and API call
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(mockSetTaxInfo).toHaveBeenCalled();
    });
  });
});
