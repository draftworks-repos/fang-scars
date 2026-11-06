import React, { useState } from 'react';
import './NewsletterForm.css';
import Button from '../Button/Button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="newsletter-form__success" role="alert" aria-live="polite">
        <span className="newsletter-form__check">✓</span>
        <h4 className="newsletter-form__success-title">YOU'RE IN. WATCH YOUR INBOX.</h4>
        <p className="newsletter-form__success-sub">
          Priority flash drops and resident artist guest-spot announcements arrive monthly.
        </p>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <div className="newsletter-form__row">
        <div className="newsletter-form__input-group">
          <label htmlFor="newsletter-email" className="newsletter-form__label">
            EMAIL ADDRESS
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="your.ink@domain.com"
            className={`newsletter-form__input ${error ? 'newsletter-form__input--error' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          {error && (
            <span id="newsletter-error" className="newsletter-form__error" role="alert">
              {error}
            </span>
          )}
        </div>

        <Button variant="dark" type="submit" className="newsletter-form__btn">
          SUBSCRIBE
        </Button>
      </div>
    </form>
  );
}
