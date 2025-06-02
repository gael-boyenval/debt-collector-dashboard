import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const ReportDebtPaymentProjection = ({ period }) => {
    const noRepayment = period.tendencyMonth === 0 ||
        !isFinite(period.daysToReachZero) ||
        period.estimatedendDate === null;
    if (noRepayment) {
        return (_jsx("div", { className: "flex-1 p-4 flex items-center justify-center", children: _jsxs("div", { className: "px-6 py-4 max-w-xl w-full text-center", children: [_jsx("h3", { className: "text-lg font-bold text-gray-100 mb-3", children: "Debt Repayment Projection" }), _jsx("div", { className: "text-base text-gray-400 mb-2", children: _jsx("span", { className: "font-semibold", children: "No debt was repaid during the selected period." }) }), _jsx("div", { className: "text-base text-gray-400 mb-2", children: _jsx("span", { className: "ml-2 px-2 py-1 rounded bg-gray-800 text-yellow-400 font-semibold", children: "\uD83D\uDE2C You may find yourself in a terrible situation !" }) })] }) }));
    }
    return (_jsx("div", { className: "flex-1 p-4  flex items-center justify-center", children: _jsxs("div", { className: "px-6 py-4 max-w-xl w-full text-center", children: [_jsx("h3", { className: "text-lg font-bold text-gray-100 mb-3", children: "Debt Repayment Projection" }), _jsxs("div", { className: "text-base text-gray-200 mb-2", children: ["At an average rythme of", _jsxs("span", { className: "mx-2 px-2 py-1 rounded bg-gray-800 text-green-400 font-semibold inline-block", children: [Math.round(period.tendencyMonth * 100) / 100, " points/month"] })] }), _jsxs("div", { className: "text-base text-gray-200 mb-2", children: ["it would require", _jsxs("span", { className: "mx-2 px-2 py-1 rounded bg-gray-800 text-blue-400 font-semibold inline-block", children: [period.daysToReachZero, " days"] }), "to reach zero debt."] }), _jsxs("div", { className: "text-base text-gray-200 mt-4", children: [_jsx("span", { className: "font-semibold", children: "Debt would be paid in full on" }), _jsx("span", { className: "ml-2 px-2 py-1 rounded bg-gray-800 text-yellow-400 font-semibold", children: period.estimatedendDate
                                ? new Date(period.estimatedendDate).toLocaleDateString()
                                : "never" })] })] }) }));
};
export default ReportDebtPaymentProjection;
