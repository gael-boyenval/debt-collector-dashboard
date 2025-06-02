import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Tabs = ({ tabs, selected, onChange }) => (_jsx("div", { className: "flex flex-row items-end w-full mt-6 mb-4 border-b border-gray-700", children: tabs.map(tab => (_jsx("button", { className: `text-lg font-bold px-8 py-4 border-b-2 transition-colors duration-150
          ${selected === tab.value ? 'border-green-400 text-green-400 bg-gray-900' : 'border-transparent text-gray-400 bg-transparent hover:text-green-300'}
          focus:outline-none`, style: { marginRight: 2 }, onClick: () => onChange(tab.value), children: tab.label }, tab.value))) }));
export default Tabs;
