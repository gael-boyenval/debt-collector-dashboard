import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { DebtHistory as DebtHistoryView } from "./DebtHistory";
import { chartDataAdapter } from "./chartDataAdapter";
const DebtHistory = ({ rawdata }) => {
    const reportResults = useMemo(() => chartDataAdapter(rawdata), [rawdata]);
    const { rulesTags, rulesDate, chart, rules } = reportResults;
    // State for chart
    const [data, setData] = useState(chart);
    const [valueType, setValueType] = useState("score");
    const [activeRules, setActiveRules] = useState(rules.reduce((acc, ruleId) => ({ ...acc, [ruleId]: true }), {}));
    const [tagFilter, setTagFilter] = useState(null);
    const [chartType, setChartType] = useState("area");
    // Update data when valueType or chart changes
    useEffect(() => {
        setData(chart);
    }, [chart]);
    // Handle tag filtering
    useEffect(() => {
        if (tagFilter) {
            setActiveRules((rules) => Object.keys(rules).reduce((acc, rule) => {
                if (rulesTags[tagFilter]?.includes(rule)) {
                    acc[rule] = true;
                }
                else {
                    acc[rule] = false;
                }
                return acc;
            }, {}));
        }
    }, [tagFilter, rulesTags]);
    // Compute timelineData for the chart
    const timelineData = data.map((commitEntry) => {
        const commitDate = commitEntry.commitDate;
        const ruleValues = {};
        rules.forEach((ruleId) => {
            const startDate = rulesDate[ruleId] || 0;
            if (!activeRules[ruleId])
                return;
            if (commitDate < startDate) {
                ruleValues[ruleId] = 0;
            }
            else {
                ruleValues[ruleId] = commitEntry.rules[ruleId]?.[valueType] || 0;
            }
        });
        return {
            ...commitEntry,
            ...ruleValues,
        };
    });
    // Handlers
    const toggleRule = (id) => {
        setTagFilter(null);
        setActiveRules((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const switchDataBy = (key) => {
        setValueType(key);
    };
    const toggleAll = () => {
        setTagFilter(null);
        setActiveRules((prev) => {
            const rulesKeys = Object.keys(prev);
            const firstIsActive = !!prev[rulesKeys[0]];
            return rulesKeys.reduce((rules, rule) => {
                rules[rule] = !firstIsActive;
                return rules;
            }, {});
        });
    };
    const toggleTag = (tag) => {
        if (tagFilter === null || tagFilter !== tag) {
            setTagFilter(tag);
        }
        else {
            setTagFilter(null);
        }
    };
    return (_jsx(DebtHistoryView, { chartType: chartType, setChartType: setChartType, data: timelineData, rules: rules, activeRules: activeRules, reportResults: reportResults, ruleStartDates: rulesDate, toggleRule: toggleRule, toggleAll: toggleAll, tags: rulesTags, tagFilter: tagFilter, toggleTag: toggleTag, valueType: valueType, switchDataBy: switchDataBy }));
};
export default DebtHistory;
