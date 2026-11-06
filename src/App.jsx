import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/tokens.css';
import './styles/base.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import { useLenis } from './context/LenisContext';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();
  const lenis = useLenis();

  // Scroll to top and refresh ScrollTrigger on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname, lenis]);

  // Determine top torn color for Footer based on active page
  let footerTopColor = 'var(--paper)';
  if (location.pathname === '/' || location.pathname === '') {
    footerTopColor = 'var(--paper)'; // Newsletter is paper
  } else if (location.pathname === '/gallery') {
    footerTopColor = 'var(--yellow-500)'; // CtaBand is yellow
  } else if (location.pathname === '/about') {
    footerTopColor = 'var(--yellow-500)'; // CtaBand is yellow
  } else if (location.pathname === '/services') {
    footerTopColor = 'var(--yellow-500)'; // CtaBand is yellow
  } else if (location.pathname === '/contact') {
    footerTopColor = 'var(--paper)';
  }

  return (
    <div className="app-shell">
      {/* Skip to main content accessibility link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Interactive Custom Cursor */}
      <Cursor />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Persistent Studio Footer */}
      <Footer topTornColor={footerTopColor} />
    </div>
  );
}
