import React, { useRef } from "react";
import "./AboutSection.css";
import images from "../../data/images";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import PastedPhoto from "../../components/PastedPhoto/PastedPhoto";
import Button from "../../components/Button/Button";
import { useReveal } from "../../hooks/useReveal";

export default function AboutSection() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      aria-labelledby="about-section-heading"
    >
      <div className="about-section__container container">
        <SectionTitle
          title="ABOUT US"
          highlight="ABOUT"
          align="center"
          color="var(--ink)"
          id="about-section-heading"
        />

        <div className="about-section__grid">
          {/* Left 6 cols: Collage of two PastedPhotos + signature */}
          <div className="about-section__collage-col" data-reveal>
            <div className="about-section__collage">
              {/* Large piece (about-01) */}
              <div className="about-section__photo-large">
                <PastedPhoto
                  src={images.about01.src}
                  alt={images.about01.alt}
                  width={600}
                  height={750}
                  aspectRatio="4/5"
                  rotate={-2}
                  hasTape={true}
                  tapePosition="top-left"
                />
              </div>

              {/* Smaller overlapping piece (about-02) */}
              <div className="about-section__photo-small">
                <PastedPhoto
                  src={images.about03.src}
                  alt={images.about03.alt}
                  width={420}
                  height={315}
                  aspectRatio="4/3"
                  rotate={3}
                  hasTape={true}
                  tapePosition="top-right"
                />
              </div>

              {/* Script signature */}
              <div className="about-section__signature" aria-hidden="true">
                - FANG SCARS
              </div>
            </div>
          </div>

          {/* Right 6 cols: Text, stats, ghost wolf, button */}
          <div className="about-section__text-col" data-reveal>
            {/* Faint ghost wolf watermark */}
            <div className="about-section__ghost-wolf" aria-hidden="true">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 15L75 55L65 85L50 72L35 85L25 55Z"
                  stroke="var(--ghost)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="var(--ghost)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            <div className="about-section__subheading-wrapper">
              <h3 className="about-section__subheading">
                PERFECTION THAT IS FOREVER
              </h3>
            </div>

            <p className="about-section__body">
              Founded at the turn of the millennium, FANG SCARS Tattoo Co. was
              forged by artists dissatisfied with cookie-cutter flash shops. We
              treat every client's skin like an intimate museum canvas. With
              over a quarter-century of needle mastery, we never reuse stencils,
              never rush a shade, and maintain a surgical single-use protocol.
            </p>

            {/* Staggered stats */}
            <div className="about-section__stats">
              <div className="about-section__stat-item">
                <span className="about-section__stat-num">25+</span>
                <span className="about-section__stat-label">
                  YEARS EXPERIENCE
                </span>
              </div>
              <div className="about-section__stat-item about-section__stat-item--raised">
                <span className="about-section__stat-num highlight-yellow">
                  9,000+
                </span>
                <span className="about-section__stat-label">
                  CUSTOM TATTOOS
                </span>
              </div>
              <div className="about-section__stat-item">
                <span className="about-section__stat-num">8</span>
                <span className="about-section__stat-label">
                  RESIDENT ARTISTS
                </span>
              </div>
            </div>

            <div className="about-section__cta">
              <Button variant="primary" to="/about">
                KNOW MORE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
