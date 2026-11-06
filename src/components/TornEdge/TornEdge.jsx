import React, { useMemo } from 'react';
import './TornEdge.css';
import { buildTornPath, buildShadowPath } from '../../utils/tornPath';

export default function TornEdge({
  color = 'var(--paper)',
  position = 'bottom',
  flip = false,
  variant = 1,
}) {
  const isTop = position === 'top';
  const pathD = useMemo(() => buildTornPath(variant, isTop), [variant, isTop]);
  const shadowD = useMemo(() => buildShadowPath(variant, isTop), [variant, isTop]);

  const classes = [
    'torn-edge',
    `torn-edge--${position}`,
    flip ? 'torn-edge--flip' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <svg
        className="torn-edge__svg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        {/* Subtle shadow layer behind for paper thickness */}
        <path d={shadowD} fill="rgba(0,0,0,0.08)" />
        {/* Main torn paper edge */}
        <path d={pathD} fill={color} />
      </svg>
    </div>
  );
}
