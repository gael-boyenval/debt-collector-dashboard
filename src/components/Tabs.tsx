import React from 'react';

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  selected: string;
  onChange: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onChange }) => (
  <div className="flex flex-row items-end w-full mt-6 mb-4 border-b border-gray-700">
    {tabs.map(tab => (
      <button
        key={tab.value}
        className={`text-lg font-bold px-8 py-4 border-b-2 transition-colors duration-150
          ${selected === tab.value ? 'border-green-400 text-green-400 bg-gray-900' : 'border-transparent text-gray-400 bg-transparent hover:text-green-300'}
          focus:outline-none`}
        style={{ marginRight: 2 }}
        onClick={() => onChange(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs; 