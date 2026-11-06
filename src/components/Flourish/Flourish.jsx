import React from 'react';
import './Flourish.css';

export default function Flourish({ color = 'currentColor', className = '' }) {
  return (
    <div className={`flourish ${className}`} aria-hidden="true">
      <svg
        className="flourish__svg"
        viewBox="0 0 160 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curl */}
        <path
          d="M10 12C25 12 30 4 45 4C58 4 60 14 70 12"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Centre Diamond */}
        <path
          d="M80 6L85 12L80 18L75 12Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
        {/* Right curl */}
        <path
          d="M90 12C100 14 102 4 115 4C130 4 135 12 150 12"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
