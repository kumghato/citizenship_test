import React from 'react';
import { FAQ_ITEMS } from '@/lib/faqData';
import { FaqItemCard } from './FaqItemCard';

export function FaqAccordion() {
  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item) => (
        <FaqItemCard
          key={item.id}
          item={item}
          defaultOpen={item.id === 'uscis'}
        />
      ))}
    </div>
  );
}

export default FaqAccordion;
