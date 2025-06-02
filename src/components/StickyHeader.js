import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const StickyHeader = ({ reset }) => (_jsx("header", { className: "sticky top-0 z-50 w-full border-b border-gray-800 shadow-sm bg-gray-900", children: _jsxs("div", { className: " mx-auto px-6 py-3 flex items-center", children: [_jsx("button", { onClick: reset, className: "text-gray-400 mr-4", children: "\u2190" }), _jsx("span", { className: "text-2xl font-lighttracking-tight text-green-400", children: "debt collector dashboard" })] }) }));
export default StickyHeader;
