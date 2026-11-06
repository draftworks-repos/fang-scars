import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import './ServicesSection.css';
import services from '../../data/services';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ServiceTab from '../../components/ServiceTab/ServiceTab';
import ServiceSlide from '../../components/ServiceSlide/ServiceSlide';
import SliderArrows from '../../components/SliderArrows/SliderArrows';
import TornEdge from '../../components/TornEdge/TornEdge';
import DotGrid from '../../components/DotGrid/DotGrid';

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const activeService = services[currentIndex];

  const changeSlide = (newIndex) => {
    if (newIndex === currentIndex) return;
    const direction = newIndex > currentIndex ? 1 : -1;

    if (slideRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 24 * direction },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + services.length) % services.length;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % services.length;
    changeSlide(nextIdx);
  };

  return (
    <section className="services-section" aria-labelledby="services-section-heading">
      <TornEdge position="top" color="var(--paper)" variant={1} />

      <div className="services-section__container container">
        <DotGrid color="var(--ink)" opacity={0.3} className="services-section__dots services-section__dots--top-right" />
        <DotGrid color="var(--ink)" opacity={0.3} className="services-section__dots services-section__dots--bottom-left" />

        <SectionTitle
          title="OUR SERVICES"
          align="center"
          color="var(--ink)"
          id="services-section-heading"
        />

        {/* 6 Thumbnail Tabs */}
        <div className="services-section__tabs-scroll" role="tablist" aria-label="Services tabs">
          <div className="services-section__tabs-track">
            {services.map((service, index) => (
              <ServiceTab
                key={service.id}
                service={service}
                isActive={index === currentIndex}
                onClick={() => changeSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Big Slide Stage */}
        <div className="services-section__stage">
          <ServiceSlide service={activeService} slideRef={slideRef} />
        </div>

        {/* Tablet & Mobile Single Pair Navigation Arrows */}
        <div className="services-section__mobile-controls">
          <SliderArrows onPrev={handlePrev} onNext={handleNext} />
        </div>
      </div>

      <TornEdge position="bottom" color="var(--paper)" variant={2} />
    </section>
  );
}
