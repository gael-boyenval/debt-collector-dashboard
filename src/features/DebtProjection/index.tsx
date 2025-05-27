import React, { useMemo, useState } from "react";
import EstimationSummary from "./Elements/EstimationSummary";
import { estimationAdapter } from "./estimationAdapter";
import type { WalkReportData } from "../../types";

interface DebtProjectionProps {
  rawdata: WalkReportData;
}

const DebtProjection: React.FC<DebtProjectionProps> = ({ rawdata }) => {
  const result = useMemo(() => estimationAdapter(rawdata), [rawdata]);

  const [estimationsBasedOn, setEstimationsBasedOn] = useState<
    "avairage" | "lastPeriod"
  >("avairage");
  return (
    <div className="w-full flex flex-col gap-6 mt-8">
      <EstimationSummary
        result={result}
        estimationsBasedOn={estimationsBasedOn}
        setEstimationsBasedOn={setEstimationsBasedOn}
      />
    </div>
  );
};

export default DebtProjection;
