export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  bullets?: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'uscis',
    category: 'USCIS · United States',
    question: 'How should I prepare for the US civics interview?',
    answer:
      'The interviewer reads up to ten prompts from the published list and you answer aloud. Practise ten at a time with someone listening, then read the note for each reply you missed. Six correct replies is a pass.',
    bullets: [
      'Covers government, history and integrated civics',
      'Timed sets with the pass mark in view',
      'A short note on every answer',
    ],
  },
  {
    id: 'life-in-the-uk',
    category: 'Home Office · United Kingdom',
    question: 'How do I revise for the Life in the UK test?',
    answer:
      'Read the official handbook once, then work through a chapter at a time answering as you go. The paper is 24 questions in 45 minutes and you need 18 right. Dates, monarchs and institutions appear most often, so give those a second pass.',
    bullets: [
      'Built on the third edition of the handbook',
      '24 questions, 45 minutes, 75% to pass',
      'Page references with each answer',
    ],
  },
  {
    id: 'discover-canada',
    category: 'IRCC · Canada',
    question: 'What does the Canadian test cover?',
    answer:
      'Twenty questions in 30 minutes, based on the IRCC study guide: history, the Charter, geography, government and symbols. Fifteen correct answers passes. Read the guide in order before you attempt a timed run.',
    bullets: [
      'Follows the official IRCC guide',
      '20 questions in 30 minutes',
      '75% needed to pass',
    ],
  },
  {
    id: 'our-common-bond',
    category: 'DHA · Australia',
    question: 'What is different about the Australian test?',
    answer:
      'The paper has 20 questions in 45 minutes. Five of them cover Australian values, and all five must be correct whatever your overall score. We mark that section on its own so you can see exactly where you stand.',
    bullets: [
      'Five values questions, all compulsory',
      '75% overall plus 5/5 on values',
      '45 minutes for 20 questions',
    ],
  },
  {
    id: 'passing-scores',
    category: 'All tracks · Scoring',
    question: 'What pass mark do I need?',
    answer:
      'Six correct replies out of ten at the US interview, which our 20-question sets mirror at 60%. The UK paper needs 18 of 24. Canada needs 15 of 20. Australia needs 15 of 20 overall and every values answer correct.',
    bullets: [
      'US: 6 of 10',
      'UK: 18 of 24',
      'Canada: 15 of 20',
      'Australia: 75% plus all values correct',
    ],
  },
  {
    id: 'study-plan',
    category: 'Study plan',
    question: 'How long does preparation take?',
    answer:
      'Most people are ready after two to six weeks of steady practice. Start with one timed paper, read the note for every item you missed, then retake those items a few days later. Short sessions beat a single long cram.',
    bullets: [
      'Start with a diagnostic paper',
      'Read the note for every miss',
      'Retake flagged items before exam day',
    ],
  },
  {
    id: 'free-access',
    category: 'Platform & access',
    question: 'Is CivicPass free and independent?',
    answer:
      'Yes. All four tracks are free, and there is no card, account or email step. We are an independent study tool rather than a government service, and we do not sell immigration advice.',
    bullets: [
      'Four tracks, no payment',
      'No registration required',
      'Independent of any government agency',
    ],
  },
  {
    id: 'mobile-no-account',
    category: 'Platform & access',
    question: 'Can I practise on my phone?',
    answer:
      'Yes. Every paper and explanation opens on a phone, tablet or laptop, and your score stays in the browser on that device. Nothing is uploaded, so you can start without handing over any personal details.',
    bullets: [
      'Works on any screen size',
      'No personal details needed',
      'Progress stored locally',
    ],
  },
];
