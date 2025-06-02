import { getConfigTags, getFileRulesDates, getFileRulesIds, getRevisionResultArray, } from "../../lib/transformWalkResultsUtils";
function getColorFromId(id) {
    // Simple hash function to get a number from the string
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Map hash to a hue (0-359)
    const hue = Math.abs(hash) % 360;
    // Use high saturation and medium-lightness for vibrancy
    return `hsl(${hue}, 75%, 55%)`;
}
//   const getRevisionDatas = (results: WalkResult): ChartData => {
//     const { rev, results: filesResults } = results
//     const { totalScore, brokenRules, adoptionRules } = filesResults.reduce<{
//       totalScore: number
//       brokenRules: BrokenRule[]
//     }>((acc, fileResults) => {
//       return acc
//     }, {})
//   }
const getRulesColors = (config) => getFileRulesIds(config).reduce((acc, ruleId) => {
    acc[ruleId] = getColorFromId(ruleId);
    return acc;
}, {});
export const chartDataAdapter = (data) => ({
    rules: getFileRulesIds(data.config),
    rulesTags: getConfigTags(data.config).fileRules,
    rulesDate: Object.fromEntries(Object.entries(getFileRulesDates(data.config)).map(([ruleId, dateStr]) => [
        ruleId,
        dateStr ? new Date(dateStr).getTime() : 0,
    ])),
    rulesColors: getRulesColors(data.config),
    chart: getRevisionResultArray({
        config: data.config,
        results: data.results,
    }),
});
