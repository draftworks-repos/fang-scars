import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger, useGSAP);

import { LenisProvider } from './context/LenisContext';
import { PageTransitionProvider } from './components/PageTransition/PageTransition';
import App from './App';

// Refresh ScrollTrigger after font loading and window load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <HashRouter>
        <LenisProvider>
          <PageTransitionProvider>
            <App />
          </PageTransitionProvider>
        </LenisProvider>
      </HashRouter>
    </React.StrictMode>
  );
}
