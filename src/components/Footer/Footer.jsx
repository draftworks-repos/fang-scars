import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import LogoMark from '../LogoMark/LogoMark';
import Button from '../Button/Button';

export default function Footer({ topTornColor = 'var(--paper)' }) {

  return (
    <footer className="footer" role="contentinfo" aria-label="Studio Footer">
      <div className="footer__container container">
        {/* Main 12-Column Grid */}
        <div className="footer__grid">
          {/* Left 7 Columns */}
          <div className="footer__left-col">
            <div className="footer__brand-wrapper">
              <LogoMark isLight={false} />
            </div>

            <h2 className="footer__headline">
              GOT AN IDEA? <br />
              LET'S INK IT.
            </h2>

            <a
              href="mailto:hello@goldfang.studio"
              className="footer__email-link"
              aria-label="Send email to hello@goldfang.studio"
            >
              hello@goldfang.studio
            </a>
          </div>

          {/* Right 5 Columns: 3 link groups + Book Now */}
          <div className="footer__right-col">
            <div className="footer__groups">
              {/* Group 1: Pages */}
              <div className="footer__group">
                <h4 className="footer__group-title">EXPLORE</h4>
                <ul className="footer__list">
                  <li><Link to="/" className="footer__link">Home</Link></li>
                  <li><Link to="/about" className="footer__link">About Studio</Link></li>
                  <li><Link to="/services" className="footer__link">Services & Pricing</Link></li>
                  <li><Link to="/gallery" className="footer__link">Tattoo Gallery</Link></li>
                  <li><Link to="/contact" className="footer__link">Contact & Booking</Link></li>
                </ul>
              </div>

              {/* Group 2: Social */}
              <div className="footer__group">
                <h4 className="footer__group-title">CONNECT</h4>
                <ul className="footer__list">
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__link">Instagram</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__link">Facebook</a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer__link">YouTube</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer__link">Twitter / X</a></li>
                </ul>
              </div>

              {/* Group 3: Visit */}
              <div className="footer__group">
                <h4 className="footer__group-title">SANCTUARY</h4>
                <address className="footer__address">
                  42 Industrial Quarter<br />
                  Bandra West, Mumbai<br />
                  Mon–Sat: 11am – 8pm<br />
                  Walk-ins based on availability
                </address>
              </div>
            </div>

            <div className="footer__action">
              <Button variant="primary" to="/contact" className="footer__book-btn">
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>

        {/* Giant Cropped Wordmark */}
        <div className="footer__wordmark" aria-hidden="true">
          FANG SCARS
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom-bar">
          <p className="footer__copy">
            © {new Date().getFullYear()} FANG SCARS TATTOO CO. ALL RIGHTS RESERVED.
          </p>

          <p className="footer__copy">
            Design and developed by{" "}
            <a
              href="https://draftworks.in"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__credit"
            >
              draftworks.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
