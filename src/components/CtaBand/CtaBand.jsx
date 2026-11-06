import React from 'react';
import './CtaBand.css';
import Button from '../Button/Button';
import TornEdge from '../TornEdge/TornEdge';
import DotGrid from '../DotGrid/DotGrid';

export default function CtaBand({
  title = 'READY TO INK YOUR NEXT PIECE?',
  subtitle = 'Consultations are free. Custom designs prepared for every single body.',
  btnText = 'BOOK A CONSULTATION',
  bgColor = 'var(--yellow-500)',
  topTornColor = 'var(--paper)',
  bottomTornColor = 'var(--charcoal-900)',
}) {
  return (
    <section className="cta-band" style={{ backgroundColor: bgColor }} aria-labelledby="cta-heading">
      <TornEdge position="top" color={topTornColor} variant={2} />

      <div className="cta-band__container container">
        <DotGrid color="var(--ink)" opacity={0.3} className="cta-band__dots cta-band__dots--left" />
        <DotGrid color="var(--ink)" opacity={0.3} className="cta-band__dots cta-band__dots--right" />

        <div className="cta-band__content">
          <h2 id="cta-heading" className="cta-band__title">
            {title}
          </h2>
          <p className="cta-band__subtitle">{subtitle}</p>
          <div className="cta-band__actions">
            <Button variant="dark" to="/contact">
              {btnText}
            </Button>
            <Button variant="primary" to="/gallery">
              SEE THE WORK
            </Button>
          </div>
        </div>
      </div>

      <TornEdge position="bottom" color={bottomTornColor} variant={1} />
    </section>
  );
}
