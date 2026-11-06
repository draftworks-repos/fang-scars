import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Cursor.css';
import useCursorFine from '../../hooks/useCursorFine';

export default function Cursor() {
  const isFine = useCursorFine();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'link' | 'view'

  useEffect(() => {
    if (!isFine) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const target = e.target.closest('[data-cursor="view"], a, button, input, select, textarea');
      if (target) {
        if (target.matches('[data-cursor="view"]') || target.closest('[data-cursor="view"]')) {
          setCursorMode('view');
          setCursorText('VIEW');
        } else {
          setCursorMode('link');
          setCursorText('');
        }
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFine]);

  if (!isFine) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring custom-cursor-ring--${cursorMode}`}
        aria-hidden="true"
      >
        {cursorText && <span className="custom-cursor-text">{cursorText}</span>}
      </div>
    </>
  );
}
