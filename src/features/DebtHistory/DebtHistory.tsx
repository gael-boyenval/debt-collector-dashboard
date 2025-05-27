import ChartSwitcher from "./Elements/ChartSwitcher";
import ChartDisplay from "./Elements/ChartDisplay";
import RulesFilter from "./Elements/RulesFilter";
import ChartTooltip from "./Elements/ChartTooltip";
import type { ChartData, ValueType } from "./types";

export const DebtHistory = ({
  chartType,
  setChartType,
  data,
  rules,
  activeRules,
  reportResults,
  ruleStartDates,
  toggleRule,
  toggleAll,
  tags,
  tagFilter,
  toggleTag,
  valueType,
  switchDataBy,
}: {
  chartType: "area" | "line";
  setChartType: (type: "area" | "line") => void;
  data: ChartData[];
  rules: string[];
  activeRules: Record<string, boolean>;
  reportResults: { rulesColors: Record<string, string> };
  ruleStartDates: Record<string, number>;
  toggleRule: (rule: string) => void;
  toggleAll: () => void;
  tags: Record<string, string[]>;
  tagFilter: string | null;
  toggleTag: (tag: string) => void;
  valueType: ValueType;
  switchDataBy: (key: ValueType) => void;
}) => (
  <div className="flex flex-row w-full h-full gap-0 mt-8">
    <div className="flex-1 flex flex-col gap-4 pr-0 h-full">
      <ChartSwitcher chartType={chartType} setChartType={setChartType} />
      <div className="flex flex-row w-full h-full gap-0">
        <div className="flex-1 h-full">
          <ChartDisplay
            chartType={chartType}
            data={data}
            rules={rules}
            activeRules={activeRules}
            colors={reportResults.rulesColors}
            renderTooltip={ChartTooltip}
            ruleStartDates={ruleStartDates}
          />
        </div>
        <div className="w-[320px] min-w-[260px] max-w-xs px-6 py-4">
          <RulesFilter
            rules={rules}
            activeRules={activeRules}
            toggleRule={toggleRule}
            toggleAll={toggleAll}
            tags={tags}
            tagFilter={tagFilter}
            toggleTag={toggleTag}
            valueType={valueType}
            switchDataBy={switchDataBy}
          />
        </div>
      </div>
    </div>
  </div>
);
