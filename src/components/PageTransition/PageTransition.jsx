import React, { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './PageTransition.css';

const TransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const curtainRef = useRef(null);
  const navigate = useNavigate();

  const transitionTo = (to) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(to);
      return;
    }

    if (isTransitioning) return;
    setIsTransitioning(true);

    const curtain = curtainRef.current;
    if (!curtain) {
      navigate(to);
      setIsTransitioning(false);
      return;
    }

    // Curtain fades in (0.35s) -> navigate -> fades out (0.5s)
    gsap.fromTo(
      curtain,
      { opacity: 0, pointerEvents: 'all' },
      {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          navigate(to);
          window.scrollTo(0, 0);
          gsap.to(curtain, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.05,
            onComplete: () => {
              curtain.style.pointerEvents = 'none';
              setIsTransitioning(false);
            },
          });
        },
      }
    );
  };

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning }}>
      {children}
      <div ref={curtainRef} className="page-transition-curtain" aria-hidden="true">
        <div className="page-transition-curtain__mark">FANG SCARS</div>
      </div>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
