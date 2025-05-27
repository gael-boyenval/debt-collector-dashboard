import type { RuleId, UserFileRuleBase, WalkReportData } from "../../types";
import type { EndDateEstimations } from "./types";
import {
  configUtils,
  getRevisionResultArray,
} from "../../lib/transformWalkResultsUtils";
import type { ChartData } from "../DebtHistory/types";

const getGlobalScoreHistory = (
  results: ChartData[]
): { date: number; score: number }[] =>
  results.map(({ commitDate, totalScore }) => ({
    date: commitDate,
    score: totalScore,
  }));

const getRuleScoreHistory = (
  results: ChartData[],
  ruleId: RuleId,
  startDate: number
) =>
  results
    .map(({ commitDate, rules }) => ({
      date: commitDate,
      score: rules[ruleId]?.score || 0,
    }))
    .filter(({ date }) => date >= startDate);

const getRuleEstimation = (
  scoreHistory: { date: number; score: number }[]
): Omit<RulesObjInit, "id"> => {
  if (scoreHistory.length <= 1) {
    return {
      currentScore: scoreHistory[0]?.score ?? 0,
      tendencyDay: 0,
      daysToReachZero: 0,
      tendencyMonth: 0,
      estimatedendDate: null,
    };
  }

  const firstScore = scoreHistory[0];
  const lastScore = scoreHistory[scoreHistory.length - 1];

  const daysToTime = (days: number) => days * 1000 * 60 * 60 * 24;

  const scoreDiff = lastScore.score - firstScore.score;
  const dateDiff = lastScore.date - firstScore.date;
  const durationDay = dateDiff / 1000 / 60 / 60 / 24;
  const tendencyDay = scoreDiff / durationDay;
  const daysToReachZero = -(lastScore.score / tendencyDay);
  const tendencyMonth = (tendencyDay * 365) / 12;
  const estimatedendDate =
    daysToReachZero > 0
      ? new Date(lastScore.date + daysToTime(daysToReachZero)).getTime()
      : null;

  return {
    currentScore: lastScore?.score ?? 0,
    tendencyDay,
    daysToReachZero: daysToReachZero > 0 ? daysToReachZero : Infinity,
    tendencyMonth,
    estimatedendDate,
  };
};

type RulesObjInit = {
  id: RuleId;
  currentScore: number;
  tendencyDay: number;
  daysToReachZero: number;
  tendencyMonth: number;
  estimatedendDate: number | null;
};

const getDateRulesDatas = ({
  results,
  rules,
  getConfigRuleById,
}: {
  results: ChartData[];
  rules: RuleId[];
  getConfigRuleById: (ruleId: RuleId) => UserFileRuleBase | undefined;
}): RulesObjInit[] => {
  const rulesObjInit = rules.reduce<Record<RuleId, RulesObjInit>>(
    (acc, ruleId: RuleId) => {
      const ruleStartTrackingDate =
        getConfigRuleById(ruleId)?.startTrackingDate ?? "1990-01-01";

      const scoreHistory = getRuleScoreHistory(
        results,
        ruleId,
        new Date(ruleStartTrackingDate).getTime()
      );

      acc[ruleId] = {
        id: ruleId,
        ...getRuleEstimation(scoreHistory),
      };

      return acc;
    },
    {} as Record<RuleId, RulesObjInit>
  );

  return Object.values(rulesObjInit);
};

export function estimationAdapter(data: WalkReportData): EndDateEstimations {
  const { getFileRulesIds, getConfigRuleById } = configUtils(data.config);
  const rules = getFileRulesIds();

  const fileRulesScoresArray = getRevisionResultArray(data);

  const rulesDateScoreObj = getDateRulesDatas({
    results: fileRulesScoresArray,
    rules,
    getConfigRuleById,
  });

  const fileRulesScoresLastPeriodArray = getRevisionResultArray({
    config: data.config,
    results: [
      data.results[data.results.length - 2],
      data.results[data.results.length - 1],
    ],
  });
  const rulesDateScoreObjLastPeriod = getDateRulesDatas({
    results: fileRulesScoresLastPeriodArray,
    rules,
    getConfigRuleById,
  });

  const currentScore =
    fileRulesScoresArray[fileRulesScoresArray.length - 1].totalScore;

  const avairageHistory = getGlobalScoreHistory(fileRulesScoresArray);
  const lastPeriodHistory = getGlobalScoreHistory([
    fileRulesScoresArray[fileRulesScoresArray.length - 2],
    fileRulesScoresArray[fileRulesScoresArray.length - 1],
  ]);

  const avairage = getRuleEstimation(avairageHistory);
  const lastPeriod = getRuleEstimation(lastPeriodHistory);

  return {
    global: {
      currentScore,
      avairage: {
        tendencyMonth: avairage.tendencyMonth,
        daysToReachZero: avairage.daysToReachZero,
        estimatedendDate: avairage.estimatedendDate,
      },
      lastPeriod: {
        tendencyMonth: lastPeriod.tendencyMonth,
        daysToReachZero: lastPeriod.daysToReachZero,
        estimatedendDate: lastPeriod.estimatedendDate,
      },
    },
    rulesTable: {
      avairage: rulesDateScoreObj,
      lastPeriod: rulesDateScoreObjLastPeriod,
    },
  };
}
