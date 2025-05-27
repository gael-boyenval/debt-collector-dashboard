import React, { useState, useEffect, useMemo } from "react";
import { DebtHistory as DebtHistoryView } from "./DebtHistory";
import type { ChartData, ValueType } from "./types";
import type { WalkReportData } from "../../types";
import { chartDataAdapter } from "./chartDataAdapter";

interface DebtHistoryProps {
  rawdata: WalkReportData;
}

const DebtHistory: React.FC<DebtHistoryProps> = ({ rawdata }) => {
  const reportResults = useMemo(() => chartDataAdapter(rawdata), [rawdata]);
  const { rulesTags, rulesDate, chart, rules } = reportResults;

  // State for chart
  const [data, setData] = useState<ChartData[]>(chart);
  const [valueType, setValueType] = useState<ValueType>("score");
  const [activeRules, setActiveRules] = useState<Record<string, boolean>>(
    rules.reduce((acc, ruleId) => ({ ...acc, [ruleId]: true }), {})
  );
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"area" | "line">("area");

  // Update data when valueType or chart changes
  useEffect(() => {
    setData(chart);
  }, [chart]);

  // Handle tag filtering
  useEffect(() => {
    if (tagFilter) {
      setActiveRules((rules) =>
        Object.keys(rules).reduce((acc, rule) => {
          if (rulesTags[tagFilter]?.includes(rule)) {
            acc[rule] = true;
          } else {
            acc[rule] = false;
          }
          return acc;
        }, {} as Record<string, boolean>)
      );
    }
  }, [tagFilter, rulesTags]);

  // Compute timelineData for the chart
  const timelineData: ChartData[] = data.map((commitEntry) => {
    const commitDate = commitEntry.commitDate;
    const ruleValues: Record<string, number> = {};
    rules.forEach((ruleId) => {
      const startDate = rulesDate[ruleId] || 0;
      if (!activeRules[ruleId]) return;
      if (commitDate < startDate) {
        ruleValues[ruleId] = 0;
      } else {
        ruleValues[ruleId] = commitEntry.rules[ruleId]?.[valueType] || 0;
      }
    });
    return {
      ...commitEntry,
      ...ruleValues,
    };
  });

  // Handlers
  const toggleRule = (id: string) => {
    setTagFilter(null);
    setActiveRules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const switchDataBy = (key: "score" | "occurences") => {
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
      }, {} as Record<string, boolean>);
    });
  };

  const toggleTag = (tag: string) => {
    if (tagFilter === null || tagFilter !== tag) {
      setTagFilter(tag);
    } else {
      setTagFilter(null);
    }
  };

  return (
    <DebtHistoryView
      chartType={chartType}
      setChartType={setChartType}
      data={timelineData}
      rules={rules}
      activeRules={activeRules}
      reportResults={reportResults}
      ruleStartDates={rulesDate}
      toggleRule={toggleRule}
      toggleAll={toggleAll}
      tags={rulesTags}
      tagFilter={tagFilter}
      toggleTag={toggleTag}
      valueType={valueType}
      switchDataBy={switchDataBy}
    />
  );
};

export default DebtHistory;
