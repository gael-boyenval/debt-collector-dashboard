import type { RuleId } from "../../types";

export interface ChartData {
  commit: string;
  commitDate: number;
  totalScore: number;
  rules: {
    [ruleId: RuleId]: {
      score: number;
      occurences: number;
    };
  };
}

export type ValueType = "score" | "occurences";

export interface ChartDatas {
  rules: RuleId[];
  rulesTags: Record<RuleId, string[]>;
  rulesDate: Record<RuleId, number>;
  rulesColors: Record<RuleId, string>;
  chart: ChartData[];
}
