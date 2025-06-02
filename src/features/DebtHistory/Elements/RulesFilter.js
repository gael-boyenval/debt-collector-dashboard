import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ToggleButton from "../../../components/ToggleButton";
import ToggleButtons from "../../../components/ToggleButtons";
const RulesFilter = ({ rules, activeRules, toggleRule, toggleAll, tags, tagFilter, toggleTag, valueType, switchDataBy, }) => (_jsxs("div", { className: "w-full min-w-[220px] max-w-xs flex flex-col gap-6 text-gray-100", children: [_jsxs("section", { children: [_jsx("h3", { className: "font-bold mb-2 text-gray-300 text-base", children: "Rules" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: rules.map((rule) => (_jsx(ToggleButton, { active: !!activeRules[rule], onClick: () => toggleRule(rule), children: rule }, rule))) }), _jsx("button", { onClick: toggleAll, className: "mt-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full font-semibold transition-colors duration-150 text-sm", children: "TOGGLE ALL RULES" })] }), _jsxs("section", { children: [_jsx("h3", { className: "font-bold mb-2 text-gray-300 text-base", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: Object.keys(tags).map((tag) => (_jsx(ToggleButton, { active: tagFilter === tag, onClick: () => toggleTag(tag), children: tag }, tag))) })] }), _jsxs("section", { children: [_jsx("h3", { className: "font-bold mb-2 text-gray-300 text-base", children: "Display values" }), _jsx(ToggleButtons, { options: [
                        { label: "BY SCORE", value: "score" },
                        { label: "BY OCCURENCES", value: "occurences" },
                    ], value: valueType, onChange: switchDataBy })] })] }));
export default RulesFilter;
