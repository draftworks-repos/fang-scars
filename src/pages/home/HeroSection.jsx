import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './HeroSection.css';
import images from '../../data/images';
import Button from '../../components/Button/Button';
import TornEdge from '../../components/TornEdge/TornEdge';
import PastedPhoto from '../../components/PastedPhoto/PastedPhoto';

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const h1Ref = useRef(null);
  const paraRef = useRef(null);
  const actionsRef = useRef(null);
  const photoFrameRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background entrance
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      );
    }

    if (h1Ref.current) {
      const lines = h1Ref.current.querySelectorAll('.hero__h1-line-inner');
      tl.fromTo(
        lines,
        { y: '110%' },
        { y: '0%', duration: 0.9, stagger: 0.12, ease: 'power4.out' },
        0.3
      );
    }

    if (paraRef.current) {
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.7
      );
    }

    if (actionsRef.current) {
      const btns = actionsRef.current.querySelectorAll('.btn');
      tl.fromTo(
        btns,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.85
      );
    }

    if (photoFrameRef.current) {
      tl.fromTo(
        photoFrameRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.6
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero" aria-label="Hero Introduction">
      {/* Background full-bleed image with dark gradient */}
      <div className="hero__bg-wrapper">
        <img
          ref={imageRef}
          src={images.hero.src}
          alt={images.hero.alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero__bg-img photo"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="hero__container container">
        <div className="hero__grid">
          {/* Left Column: Content */}
          <div className="hero__content">
            <div className="hero__badge-row">
              <span className="hero__label">FANG SCARS TATTOO CO. • EST. 2000</span>
            </div>

            {/* 3-line heading with reduced font size and no side bar */}
            <h1 ref={h1Ref} className="hero__h1">
              <span className="hero__h1-line">
                <span className="hero__h1-line-inner">CREATING GREAT TATTOOS</span>
              </span>
              <span className="hero__h1-line">
                <span className="hero__h1-line-inner">FOR OVER</span>
              </span>
              <span className="hero__h1-line">
                <span className="hero__h1-line-inner highlight-yellow">25 YEARS</span>
              </span>
            </h1>

            <p ref={paraRef} className="hero__paragraph">
              Master-grade custom tattooing and aseptic body piercing. An intimate sanctuary where raw street edge meets surgical discipline.
            </p>

            <div ref={actionsRef} className="hero__actions">
              <Button variant="primary" to="/contact">
                BOOK NOW
              </Button>
              <Button variant="outline" to="/gallery">
                VIEW GALLERY
              </Button>
            </div>
          </div>

          {/* Right Column: Photo Frame with tape on left side */}
          <div ref={photoFrameRef} className="hero__photo-col">
            <div className="hero__photo-wrapper">
              <PastedPhoto
                src={images.about02.src}
                alt={images.about02.alt}
                width={480}
                height={580}
                aspectRatio="4/5"
                rotate={2.5}
                hasTape={true}
                tapePosition="top-left"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Torn Edge Bottom into paper */}
      <TornEdge position="bottom" color="var(--paper)" variant={1} />
    </section>
  );
}
