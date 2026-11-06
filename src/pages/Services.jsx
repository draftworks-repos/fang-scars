import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, PenTool, Zap, HeartPulse } from 'lucide-react';
import './Services.css';
import services from '../data/services';
import faqs from '../data/faqs';
import images from '../data/images';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import PastedPhoto from '../components/PastedPhoto/PastedPhoto';
import Sticker from '../components/Sticker/Sticker';
import TornEdge from '../components/TornEdge/TornEdge';
import FaqItem from '../components/FaqItem/FaqItem';
import CtaBand from '../components/CtaBand/CtaBand';

export default function Services() {
  const [openFaqId, setOpenFaqId] = useState(faqs[0].id);

  useEffect(() => {
    document.title = 'Services & Pricing | FANG SCARS Tattoo Co.';
  }, []);

  const processSteps = [
    {
      num: '01',
      title: 'TALK IT OUT',
      desc: 'Free in-depth consultation. We discuss placement, dimension, aesthetic nuance, and skin tone synergy.',
      icon: <MessageCircle size={28} />,
    },
    {
      num: '02',
      title: 'SKETCH & STENCIL',
      desc: 'Hand-drafted artwork tailored to your anatomy. We refine lines on tracing paper until the fit is anatomical perfection.',
      icon: <PenTool size={28} />,
    },
    {
      num: '03',
      title: 'INK SESSION',
      desc: 'Surgical single-use needle setups, organic vegan pigments, comfortable seating, and artists who pace to your stamina.',
      icon: <Zap size={28} />,
    },
    {
      num: '04',
      title: 'HEAL RIGHT',
      desc: 'Medical dermal barrier film, personalized botanical aftercare balm, and 30-day touch-up guarantee included.',
      icon: <HeartPulse size={28} />,
    },
  ];

  const pricingNotes = [
    {
      label: 'STUDIO MINIMUM',
      amount: 'Rs 1,500',
      detail: 'Covers sterile single-use setup, setup prep, and small micro pieces under 2 inches.',
    },
    {
      label: 'HOURLY SESSIONS',
      amount: 'Rs 3,000 / hr',
      detail: 'Applied for large-scale custom pieces (sleeves, backs, full torso projects).',
    },
    {
      label: 'BOOKING DEPOSIT',
      amount: 'Rs 1,000',
      detail: 'Deducted directly from your session balance on tattoo day.',
    },
  ];

  return (
    <div className="services-page">
      {/* 1) HEADER */}
      <section className="services-hero" aria-labelledby="services-page-h1">
        <div className="services-hero__container container">
          <div className="services-hero__badge-row">
            <span className="services-hero__badge">SERVICES & CRAFT</span>
          </div>
          <div className="services-hero__title-wrapper">
            <h1 id="services-page-h1" className="services-hero__h1">
              WHAT WE DO.
            </h1>
            <Sticker rotate={-3} variant="yellow" className="services-hero__sticker">
              Consults are free
            </Sticker>
          </div>
          <p className="services-hero__lead">
            Every category executed with specialized rotary machinery, medical sterile barriers, and decades of steady needle pressure.
          </p>
        </div>
      </section>

      {/* 2) EDITORIAL SERVICE ROWS (Yellow section, torn edges) */}
      <section className="services-list-section" aria-labelledby="services-list-heading">
        <TornEdge position="top" color="var(--paper)" variant={1} />

        <div className="services-list-section__container container">
          <SectionTitle
            title="EDITORIAL DISCIPLINES"
            align="center"
            color="var(--ink)"
            id="services-list-heading"
          />

          <div className="services-list">
            {services.map((item) => {
              const imgData = images[item.imageKey];
              return (
                <a
                  key={item.id}
                  href="#/contact"
                  className="services-row"
                  aria-label={`Book consultation for ${item.title}`}
                >
                  <span className="services-row__num">{item.num}</span>

                  <div className="services-row__name-col">
                    <h2 className="services-row__title">{item.title}</h2>
                    <p className="services-row__desc">{item.desc}</p>
                  </div>

                  <div className="services-row__thumb">
                    <PastedPhoto
                      src={imgData?.src}
                      alt={imgData?.alt}
                      width={220}
                      height={150}
                      aspectRatio="3/2"
                      rotate={1.5}
                    />
                  </div>

                  <div className="services-row__meta-col">
                    <span className="services-row__meta">{item.meta}</span>
                  </div>

                  <div className="services-row__arrow-col" aria-hidden="true">
                    <span className="services-row__arrow-box">
                      <ArrowRight size={20} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <TornEdge position="bottom" color="var(--paper)" variant={2} />
      </section>

      {/* 3) PROCESS SECTION */}
      <section className="services-process" aria-labelledby="process-heading">
        <div className="services-process__container container">
          <SectionTitle
            title="THE APPOINTMENT JOURNEY"
            highlight="JOURNEY"
            align="center"
            color="var(--ink)"
            id="process-heading"
          />

          <div className="services-process__grid">
            {processSteps.map((step, idx) => (
              <div
                key={step.num}
                className={`services-process__step ${idx % 2 === 1 ? 'services-process__step--staggered' : ''}`}
              >
                <div className="services-process__header">
                  <span className="services-process__num text-stroke">{step.num}</span>
                  <div className="services-process__icon-box">{step.icon}</div>
                </div>
                <h3 className="services-process__step-title">{step.title}</h3>
                <p className="services-process__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) PRICING + FAQ SECTION */}
      <section className="services-faq" aria-labelledby="pricing-faq-heading">
        <div className="services-faq__container container">
          <SectionTitle
            title="PRICING & ANSWERS"
            highlight="PRICING"
            align="center"
            color="var(--ink)"
            id="pricing-faq-heading"
          />

          <div className="services-faq__grid">
            {/* Left Column: 3 Pricing Notes */}
            <div className="services-faq__pricing-col">
              <h3 className="services-faq__col-title">RATES & POLICIES</h3>
              <div className="services-faq__pricing-cards">
                {pricingNotes.map((p, i) => (
                  <div key={i} className="services-faq__pricing-card">
                    <span className="services-faq__price-label">{p.label}</span>
                    <span className="services-faq__price-amount">{p.amount}</span>
                    <p className="services-faq__price-detail">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 5 Accordion FaqItems */}
            <div className="services-faq__accordion-col">
              <h3 className="services-faq__col-title">FREQUENT INQUIRIES</h3>
              <div className="services-faq__accordion" role="region" aria-label="Frequently Asked Questions">
                {faqs.map((faq) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openFaqId === faq.id}
                    onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) CTA BAND */}
      <CtaBand
        title="READY FOR PERMANENT ART?"
        subtitle="Book a session with one of our resident masters or discuss your placement in person."
        btnText="SECURE YOUR DATE"
        topTornColor="var(--paper)"
        bottomTornColor="var(--charcoal-900)"
      />
    </div>
  );
}
