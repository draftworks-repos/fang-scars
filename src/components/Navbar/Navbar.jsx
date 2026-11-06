import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import './Navbar.css';
import LogoMark from '../LogoMark/LogoMark';
import Button from '../Button/Button';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled look past 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/services', label: 'SERVICES' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        className={`navbar ${isScrolled || location.pathname !== '/' ? 'navbar--scrolled' : 'navbar--hero'}`}
      >
        <div className="navbar__container container">
          {/* Logo Left */}
          <div className="navbar__logo">
            <LogoMark isLight={false} />
          </div>

          {/* Links Center */}
          <nav className="navbar__links" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Book Now (Desktop & Tablet) + Hamburger (Mobile & Tablet) */}
          <div className="navbar__actions">
            <Button variant="primary" to="/contact" className="navbar__book-btn">
              BOOK NOW
            </Button>

            <button
              type="button"
              className="navbar__hamburger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Open mobile menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
