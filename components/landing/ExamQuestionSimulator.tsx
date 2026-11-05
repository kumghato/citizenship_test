'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SimulatorQuestion {
  countryId: string;
  countryName: string;
  flag: string;
  badge: string;
  number: number;
  total: number;
  category: string;
  text: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
    explanation: string;
  }[];
}

const DEMO_QUESTIONS: Record<string, SimulatorQuestion> = {
  us: {
    countryId: 'us',
    countryName: 'United States (USCIS)',
    flag: '🇺🇸',
    badge: 'USCIS Civics Test',
    number: 14,
    total: 20,
    category: 'System of Government · Section A',
    text: 'What is one power of the federal government under the U.S. Constitution?',
    options: [
      {
        id: 'A',
        text: 'To print money',
        correct: true,
        explanation:
          'Under Article I, Section 8 of the U.S. Constitution, Congress holds the federal power to coin money and regulate its value.',
      },
      {
        id: 'B',
        text: 'To provide police protection',
        correct: false,
        explanation:
          'General police powers are reserved to individual state and municipal governments.',
      },
      {
        id: 'C',
        text: "To issue driver's licenses",
        correct: false,
        explanation:
          'Driver licensing is administered by individual state motor vehicle departments.',
      },
      {
        id: 'D',
        text: 'To approve local zoning laws',
        correct: false,
        explanation:
          'Zoning and local land-use ordinances are handled by municipal and county authorities.',
      },
    ],
  },
  uk: {
    countryId: 'uk',
    countryName: 'United Kingdom (Life in the UK)',
    flag: '🇬🇧',
    badge: 'Life in the UK Test',
    number: 8,
    total: 24,
    category: 'A Long and Illustrious History · British Milestones',
    text: 'Which historic document in 1215 established that the King was subject to the law of the land?',
    options: [
      {
        id: 'A',
        text: 'The Magna Carta',
        correct: true,
        explanation:
          'King John sealed Magna Carta (Great Charter) in 1215 at Runnymede, establishing that everyone, even the monarch, is subject to the rule of law.',
      },
      {
        id: 'B',
        text: 'The Bill of Rights 1689',
        correct: false,
        explanation:
          'The 1689 Bill of Rights established parliamentary sovereignty following the Glorious Revolution.',
      },
      {
        id: 'C',
        text: 'The Domesday Book',
        correct: false,
        explanation:
          'The Domesday Book (1086) was a land survey commissioned by William the Conqueror.',
      },
      {
        id: 'D',
        text: 'The Act of Union 1707',
        correct: false,
        explanation:
          'The 1707 Act of Union united the Kingdoms of England and Scotland into Great Britain.',
      },
    ],
  },
  ca: {
    countryId: 'ca',
    countryName: 'Canada (Discover Canada)',
    flag: '🇨🇦',
    badge: 'Discover Canada Test',
    number: 5,
    total: 20,
    category: 'Rights and Responsibilities · Canadian Governance',
    text: 'What is the name of the highest honour that a Canadian citizen can receive for military valour?',
    options: [
      {
        id: 'A',
        text: 'The Victoria Cross',
        correct: true,
        explanation:
          'The Victoria Cross (V.C.) is Canada’s highest award for conspicuous bravery and self-sacrifice in the presence of the enemy.',
      },
      {
        id: 'B',
        text: 'The Order of Canada',
        correct: false,
        explanation:
          'The Order of Canada recognizes outstanding lifetime achievement and dedication to community and nation.',
      },
      {
        id: 'C',
        text: 'The Governor General’s Medal',
        correct: false,
        explanation:
          'Governor General’s Academic Medals recognize academic excellence across Canadian schools and universities.',
      },
      {
        id: 'D',
        text: 'The Star of Military Valour',
        correct: false,
        explanation:
          'The Star of Military Valour is the second-highest award for courage in action, beneath the Victoria Cross.',
      },
    ],
  },
  au: {
    countryId: 'au',
    countryName: 'Australia (Our Common Bond)',
    flag: '🇦🇺',
    badge: 'Our Common Bond Test',
    number: 18,
    total: 20,
    category: 'Australian Values (Mandatory) · Part 4',
    text: 'Under Australian law and values, which of the following statements about equality is correct?',
    options: [
      {
        id: 'A',
        text: 'Men and women have equal rights and opportunities under the law',
        correct: true,
        explanation:
          'In Australia, men and women enjoy equal rights in education, employment, and the law. This is a core value assessed in Part 4 of Our Common Bond.',
      },
      {
        id: 'B',
        text: 'Men have legal precedence in family property disputes',
        correct: false,
        explanation:
          'Australian law treats men and women with absolute equality regardless of family position.',
      },
      {
        id: 'C',
        text: 'Only property owners have the right to vote in federal elections',
        correct: false,
        explanation:
          'Australia has universal compulsory adult suffrage for all Australian citizens aged 18 and older.',
      },
      {
        id: 'D',
        text: 'State governments can create laws favoring specific religions',
        correct: false,
        explanation:
          'Section 116 of the Australian Constitution prohibits the Commonwealth from establishing any national religion.',
      },
    ],
  },
};

