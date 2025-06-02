import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ChartTooltip = ({ payload }) => {
    if (!payload || !payload.length) {
        return null;
    }
    const safePayload = payload.filter((item) => typeof item.value === "number" && !!item.payload);
    if (!safePayload.length)
        return null;
    return (_jsxs("div", { className: "bg-gray-900 text-gray-100 p-3 shadow-xl border border-gray-800 text-sm min-w-[180px]", style: { borderRadius: 0 }, children: [_jsx("div", { className: "mb-1 text-xs text-gray-400", children: new Date(safePayload[0].payload.commitDate).toLocaleDateString() }), _jsxs("div", { className: "mb-2 font-bold text-green-400 text-base", children: ["Total:", " ", (() => {
                        const total = safePayload.reduce((totalScore, { value }) => totalScore + (typeof value === "number" ? value : 0), 0);
                        return Number.isInteger(total) ? total : total.toFixed(2);
                    })()] }), _jsx("div", { className: "mb-2 text-xs text-gray-300", children: safePayload[0].payload.commit.name }), _jsx("div", { className: "my-2" }), safePayload
                .slice()
                .reverse()
                .map((item) => (_jsxs("div", { className: "flex items-center text-xs mb-1", children: [_jsx("span", { className: "inline-block w-3 h-3 rounded mr-2", style: { backgroundColor: item.color } }), _jsx("span", { className: "flex-1 text-gray-200", children: item.name?.replace(/_/g, " ") }), _jsx("span", { className: "font-semibold text-gray-100 ml-2", children: typeof item.value === "number"
                            ? Number.isInteger(item.value)
                                ? item.value
                                : item.value.toFixed(2)
                            : item.value })] }, item.dataKey)))] }));
};
export default ChartTooltip;
