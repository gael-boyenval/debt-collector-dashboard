import { useMemo } from "react";
import type { Project } from "../types";
import {
  adoptionAdapter,
  computeOverallAdoptionRate,
} from "../features/Adoption/adoptionAdapter";

function AdoptionGauge({ rate }: { rate: number }) {
  if (isNaN(rate)) return null;
  const pct = Math.round(rate * 100);
  const color =
    pct >= 80
      ? "text-green-400 border-green-400"
      : pct >= 50
        ? "text-yellow-400 border-yellow-400"
        : "text-red-400 border-red-400";

  return (
    <div
      className={`flex items-center gap-1.5 border rounded px-2.5 py-1 ${color}`}
    >
      <span className="text-xs font-medium opacity-70">Adoption</span>
      <span className="text-sm font-bold">{pct}%</span>
    </div>
  );
}

function StickyHeader({
  reset,
  currentProject,
  projects,
  navigateTo,
}: {
  reset: () => void;
  currentProject: Project | null;
  projects: Project[] | null;
  navigateTo: (tag: string) => void;
}) {
  const adoptionRate = useMemo(() => {
    if (!currentProject?.result || !currentProject.tags?.length) return NaN;
    const results = adoptionAdapter(currentProject.result, currentProject.tags);
    return computeOverallAdoptionRate(results);
  }, [currentProject]);

  const selectableProjects = useMemo(
    () => projects?.filter((p) => p.result) ?? [],
    [projects]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 shadow-sm bg-gray-900">
      <div className="mx-auto px-6 py-3 flex items-center gap-3">
        <button
          onClick={reset}
          className="text-2xl font-light tracking-tight text-green-400 hover:text-green-300 transition cursor-pointer bg-transparent border-none"
        >
          debt collector dashboard
        </button>

        {currentProject && (
          <>
            <span className="text-gray-600 text-2xl font-light">/</span>
            <span className="text-2xl font-semibold tracking-tight text-gray-100">
              {currentProject.name}
            </span>

            {selectableProjects.length > 1 && (
              <select
                value={currentProject.resultTag}
                onChange={(e) => navigateTo(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded px-2 py-1 ml-1 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {selectableProjects.map((p) => (
                  <option key={p.resultTag} value={p.resultTag}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}

            <div className="ml-auto">
              <AdoptionGauge rate={adoptionRate} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default StickyHeader;