export function ExamQuestionSimulator() {
  const [activeCountry, setActiveCountry] = useState('us');
  const [selected, setSelected] = useState('A');
  const [submitted, setSubmitted] = useState(true);

  const question = DEMO_QUESTIONS[activeCountry];
  const selectedOption = question.options.find((option) => option.id === selected);

  const handleCountrySwitch = (countryKey: string) => {
    setActiveCountry(countryKey);
    setSelected('A');
    setSubmitted(true);
  };

  return (
    <div className="practice-card">
      <div className="practice-card__header">
        <div className="flex items-center gap-1.5 flex-wrap">
          {Object.keys(DEMO_QUESTIONS).map((key) => {
            const q = DEMO_QUESTIONS[key];
            const isActive = key === activeCountry;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCountrySwitch(key)}
                className={`text-xs px-2.5 py-1 rounded-full border transition flex items-center gap-1 ${
                  isActive
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                aria-label={`Preview ${q.badge}`}
              >
                <span>{q.flag}</span>
                <span>{q.badge}</span>
              </button>
            );
          })}
        </div>
        <span className="text-xs font-mono text-slate-500">18:42</span>
      </div>

      <div className="practice-card__meta">
        Question {question.number} of {question.total} <span>·</span> {question.category}
      </div>

      <h3>{question.text}</h3>

      <div
        className="practice-options"
        role="radiogroup"
        aria-label="Citizenship question options"
      >
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const state =
            submitted && isSelected
              ? option.correct
                ? 'is-correct'
                : 'is-wrong'
              : '';
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`practice-option ${isSelected ? 'is-selected' : ''} ${state}`}
              onClick={() => {
                setSelected(option.id);
                setSubmitted(true);
              }}
            >
              <span className="practice-option__key">{option.id}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      {submitted && selectedOption && (
        <div
          className={`practice-explanation ${
            selectedOption.correct ? 'is-correct' : 'is-wrong'
          }`}
        >
          <strong>
            {selectedOption.correct ? 'Correct answer' : 'Review statutory citation'}
          </strong>
          <p>{selectedOption.explanation}</p>
        </div>
      )}

      <div className="practice-card__footer">
        <button
          type="button"
          className="practice-reset"
          onClick={() => {
            setSelected('');
            setSubmitted(false);
          }}
        >
          Clear
        </button>
        <div>
          <button
            type="button"
            className="practice-next"
            onClick={() => {
              const keys = Object.keys(DEMO_QUESTIONS);
              const nextIndex = (keys.indexOf(activeCountry) + 1) % keys.length;
              handleCountrySwitch(keys[nextIndex]);
            }}
          >
            Next country demo
          </button>
          <Link
            href={`/test/${activeCountry}`}
            className="practice-start"
            title={`Start full ${question.badge} practice exam`}
          >
            Launch full exam
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExamQuestionSimulator;
