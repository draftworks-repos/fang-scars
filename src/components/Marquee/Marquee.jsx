import React from 'react';
import './Marquee.css';

export default function Marquee({
  items = [
    'CUSTOM TATTOOING',
    '•',
    'SINGLE-USE STERILE',
    '•',
    'PRECISION PIERCING',
    '•',
    'VEGAN INKS ONLY',
    '•',
    'WALK-INS WELCOME',
    '•',
    '25 YEARS EXPERIENCE',
    '•',
  ],
  bgColor = 'var(--yellow-500)',
  textColor = 'var(--ink)',
  className = '',
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ '--marquee-bg': bgColor, '--marquee-color': textColor }}
      aria-hidden="true"
    >
      <div className="marquee__track">
        <div className="marquee__content">
          {items.map((item, i) => (
            <span key={`m1-${i}`} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
        <div className="marquee__content" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`m2-${i}`} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
