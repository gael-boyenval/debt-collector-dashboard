import type { TrackAdoptionMetric, WalkReportData } from "../../types";
import {
  configUtils,
  getRevAdoptionRulesScores,
  getRevFileRulesScores,
} from "../../lib/transformWalkResultsUtils";
import type { AdoptionResult, AdoptionSnapshot } from "./types";

export function computeOverallAdoptionRate(results: AdoptionResult[]): number {
  if (results.length === 0) return NaN;

  const rates = results.map((r) => {
    if (!isNaN(r.adoptionRate)) return r.adoptionRate;
    return r.isAdopted ? 1 : 0;
  });

  return rates.reduce((acc, r) => acc + r, 0) / rates.length;
}

export function adoptionAdapter(
  data: WalkReportData,
  projectTags?: string[]
): AdoptionResult[] {
  const { getFileRulesIds, getAdoptionRulesIds, getTrackAdoptionMetrics } =
    configUtils(data.config);
  const rules = getFileRulesIds();
  const adoptionRules = getAdoptionRulesIds();
  const adoptionRulesScores = getRevAdoptionRulesScores(
    adoptionRules,
    data.results[data.results.length - 1].results
  );
  const fileRulesScores = getRevFileRulesScores(
    rules,
    data.results[data.results.length - 1].results
  );
  let adoptionMetrics = getTrackAdoptionMetrics();

  if (projectTags?.length) {
    adoptionMetrics = adoptionMetrics.filter((m) =>
      m.tags?.some((t) => projectTags.includes(t))
    );
  }

  return adoptionMetrics.map((metric: TrackAdoptionMetric) => {
    const totalScore = metric.adoptionRules.reduce<number>((acc, rule) => {
      if (adoptionRulesScores[rule]) {
        return acc + adoptionRulesScores[rule];
      }
      return acc;
    }, 0);

    const isAdopted = totalScore > 0;

    const totalDebt = metric.debtRules?.reduce<number>((acc, rule) => {
      if (fileRulesScores[rule]) {
        return acc + fileRulesScores[rule].occurences;
      }
      return acc;
    }, 0);

    const adoptionRate = totalScore / (totalScore + totalDebt);

    const result = {
      id: metric.id,
      name: metric.label,
      isAdopted,
      adoptionRate,
      totalScore,
      totalDebt,
    };

    return result;
  });
}

export function adoptionHistoryAdapter(
  data: WalkReportData,
  projectTags?: string[]
): AdoptionSnapshot[] {
  const { getAdoptionRulesIds, getTrackAdoptionMetrics } =
    configUtils(data.config);
  const adoptionRuleIds = getAdoptionRulesIds();
  let metrics = getTrackAdoptionMetrics();

  if (projectTags?.length) {
    metrics = metrics.filter((m) =>
      m.tags?.some((t) => projectTags.includes(t))
    );
  }

  const totalCount = metrics.length;
  let previousAdoptedNames: string[] = [];

  return data.results.map((walkResult) => {
    const revAdoptionScores = getRevAdoptionRulesScores(
      adoptionRuleIds,
      walkResult.results
    );

    const adoptedNames: string[] = [];
    for (const metric of metrics) {
      const score = metric.adoptionRules.reduce<number>((acc, rule) => {
        return acc + (revAdoptionScores[rule] ?? 0);
      }, 0);
      if (score > 0) adoptedNames.push(metric.label);
    }

    const prevSet = new Set(previousAdoptedNames);
    const currSet = new Set(adoptedNames);
    const newlyAdopted = adoptedNames.filter((n) => !prevSet.has(n));
    const lost = previousAdoptedNames.filter((n) => !currSet.has(n));

    previousAdoptedNames = adoptedNames;

    const adoptionRate = totalCount > 0 ? adoptedNames.length / totalCount : 0;

    return {
      date: new Date(walkResult.rev.date).getTime(),
      label: walkResult.rev.name,
      adoptedCount: adoptedNames.length,
      totalCount,
      adoptionRate,
      adoptedNames,
      newlyAdopted,
      lost,
    };
  });
}
