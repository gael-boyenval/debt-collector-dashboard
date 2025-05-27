import { render, screen } from "@testing-library/react";
import ReportDebtPaymentProjection from "./ReportDebtPaymentProjection";
import { describe, it, expect } from "vitest";

describe("ReportDebtPaymentProjection", () => {
  it("renders the period values", () => {
    const period = {
      tendencyMonth: -1.5,
      daysToReachZero: 100,
      estimatedendDate: 1716393600000,
    };
    render(<ReportDebtPaymentProjection period={period} />);
    expect(screen.getByText(/-1.5 points\/month/)).toBeInTheDocument();
    expect(screen.getByText(/100 days/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});
