import React from 'react';
import './TransitionLink.css';
import { usePageTransition } from '../PageTransition/PageTransition';

export default function TransitionLink({
  to,
  children,
  className = '',
  onClick,
  ...rest
}) {
  const transition = usePageTransition();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    if (transition?.transitionTo) {
      transition.transitionTo(to);
    } else {
      window.location.hash = to;
    }
  };

  return (
    <a href={`#${to}`} className={`transition-link ${className}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
