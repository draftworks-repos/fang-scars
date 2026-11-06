import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';
import './MobileMenu.css';
import TornEdge from '../TornEdge/TornEdge';
import Button from '../Button/Button';
import { useLenis } from '../../context/LenisContext';

export default function MobileMenu({
  isOpen,
  onClose,
}) {
  const lenis = useLenis();
  const overlayRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      if (linksRef.current) {
        const linkItems = linksRef.current.querySelectorAll('.mobile-menu__link, .mobile-menu__action');
        gsap.fromTo(
          linkItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      }
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
  }, [isOpen, lenis]);

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/services', label: 'SERVICES' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <div
      ref={overlayRef}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="mobile-menu__header">
        <span className="mobile-menu__brand">FANG SCARS TATTOO CO.</span>
        <button
          type="button"
          className="mobile-menu__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
      </div>

      <nav className="mobile-menu__nav" ref={linksRef}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
            }
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        ))}

        <div className="mobile-menu__action">
          <Button variant="primary" to="/contact" onClick={onClose} className="mobile-menu__btn">
            BOOK NOW
          </Button>
        </div>
      </nav>

      {/* Torn yellow edge at bottom */}
      <TornEdge position="bottom" color="var(--yellow-500)" variant={3} />
    </div>
  );
}
