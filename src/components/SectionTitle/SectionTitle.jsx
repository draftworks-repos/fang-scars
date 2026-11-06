import React from 'react';
import './SectionTitle.css';
import Flourish from '../Flourish/Flourish';

export default function SectionTitle({
  title,
  highlight = '',
  highlightColor,
  align = 'center', // 'center' | 'left' | 'right'
  color = 'currentColor',
  flourishColor,
  subtitle = '',
  className = '',
}) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title];

  return (
    <div className={`section-title section-title--${align} ${className}`} style={{ color }}>
      <h2 className="section-title__heading">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span
              className="section-title__highlight"
              style={highlightColor ? { color: highlightColor } : undefined}
            >
              {highlight}
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
      <Flourish color={flourishColor || color} className="section-title__flourish" />
    </div>
  );
}
