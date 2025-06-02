import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const formatNumber = (value) => Number.isInteger(value) ? value : value.toFixed(2);
const getColor = (number) => {
    if (number > 0) {
        return "text-red-400";
    }
    else if (number < 0) {
        return "text-green-400";
    }
    else {
        return "text-gray-400";
    }
};
export const RulesTable = ({ rules }) => (_jsxs("table", { className: "w-full text-right border-collapse overflow-hidden", children: [_jsx("thead", { className: "bg-gray-800 sticky top-0 z-10", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-3 font-bold text-gray-200", children: "Rule ID" }), _jsx("th", { className: "px-4 py-3 font-bold text-gray-200", children: "Current score" }), _jsx("th", { className: "px-4 py-3 font-bold text-gray-200", children: "Debt points/month" }), _jsx("th", { className: "px-4 py-3 font-bold text-gray-200", children: "Days remaining to zero" }), _jsx("th", { className: "px-4 py-3 font-bold text-gray-200", children: "Estimated date to zero" })] }) }), _jsx("tbody", { children: rules.map(({ id, currentScore, tendencyMonth, daysToReachZero, estimatedendDate, }, idx) => {
                return (_jsxs("tr", { className: `${idx % 2 === 0 ? "" : "bg-gray-800"} ` +
                        getColor(tendencyMonth), children: [_jsx("td", { className: "text-left px-4 py-2 font-semibold", children: id }), _jsxs("td", { className: "px-4 py-2", children: [formatNumber(currentScore), " points"] }), _jsxs("td", { className: "px-4 py-2", children: [formatNumber(tendencyMonth), " points/month"] }), _jsx("td", { className: `px-4 py-2 ${getColor(isFinite(daysToReachZero) ? -1 : 1)}`, children: daysToReachZero && isFinite(daysToReachZero)
                                ? formatNumber(daysToReachZero) + " days"
                                : "never" }), _jsx("td", { className: `px-4 py-2 ${getColor(estimatedendDate ? -1 : 1)}`, children: estimatedendDate
                                ? new Date(estimatedendDate).toLocaleDateString()
                                : "never" })] }, id));
            }) })] }));
