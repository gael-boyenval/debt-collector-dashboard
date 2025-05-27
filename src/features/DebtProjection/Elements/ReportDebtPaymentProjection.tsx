import React from "react";
import type { EndDateEstimationPeriod } from "../types";

const ReportDebtPaymentProjection: React.FC<{
  period: EndDateEstimationPeriod;
}> = ({ period }) => {
  const noRepayment =
    period.tendencyMonth === 0 ||
    !isFinite(period.daysToReachZero) ||
    period.estimatedendDate === null;

  if (noRepayment) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="px-6 py-4 max-w-xl w-full text-center">
          <h3 className="text-lg font-bold text-gray-100 mb-3">
            Debt Repayment Projection
          </h3>
          <div className="text-base text-gray-400 mb-2">
            <span className="font-semibold">
              No debt was repaid during the selected period.
            </span>
          </div>
          <div className="text-base text-gray-400 mb-2">
            <span className="ml-2 px-2 py-1 rounded bg-gray-800 text-yellow-400 font-semibold">
              😬 You may find yourself in a terrible situation !
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4  flex items-center justify-center">
      <div className="px-6 py-4 max-w-xl w-full text-center">
        <h3 className="text-lg font-bold text-gray-100 mb-3">
          Debt Repayment Projection
        </h3>
        <div className="text-base text-gray-200 mb-2">
          At an average rythme of
          <span className="mx-2 px-2 py-1 rounded bg-gray-800 text-green-400 font-semibold inline-block">
            {Math.round(period.tendencyMonth * 100) / 100} points/month
          </span>
        </div>
        <div className="text-base text-gray-200 mb-2">
          it would require
          <span className="mx-2 px-2 py-1 rounded bg-gray-800 text-blue-400 font-semibold inline-block">
            {period.daysToReachZero} days
          </span>
          to reach zero debt.
        </div>
        <div className="text-base text-gray-200 mt-4">
          <span className="font-semibold">Debt would be paid in full on</span>
          <span className="ml-2 px-2 py-1 rounded bg-gray-800 text-yellow-400 font-semibold">
            {period.estimatedendDate
              ? new Date(period.estimatedendDate).toLocaleDateString()
              : "never"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportDebtPaymentProjection;
