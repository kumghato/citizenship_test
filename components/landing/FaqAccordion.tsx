'use client';

import { useState } from 'react';

const faqItems = [
  {
    id: 'format',
    category: 'Exam format',
    question: 'What can I practice on CivicPass?',
    answer: 'Each track includes a focused set of country-specific multiple-choice questions, a timed practice environment, and a question-by-question review after you finish.',
    bullets: ['United States · USCIS civics', 'United Kingdom · Life in the UK', 'Canada · Discover Canada', 'Australia · Our Common Bond'],
  },
  {
    id: 'sources',
    category: 'Question bank',
    question: 'Where do the questions come from?',
    answer: 'Questions are organized around the study standards named in each country track. Read the source note and study guidance attached to each question to understand what to review next.',
  },
  {
    id: 'progress',
    category: 'Progress',
    question: 'Do I need an account to start?',
    answer: 'No. You can start a practice exam immediately. Your current session is kept in this browser so you can see your score and review after submitting.',
  },
  {
    id: 'official',
    category: 'Important note',
    question: 'Is CivicPass an official government test?',
    answer: 'No. CivicPass is an independent educational practice tool. Always confirm current test requirements and official study material with your country’s government website before your appointment.',
  },
];

export function FaqAccordion() {
  const [openId, setOpenId] = useState('format');

  return (
    <div className="faq-list">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? '' : item.id)}>
              <span className="faq-item__question">
                <span><small>{item.category}</small><strong>{item.question}</strong></span>
              </span>
              <span className="faq-item__toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="faq-item__answer">
                <p>{item.answer}</p>
                {item.bullets && <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
