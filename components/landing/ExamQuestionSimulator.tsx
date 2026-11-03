'use client';

import Link from 'next/link';
import { useState } from 'react';

const question = {
  number: 14,
  total: 20,
  category: 'System of Government · Section A',
  text: 'What is one power of the federal government?',
  options: [
    { id: 'A', text: 'To print money', correct: true, explanation: 'The Constitution gives the federal government the power to coin money and regulate its value.' },
    { id: 'B', text: 'To provide police protection', correct: false, explanation: 'General police powers are primarily held by states and local governments.' },
    { id: 'C', text: "To issue driver's licenses", correct: false, explanation: 'Driver licensing is generally handled by individual states.' },
    { id: 'D', text: 'To approve local zoning laws', correct: false, explanation: 'Zoning and land-use rules are local government responsibilities.' },
  ],
};

export function ExamQuestionSimulator() {
  const [selected, setSelected] = useState('A');
  const [submitted, setSubmitted] = useState(true);
  const selectedOption = question.options.find((option) => option.id === selected);

  return (
    <div className="practice-card">
      <div className="practice-card__header">
        <span>Live practice</span>
        <span>18:42</span>
      </div>
      <div className="practice-card__meta">Question {question.number} of {question.total} <span>·</span> {question.category}</div>
      <h3>{question.text}</h3>
      <div className="practice-options" role="radiogroup" aria-label="Answer options">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const state = submitted && isSelected ? (option.correct ? 'is-correct' : 'is-wrong') : '';
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`practice-option ${isSelected ? 'is-selected' : ''} ${state}`}
              onClick={() => { setSelected(option.id); setSubmitted(true); }}
            >
              <span className="practice-option__key">{option.id}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
      {submitted && selectedOption && (
        <div className={`practice-explanation ${selectedOption.correct ? 'is-correct' : 'is-wrong'}`}>
          <strong>{selectedOption.correct ? 'Correct answer' : 'Review this one'}</strong>
          <p>{selectedOption.explanation}</p>
        </div>
      )}
      <div className="practice-card__footer">
        <button type="button" className="practice-reset" onClick={() => { setSelected(''); setSubmitted(false); }}>Reset</button>
        <div>
          <button type="button" className="practice-next" onClick={() => { setSelected('A'); setSubmitted(true); }}>Next demo</button>
          <Link href="/test/us" className="practice-start">Full exam</Link>
        </div>
      </div>
    </div>
  );
}

export default ExamQuestionSimulator;
