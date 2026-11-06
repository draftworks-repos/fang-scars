import React from 'react';
import './ServiceTab.css';
import images from '../../data/images';
import ImageTile from '../ImageTile/ImageTile';

export default function ServiceTab({
  service,
  isActive = false,
  onClick,
}) {
  const imgData = images[service.imageKey];

  return (
    <button
      type="button"
      className={`service-tab ${isActive ? 'service-tab--active' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-controls={`service-panel-${service.id}`}
      id={`service-tab-${service.id}`}
    >
      <div className="service-tab__thumb">
        <ImageTile
          src={imgData?.src}
          alt={imgData?.alt}
          width={180}
          height={120}
          aspectRatio="3/2"
        />
      </div>
      <span className="service-tab__title">{service.shortTitle}</span>
      {isActive && <span className="service-tab__pointer" aria-hidden="true" />}
    </button>
  );
}
