import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import type { ChartData } from "../types";

const ChartTooltip = ({ payload }: { payload?: Payload<number, string>[] }) => {
  if (!payload || !payload.length) {
    return null;
  }
  const safePayload = payload.filter(
    (item): item is Payload<number, string> & { payload: ChartData } =>
      typeof item.value === "number" && !!item.payload
  );
  if (!safePayload.length) return null;
  return (
    <div
      className="bg-gray-900 text-gray-100 p-3 shadow-xl border border-gray-800 text-sm min-w-[180px]"
      style={{ borderRadius: 0 }}
    >
      <div className="mb-1 text-xs text-gray-400">
        {new Date(safePayload[0].payload.commitDate).toLocaleDateString()}
      </div>
      <div className="mb-2 font-bold text-green-400 text-base">
        Total:{" "}
        {(() => {
          const total = safePayload.reduce(
            (totalScore, { value }) =>
              totalScore + (typeof value === "number" ? value : 0),
            0
          );
          return Number.isInteger(total) ? total : total.toFixed(2);
        })()}
      </div>
      <div className="mb-2 text-xs text-gray-300">
        {safePayload[0].payload.commit.name}
      </div>
      <div className="my-2" />
      {safePayload
        .slice()
        .reverse()
        .map((item) => (
          <div key={item.dataKey} className="flex items-center text-xs mb-1">
            <span
              className="inline-block w-3 h-3 rounded mr-2"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="flex-1 text-gray-200">
              {item.name?.replace(/_/g, " ")}
            </span>
            <span className="font-semibold text-gray-100 ml-2">
              {typeof item.value === "number"
                ? Number.isInteger(item.value)
                  ? item.value
                  : item.value.toFixed(2)
                : item.value}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ChartTooltip;
