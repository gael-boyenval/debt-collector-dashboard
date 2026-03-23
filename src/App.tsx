import React, { useCallback, useEffect, useMemo, useState } from "react";
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
        (entries[1].brokenRules?.length ?? 0) > 0 || (entries[1].adoptionRules?.length ?? 0) > 0
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

const getTagFromHash = () => window.location.hash.replace(/^#\/?/, "") || null;

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [currentTag, setCurrentTag] = useState<string | null>(getTagFromHash);
  const [error, setError] = useState<string | null>(null);
  const isReady = projects && !error;

  const currentProject = useMemo(
    () => projects?.find((p) => p.resultTag === currentTag) ?? null,
    [projects, currentTag]
  );

  const navigateTo = useCallback((tag: string | null) => {
    const newHash = tag ? `#/${tag}` : "";
    if (window.location.hash !== newHash) {
      window.history.pushState(null, "", newHash || window.location.pathname);
    }
    setCurrentTag(tag);
  }, []);

  useEffect(() => {
    loadProjects({ setError, setProjects });
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentTag(getTagFromHash());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="bg-gray-900 h-screen w-full font-sans text-gray-100 flex flex-col overflow-hidden">
      <StickyHeader
        reset={() => navigateTo(null)}
        currentProject={currentProject}
        projects={projects}
        navigateTo={navigateTo}
      />
      {!isReady && !error && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {isReady && !currentProject && (
        <Repos
          projects={projects}
          gotoProject={(project: Project) =>
            project.result && navigateTo(project.resultTag)
          }
        />
      )}

      {isReady && currentProject?.result && (
        <ProjectView result={currentProject.result} />
      )}
    </div>
  );
};

export default App;
