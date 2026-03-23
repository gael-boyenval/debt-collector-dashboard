import React, { useMemo } from "react";
import type { WalkReportData } from "../../types";
import { adoptionAdapter, adoptionHistoryAdapter } from "./adoptionAdapter";
import type { AdoptionResult } from "./types";
import AdoptionHistoryChart from "./AdoptionHistoryChart";

interface AdoptionProps {
  rawdata: WalkReportData;
  minified?: boolean;
  filter?: string;
  projectTags?: string[];
}

const Adoption: React.FC<AdoptionProps> = ({ rawdata, minified, filter, projectTags }) => {
  const allResults = useMemo(() => adoptionAdapter(rawdata, projectTags), [rawdata, projectTags]);
  const history = useMemo(
    () => (minified ? [] : adoptionHistoryAdapter(rawdata, projectTags)),
    [rawdata, projectTags, minified]
  );

  const result = useMemo(() => {
    if (!filter) return allResults;
    const lower = filter.toLowerCase();
    return allResults.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.id.toLowerCase().includes(lower)
    );
  }, [allResults, filter]);

  if (!allResults) {
    return (
      <div className="text-red-700 border-t border-gray-700 flex h-full items-center justify-center p-4 w-full text-center text-xl font-bold">
        <div>NO DATA...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {!minified && (
        <>
          <div className="text-2xl text-gray-300 font-bold mb-4 mt-8">
            Adoption Over Time
          </div>
          <AdoptionHistoryChart data={history} />
          <div className="text-2xl text-gray-300 font-bold mb-4 mt-8">
            Adoption Rules Usage
          </div>
        </>
      )}
      <div className={minified ? "" : "overflow-x-auto"}>
        <table
          className={`${minified ? "w-full table-fixed" : "min-w-full"} ${
            !minified ? " bg-gray-800" : ""
          } overflow-hidden`}
        >
          {!minified && (
            <>
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rule
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    is used
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    adoption rate
                  </th>

                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    total occurences
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    total debt occurences
                  </th>
                </tr>
              </thead>
            </>
          )}
          <tbody className="divide-y divide-gray-700">
            {result.map((rule: AdoptionResult) => (
              <tr key={rule.id} className="hover:bg-gray-700">
                <td className={`${minified ? "px-3 py-1.5 w-full" : "px-6 py-4"} whitespace-nowrap text-gray-300 overflow-hidden text-ellipsis`}>
                  <span className={`${minified ? "text-xs" : "text-sm"} text-gray-300 font-bold uppercase`}>
                    {rule.name}
                  </span>
                  {!minified && (
                    <>
                      <br />
                      <span className="text-xs text-gray-400">{rule.id}</span>
                    </>
                  )}
                </td>
                <td className={`${minified ? "pr-4 pl-2 py-1.5 text-xs w-px" : "px-6 py-4 text-sm"} whitespace-nowrap text-gray-300 text-center`}>
                  {rule.isAdopted ? "✅" : "❌"}
                </td>
                {!minified && (
                  <td className="px-6 py-4 min-w-36 whitespace-nowrap text-sm text-gray-300">
                    {isNaN(rule.adoptionRate) ? (
                      <div className="w-full h-8 bg-red-950 relative">
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-100 font-semibold">
                          N/A
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-8 bg-red-950 relative">
                        <div
                          className="h-full bg-green-700"
                          style={{
                            width: `${Math.round(rule.adoptionRate * 100)}%`,
                          }}
                        />
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-100 font-semibold">
                          {Math.round(rule.adoptionRate * 100)}%
                        </span>
                      </div>
                    )}
                  </td>
                )}
                {!minified && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-300 text-center">
                      {rule.totalScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-300 text-center">
                      {rule.totalDebt >= 0 ? rule.totalDebt : "N/A"}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adoption;
