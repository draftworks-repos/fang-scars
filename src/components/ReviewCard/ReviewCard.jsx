import React from 'react';
import { Star } from 'lucide-react';
import './ReviewCard.css';
import GoogleG from '../GoogleG/GoogleG';

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="review-card">
      {/* Decorative oversized quotation marks */}
      <span className="review-card__quote-mark review-card__quote-mark--left" aria-hidden="true">
        “
      </span>
      <span className="review-card__quote-mark review-card__quote-mark--right" aria-hidden="true">
        ”
      </span>

      <div className="review-card__content">
        {/* (a) 5 filled stars */}
        <div className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className="review-card__star-icon"
              fill="currentColor"
            />
          ))}
        </div>

        {/* (b) Quote text */}
        <blockquote className="review-card__quote">
          <p>{review.quote}</p>
        </blockquote>

        {/* (c) Google G + reviewer name */}
        <div className="review-card__author-row">
          <GoogleG />
          <cite className="review-card__name">{review.name}</cite>
        </div>
      </div>
    </div>
  );
}
