import React from 'react';
import './NewsletterSection.css';
import images from '../../data/images';
import Button from '../../components/Button/Button';
import Flourish from '../../components/Flourish/Flourish';
import TornEdge from '../../components/TornEdge/TornEdge';

export default function NewsletterSection() {
  return (
    <section className="cta-home-section" aria-labelledby="cta-home-heading">
      {/* Background texture: contact.jpg at subtle opacity */}
      <div
        className="cta-home-section__bg-texture"
        style={{ backgroundImage: `url(${images.contact.src})` }}
        aria-hidden="true"
      />

      {/* Ghost wings SVG backdrop */}
      <div className="cta-home-section__ghost-wings" aria-hidden="true">
        <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M300 200 C240 160 160 120 40 140 C100 90 200 80 280 120 C220 60 120 40 20 50 C120 10 240 30 300 90 C360 30 480 10 580 50 C480 40 380 60 320 120 C400 80 500 90 560 140 C440 120 360 160 300 200 Z"
            fill="var(--ghost)"
            stroke="var(--ghost)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="cta-home-section__container container">
        <div className="cta-home-section__badge-row">
          <span className="cta-home-section__badge">GET IN TOUCH</span>
        </div>

        <h2 id="cta-home-heading" className="cta-home-section__title">
          READY TO INK YOUR <span className="highlight-yellow">NEXT PIECE?</span>
        </h2>

        <Flourish color="var(--yellow-600)" />

        <p className="cta-home-section__lead">
          Walk-ins welcome daily. Consultations are always one-on-one and private with your resident tattooer.
          Bring rough sketches, reference photos, or just an emotion. We will shape it together.
        </p>

        <div className="cta-home-section__actions">
          <Button variant="primary" to="/contact" className="cta-home-section__btn">
            BOOK A CONSULTATION
          </Button>
          <Button variant="dark" to="/gallery" className="cta-home-section__btn">
            EXPLORE GALLERY
          </Button>
        </div>

        <div className="cta-home-section__features">
          <div className="cta-home-section__feature-item">
            <span className="cta-home-section__feature-dot" />
            <span>FREE 30-MIN CONSULTATIONS</span>
          </div>
          <div className="cta-home-section__feature-item">
            <span className="cta-home-section__feature-dot" />
            <span>CUSTOM BESPOKE STENCILS</span>
          </div>
          <div className="cta-home-section__feature-item">
            <span className="cta-home-section__feature-dot" />
            <span>HOSPITAL-GRADE STERILIZATION</span>
          </div>
        </div>
      </div>

      {/* Torn Edge Bottom into dark charcoal footer */}
      <TornEdge position="bottom" color="var(--charcoal-900)" variant={1} />
    </section>
  );
}
