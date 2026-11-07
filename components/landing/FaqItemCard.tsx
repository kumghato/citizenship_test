'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/lib/faqData';

interface FaqItemCardProps {
  item: FaqItem;
  defaultOpen?: boolean;
}

export function FaqItemCard({ item, defaultOpen = false }: FaqItemCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <article className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="faq-item__question">
          <span>
            <small>{item.category}</small>
            <strong>{item.question}</strong>
          </span>
        </span>
        <span className="faq-item__toggle" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="faq-item__answer">
          <p>{item.answer}</p>
          {item.bullets && (
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

export default FaqItemCard;
