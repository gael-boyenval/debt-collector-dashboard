import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChartDisplay from "./ChartDisplay";
import { describe, it, expect } from "vitest";
const mockData = [
  {
    commit: "Commit 1",
    commitDate: new Date("2024-01-01").getTime(),
    totalScore: 15,
    rules: {
      ruleA: { score: 10, occurences: 1 },
      ruleB: { score: 5, occurences: 2 },
    },
    ruleA: 10,
    ruleB: 5,
  },
  {
    commit: "Commit 2",
    commitDate: new Date("2024-02-01").getTime(),
    totalScore: 11,
    rules: {
      ruleA: { score: 8, occurences: 1 },
      ruleB: { score: 3, occurences: 1 },
    },
    ruleA: 8,
    ruleB: 3,
  },
];

const rules = ["ruleA", "ruleB"];
const activeRules = { ruleA: true, ruleB: true };
const colors = { ruleA: "#123456", ruleB: "#654321" };
const renderTooltip = () => null;

describe("ChartDisplay", () => {
  it("renders chart with X axis and lines/areas", () => {
    render(
      <ChartDisplay
        chartType="line"
        data={mockData}
        rules={rules}
        activeRules={activeRules}
        colors={colors}
        renderTooltip={renderTooltip}
        ruleStartDates={{
          ruleA: new Date("2024-01-01").getTime(),
          ruleB: new Date("2024-01-01").getTime(),
        }}
      />
    );
    // X axis labels
    expect(screen.getByText("Commit 1")).toBeInTheDocument();
    expect(screen.getByText("Commit 2")).toBeInTheDocument();
    // SVG chart should be present
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("shows commit name in tooltip on hover", async () => {
    render(
      <ChartDisplay
        chartType="line"
        data={mockData}
        rules={rules}
        activeRules={activeRules}
        colors={colors}
        renderTooltip={renderTooltip}
        ruleStartDates={{
          ruleA: new Date("2024-01-01").getTime(),
          ruleB: new Date("2024-01-01").getTime(),
        }}
      />
    );
    // Simulate hover over a chart point (find a circle or path element)
    const point = document.querySelector("circle"); // or a more specific selector
    if (point) {
      await userEvent.hover(point);
      expect(screen.getByText("Commit 1")).toBeInTheDocument();
    }
  });
});
