import React, { useRef } from 'react';
import { Plus } from 'lucide-react';
import './FaqItem.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function FaqItem({
  faq,
  isOpen = false,
  onToggle,
}) {
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        type="button"
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-btn-${faq.id}`}
      >
        <span className="faq-item__question">{faq.question}</span>
        <span className="faq-item__icon-wrapper" aria-hidden="true">
          <Plus size={20} className="faq-item__icon" />
        </span>
      </button>

      <div
        ref={contentRef}
        id={`faq-answer-${faq.id}`}
        className="faq-item__content"
        role="region"
        aria-labelledby={`faq-btn-${faq.id}`}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div className="faq-item__body">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
