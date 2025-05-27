import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RulesFilter from "./RulesFilter";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("RulesFilter", () => {
  const rules = ["ruleA", "ruleB"];
  const activeRules = { ruleA: true, ruleB: false };
  const tags = { tag1: ["ruleA"], tag2: ["ruleB"] };
  it("renders rules and tags and handles clicks", async () => {
    const toggleRule = vi.fn();
    const toggleAll = vi.fn();
    const toggleTag = vi.fn();
    const switchDataBy = vi.fn();
    render(
      <RulesFilter
        rules={rules}
        activeRules={activeRules}
        toggleRule={toggleRule}
        toggleAll={toggleAll}
        tags={tags}
        tagFilter={null}
        toggleTag={toggleTag}
        valueType="score"
        switchDataBy={switchDataBy}
      />
    );
    expect(screen.getByText("ruleA")).toBeInTheDocument();
    expect(screen.getByText("ruleB")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
    await userEvent.click(screen.getByText("ruleA"));
    expect(toggleRule).toHaveBeenCalledWith("ruleA");
    await userEvent.click(screen.getByText("TOGGLE ALL RULES"));
    expect(toggleAll).toHaveBeenCalled();
    await userEvent.click(screen.getByText("tag1"));
    expect(toggleTag).toHaveBeenCalledWith("tag1");
    await userEvent.click(screen.getByText("BY SCORE"));
    expect(switchDataBy).toHaveBeenCalledWith("score");
    await userEvent.click(screen.getByText("BY OCCURENCES"));
    expect(switchDataBy).toHaveBeenCalledWith("occurences");
  });
});
