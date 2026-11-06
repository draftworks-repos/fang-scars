import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Lightbox.css';
import images from '../../data/images';
import PastedPhoto from '../PastedPhoto/PastedPhoto';
import { useLenis } from '../../context/LenisContext';

export default function Lightbox({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) {
  const lenis = useLenis();
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, lenis, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  const imgData = images[item.imageKey];

  return (
    <div
      ref={overlayRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view of ${item.title}`}
    >
      <div className="lightbox__backdrop" onClick={onClose} />

      {/* Close button */}
      <button
        type="button"
        className="lightbox__btn lightbox__btn--close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={26} />
      </button>

      {/* Prev / Next controls */}
      <button
        type="button"
        className="lightbox__btn lightbox__btn--prev"
        onClick={onPrev}
        aria-label="Previous artwork"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        type="button"
        className="lightbox__btn lightbox__btn--next"
        onClick={onNext}
        aria-label="Next artwork"
      >
        <ChevronRight size={30} />
      </button>

      <div className="lightbox__content">
        <PastedPhoto
          src={imgData?.src}
          alt={imgData?.alt}
          width={480}
          height={600}
          aspectRatio="4/5"
          hasTape={true}
          tapePosition="top-center"
          className="lightbox__photo"
        >
          <div className="lightbox__details">
            <h3 className="lightbox__title">{item.title}</h3>
            <div className="lightbox__meta">
              <span>CATEGORY: {item.category}</span>
              {item.artist && <span>ARTIST: {item.artist}</span>}
            </div>
          </div>
        </PastedPhoto>
      </div>
    </div>
  );
}
