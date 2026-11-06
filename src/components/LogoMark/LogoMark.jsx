import React from 'react';
import { Link } from 'react-router-dom';
import './LogoMark.css';

export default function LogoMark({ variant = 'horizontal', isLight = false, className = '' }) {
  return (
    <Link
      to="/"
      className={`logomark logomark--${variant} ${isLight ? 'logomark--light' : ''} ${className}`}
      aria-label="FANG SCARS Tattoo Co. Home"
    >
      <div className="logomark__badge" aria-hidden="true">
        <svg
          className="logomark__wolf-svg"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Seal */}
          <circle cx="24" cy="24" r="22" stroke="var(--yellow-500)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="19" stroke="var(--yellow-500)" strokeWidth="0.75" strokeDasharray="3 3" />
          
          {/* Geometric Wolf Head */}
          {/* Ears */}
          <path d="M14 13L19 22L13 23Z" fill="var(--yellow-500)" />
          <path d="M34 13L35 23L29 22Z" fill="var(--yellow-500)" />
          
          {/* Head & Muzzle */}
          <path d="M19 22L24 16L29 22L33 28L24 38L15 28Z" fill="var(--yellow-500)" />
          
          {/* Eyes (negative space) */}
          <polygon points="20,24 23,26 21,27" fill="var(--charcoal-900)" />
          <polygon points="28,24 27,27 25,26" fill="var(--charcoal-900)" />
          
          {/* Golden Fangs */}
          <polygon points="22,32 23.5,36 23,32" fill="var(--yellow-200)" />
          <polygon points="26,32 25,36 24.5,32" fill="var(--yellow-200)" />
        </svg>
      </div>

      <div className="logomark__text">
        <span className="logomark__brand">FANG SCARS</span>
        <span className="logomark__tag">TATTOO CO.</span>
      </div>
    </Link>
  );
}
