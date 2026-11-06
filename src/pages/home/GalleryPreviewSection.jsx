import React, { useState } from 'react';
import './GalleryPreviewSection.css';
import { galleryItems } from '../../data/gallery';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import GalleryTile from '../../components/GalleryTile/GalleryTile';
import Button from '../../components/Button/Button';
import TornEdge from '../../components/TornEdge/TornEdge';
import Lightbox from '../../components/Lightbox/Lightbox';
import DotGrid from '../../components/DotGrid/DotGrid';

export default function GalleryPreviewSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Take the first 10 items (gallery-01 through 10)
  const previewItems = galleryItems.slice(0, 10);

  const handleOpenLightbox = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
  };

  const handlePrevLightbox = () => {
    const nextIdx = (selectedIndex - 1 + previewItems.length) % previewItems.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(previewItems[nextIdx]);
  };

  const handleNextLightbox = () => {
    const nextIdx = (selectedIndex + 1) % previewItems.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(previewItems[nextIdx]);
  };

  return (
    <section className="gallery-preview-section" aria-labelledby="gallery-preview-heading">
      <TornEdge position="top" color="var(--paper)" variant={3} />

      <div className="gallery-preview-section__container container">
        <DotGrid color="var(--yellow-500)" opacity={0.25} className="gallery-preview-section__dots gallery-preview-section__dots--right" />

        <SectionTitle
          title="TATTOO GALLERY"
          highlight="TATTOO GALLERY"
          align="center"
          color="var(--yellow-500)"
          flourishColor="var(--yellow-500)"
          id="gallery-preview-heading"
        />

        {/* 5-Column Grid of 10 Tiles */}
        <div className="gallery-preview-section__grid">
          {previewItems.map((item, idx) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={idx}
              onClick={() => handleOpenLightbox(item, idx)}
            />
          ))}
        </div>

        <div className="gallery-preview-section__action">
          <Button variant="primary" to="/gallery">
            VIEW MORE
          </Button>
        </div>
      </div>

      <TornEdge position="bottom" color="var(--yellow-500)" variant={1} />

      <Lightbox
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </section>
  );
}
