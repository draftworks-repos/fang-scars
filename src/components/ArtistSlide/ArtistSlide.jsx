import React from 'react';
import './ArtistSlide.css';
import images from '../../data/images';
import PastedPhoto from '../PastedPhoto/PastedPhoto';
import SliderArrows from '../SliderArrows/SliderArrows';

export default function ArtistSlide({
  artist,
  slideRef,
  onPrev,
  onNext,
  total,
  currentIndex,
  onSelectDot,
}) {
  if (!artist) return null;
  const imgData = images[artist.imageKey];

  return (
    <div ref={slideRef} className="artist-slide">
      <div className="artist-slide__grid">
        {/* Left cols: Photo with dot indicator */}
        <div className="artist-slide__media-col">
          <PastedPhoto
            src={imgData?.src}
            alt={imgData?.alt}
            width={440}
            height={540}
            aspectRatio="4/5"
            rotate={-1.5}
            hasTape={true}
            tapePosition="top-left"
          />

          {/* Dot Indicator below photo */}
          <div className="artist-slide__dots" role="tablist" aria-label="Artist slides">
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`artist-slide__dot ${idx === currentIndex ? 'artist-slide__dot--active' : ''}`}
                onClick={() => onSelectDot && onSelectDot(idx)}
                aria-label={`Go to artist ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right 5 cols: Torn-edge panel (paper-2) */}
        <div className="artist-slide__panel-col">
          <div className="artist-slide__panel">
            <h2 className="artist-slide__name">{artist.name}</h2>
            <div className="artist-slide__badge">
              {artist.title} | {artist.experience}
            </div>
            <p className="artist-slide__bio">{artist.bio}</p>

            <div className="artist-slide__footer">
              <SliderArrows onPrev={onPrev} onNext={onNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
