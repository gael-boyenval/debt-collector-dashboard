import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import type { ChartData } from "../types";

// Add a custom label renderer for ReferenceLine with light text and dark shadow
const ReferenceLineLabel = ({
  viewBox,
  value,
  color,
}: {
  viewBox?: { x: number; y: number; height: number };
  value: string;
  color: string;
}) => {
  if (!viewBox) return null;
  const { x, y, height } = viewBox;
  const centerY = height / 2 + y;
  return (
    <g>
      <text
        x={x + 4}
        y={centerY}
        fill={color}
        fontSize={12}
        letterSpacing={1}
        fontWeight={300}
        fontFamily="sans-serif"
      >
        {value}
      </text>
    </g>
  );
};

const ChartDisplay: React.FC<{
  chartType: "area" | "line";
  data: ChartData[];
  rules: string[];
  activeRules: Record<string, boolean>;
  colors: Record<string, string>;
  renderTooltip: (props: {
    payload?: Payload<number, string>[];
  }) => React.ReactNode;
  ruleStartDates: Record<string, number>;
}> = ({
  chartType,
  data,
  rules,
  activeRules,
  colors,
  renderTooltip,
  ruleStartDates,
}) => {
  return (
    <div
      className="w-full h-[90%]  flex items-center justify-center pb-4"
      style={{ position: "relative" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart
            width={500}
            height={480}
            data={data}
            margin={{ top: 24, right: 32, left: 8, bottom: 32 }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke="#374151" />
            <XAxis
              dataKey="commitDate"
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
              tick={{ fill: "#d1fae5", fontSize: 13 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              label={{
                value: "Score",
                angle: -90,
                position: "insideLeft",
                fill: "#34d399",
                fontWeight: 400,
                fontSize: 14,
              }}
            />
            <Tooltip
              content={renderTooltip}
              itemStyle={{
                fontSize: 12,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: 3,
                background: "#222",
                color: "#d1fae5",
              }}
              labelStyle={{
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                color: "#d1fae5",
              }}
              cursor={{ fill: "#34d399", fillOpacity: 0.08 }}
            />
            <Legend
              verticalAlign="top"
              height={32}
              iconType="circle"
              wrapperStyle={{ fontWeight: 500, color: "#d1fae5", fontSize: 13 }}
            />
            {rules.map(
              (rule) =>
                activeRules[rule] && (
                  <Area
                    key={rule}
                    dataKey={rule}
                    stackId="1"
                    stroke={colors[rule]}
                    fill={colors[rule]}
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                )
            )}
            {/* Vertical lines for rule activations */}
            {rules.map((ruleId) => (
              <ReferenceLine
                key={ruleId + "-activation"}
                x={ruleStartDates[ruleId]}
                stroke={colors[ruleId]}
                strokeDasharray="4 2"
                strokeWidth={2}
                ifOverflow="visible"
                label={
                  <ReferenceLineLabel color={colors[ruleId]} value={ruleId} />
                }
              />
            ))}
          </AreaChart>
        ) : (
          <LineChart
            width={500}
            height={480}
            data={data}
            margin={{ top: 24, right: 32, left: 8, bottom: 32 }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke="#374151" />
            <XAxis
              dataKey="commitDate"
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
                fontWeight: 600,
                fontSize: 14,
              }}
            />
            <YAxis
              tick={{ fill: "#d1fae5", fontSize: 13 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              label={{
                value: "Score",
                angle: -90,
                position: "insideLeft",
                fill: "#34d399",
                fontWeight: 600,
                fontSize: 14,
              }}
            />
            <Tooltip
              content={renderTooltip}
              itemStyle={{
                fontSize: 12,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: 3,
                background: "#222",
                color: "#d1fae5",
              }}
              labelStyle={{
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                color: "#d1fae5",
              }}
              cursor={{
                stroke: "#34d399",
                strokeWidth: 2,
                fill: "#34d399",
                fillOpacity: 0.08,
              }}
            />
            <Legend
              verticalAlign="top"
              height={32}
              iconType="circle"
              wrapperStyle={{ fontWeight: 500, color: "#d1fae5", fontSize: 13 }}
            />
            {rules.map(
              (rule) =>
                activeRules[rule] && (
                  <Line
                    key={rule}
                    dataKey={rule}
                    stroke={colors[rule]}
                    fill={colors[rule]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    connectNulls
                  />
                )
            )}
            {/* Vertical lines for rule activations */}
            {rules.map((ruleId) => (
              <ReferenceLine
                key={ruleId + "-activation"}
                x={ruleStartDates[ruleId]}
                stroke={colors[ruleId]}
                strokeDasharray="4 2"
                strokeWidth={2}
                ifOverflow="visible"
                style={{ cursor: "pointer" }}
                label={
                  <ReferenceLineLabel color={colors[ruleId]} value={ruleId} />
                }
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
