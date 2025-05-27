import type { RuleId } from "../../types";

export interface EndDateEstimationPeriod {
  tendencyMonth: number;
  daysToReachZero: number;
  estimatedendDate: number | null;
}

export type EndDateEstimationRule = {
  id: RuleId;
  currentScore: number;
  tendencyDay: number;
  daysToReachZero: number;
  tendencyMonth: number;
  estimatedendDate: number | null;
};

export interface EndDateEstimations {
  global: {
    currentScore: number;
    avairage: EndDateEstimationPeriod;
    lastPeriod: EndDateEstimationPeriod;
  };
  rulesTable: {
    avairage: EndDateEstimationRule[];
    lastPeriod: EndDateEstimationRule[];
  };
}
