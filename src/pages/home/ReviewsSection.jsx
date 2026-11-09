import React, { useState, useRef } from "react";
import gsap from "gsap";
import "./ReviewsSection.css";
import reviews from "../../data/reviews";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import SliderArrows from "../../components/SliderArrows/SliderArrows";
import TornEdge from "../../components/TornEdge/TornEdge";
import DotGrid from "../../components/DotGrid/DotGrid";

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);

  const activeReview = reviews[currentIndex];

  const changeReview = (newIndex) => {
    if (newIndex === currentIndex) return;

    if (
      cardRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      );
    }
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + reviews.length) % reviews.length;
    changeReview(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % reviews.length;
    changeReview(nextIdx);
  };

  return (
    <section
      className="reviews-section"
      aria-labelledby="reviews-section-heading"
    >
      <div className="reviews-section__container container">
        <DotGrid
          color="var(--ink)"
          opacity={0.3}
          className="reviews-section__dots reviews-section__dots--left"
        />
        <DotGrid
          color="var(--ink)"
          opacity={0.3}
          className="reviews-section__dots reviews-section__dots--right"
        />

        <SectionTitle
          title="OUR CUSTOMER SAYS"
          align="center"
          color="var(--ink)"
          id="reviews-section-heading"
        />

        {/* Centered Review Card Slider */}
        <div className="reviews-section__stage">
          <div ref={cardRef} className="reviews-section__card-wrapper">
            <ReviewCard review={activeReview} />
          </div>

          <div className="reviews-section__controls">
            <SliderArrows onPrev={handlePrev} onNext={handleNext} />

            {/* Dots */}
            <div
              className="reviews-section__dots-list"
              role="tablist"
              aria-label="Review slide indicators"
            >
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`reviews-section__dot ${idx === currentIndex ? "reviews-section__dot--active" : ""}`}
                  onClick={() => changeReview(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TornEdge position="bottom" color="var(--paper)" variant={1} />
    </section>
  );
}
