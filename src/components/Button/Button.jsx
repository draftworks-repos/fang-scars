import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'dark' | 'outline'
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) {
  const btnClasses = [
    'btn',
    `btn--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={btnClasses} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={btnClasses} aria-label={ariaLabel} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={btnClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
