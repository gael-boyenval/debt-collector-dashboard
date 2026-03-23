import { useMemo, useState } from "react";
import type { Project } from "../../types";
import Adoption from "../Adoption";
import { adoptionAdapter, computeOverallAdoptionRate } from "../Adoption/adoptionAdapter";

const hasData = (project: Project) =>
  project.result && project.result.config?.trackAdoptionMetrics;

const hasAdoptionTags = (project: Project) =>
  hasData(project) && project.tags && project.tags.length > 0;

function AdoptionRateBadge({ rate }: { rate: number }) {
  if (isNaN(rate)) return null;
  const pct = Math.round(rate * 100);
  const color =
    pct >= 80 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400";

  return (
    <span className={`text-sm font-bold ${color}`}>
      {pct}%
    </span>
  );
}

function AdoptionRateBar({ rate, label }: { rate: number; label: string }) {
  if (isNaN(rate)) return null;
  const pct = Math.round(rate * 100);
  const barColor =
    pct >= 80 ? "bg-green-600" : pct >= 50 ? "bg-yellow-600" : "bg-red-600";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 font-medium">{label}</span>
        <span className="text-2xl font-bold text-gray-100">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export const Repos = ({
  projects,
  gotoProject,
}: {
  projects: Project[];
  gotoProject: (project: Project) => void;
}) => {
  const [search, setSearch] = useState("");
  const visibleProjects = projects.filter(hasData);
  const adoptionProjects = visibleProjects.filter(hasAdoptionTags);

  const projectAdoptionRates = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of adoptionProjects) {
      if (!project.result) continue;
      const results = adoptionAdapter(project.result, project.tags);
      map.set(project.resultTag, computeOverallAdoptionRate(results));
    }
    return map;
  }, [adoptionProjects]);

  const globalAdoptionRate = useMemo(() => {
    const allResults = adoptionProjects.flatMap((p) =>
      p.result ? adoptionAdapter(p.result, p.tags) : []
    );
    return computeOverallAdoptionRate(allResults);
  }, [adoptionProjects]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const p of adoptionProjects) {
      p.tags?.forEach((t) => tagSet.add(t));
    }
    return Array.from(tagSet).sort();
  }, [adoptionProjects]);

  const perTagAdoptionRates = useMemo(() => {
    const map = new Map<string, number>();
    for (const tag of allTags) {
      const tagProjects = adoptionProjects.filter((p) => p.tags?.includes(tag));
      const tagResults = tagProjects.flatMap((p) =>
        p.result ? adoptionAdapter(p.result, [tag]) : []
      );
      map.set(tag, computeOverallAdoptionRate(tagResults));
    }
    return map;
  }, [adoptionProjects, allTags]);

  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gray-900 py-12">
      <div className="px-8 mb-10 flex flex-col gap-6">
        <div className="flex gap-6 flex-wrap">
          <div className="min-w-[200px] flex-1 max-w-xs">
            <AdoptionRateBar rate={globalAdoptionRate} label="Global Adoption" />
          </div>
          {allTags.length > 1 &&
            allTags.map((tag) => (
              <div key={tag} className="min-w-[200px] flex-1 max-w-xs">
                <AdoptionRateBar
                  rate={perTagAdoptionRates.get(tag) ?? NaN}
                  label={tag}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-1 max-w-xs">
          <label htmlFor="component-search" className="text-sm text-gray-400 font-medium">
            Filter components
          </label>
          <input
            id="component-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or id..."
            className="bg-gray-800 border border-gray-600 text-gray-100 text-sm rounded px-3 py-2 w-64 focus:outline-none focus:border-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="grid gap-8 px-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(350px, 100%), 1fr))" }}>
        {visibleProjects.map((project) => (
          <div
            key={project.name}
            className="bg-gray-800 shadow-lg flex flex-col hover:shadow-2xl hover:bg-gray-950 transition cursor-pointer border border-gray-700 max-h-[480px] overflow-hidden"
            onClick={() => gotoProject(project)}
          >
            <div className="p-6 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-semibold text-gray-100">
                  {project.name}
                </div>
                <AdoptionRateBadge
                  rate={projectAdoptionRates.get(project.resultTag) ?? NaN}
                />
              </div>
              <div className="text-gray-400 text-sm mb-2">
                {project.description}
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-900 text-gray-200 rounded hover:bg-gray-700 text-xs font-medium transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Repo
                </a>
                <a
                  href={project.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-xs font-medium transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open Project
                </a>
              </div>
            </div>
            <div className="text-gray-400 text-sm border-t border-gray-700 flex-1 overflow-y-auto overflow-x-hidden min-h-0 card-scroll">
              <Adoption rawdata={project.result!} minified={true} filter={search} projectTags={project.tags} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
