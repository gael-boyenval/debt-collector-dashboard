import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ToggleButtons, {} from "../../../components/ToggleButtons";
const chartOptions = [
    {
        label: (_jsxs(_Fragment, { children: [_jsx("svg", { width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "inline-block mr-1", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 17l6-6 4 4 8-8" }) }), "Area Chart"] })),
        value: "area",
    },
    {
        label: (_jsxs(_Fragment, { children: [_jsx("svg", { width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "inline-block mr-1", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4-4 4 4 4-8" }) }), "Line Chart"] })),
        value: "line",
    },
];
const ChartSwitcher = ({ chartType, setChartType }) => (_jsx(ToggleButtons, { options: chartOptions, value: chartType, onChange: setChartType }));
export default ChartSwitcher;
