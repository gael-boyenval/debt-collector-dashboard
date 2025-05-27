import React from 'react';
import type { ReactNode } from 'react';

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ active, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-full font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-700 text-sm ${
      active
        ? 'bg-green-600 text-white hover:bg-green-700'
        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
    } ${className}`}
    aria-pressed={active}
  >
    {children}
  </button>
);

export default ToggleButton; 