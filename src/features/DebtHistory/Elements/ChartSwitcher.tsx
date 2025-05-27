import React from "react";
import ToggleButtons, {
  type ToggleOption,
} from "../../../components/ToggleButtons";

const chartOptions: ToggleOption<"area" | "line">[] = [
  {
    label: (
      <>
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="inline-block mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 17l6-6 4 4 8-8"
          />
        </svg>
        Area Chart
      </>
    ),
    value: "area",
  },
  {
    label: (
      <>
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="inline-block mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4-4 4 4 4-8"
          />
        </svg>
        Line Chart
      </>
    ),
    value: "line",
  },
];

const ChartSwitcher: React.FC<{
  chartType: "area" | "line";
  setChartType: (type: "area" | "line") => void;
}> = ({ chartType, setChartType }) => (
  <ToggleButtons
    options={chartOptions}
    value={chartType}
    onChange={setChartType}
  />
);

export default ChartSwitcher;
