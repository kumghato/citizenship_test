'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faqData';

export function FaqAccordion() {
  const [openId, setOpenId] = useState('uscis');

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            className={`faq-item ${isOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? '' : item.id)}
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
      })}
    </div>
  );
}

export default FaqAccordion;
