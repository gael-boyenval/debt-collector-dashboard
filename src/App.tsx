import React, { useEffect, useMemo, useState } from "react";
import StickyHeader from "./components/StickyHeader";
import type { Project, WalkReportData, WalkLoopResult } from "./types";
import { Repos } from "./features/Repos";
import ProjectView from "./features/Project";

const filterFilesWithLMatchingRules = (
  walkLoopResult: WalkLoopResult
): WalkLoopResult =>
  Object.fromEntries(
    Object.entries(walkLoopResult).filter(
      (entries) =>
        entries[1].brokenRules.length > 0 || entries[1].adoptionRules.length > 0
    )
  );

const filteredData = (data: WalkReportData): WalkReportData => ({
  config: data.config,
  results: data.results.map((commit) => ({
    ...commit,
    results: filterFilesWithLMatchingRules(commit.results),
  })),
});

const loadProjects = async ({
  setError,
  setProjects,
}: {
  setError: (error: string) => void;
  setProjects: (projects: Project[]) => void;
}) => {
  const configRes = await fetch(`projects-config.json`);

  if (!configRes.ok) {
    setError("Failed to fetch projects config");
    return;
  }

  const loadProject = async (project: Project) => {
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
    } catch (error: unknown) {
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

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isReady = projects && !error;

  const currentProjectData = useMemo(() => {
    return projects?.find((p) => p.name === currentProject)?.result;
  }, [projects, currentProject]);

  useEffect(() => {
    loadProjects({ setError, setProjects });
  }, []);

  return (
    <div className="bg-gray-900 h-screen w-full font-sans text-gray-100 flex flex-col">
      <StickyHeader reset={() => setCurrentProject(null)} />
      {!isReady && !error && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {isReady && !currentProject && (
        <Repos
          projects={projects}
          gotoProject={(project: Project) =>
            project.result && setCurrentProject(project.name)
          }
        />
      )}

      {isReady && currentProject && currentProjectData && (
        <ProjectView result={currentProjectData} />
      )}
    </div>
  );
};

export default App;
