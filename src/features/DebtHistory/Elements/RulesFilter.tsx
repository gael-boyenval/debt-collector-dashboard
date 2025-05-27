import React from "react";
import ToggleButton from "../../../components/ToggleButton";
import ToggleButtons from "../../../components/ToggleButtons";
import type { ValueType, ChartDatas } from "../types";
import type { RuleId } from "../../../types";

const RulesFilter: React.FC<{
  rules: string[];
  activeRules: Record<RuleId, boolean>;
  toggleRule: (id: string) => void;
  toggleAll: () => void;
  tags: ChartDatas["rulesTags"];
  tagFilter: string | null;
  toggleTag: (tag: string) => void;
  valueType: ValueType;
  switchDataBy: (key: ValueType) => void;
}> = ({
  rules,
  activeRules,
  toggleRule,
  toggleAll,
  tags,
  tagFilter,
  toggleTag,
  valueType,
  switchDataBy,
}) => (
  <div className="w-full min-w-[220px] max-w-xs flex flex-col gap-6 text-gray-100">
    <section>
      <h3 className="font-bold mb-2 text-gray-300 text-base">Rules</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {rules.map((rule) => (
          <ToggleButton
            key={rule}
            active={!!activeRules[rule]}
            onClick={() => toggleRule(rule)}
          >
            {rule}
          </ToggleButton>
        ))}
      </div>
      <button
        onClick={toggleAll}
        className="mt-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full font-semibold transition-colors duration-150 text-sm"
      >
        TOGGLE ALL RULES
      </button>
    </section>
    <section>
      <h3 className="font-bold mb-2 text-gray-300 text-base">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.keys(tags).map((tag) => (
          <ToggleButton
            key={tag}
            active={tagFilter === tag}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </ToggleButton>
        ))}
      </div>
    </section>
    <section>
      <h3 className="font-bold mb-2 text-gray-300 text-base">Display values</h3>
      <ToggleButtons
        options={[
          { label: "BY SCORE", value: "score" },
          { label: "BY OCCURENCES", value: "occurences" },
        ]}
        value={valueType}
        onChange={switchDataBy}
      />
    </section>
  </div>
);

export default RulesFilter;
