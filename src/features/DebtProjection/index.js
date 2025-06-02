import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo, useState } from "react";
import EstimationSummary from "./Elements/EstimationSummary";
import { estimationAdapter } from "./estimationAdapter";
const DebtProjection = ({ rawdata }) => {
    const result = useMemo(() => estimationAdapter(rawdata), [rawdata]);
    const [estimationsBasedOn, setEstimationsBasedOn] = useState("avairage");
    return (_jsx("div", { className: "w-full flex flex-col gap-6 mt-8", children: _jsx(EstimationSummary, { result: result, estimationsBasedOn: estimationsBasedOn, setEstimationsBasedOn: setEstimationsBasedOn }) }));
};
export default DebtProjection;
