import type { ReactNode } from 'react';

export interface ToggleOption<T> {
  label: ReactNode;
  value: T;
}

interface ToggleButtonsProps<T> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

function ToggleButtons<T extends string | number>({ options, value, onChange, className = '' }: ToggleButtonsProps<T>) {
  return (
    <div className={`inline-flex rounded-full bg-gray-800 p-1 ${className}`} role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-4 py-1.5 text-sm font-semibold focus:outline-none transition-colors duration-150 rounded-full
            ${value === option.value
              ? 'bg-green-600 text-white'
              : 'bg-transparent text-gray-200 hover:bg-gray-700'}
          `}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default ToggleButtons; 