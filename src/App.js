import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from "react";
import StickyHeader from "./components/StickyHeader";
import { Repos } from "./features/Repos";
import ProjectView from "./features/Project";
// import walkData from "./walkResults.json";
const filterFilesWithLMatchingRules = (walkLoopResult) => Object.fromEntries(Object.entries(walkLoopResult).filter((entries) => entries[1].brokenRules.length > 0 || entries[1].adoptionRules.length > 0));
const filteredData = (data) => ({
    config: data.config,
    results: data.results.map((commit) => ({
        ...commit,
        results: filterFilesWithLMatchingRules(commit.results),
    })),
});
const loadProjects = async ({ setError, setProjects, }) => {
    const configRes = await fetch(`projects-config.json`);
    if (!configRes.ok) {
        setError("Failed to fetch projects config");
        return;
    }
    const loadProject = async (project) => {
        try {
            const res = await fetch(`${project.resultTag}-results.json`);
            if (!res.ok) {
                return {
                    ...project,
                    result: null,
                };
            }
            const result = await res.json();
            return {
                ...project,
                result: filteredData(result),
            };
        }
        catch (error) {
            console.error(error);
            return {
                ...project,
                result: null,
            };
        }
    };
    const config = await configRes.json();
    const projects = await Promise.all(config.projects.map(loadProject));
    setProjects(projects);
};
const App = () => {
    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [error, setError] = useState(null);
    const isReady = projects && !error;
    const currentProjectData = useMemo(() => {
        return projects?.find((p) => p.name === currentProject)?.result;
    }, [projects, currentProject]);
    useEffect(() => {
        loadProjects({ setError, setProjects });
    }, []);
    return (_jsxs("div", { className: "bg-gray-900 h-screen w-full font-sans text-gray-100 flex flex-col", children: [_jsx(StickyHeader, { reset: () => setCurrentProject(null) }), !isReady && !error && _jsx("div", { children: "Loading..." }), error && _jsxs("div", { children: ["Error: ", error] }), isReady && !currentProject && (_jsx(Repos, { projects: projects, gotoProject: (project) => project.result && setCurrentProject(project.name) })), isReady && currentProject && currentProjectData && (_jsx(ProjectView, { result: currentProjectData }))] }));
};
export default App;
