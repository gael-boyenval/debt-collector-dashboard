import React from "react";

const StickyHeader: React.FC<{ reset: () => void }> = ({ reset }) => (
  <header className="sticky top-0 z-50 w-full border-b border-gray-800 shadow-sm bg-gray-900">
    <div className=" mx-auto px-6 py-3 flex items-center">
      <button onClick={reset} className="text-gray-400 mr-4">
        ←
      </button>
      <span className="text-2xl font-lighttracking-tight text-green-400">
        debt collector dashboard
      </span>
    </div>
  </header>
);

export default StickyHeader;
