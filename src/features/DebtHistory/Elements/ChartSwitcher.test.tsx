import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChartSwitcher from "./ChartSwitcher";
import { describe, it, expect, vi } from "vitest";

describe("ChartSwitcher", () => {
  it("renders both chart type buttons and handles clicks", async () => {
    const setChartType = vi.fn();
    render(<ChartSwitcher chartType="area" setChartType={setChartType} />);
    const areaBtn = screen.getByText(/area chart/i);
    const lineBtn = screen.getByText(/line chart/i);
    expect(areaBtn).toBeInTheDocument();
    expect(lineBtn).toBeInTheDocument();
    await userEvent.click(lineBtn);
    expect(setChartType).toHaveBeenCalledWith("line");
    await userEvent.click(areaBtn);
    expect(setChartType).toHaveBeenCalledWith("area");
  });
});
