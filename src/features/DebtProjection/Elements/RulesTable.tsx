import type { EndDateEstimationRule } from "../types";

const formatNumber = (value: number) =>
  Number.isInteger(value) ? value : value.toFixed(2);

const getColor = (number: number) => {
  if (number > 0) {
    return "text-red-400";
  } else if (number < 0) {
    return "text-green-400";
  } else {
    return "text-gray-400";
  }
};

export const RulesTable = ({ rules }: { rules: EndDateEstimationRule[] }) => (
  <table className="w-full text-right border-collapse overflow-hidden">
    <thead className="bg-gray-800 sticky top-0 z-10">
      <tr>
        <th className="text-left px-4 py-3 font-bold text-gray-200">Rule ID</th>
        <th className="px-4 py-3 font-bold text-gray-200">Current score</th>
        <th className="px-4 py-3 font-bold text-gray-200">Debt points/month</th>
        <th className="px-4 py-3 font-bold text-gray-200">
          Days remaining to zero
        </th>
        <th className="px-4 py-3 font-bold text-gray-200">
          Estimated date to zero
        </th>
      </tr>
    </thead>
    <tbody>
      {rules.map(
        (
          {
            id,
            currentScore,
            tendencyMonth,
            daysToReachZero,
            estimatedendDate,
          },
          idx
        ) => {
          return (
            <tr
              key={id}
              className={
                `${idx % 2 === 0 ? "" : "bg-gray-800"} ` +
                getColor(tendencyMonth)
              }
            >
              <td className="text-left px-4 py-2 font-semibold">{id}</td>
              <td className="px-4 py-2">{formatNumber(currentScore)} points</td>
              <td className="px-4 py-2">
                {formatNumber(tendencyMonth)} points/month
              </td>
              <td
                className={`px-4 py-2 ${getColor(
                  isFinite(daysToReachZero) ? -1 : 1
                )}`}
              >
                {daysToReachZero && isFinite(daysToReachZero)
                  ? formatNumber(daysToReachZero) + " days"
                  : "never"}
              </td>
              <td
                className={`px-4 py-2 ${getColor(estimatedendDate ? -1 : 1)}`}
              >
                {estimatedendDate
                  ? new Date(estimatedendDate).toLocaleDateString()
                  : "never"}
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  </table>
);
