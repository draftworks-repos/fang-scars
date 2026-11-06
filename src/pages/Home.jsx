import React, { useEffect } from 'react';
import './Home.css';
import HeroSection from './home/HeroSection';
import AboutSection from './home/AboutSection';
import ServicesSection from './home/ServicesSection';
import ArtistsSection from './home/ArtistsSection';
import GalleryPreviewSection from './home/GalleryPreviewSection';
import ReviewsSection from './home/ReviewsSection';
import NewsletterSection from './home/NewsletterSection';
import Marquee from '../components/Marquee/Marquee';

export default function Home() {
  useEffect(() => {
    document.title = 'FANG SCARS Tattoo Co. | Custom Tattooing & Piercing';
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <Marquee
        items={[
          'CUSTOM TATTOOING',
          '•',
          'HYGIENIC SINGLE-USE PROTOCOL',
          '•',
          '25 YEARS EXPERIENCE',
          '•',
          'PRECISION PIERCING',
          '•',
          'VEGAN ORGANIC INKS',
          '•',
          'WALK-INS WELCOME',
          '•',
        ]}
      />
      <AboutSection />
      <ServicesSection />
      <ArtistsSection />
      <GalleryPreviewSection />
      <ReviewsSection />
      <NewsletterSection />
    </div>
  );
}
