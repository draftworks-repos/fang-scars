import React, { useEffect, useRef } from 'react';
import { ShieldCheck, FlaskConical, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './About.css';
import images from '../data/images';
import artists from '../data/artists';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import PastedPhoto from '../components/PastedPhoto/PastedPhoto';
import TornEdge from '../components/TornEdge/TornEdge';
import CtaBand from '../components/CtaBand/CtaBand';
import DotGrid from '../components/DotGrid/DotGrid';
import Sticker from '../components/Sticker/Sticker';

export default function About() {
  const heroMediaRef = useRef(null);

  useEffect(() => {
    document.title = 'About Studio | FANG SCARS Tattoo Co.';
  }, []);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (heroMediaRef.current) {
      gsap.fromTo(
        heroMediaRef.current,
        { clipPath: 'inset(15% 15% 15% 15%)', scale: 1.08 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
        }
      );
    }
  });

  const milestones = [
    { year: '2000', title: 'FIRST CHAIR', desc: 'Opened a single-station underground studio with two rotary machines.' },
    { year: '2008', title: 'BIGGER SANCTUARY', desc: 'Relocated to Bandra West loft, expanding to 4 resident artist booths.' },
    { year: '2016', title: '5,000TH PIECE', desc: 'Celebrated five thousand signed bespoke tattoos and launched our piercing wing.' },
    { year: '2024', title: 'GLOBAL RESIDENCIES', desc: 'Hosted 18 international guest artists spanning Tokyo, Berlin, and NYC.' },
  ];

  const hygienePromises = [
    {
      icon: <ShieldCheck size={36} className="about-hygiene__icon" />,
      title: 'SINGLE-USE STERILE NEEDLES',
      desc: 'Every needle cartridge is hermetically gas-sealed, opened in front of your eyes, and disposed of in certified biohazard sharps containers immediately.',
    },
    {
      icon: <FlaskConical size={36} className="about-hygiene__icon" />,
      title: 'MEDICAL-GRADE AUTOCLAVE',
      desc: 'All non-disposable stainless grip apparatus undergoes Class-B vacuum sterilization cycles with chemical indicator logs recorded daily.',
    },
    {
      icon: <Sparkles size={36} className="about-hygiene__icon" />,
      title: 'HOSPITAL-GRADE DISINFECTION',
      desc: 'Surgical barrier films protect every power pack, clip cord, and surface. EPA-approved biocidal sprays sanitize stations between every appointment.',
    },
  ];

  return (
    <div className="about-page">
      {/* 1) HEADER SECTION */}
      <section className="about-hero" aria-labelledby="about-page-h1">
        <div className="about-hero__container container">
          <div className="about-hero__title-box">
            <span className="about-hero__badge">OUR ORIGIN & ETHOS</span>
            <h1 id="about-page-h1" className="about-hero__h1">
              BORN IN A <span className="highlighter-bar">BACK ROOM.</span>
            </h1>
            <p className="about-hero__lead">
              A studio built by artists who treat skin as an indelible heirloom, not a quick retail transaction.
            </p>
          </div>

          <div ref={heroMediaRef} className="about-hero__media">
            <img
              src={images.aboutHero.src}
              alt={images.aboutHero.alt}
              width={1920}
              height={800}
              fetchPriority="high"
              decoding="async"
              className="about-hero__img photo"
            />
            <Sticker rotate={3} variant="yellow" className="about-hero__sticker">
              EST. 2000
            </Sticker>
          </div>
        </div>
        <TornEdge position="bottom" color="var(--paper)" variant={1} />
      </section>

      {/* 2) STORY SECTION */}
      <section className="about-story" aria-labelledby="story-heading">
        <div className="about-story__container container">
          <div className="about-story__grid">
            <div className="about-story__text-col">
              <span className="about-story__tag">THE PHILOSOPHY</span>
              <h2 id="story-heading" className="about-story__title">
                NO FLASH OFF THE WALL. <br />
                EVERY LINE BELONGS TO YOU.
              </h2>
              <div className="about-story__paragraphs">
                <p>
                  Twenty-five years ago, we grew tired of sterile medical clinics that felt unwelcoming and commercial tattoo factories that copied Pinterest stencils. We built FANG SCARS Tattoo Co. as an underground haven where artists and clients collaborate as peers.
                </p>
                <p>
                  Every composition starts with open dialogue: understanding your anatomy, listening to your stories, and translating abstract emotions into pure ink. We draw custom stencils to hug natural curves, bone ridges, and muscle movement.
                </p>
                <p>
                  We are stubbornly independent. We prioritize quality over volume, limiting each artist to one or two clients per day. That focus ensures deep attention, steady hands, and tattoos that remain crisp decades after they heal.
                </p>
              </div>
            </div>

            <div className="about-story__media-col">
              <div className="about-story__photo-offset">
                <PastedPhoto
                  src={images.about01.src}
                  alt={images.about01.alt}
                  width={550}
                  height={680}
                  aspectRatio="4/5"
                  rotate={-2.5}
                  hasTape={true}
                  tapePosition="top-left"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) ARTISTS ASYMMETRIC GRID */}
      <section className="about-artists" aria-labelledby="about-artists-heading">
        <div className="about-artists__container container">
          <SectionTitle
            title="THE RESIDENT MASTERS"
            highlight="RESIDENT"
            align="center"
            color="var(--ink)"
            id="about-artists-heading"
          />

          <div className="about-artists__grid">
            {artists.map((artist, idx) => {
              const imgData = images[artist.imageKey];
              const isShifted = idx % 2 === 1;

              return (
                <div
                  key={artist.id}
                  className={`about-artists__card ${isShifted ? 'about-artists__card--shifted' : ''}`}
                >
                  <PastedPhoto
                    src={imgData?.src}
                    alt={imgData?.alt}
                    width={450}
                    height={580}
                    aspectRatio="3/4"
                    rotate={idx % 2 === 0 ? -1.5 : 2}
                    hasTape={true}
                    tapePosition={idx % 2 === 0 ? 'top-left' : 'top-right'}
                  />

                  <div className="about-artists__card-info">
                    <h3 className="about-artists__artist-name">{artist.name}</h3>
                    <span className="about-artists__pill">{artist.specialty}</span>
                    <p className="about-artists__signature">{`- ${artist.signature}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4) TIMELINE SECTION */}
      <section className="about-timeline" aria-labelledby="timeline-heading">
        <div className="about-timeline__container container">
          <SectionTitle
            title="25 YEARS ON SKIN"
            highlight="25 YEARS"
            align="center"
            color="var(--ink)"
            id="timeline-heading"
          />

          <div className="about-timeline__track">
            <div className="about-timeline__items">
              {milestones.map((m) => (
                <div key={m.year} className="about-timeline__item">
                  <div className="about-timeline__node">
                    <span className="about-timeline__dot" />
                    <span className="about-timeline__year">{m.year}</span>
                  </div>
                  <h4 className="about-timeline__item-title">{m.title}</h4>
                  <p className="about-timeline__item-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5) HYGIENE PROMISE (charcoal-800 section, torn top and bottom) */}
      <section className="about-hygiene" aria-labelledby="hygiene-heading">
        <TornEdge position="top" color="var(--paper)" variant={2} />

        <div className="about-hygiene__container container">
          <SectionTitle
            title="ASEPTIC PROTOCOL"
            highlight="PROTOCOL"
            align="center"
            color="var(--yellow-500)"
            flourishColor="var(--yellow-500)"
            id="hygiene-heading"
          />

          <p className="about-hygiene__intro">
            We hold ourselves to hospital-grade sterility. Your safety and peace of mind are non-negotiable.
          </p>

          <div className="about-hygiene__grid">
            {hygienePromises.map((p, i) => (
              <div key={i} className="about-hygiene__card">
                <div className="about-hygiene__icon-box">{p.icon}</div>
                <h3 className="about-hygiene__card-title">{p.title}</h3>
                <p className="about-hygiene__card-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) CTA BAND */}
      <CtaBand
        title="READY TO TALK WITH AN ARTIST?"
        subtitle="Bring in sketches, rough photo ideas, or just an emotion. We will shape it together."
        btnText="SUBMIT AN IDEA"
        topTornColor="var(--charcoal-800)"
        bottomTornColor="var(--charcoal-900)"
      />
    </div>
  );
}
