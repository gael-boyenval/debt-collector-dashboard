import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, } from "recharts";
// Add a custom label renderer for ReferenceLine with light text and dark shadow
const ReferenceLineLabel = ({ viewBox, value, color, }) => {
    if (!viewBox)
        return null;
    const { x, y, height } = viewBox;
    const centerY = height / 2 + y;
    return (_jsx("g", { children: _jsx("text", { x: x + 4, y: centerY, fill: color, fontSize: 12, letterSpacing: 1, fontWeight: 300, fontFamily: "sans-serif", children: value }) }));
};
const ChartDisplay = ({ chartType, data, rules, activeRules, colors, renderTooltip, ruleStartDates, }) => {
    return (_jsx("div", { className: "w-full h-[90%]  flex items-center justify-center pb-4", style: { position: "relative" }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: chartType === "area" ? (_jsxs(AreaChart, { width: 500, height: 480, data: data, margin: { top: 24, right: 32, left: 8, bottom: 32 }, children: [_jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "#374151" }), _jsx(XAxis, { dataKey: "commitDate", type: "number", domain: ["dataMin", "dataMax"], tickFormatter: (ts) => new Date(ts).toLocaleDateString(), tick: { fill: "#d1fae5", fontSize: 13 }, axisLine: { stroke: "#374151" }, tickLine: false, label: {
                            value: "Date",
                            position: "insideBottom",
                            offset: -18,
                            fill: "#34d399",
                            fontWeight: 400,
                            fontSize: 14,
                        } }), _jsx(YAxis, { tick: { fill: "#d1fae5", fontSize: 13 }, axisLine: { stroke: "#374151" }, tickLine: false, label: {
                            value: "Score",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#34d399",
                            fontWeight: 400,
                            fontSize: 14,
                        } }), _jsx(Tooltip, { content: renderTooltip, itemStyle: {
                            fontSize: 12,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            padding: 3,
                            background: "#222",
                            color: "#d1fae5",
                        }, labelStyle: {
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            color: "#d1fae5",
                        }, cursor: { fill: "#34d399", fillOpacity: 0.08 } }), _jsx(Legend, { verticalAlign: "top", height: 32, iconType: "circle", wrapperStyle: { fontWeight: 500, color: "#d1fae5", fontSize: 13 } }), rules.map((rule) => activeRules[rule] && (_jsx(Area, { dataKey: rule, stackId: "1", stroke: colors[rule], fill: colors[rule], strokeWidth: 2, dot: { r: 5 }, activeDot: { r: 8 }, connectNulls: true }, rule))), rules.map((ruleId) => (_jsx(ReferenceLine, { x: ruleStartDates[ruleId], stroke: colors[ruleId], strokeDasharray: "4 2", strokeWidth: 2, ifOverflow: "visible", label: _jsx(ReferenceLineLabel, { color: colors[ruleId], value: ruleId }) }, ruleId + "-activation")))] })) : (_jsxs(LineChart, { width: 500, height: 480, data: data, margin: { top: 24, right: 32, left: 8, bottom: 32 }, children: [_jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "#374151" }), _jsx(XAxis, { dataKey: "commitDate", type: "number", domain: ["dataMin", "dataMax"], tickFormatter: (ts) => new Date(ts).toLocaleDateString(), tick: { fill: "#d1fae5", fontSize: 13 }, axisLine: { stroke: "#374151" }, tickLine: false, label: {
                            value: "Date",
                            position: "insideBottom",
                            offset: -18,
                            fill: "#34d399",
                            fontWeight: 600,
                            fontSize: 14,
                        } }), _jsx(YAxis, { tick: { fill: "#d1fae5", fontSize: 13 }, axisLine: { stroke: "#374151" }, tickLine: false, label: {
                            value: "Score",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#34d399",
                            fontWeight: 600,
                            fontSize: 14,
                        } }), _jsx(Tooltip, { content: renderTooltip, itemStyle: {
                            fontSize: 12,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            padding: 3,
                            background: "#222",
                            color: "#d1fae5",
                        }, labelStyle: {
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            color: "#d1fae5",
                        }, cursor: {
                            stroke: "#34d399",
                            strokeWidth: 2,
                            fill: "#34d399",
                            fillOpacity: 0.08,
                        } }), _jsx(Legend, { verticalAlign: "top", height: 32, iconType: "circle", wrapperStyle: { fontWeight: 500, color: "#d1fae5", fontSize: 13 } }), rules.map((rule) => activeRules[rule] && (_jsx(Line, { dataKey: rule, stroke: colors[rule], fill: colors[rule], strokeWidth: 2, dot: { r: 3 }, activeDot: { r: 5 }, connectNulls: true }, rule))), rules.map((ruleId) => (_jsx(ReferenceLine, { x: ruleStartDates[ruleId], stroke: colors[ruleId], strokeDasharray: "4 2", strokeWidth: 2, ifOverflow: "visible", style: { cursor: "pointer" }, label: _jsx(ReferenceLineLabel, { color: colors[ruleId], value: ruleId }) }, ruleId + "-activation")))] })) }) }));
};
export default ChartDisplay;
