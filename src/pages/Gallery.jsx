import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Gallery.css';
import { galleryCategories, galleryItems } from '../data/gallery';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import GalleryTile from '../components/GalleryTile/GalleryTile';
import Lightbox from '../components/Lightbox/Lightbox';
import CtaBand from '../components/CtaBand/CtaBand';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const gridRef = useRef(null);

  useEffect(() => {
    document.title = 'Tattoo Gallery | FANG SCARS Tattoo Co.';
  }, []);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleFilterChange = (cat) => {
    if (cat === activeCategory) return;

    if (gridRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    setActiveCategory(cat);
  };

  const handleOpenLightbox = (item, idx) => {
    setSelectedItem(item);
    setSelectedIndex(idx);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
  };

  const handlePrevLightbox = () => {
    const nextIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(filteredItems[nextIdx]);
  };

  const handleNextLightbox = () => {
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(filteredItems[nextIdx]);
  };

  return (
    <div className="gallery-page">
      {/* 1) HEADER */}
      <section className="gallery-hero" aria-labelledby="gallery-page-h1">
        <div className="gallery-hero__container container">
          <span className="gallery-hero__badge">PORTFOLIO & ARCHIVE</span>
          <h1 id="gallery-page-h1" className="gallery-hero__h1">
            SKIN STORIES.
          </h1>
          <p className="gallery-hero__lead">
            Twenty-five years of ink etched into memory. Explore bespoke custom sleeves, hyper-realism portraiture, sacred geometry, and delicate botanicals.
          </p>
        </div>
      </section>

      {/* 2 & 3) FILTERS & MASONRY GRID */}
      <section className="gallery-content" aria-labelledby="portfolio-heading">
        <div className="gallery-content__container container">
          {/* Filter Chips */}
          <div className="gallery-filters" role="tablist" aria-label="Tattoo style filter">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-btn ${cat === activeCategory ? 'gallery-filter-btn--active' : ''}`}
                onClick={() => handleFilterChange(cat)}
                role="tab"
                aria-selected={cat === activeCategory}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry CSS Columns Grid */}
          <div ref={gridRef} className="gallery-masonry" id="portfolio-heading">
            {filteredItems.map((item, idx) => (
              <div key={item.id} className="gallery-masonry__item">
                <GalleryTile
                  item={item}
                  index={idx}
                  showMeta={true}
                  onClick={() => handleOpenLightbox(item, idx)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />

      {/* 4) CTA BAND */}
      <CtaBand
        title="HAVE A SPECIFIC VISION?"
        subtitle="Our artists review references and design completely original, one-of-a-kind flash sheets."
        btnText="SUBMIT YOUR IDEA"
        topTornColor="var(--paper)"
        bottomTornColor="var(--charcoal-900)"
      />
    </div>
  );
}
