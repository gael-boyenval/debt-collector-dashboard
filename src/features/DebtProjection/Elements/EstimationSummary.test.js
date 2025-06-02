import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import EstimationSummary from "./EstimationSummary";
import { describe, it, expect } from "vitest";
describe("EstimationSummary", () => {
    const result = {
        endDateEstimations: {
            global: {
                currentScore: 13,
                avairage: {
                    tendencyMonth: -1.5,
                    daysToReachZero: 100,
                    estimatedendDate: "2024-06-01T00:00:00Z",
                },
                lastPeriod: {
                    tendencyMonth: -2,
                    daysToReachZero: 80,
                    estimatedendDate: "2024-05-01T00:00:00Z",
                },
            },
            rules: {
                ruleA: {
                    currentScore: 8,
                    avairage: {
                        tendencyMonth: -1,
                        daysToReachZero: 50,
                        estimatedendDate: "2024-04-01T00:00:00Z",
                    },
                    lastPeriod: {
                        tendencyMonth: -1.2,
                        daysToReachZero: 40,
                        estimatedendDate: "2024-03-01T00:00:00Z",
                    },
                },
            },
        },
    };
    it("renders summary, buttons, and table", () => {
        render(_jsx(EstimationSummary, { result: result, estimationsBasedOn: "avairage", setEstimationsBasedOn: () => { } }));
        expect(screen.getByText(/current score/i)).toBeInTheDocument();
        expect(screen.getByText(/average all periods/i)).toBeInTheDocument();
        expect(screen.getByText(/last period/i)).toBeInTheDocument();
        expect(screen.getByText("ruleA")).toBeInTheDocument();
        expect(screen.getByText("8 points")).toBeInTheDocument();
    });
});
