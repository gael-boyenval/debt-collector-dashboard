import { chartDataAdapter } from "./chartDataAdapter";
import { describe, it, expect } from "vitest";
describe("chartDataAdapter", () => {
    const mockConfig = {
        fileRules: [
            { id: "ruleA", startTrackingDate: "2024-01-01", tags: ["tag1"] },
            { id: "ruleB", startTrackingDate: "2024-02-01", tags: ["tag2"] },
        ],
        adoptionRules: [],
        include: [],
    };
    const mockResults = [
        {
            rev: { hash: "commit1", date: "2024-01-01", name: "Commit 1" },
            results: {
                "file1.js": {
                    brokenRules: [
                        { ruleId: "ruleA", occurences: 2, ruleTotalSore: 10 },
                        { ruleId: "ruleB", occurences: 1, ruleTotalSore: 5 },
                    ],
                    totalScore: 15,
                },
            },
        },
    ];
    it("returns normalized chart data and metadata", () => {
        // @ts-expect-error - mockConfig is not a Config
        const data = chartDataAdapter({ config: mockConfig, results: mockResults });
        // Check rules
        expect(data.rules).toEqual(["ruleA", "ruleB"]);
        // Check rulesTags
        expect(data.rulesTags).toEqual({ tag1: ["ruleA"], tag2: ["ruleB"] });
        // Check rulesDate (timestamps)
        expect(data.rulesDate).toEqual({
            ruleA: new Date("2024-01-01").getTime(),
            ruleB: new Date("2024-02-01").getTime(),
        });
        // Check rulesColors (should be a string for each rule)
        expect(typeof data.rulesColors.ruleA).toBe("string");
        expect(typeof data.rulesColors.ruleB).toBe("string");
        // Check chart data
        expect(data.chart.length).toBe(1);
        expect(data.chart[0]).toMatchObject({
            commit: "commit1",
            commitDate: new Date("2024-01-01").getTime(),
            totalScore: 15,
            rules: {
                ruleA: { score: 10, occurences: 2 },
                ruleB: { score: 5, occurences: 1 },
            },
        });
    });
});
