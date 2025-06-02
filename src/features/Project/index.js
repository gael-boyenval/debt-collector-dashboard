import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Tabs from "../../components/Tabs";
import { useState } from "react";
import DebtHistory from "../DebtHistory";
import DebtProjection from "../DebtProjection";
import Adoption from "../Adoption";
const Project = ({ result }) => {
    const [selectedTab, setSelectedTab] = useState("chart");
    return (_jsxs(_Fragment, { children: [_jsx(Tabs, { tabs: [
                    { label: "Debt History", value: "chart" },
                    { label: "Debt Projection", value: "table" },
                    { label: "Adoption", value: "adoption" },
                ], selected: selectedTab, onChange: (tab) => setSelectedTab(tab) }), _jsxs("div", { className: "flex flex-col mx-auto w-full h-[calc(100vh-180px)] px-4", children: [selectedTab === "chart" && _jsx(DebtHistory, { rawdata: result }), selectedTab === "table" && _jsx(DebtProjection, { rawdata: result }), selectedTab === "adoption" && _jsx(Adoption, { rawdata: result })] })] }));
};
export default Project;
