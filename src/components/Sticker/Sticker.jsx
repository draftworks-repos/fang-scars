import React from 'react';
import './Sticker.css';

export default function Sticker({
  children,
  rotate = -4,
  variant = 'yellow', // 'yellow' | 'paper' | 'charcoal'
  className = '',
}) {
  return (
    <div
      className={`sticker sticker--${variant} ${className}`}
      style={{ '--sticker-rotate': `${rotate}deg` }}
    >
      <span className="sticker__text">{children}</span>
    </div>
  );
}
