import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReportDebtPaymentProjection from "./ReportDebtPaymentProjection";
import ToggleButtons from "../../../components/ToggleButtons";
import { RulesTable } from "./RulesTable";
const EstimationSummary = ({ result, estimationsBasedOn, setEstimationsBasedOn }) => (_jsxs("div", { className: "text-center pb-8", children: [_jsx("div", { className: "flex justify-center gap-2 mt-8", children: _jsx(ToggleButtons, { options: [
                    { label: "AVERAGE ALL PERIODS", value: "avairage" },
                    { label: "LAST PERIOD", value: "lastPeriod" },
                ], value: estimationsBasedOn, onChange: setEstimationsBasedOn }) }), _jsxs("h2", { className: "mt-8 mb-2 text-3xl font-bold border border-gray-700 py-2 px-5 inline-block", children: ["Current score : ", result.global.currentScore.toFixed(2)] }), _jsx("div", { className: "flex justify-center", children: _jsx(ReportDebtPaymentProjection, { period: result.global[estimationsBasedOn] }) }), _jsx("div", { className: "text-right mb-32", children: _jsx("div", { className: "overflow-x-auto ", children: _jsx(RulesTable, { rules: result.rulesTable[estimationsBasedOn] }) }) })] }));
export default EstimationSummary;
