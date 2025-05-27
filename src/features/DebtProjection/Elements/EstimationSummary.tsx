import React from "react";
import ReportDebtPaymentProjection from "./ReportDebtPaymentProjection";
import ToggleButtons from "../../../components/ToggleButtons";
import { RulesTable } from "./RulesTable";
import type { EndDateEstimations } from "../types";

const EstimationSummary: React.FC<{
  result: EndDateEstimations;
  estimationsBasedOn: "avairage" | "lastPeriod";
  setEstimationsBasedOn: (val: "avairage" | "lastPeriod") => void;
}> = ({ result, estimationsBasedOn, setEstimationsBasedOn }) => (
  <div className="text-center pb-8">
    <div className="flex justify-center gap-2 mt-8">
      <ToggleButtons
        options={[
          { label: "AVERAGE ALL PERIODS", value: "avairage" },
          { label: "LAST PERIOD", value: "lastPeriod" },
        ]}
        value={estimationsBasedOn}
        onChange={setEstimationsBasedOn}
      />
    </div>
    <h2 className="mt-8 mb-2 text-3xl font-bold border border-gray-700 py-2 px-5 inline-block">
      Current score : {result.global.currentScore.toFixed(2)}
    </h2>
    <div className="flex justify-center">
      <ReportDebtPaymentProjection period={result.global[estimationsBasedOn]} />
    </div>
    <div className="text-right mb-32">
      <div className="overflow-x-auto ">
        <RulesTable rules={result.rulesTable[estimationsBasedOn]} />
      </div>
    </div>
  </div>
);

export default EstimationSummary;
