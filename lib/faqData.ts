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
    question: 'How should I prepare for USCIS test questions and the US citizen test?',
    answer:
      'To prepare for the US citizen test and American citizen test, focus on the official 100 civics questions provided by USCIS. Our USCIS test practice simulator lets you practice randomized 20-question sets under timed conditions with real-time feedback and statutory citations to ensure you comfortably achieve the 60% passing benchmark.',
    bullets: [
      'Covers American government, American history, and integrated civics',
      'Matches the official USCIS 100 civics questions standard',
      'Instant explanations for correct and incorrect answers',
    ],
  },
  {
    id: 'life-in-the-uk',
    category: 'Home Office · United Kingdom',
    question: 'What is the best way to do Life in the UK test practice and pass the mock test?',
    answer:
      'The most reliable way to pass the Life in the UK test is to study the official 3rd edition handbook ("Life in the United Kingdom: A Guide for New Residents") and complete regular mock exams. Our Life in the UK test web simulator offers full 24-question practice sessions with a 45-minute timer, reflecting the real test environment where a 75% pass mark (18/24) is required.',
    bullets: [
      'Comprehensive Life in the UK test questions from all handbook chapters',
      'Timed Life in the UK mock test simulator matching official test conditions',
      'No registration required to start your British citizenship practice',
    ],
  },
  {
    id: 'discover-canada',
    category: 'IRCC · Canada',
    question: 'How do Discover Canada practice tests prepare me for Canadian citizenship?',
    answer:
      'All Canadian citizenship test questions are derived directly from the official IRCC study guide: "Discover Canada: The Rights and Responsibilities of Citizenship". Our practice tests cover Canadian history, democracy, geography, monarchy, and the Charter of Rights, helping you achieve the 15/20 (75%) passing score required for Canadian citizenship.',
    bullets: [
      'Complete coverage of Discover Canada chapters and historical milestones',
      'Simulates the 30-minute 20-question Canadian citizenship exam format',
      'Detailed rationale and study references for every question',
    ],
  },
  {
    id: 'our-common-bond',
    category: 'DHA · Australia',
    question: 'What is covered in the Australian citizenship Our Common Bond practice test?',
    answer:
      'The Australian citizenship test is based on the Department of Home Affairs resource book "Australian Citizenship: Our Common Bond". Our Common Bond practice test features 20 questions covering Australia and its people, democratic beliefs, government, and law. Crucially, it includes the 5 mandatory Australian values questions, where a 100% score (5/5) is strictly required to pass.',
    bullets: [
      'Dedicated focus on mandatory Australian values questions',
      'Comprehensive coverage of parts 1, 2, 3, and 4 of Our Common Bond',
      'Simulates the 45-minute timed DHA examination format',
    ],
  },
  {
    id: 'free-access',
    category: 'Platform & Access',
    question: 'Is CivicPass independent and free to practice?',
    answer:
      'Yes. CivicPass provides free, independent citizenship test practice across all four country tracks: USCIS (USA), Life in the UK (UK), Discover Canada (Canada), and Our Common Bond (Australia). No credit card, account registration, or personal data collection is required.',
    bullets: [
      '100% free practice exams and timed mock tests',
      'Private by design — session data remains local in your browser',
      'Educational practice tool aligned with official government study standards',
    ],
  },
];
