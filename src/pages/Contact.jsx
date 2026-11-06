import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Upload, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import './Contact.css';
import images from '../data/images';
import PastedPhoto from '../components/PastedPhoto/PastedPhoto';
import Button from '../components/Button/Button';
import TornEdge from '../components/TornEdge/TornEdge';

export default function Contact() {
  useEffect(() => {
    document.title = "Contact & Booking | FANG SCARS Tattoo Co.";
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    style: 'Custom Realism',
    placement: '',
    size: 'Medium (Palm-sized)',
    budget: '',
    date: '',
    idea: '',
    referenceFileName: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stylesList = [
    'Custom Realism',
    'Fine Line & Botanical',
    'Heavy Blackwork',
    'Mandala & Sacred Geometry',
    'Balinese & Traditional',
    'Precision Piercing',
    'Tattoo Removal / Lightening',
  ];

  const sizeOptions = [
    'Tiny (< 2 inches)',
    'Small (2 - 4 inches)',
    'Medium (Palm-sized)',
    'Large (Half-sleeve / Ribs)',
    'Sleeve / Full Back',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        referenceFileName: e.target.files[0].name,
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }
    if (!formData.placement.trim()) {
      errs.placement = 'Placement on body is required (e.g. inner forearm).';
    }
    if (!formData.idea.trim() || formData.idea.trim().length < 10) {
      errs.idea = 'Please describe your concept in at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* 1) HEADER */}
      <section className="contact-hero" aria-labelledby="contact-page-h1">
        <div className="contact-hero__container container">
          <span className="contact-hero__badge">APPOINTMENTS & INQUIRIES</span>
          <h1 id="contact-page-h1" className="contact-hero__h1">
            LET'S TALK INK.
          </h1>
          <p className="contact-hero__lead">
            Reply within 24 hours. Every custom piece starts with a conversation.
          </p>
        </div>
      </section>

      {/* 2 & 3) FORM & STUDIO INFO GRID */}
      <section className="contact-main">
        <div className="contact-main__container container">
          <div className="contact-main__grid">
            {/* Left 7 cols: Controlled Booking Form */}
            <div className="contact-form-col">
              {isSubmitted ? (
                <div className="contact-success" role="alert" aria-live="polite">
                  <CheckCircle size={56} className="contact-success__icon" />
                  <h2 className="contact-success__title">GOT IT. TALK SOON.</h2>
                  <p className="contact-success__desc">
                    Thank you, <strong>{formData.fullName}</strong>. We received your booking inquiry for a <strong>{formData.size}</strong> {formData.style} on your <strong>{formData.placement}</strong>.
                  </p>
                  <p className="contact-success__note">
                    Our studio manager will review artist availability and contact you via email ({formData.email}) or phone ({formData.phone}) within 24 hours to schedule your consultation.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        style: 'Custom Realism',
                        placement: '',
                        size: 'Medium (Palm-sized)',
                        budget: '',
                        date: '',
                        idea: '',
                        referenceFileName: '',
                      });
                    }}
                  >
                    SUBMIT ANOTHER INQUIRY
                  </Button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <h2 className="contact-form__title">BOOKING CONSULTATION</h2>
                  <p className="contact-form__sub">
                    Fill in your details below. Consultations are complimentary and obligation-free.
                  </p>

                  <div className="contact-form__fields">
                    {/* Full Name */}
                    <div className="contact-field">
                      <label htmlFor="fullName" className="contact-field__label">
                        FULL NAME *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Maya Sen"
                        className={`contact-field__input ${errors.fullName ? 'contact-field__input--error' : ''}`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'err-name' : undefined}
                      />
                      {errors.fullName && (
                        <span id="err-name" className="contact-field__error">{errors.fullName}</span>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="contact-field__row">
                      <div className="contact-field">
                        <label htmlFor="email" className="contact-field__label">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="maya@domain.com"
                          className={`contact-field__input ${errors.email ? 'contact-field__input--error' : ''}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'err-email' : undefined}
                        />
                        {errors.email && (
                          <span id="err-email" className="contact-field__error">{errors.email}</span>
                        )}
                      </div>

                      <div className="contact-field">
                        <label htmlFor="phone" className="contact-field__label">
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`contact-field__input ${errors.phone ? 'contact-field__input--error' : ''}`}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'err-phone' : undefined}
                        />
                        {errors.phone && (
                          <span id="err-phone" className="contact-field__error">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    {/* Preferred Style & Placement */}
                    <div className="contact-field__row">
                      <div className="contact-field">
                        <label htmlFor="style" className="contact-field__label">
                          PREFERRED STYLE
                        </label>
                        <select
                          id="style"
                          name="style"
                          value={formData.style}
                          onChange={handleChange}
                          className="contact-field__select"
                        >
                          {stylesList.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="placement" className="contact-field__label">
                          PLACEMENT ON BODY *
                        </label>
                        <input
                          id="placement"
                          name="placement"
                          type="text"
                          value={formData.placement}
                          onChange={handleChange}
                          placeholder="e.g. Left forearm, collarbone"
                          className={`contact-field__input ${errors.placement ? 'contact-field__input--error' : ''}`}
                          aria-invalid={!!errors.placement}
                          aria-describedby={errors.placement ? 'err-placement' : undefined}
                        />
                        {errors.placement && (
                          <span id="err-placement" className="contact-field__error">{errors.placement}</span>
                        )}
                      </div>
                    </div>

                    {/* Size & Budget */}
                    <div className="contact-field__row">
                      <div className="contact-field">
                        <label htmlFor="size" className="contact-field__label">
                          APPROXIMATE SIZE
                        </label>
                        <select
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                          className="contact-field__select"
                        >
                          {sizeOptions.map((sz) => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="budget" className="contact-field__label">
                          ESTIMATED BUDGET
                        </label>
                        <input
                          id="budget"
                          name="budget"
                          type="text"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="e.g. Rs 5,000 - 10,000"
                          className="contact-field__input"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="contact-field">
                      <label htmlFor="date" className="contact-field__label">
                        PREFERRED DATE (OPTIONAL)
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="contact-field__input"
                      />
                    </div>

                    {/* Your Idea */}
                    <div className="contact-field">
                      <label htmlFor="idea" className="contact-field__label">
                        YOUR IDEA & CONCEPT *
                      </label>
                      <textarea
                        id="idea"
                        name="idea"
                        rows={4}
                        value={formData.idea}
                        onChange={handleChange}
                        placeholder="Tell us about the subject, mood, references, or symbolic meaning..."
                        className={`contact-field__textarea ${errors.idea ? 'contact-field__input--error' : ''}`}
                        aria-invalid={!!errors.idea}
                        aria-describedby={errors.idea ? 'err-idea' : undefined}
                      />
                      {errors.idea && (
                        <span id="err-idea" className="contact-field__error">{errors.idea}</span>
                      )}
                    </div>

                    {/* Reference Upload (Visual only) */}
                    <div className="contact-field">
                      <span className="contact-field__label">REFERENCE IMAGE (OPTIONAL)</span>
                      <label htmlFor="referenceFile" className="contact-field__upload-box">
                        <Upload size={20} className="contact-field__upload-icon" />
                        <span className="contact-field__upload-text">
                          {formData.referenceFileName || 'Click to select image file (JPG, PNG, PDF)'}
                        </span>
                        <input
                          id="referenceFile"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="visually-hidden"
                        />
                      </label>
                    </div>

                    <div className="contact-form__submit-row">
                      <Button variant="primary" type="submit" className="contact-form__submit-btn">
                        SEND IT
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right 5 cols: Studio info (sticky) */}
            <div className="contact-info-col">
              <div className="contact-info-card">
                <div className="contact-info__photo">
                  <PastedPhoto
                    src={images.contact.src}
                    alt={images.contact.alt}
                    width={480}
                    height={380}
                    aspectRatio="4/3"
                    rotate={-2}
                    hasTape={true}
                    tapePosition="top-left"
                  />
                </div>

                <div className="contact-info__content">
                  <h3 className="contact-info__title">SANCTUARY DETAILS</h3>

                  <div className="contact-info__row">
                    <MapPin size={20} className="contact-info__icon" />
                    <div>
                      <strong>LOCATION</strong>
                      <p>42 Industrial Quarter, 2nd Floor, Off Linking Road, Bandra West, Mumbai 400050</p>
                    </div>
                  </div>

                  <div className="contact-info__row">
                    <Clock size={20} className="contact-info__icon" />
                    <div>
                      <strong>HOURS</strong>
                      <p>Monday – Saturday: 11:00 AM – 8:00 PM<br />Sunday: By Appointment Only</p>
                    </div>
                  </div>

                  <div className="contact-info__row">
                    <Phone size={20} className="contact-info__icon" />
                    <div>
                      <strong>DIRECT CALL / WHATSAPP</strong>
                      <p>+91 (022) 2640-8899 / +91 98200 45678</p>
                    </div>
                  </div>

                  <div className="contact-info__row">
                    <Mail size={20} className="contact-info__icon" />
                    <div>
                      <strong>EMAIL</strong>
                      <p>hello@goldfang.studio</p>
                    </div>
                  </div>

                  {/* 44px square ink-bordered social buttons */}
                  <div className="contact-info__social">
                    <span className="contact-info__social-label">OFFICIAL CHANNELS</span>
                    <div className="contact-info__social-row">
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="Instagram">
                        <Instagram size={20} />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="Facebook">
                        <Facebook size={20} />
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="YouTube">
                        <Youtube size={20} />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="Twitter">
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Torn Edge into dark charcoal footer */}
        <TornEdge position="bottom" color="var(--charcoal-900)" variant={2} />
      </section>
    </div>
  );
}
