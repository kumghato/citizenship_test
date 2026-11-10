import React from 'react';
import { FaqItem } from '@/lib/faqData';

interface FaqItemCardProps {
  item: FaqItem;
  defaultOpen?: boolean;
}

/**
 * Native <details> element: the answers are present in the server HTML (so they
 * can be crawled) and the control works without JavaScript.
 */
export function FaqItemCard({ item, defaultOpen = false }: FaqItemCardProps) {
  return (
    <details className="faq-item" open={defaultOpen}>
      <summary>
        <span className="faq-item__question">
          <span>
            <small>{item.category}</small>
            <strong>{item.question}</strong>
          </span>
        </span>
        <span className="faq-item__toggle" aria-hidden="true" />
      </summary>
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
    </details>
  );
}

export default FaqItemCard;
