import React from 'react';
import './DotGrid.css';

export default function DotGrid({ color = 'var(--yellow-500)', opacity = 0.5, className = '' }) {
  // 5x5 dot matrix
  const dots = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div
      className={`dot-grid ${className}`}
      style={{ '--dot-color': color, '--dot-opacity': opacity }}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <span key={dot} className="dot-grid__dot" />
      ))}
    </div>
  );
}
