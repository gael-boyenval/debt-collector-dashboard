import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const ToggleButton = ({ active, onClick, children, className = '' }) => (_jsx("button", { type: "button", onClick: onClick, className: `px-3 py-1 rounded-full font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-700 text-sm ${active
        ? 'bg-green-600 text-white hover:bg-green-700'
        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'} ${className}`, "aria-pressed": active, children: children }));
export default ToggleButton;
