import Tabs from "../../components/Tabs";
import { useState } from "react";
import DebtHistory from "../DebtHistory";
import DebtProjection from "../DebtProjection";
import Adoption from "../Adoption";
import type { WalkReportData } from "../../types";

const Project = ({ result }: { result: WalkReportData }) => {
  const [selectedTab, setSelectedTab] = useState<
    "chart" | "table" | "adoption"
  >("chart");
  return (
    <>
      <Tabs
        tabs={[
          { label: "Debt History", value: "chart" },
          { label: "Debt Projection", value: "table" },
          { label: "Adoption", value: "adoption" },
        ]}
        selected={selectedTab}
        onChange={(tab) => setSelectedTab(tab as typeof selectedTab)}
      />
      <div className="flex flex-col mx-auto w-full flex-1 min-h-0 overflow-y-auto px-4 card-scroll">
        {selectedTab === "chart" && <DebtHistory rawdata={result} />}
        {selectedTab === "table" && <DebtProjection rawdata={result} />}
        {selectedTab === "adoption" && <Adoption rawdata={result} />}
      </div>
    </>
  );
};

export default Project;
