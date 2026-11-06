import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceSlide.css';
import images from '../../data/images';
import PastedPhoto from '../PastedPhoto/PastedPhoto';

export default function ServiceSlide({
  service,
  slideRef,
}) {
  if (!service) return null;
  const imgData = images[service.imageKey];

  return (
    <div
      ref={slideRef}
      className="service-slide"
      id={`service-panel-${service.id}`}
      role="tabpanel"
      aria-labelledby={`service-tab-${service.id}`}
    >
      <div className="service-slide__media">
        <PastedPhoto
          src={imgData?.src}
          alt={imgData?.alt}
          width={900}
          height={506}
          aspectRatio="16/9"
          hasTape={true}
          tapePosition="top-center"
        />
      </div>

      <div className="service-slide__info">
        <h3 className="service-slide__title">{service.title}</h3>
        <p className="service-slide__desc">{service.desc}</p>
        <Link to="/services" className="service-slide__link">
          KNOW MORE
        </Link>
      </div>
    </div>
  );
}
