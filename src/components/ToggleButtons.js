import { jsx as _jsx } from "react/jsx-runtime";
function ToggleButtons({ options, value, onChange, className = '' }) {
    return (_jsx("div", { className: `inline-flex rounded-full bg-gray-800 p-1 ${className}`, role: "group", children: options.map((option) => (_jsx("button", { type: "button", onClick: () => onChange(option.value), className: `px-4 py-1.5 text-sm font-semibold focus:outline-none transition-colors duration-150 rounded-full
            ${value === option.value
                ? 'bg-green-600 text-white'
                : 'bg-transparent text-gray-200 hover:bg-gray-700'}
          `, "aria-pressed": value === option.value, children: option.label }, option.value))) }));
}
export default ToggleButtons;
