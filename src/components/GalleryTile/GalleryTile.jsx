import React from 'react';
import { Plus } from 'lucide-react';
import './GalleryTile.css';
import images from '../../data/images';
import ImageTile from '../ImageTile/ImageTile';

export default function GalleryTile({
  item,
  index = 0,
  onClick,
  showMeta = false,
}) {
  const imgData = images[item.imageKey];
  // Alternating rotation -1.5deg / 1deg
  const rotation = index % 2 === 0 ? -1.5 : 1.0;

  return (
    <div
      className="gallery-tile"
      style={{ '--tile-rotate': `${rotation}deg` }}
      data-cursor="view"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      aria-label={`View ${item.title || 'tattoo piece'}`}
    >
      <div className="gallery-tile__border">
        <div className="gallery-tile__image-wrapper">
          <ImageTile
            src={imgData?.src}
            alt={imgData?.alt}
            width={450}
            height={600}
            aspectRatio="3/4"
          />
          <div className="gallery-tile__overlay" aria-hidden="true">
            <span className="gallery-tile__icon-box">
              <Plus size={24} strokeWidth={2.5} />
            </span>
            <span className="gallery-tile__hover-title">{item.title}</span>
          </div>
        </div>

        {showMeta && (
          <div className="gallery-tile__caption">
            <span className="gallery-tile__name">{item.title}</span>
            <span className="gallery-tile__category">{item.category}</span>
          </div>
        )}
      </div>
    </div>
  );
}
