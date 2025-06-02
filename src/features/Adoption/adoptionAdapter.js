import { configUtils, getRevAdoptionRulesScores, getRevFileRulesScores, } from "../../lib/transformWalkResultsUtils";
export function adoptionAdapter(data) {
    const { getFileRulesIds, getAdoptionRulesIds, getTrackAdoptionMetrics } = configUtils(data.config);
    const rules = getFileRulesIds();
    const adoptionRules = getAdoptionRulesIds();
    const adoptionRulesScores = getRevAdoptionRulesScores(adoptionRules, data.results[data.results.length - 1].results);
    const fileRulesScores = getRevFileRulesScores(rules, data.results[data.results.length - 1].results);
    const adoptionMetrics = getTrackAdoptionMetrics();
    return adoptionMetrics.map((metric) => {
        const totalScore = metric.adoptionRules.reduce((acc, rule) => {
            if (adoptionRulesScores[rule]) {
                return acc + adoptionRulesScores[rule];
            }
            return acc;
        }, 0);
        const isAdopted = totalScore > 0;
        const totalDebt = metric.debtRules?.reduce((acc, rule) => {
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
