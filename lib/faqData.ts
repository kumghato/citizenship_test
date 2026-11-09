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
    question: 'How should I prepare for the USCIS civics questions and US naturalization interview?',
    answer:
      'For the US naturalization interview, focus on the official 100 civics questions published by USCIS. Our USCIS civics simulator builds randomized 20-question sessions under timed conditions, with real-time feedback and statutory citations, so you can comfortably clear the 60% passing benchmark before your appointment.',
    bullets: [
      'Covers American government, American history and integrated civics',
      'Matches the official USCIS 100 civics questions standard',
      'Instant explanations for correct and incorrect answers',
    ],
  },
  {
    id: 'life-in-the-uk',
    category: 'Home Office · United Kingdom',
    question: 'What is the best way to revise for the Life in the UK test and pass the mock exam?',
    answer:
      'The most reliable Life in the UK preparation combines studying the official 3rd edition handbook ("Life in the United Kingdom: A Guide for New Residents") with practicing our verified Life in the UK question bank. Our simulator provides a free Life in the UK mock exam with 24 randomized questions and a 45-minute timer, giving you instant explanations for all Life in the UK test questions and answers to clear the 75% pass mark (18/24) required for British citizenship and Indefinite Leave to Remain (ILR).',
    bullets: [
      'Comprehensive Life in the UK question bank drawn from every handbook chapter',
      'Timed Life in the UK mock exam matching authentic examination conditions',
      'Free Life in the UK test practice with complete learning materials and instant answers',
    ],
  },
  {
    id: 'discover-canada',
    category: 'IRCC · Canada',
    question: 'How do Discover Canada practice questions prepare me for the Canadian citizenship exam?',
    answer:
      'All Canadian citizenship questions are derived directly from the official IRCC study guide, "Discover Canada: The Rights and Responsibilities of Citizenship". Designed as a mobile-friendly Discover Canada app experience, our platform offers a full Discover Canada citizenship practice test covering Canadian history, Confederation, democracy, geography, and rights. Sitting regular Canadian citizenship mock test sessions ensures you comfortably clear the 15/20 (75%) pass benchmark.',
    bullets: [
      'Complete Discover Canada test practice covering all official chapters and milestones',
      'Realistic Canadian citizenship mock test simulating the 30-minute, 20-question format',
      'Zero-install Discover Canada app with instant statutory feedback and study notes',
    ],
  },
  {
    id: 'our-common-bond',
    category: 'DHA · Australia',
    question: 'Which topics appear in the Australian citizenship Our Common Bond practice questions?',
    answer:
      'The Australian citizenship assessment is based on the Department of Home Affairs resource book "Australian Citizenship: Our Common Bond". Our practice sets feature 20 questions covering Australia and its people, democratic beliefs, government and law. Crucially, they include the 5 mandatory Australian values questions, where a 100% score (5/5) is strictly required to pass.',
    bullets: [
      'Dedicated focus on mandatory Australian values questions',
      'Comprehensive coverage of parts 1, 2, 3, and 4 of Our Common Bond',
      'Simulates the 45-minute timed DHA examination format',
    ],
  },
  {
    id: 'passing-scores',
    category: 'All Tracks · Scoring',
    question: 'What passing score do I need for each citizenship exam?',
    answer:
      'USCIS asks up to 10 civics questions during the interview and requires 6 correct answers, and our 20-question practice sets mirror that 60% mark. Life in the UK needs 75% (18 of 24) and Discover Canada needs 75% (15 of 20). The Australian assessment needs 75% overall plus all 5 Australian values questions correct.',
    bullets: [
      'USCIS: 60% (6 of 10 at interview, 12 of 20 in practice)',
      'Life in the UK: 75% (18 of 24) within 45 minutes',
      'Discover Canada: 75% (15 of 20) within 30 minutes',
      'Our Common Bond: 75% plus 100% on Australian values',
    ],
  },
  {
    id: 'study-plan',
    category: 'Study Plan',
    question: 'How long does it take to prepare for a citizenship exam?',
    answer:
      'Most candidates are ready after two to six weeks of steady practice. Start with one timed mock exam to identify weak topics, read the statutory explanation for every missed question, then retake those questions a few days later. Short sessions repeated across several days work better than a single long cram session.',
    bullets: [
      'Start with a diagnostic mock exam',
      'Review the explanation for every missed question',
      'Retake flagged questions before exam day',
    ],
  },
  {
    id: 'free-access',
    category: 'Platform & Access',
    question: 'Is CivicPass independent and free to practice?',
    answer:
      'Yes. CivicPass offers free, independent citizenship practice across all four country tracks: USCIS (USA), Life in the UK (UK), Discover Canada (Canada), and Our Common Bond (Australia). No credit card, account registration, or personal data collection is required.',
    bullets: [
      '100% free practice exams and timed mock papers',
      'Private by design — session data remains local in your browser',
      'Educational practice tool aligned with official government study standards',
    ],
  },
  {
    id: 'mobile-no-account',
    category: 'Platform & Access',
    question: 'Can I practice citizenship questions on my phone without an account?',
    answer:
      'Yes. Every practice set, mock exam and explanation is free and opens instantly on mobile, tablet and desktop. Scores are stored in your browser only, so nothing is uploaded and no personal details are needed to start studying.',
    bullets: [
      'Works on phones, tablets and laptops',
      'No sign-up, email address or payment details',
      'Progress saved locally in your browser',
    ],
  },
];
