import type { Project } from "../../types";
import Adoption from "../Adoption";

export const Repos = ({
  projects,
  gotoProject,
}: {
  projects: Project[];
  gotoProject: (project: Project) => void;
}) => {
  return (
    <div className="w-full min-h-screen bg-gray-900 py-12">
      <div className="flex flex-wrap gap-8 w-full px-16">
        {projects.map((project) => (
          <div
            key={project.name}
            className={`bg-gray-800 shadow-lg flex flex-col items-start hover:shadow-2xl ${
              project.result
                ? "hover:bg-gray-950 transition cursor-pointer"
                : ""
            }  border border-gray-700`}
            onClick={() => gotoProject(project)}
          >
            <div className="p-6">
              <div className="text-xl font-semibold text-gray-100 mb-2">
                {project.name}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                {project.description}
              </div>
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
            {project.result && (
              <div className="text-gray-400 text-sm border-t border-gray-700">
                <Adoption rawdata={project.result} minified={true} />
              </div>
            )}

            {(!project.result ||
              !project?.result?.config?.trackAdoptionMetrics) && (
              <div className="text-red-700 border-t border-gray-700 flex h-full items-center justify-center p-4 w-full text-center text-xl font-bold">
                <div>NO DATA...</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
