import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import './ArtistsSection.css';
import artists from '../../data/artists';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ArtistSlide from '../../components/ArtistSlide/ArtistSlide';

export default function ArtistsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const activeArtist = artists[currentIndex];

  const changeArtist = (newIndex) => {
    if (newIndex === currentIndex) return;
    const direction = newIndex > currentIndex ? 1 : -1;

    if (slideRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 20 * direction },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + artists.length) % artists.length;
    changeArtist(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % artists.length;
    changeArtist(nextIdx);
  };

  return (
    <section className="artists-section" aria-labelledby="artists-section-heading">
      <div className="artists-section__container container">
        <SectionTitle
          title="MEET OUR ARTISTS"
          highlight="ARTISTS"
          align="center"
          color="var(--ink)"
          id="artists-section-heading"
        />

        <ArtistSlide
          artist={activeArtist}
          slideRef={slideRef}
          onPrev={handlePrev}
          onNext={handleNext}
          total={artists.length}
          currentIndex={currentIndex}
          onSelectDot={changeArtist}
        />
      </div>
    </section>
  );
}
