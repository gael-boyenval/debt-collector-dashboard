import type {
  Config,
  WalkResults,
  BrokenRule,
  WalkLoopResult,
  UserFileRuleBase,
  RuleId,
  SanitizedFileRule,
  WalkResult,
} from "../types.js";
import type { ChartData } from "../features/DebtHistory/types.js";

type ConfigTags = {
  fileRules: Record<string, string[]>;
  adoptionRules: Record<string, string[]>;
};

export const getConfigTags = (config: Config): ConfigTags => {
  const getTagsFromRules = (rules: SanitizedFileRule[]) =>
    rules.reduce<Record<string, string[]>>((acc, rule) => {
      rule.tags?.forEach((tag: string) => {
        if (!acc[tag]) {
          acc[tag] = [rule.id];
        } else {
          acc[tag].push(rule.id);
        }
      });
      return acc;
    }, {});

  const fileRulesTags = getTagsFromRules(config.fileRules ?? []);
  const adoptionRulesTags = getTagsFromRules(config.adoptionRules ?? []);

  return {
    fileRules: fileRulesTags,
    adoptionRules: adoptionRulesTags,
  };
};

export const getFileRulesDates = (config: Config): Record<RuleId, string> => {
  const getDatesFromRules = (rules: UserFileRuleBase[]) =>
    rules.reduce<Record<RuleId, string>>((acc, rule) => {
      if (rule.startTrackingDate) {
        acc[rule.id] = rule.startTrackingDate;
      }
      return acc;
    }, {});

  const fileRulesDates = getDatesFromRules(config.fileRules ?? []);

  return fileRulesDates;
};

export const getFileRulesIds = (config: Config): RuleId[] => {
  const { fileRules = [] } = config;
  return fileRules.map((rule) => rule.id);
};

export const getAdoptionRulesIds = (config: Config): RuleId[] => {
  const { adoptionRules = [] } = config;
  return adoptionRules.map((rule) => rule.id);
};

export const getConfigRuleById = ({
  config,
  ruleId,
  key,
}: {
  config: Config;
  ruleId: RuleId;
  key: "fileRules" | "adoptionRules";
}): UserFileRuleBase | undefined => {
  if (!config[key] || !config[key].length) {
    return undefined;
  }
  return config[key].find((rule) => rule.id === ruleId);
};

export type SpeedEstimation = {
  currentScore: number;
  avairage: {
    tendencyDay: number;
    tendencyMonth: number;
    daysToReachZero: number;
    estimatedendDate: Date | "never";
  };
  lastPeriod: {
    tendencyDay: number;
    tendencyMonth: number;
    daysToReachZero: number;
    estimatedendDate: Date | "never";
  };
};

export const getAllBrokenRules = (results: WalkLoopResult): BrokenRule[] => {
  return Object.values(results).flatMap((result) => result.brokenRules || []);
};

export const getAllAdoptionRules = (results: WalkLoopResult): BrokenRule[] => {
  return Object.values(results).flatMap((result) => result.adoptionRules || []);
};

export const getRevFileRulesScores = (
  fileRulesId: RuleId[],
  results: WalkLoopResult
): Record<RuleId, { score: number; occurences: number }> => {
  const fileRulesScores = fileRulesId.reduce<
    Record<RuleId, { score: number; occurences: number }>
  >((acc, rule) => {
    acc[rule] = {
      score: 0,
      occurences: 0,
    };
    return acc;
  }, {});

  Object.values(results).forEach((fileResults) => {
    if (fileResults?.brokenRules && fileResults.brokenRules.length > 0) {
      fileResults.brokenRules.forEach((brokenRule) => {
        const { ruleId, occurences, ruleTotalSore } = brokenRule;

        if (fileRulesScores[ruleId]) {
          fileRulesScores[ruleId].occurences += occurences;
          fileRulesScores[ruleId].score += ruleTotalSore;
        }
      });
    }
  });

  return fileRulesScores;
};

export const getRevAdoptionRulesScores = (
  adoptionRulesId: RuleId[],
  results: WalkLoopResult
): Record<RuleId, number> => {
  const adoptionRulesScores = adoptionRulesId.reduce<Record<RuleId, number>>(
    (acc, rule) => {
      acc[rule] = 0;
      return acc;
    },
    {}
  );

  Object.values(results).forEach((fileResults) => {
    if (fileResults?.adoptionRules && fileResults.adoptionRules.length > 0) {
      fileResults.adoptionRules.forEach((adoptionRule) => {
        const { ruleId, occurences } = adoptionRule;

        if (adoptionRulesScores[ruleId] !== undefined) {
          adoptionRulesScores[ruleId] += occurences;
        }
      });
    }
  });

  return adoptionRulesScores;
};

export const getRevisionResultArray = ({
  config,
  results,
}: {
  config: Config;
  results: WalkResults;
}): ChartData[] => {
  const allFileRulesIdInConfig = getFileRulesIds(config);
  const revisionResultsArr = results.map(({ rev, results }: WalkResult) => {
    const fileRulesScores = getRevFileRulesScores(
      allFileRulesIdInConfig,
      results
    );

    const totalScore = Object.values(fileRulesScores).reduce(
      (acc, rule) => acc + rule.score,
      0
    );

    return {
      commit: rev.hash,
      commitDate: new Date(rev.date).getTime(),
      totalScore,
      rules: fileRulesScores,
    };
  });

  return revisionResultsArr;
};

const getTrackAdoptionMetrics = (config: Config) => {
  const { trackAdoptionMetrics = [] } = config;
  return trackAdoptionMetrics;
};

export const configUtils = (config: Config) => {
  return {
    getFileRulesIds: () => getFileRulesIds(config),
    getAdoptionRulesIds: () => getAdoptionRulesIds(config),
    getConfigRuleById: (ruleId: RuleId) =>
      getConfigRuleById({ config, ruleId, key: "fileRules" }),
    getAdoptionRulesById: (ruleId: RuleId) =>
      getConfigRuleById({ config, ruleId, key: "adoptionRules" }),
    getTrackAdoptionMetrics: () => getTrackAdoptionMetrics(config),
  };
};
