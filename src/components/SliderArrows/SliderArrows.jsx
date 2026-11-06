import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SliderArrows.css';

export default function SliderArrows({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className = '',
  theme = 'light', // 'light' | 'dark'
}) {
  return (
    <div className={`slider-arrows slider-arrows--${theme} ${className}`}>
      <button
        type="button"
        className="slider-arrows__btn slider-arrows__btn--prev"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        className="slider-arrows__btn slider-arrows__btn--next"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
