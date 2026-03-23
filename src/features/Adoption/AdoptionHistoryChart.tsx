import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AdoptionSnapshot } from "./types";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: AdoptionSnapshot }[];
}) => {
  if (!active || !payload?.length) return null;
  const snap = payload[0].payload;
  return (
    <div className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm shadow-lg max-w-xs">
      <div className="text-gray-300 font-semibold mb-1">{snap.label}</div>
      <div className="text-gray-400">
        {new Date(snap.date).toLocaleDateString()}
      </div>
      <div className="text-green-400 font-bold mt-1">
        {snap.adoptedCount} / {snap.totalCount} components
      </div>
      <div className="text-gray-300">
        {Math.round(snap.adoptionRate * 100)}% adopted
      </div>
      {snap.newlyAdopted.length > 0 && (
        <div className="mt-2 border-t border-gray-700 pt-2">
          <div className="text-green-400 text-xs font-semibold mb-0.5">
            + Newly adopted
          </div>
          {snap.newlyAdopted.map((name) => (
            <div key={name} className="text-green-300 text-xs pl-2">
              {name}
            </div>
          ))}
        </div>
      )}
      {snap.lost.length > 0 && (
        <div className="mt-2 border-t border-gray-700 pt-2">
          <div className="text-red-400 text-xs font-semibold mb-0.5">
            - Lost
          </div>
          {snap.lost.map((name) => (
            <div key={name} className="text-red-300 text-xs pl-2">
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdoptionHistoryChart: React.FC<{ data: AdoptionSnapshot[] }> = ({
  data,
}) => {
  if (data.length < 2) return null;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 16, right: 24, left: 8, bottom: 32 }}
        >
          <defs>
            <linearGradient id="adoptionFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="#374151" />
          <XAxis
            dataKey="date"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
            tick={{ fill: "#d1fae5", fontSize: 13 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={false}
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -18,
              fill: "#34d399",
              fontWeight: 400,
              fontSize: 14,
            }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#d1fae5", fontSize: 13 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={false}
            domain={[0, (max: number) => Math.max(max + 1, 1)]}
            label={{
              value: "Adopted",
              angle: -90,
              position: "insideLeft",
              fill: "#34d399",
              fontWeight: 400,
              fontSize: 14,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="adoptedCount"
            stroke="#34d399"
            fill="url(#adoptionFill)"
            strokeWidth={2}
            dot={{ r: 4, fill: "#34d399", stroke: "#1f2937", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdoptionHistoryChart;
