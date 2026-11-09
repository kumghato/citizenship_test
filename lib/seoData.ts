import { SupportedCountry } from './quizData';

export interface TrackSeoData {
  countryId: SupportedCountry;
  countryName: string;
  flag: string;
  officialAgency: string;
  examName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1Title: string;
  h2Subtitle: string;
  officialSourceDoc: string;
  passingBenchmark: string;
  timeLimitText: string;
  totalQuestionsText: string;
  introParagraphs: string[];
  syllabusTopics: { title: string; description: string }[];
  examTips: string[];
  faqs: { question: string; answer: string }[];
}

export const COUNTRY_SEO_DATA: Record<SupportedCountry, TrackSeoData> = {
  us: {
    countryId: 'us',
    countryName: 'United States',
    flag: '🇺🇸',
    officialAgency: 'USCIS · U.S. Department of Homeland Security',
    examName: 'USCIS Civics Practice Exam',
    metaTitle: 'USCIS Civics Test Practice — 100 Questions',
    metaDescription:
      'Practice USCIS civics questions for the US citizen test. Free 2026 USCIS test practice with instant scoring and statutory explanations.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'USCIS',
      'uscis civics test',
      'uscis test questions',
      'uscis test practice',
      'uscis civics practice',
      '100 civics questions',
      'us citizen test',
      'american citizen test',
      'us naturalization test',
      'naturalization interview questions',
      'us citizenship test practice',
      'us citizenship test questions',
      'uscis civics test 2026',
      'free uscis practice test',
      'civics test practice',
    ],
    h1Title: 'USCIS Civics Test Practice & US Citizen Test Questions',
    h2Subtitle:
      'Comprehensive preparation for the USCIS naturalization exam based on the official 100 civics questions.',
    officialSourceDoc: 'USCIS 100 Civics Questions (U.S. Department of Homeland Security)',
    passingBenchmark: '60% (12 correct answers out of 20 questions)',
    timeLimitText: '20 minutes',
    totalQuestionsText: '20 questions (drawn from 100 official civics questions)',
    introParagraphs: [
      'Preparing for your US citizen test requires a clear command of American government, history, and integrated civics. The USCIS naturalization civics test evaluates your understanding of how the United States functions as a constitutional federal republic.',
      'Our USCIS test practice simulator gives future American citizens realistic, timed mock exams with instant statutory legal citations. Whether you are reviewing the Constitution, the Bill of Rights, or branches of government, this USCIS test questions practice platform builds speed and accuracy.',
      'Every practice session delivers immediate feedback on both correct and incorrect answers, reinforcing statutory guidance so you can pass the American citizen test on your first attempt.',
    ],
    syllabusTopics: [
      {
        title: 'Principles of American Democracy',
        description:
          'Supreme law of the land, the Constitution, amendments, Declaration of Independence, economic system, and the rule of law.',
      },
      {
        title: 'System of Government',
        description:
          'Three branches of government (Executive, Legislative, Judicial), separation of powers, Congress, President, Cabinet, and Supreme Court.',
      },
      {
        title: 'Rights and Responsibilities',
        description:
          'Constitutional rights of citizens, voting, public service, taxes, selective service, and allegiance to the United States.',
      },
      {
        title: 'American History: Colonial, Independence & 1800s',
        description:
          'Early settlement, George Washington, Benjamin Franklin, the Civil War, Abraham Lincoln, and abolition of slavery.',
      },
      {
        title: 'Recent American History & Integrated Civics',
        description:
          'World Wars, civil rights movement, Martin Luther King Jr., 9/11 events, geography, national symbols, and federal holidays.',
      },
    ],
    examTips: [
      'Learn the current officeholders for your state and congressional district before your USCIS appointment.',
      'Practice answering out loud to build oral confidence for the in-person interview with the USCIS officer.',
      'Focus on the 100 official civics questions standard to guarantee coverage of every potential topic.',
      'Use the question palette to flag difficult questions and review legal notes before final submission.',
    ],
    faqs: [
      {
        question: 'How many questions are on the official USCIS civics test?',
        answer:
          'During the official USCIS naturalization interview, an officer asks up to 10 questions from the 100 official civics list, and you must answer 6 correctly to pass (60%). In our full practice test environment, you answer 20 randomized questions requiring 12 correct answers to mirror standard testing benchmarks.',
      },
      {
        question: 'What is the best way to do USCIS test practice for the US citizen test?',
        answer:
          'The most effective USCIS test practice combines timed mock tests with oral flashcard rehearsal. Because the real American citizen test is conducted orally by a USCIS officer, rehearsing answers aloud and reviewing statutory legal guidance yields the highest first-time pass rates.',
      },
      {
        question: 'Are the USCIS test questions updated for the current administration?',
        answer:
          'Yes. USCIS test questions covering elected officials (such as the President, Vice President, Speaker of the House, and Chief Justice) reflect current leadership. Answers that change with elections must be verified prior to your naturalization interview.',
      },
      {
        question: 'Can I take this American citizen test practice on mobile devices?',
        answer:
          'Yes. CivicPass is fully responsive across desktop, tablet, and mobile browsers, allowing you to practice USCIS test questions anywhere without installing extra software or creating an account.',
      },
    ],
  },

  uk: {
    countryId: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    officialAgency: 'Home Office · UK Visas & Immigration',
    examName: 'Life in the UK Official Practice Exam',
    metaTitle: 'Life in the UK Test — Question Bank, Mock Exam & Practice',
    metaDescription:
      'Prepare for the Life in the UK test with our free question bank, mock exam simulations, learning materials, and verified practice test questions and answers.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'Life in the UK',
      'life in the uk test',
      'life in the uk test practice',
      'life in the uk test questions',
      'life in the uk mock test',
      'life in the uk mock exam',
      'life in the uk question bank',
      'life in the uk questions examples',
      'life in the uk preparation',
      'life in the uk learning materials',
      'life in the uk free test',
      'life in the uk english test topics',
      'life in the uk english test',
      'life in the uk test questions and answers',
      'life in the uk test web',
      'british citizenship test',
      'life in the uk 3rd edition handbook',
      'life in the uk official practice',
      'uk citizenship test',
      'life in the uk test 2026',
      'free life in the uk mock test',
      'life in the uk practice questions',
      'life in the uk handbook questions',
      'ilr test practice',
    ],
    h1Title: 'Life in the UK Test Practice — Question Bank & Mock Exam',
    h2Subtitle:
      'Comprehensive Life in the UK preparation with verified questions examples, mock tests, and official learning materials based on the 3rd Edition handbook.',
    officialSourceDoc: 'Life in the UK: A Guide for New Residents (3rd Edition Handbook)',
    passingBenchmark: '75% (18 correct answers out of 24 questions)',
    timeLimitText: '45 minutes',
    totalQuestionsText: '24 multiple-choice questions',
    introParagraphs: [
      'Passing the Life in the UK test is a mandatory statutory requirement for British citizenship (naturalisation) and Indefinite Leave to Remain (ILR). Thorough Life in the UK preparation requires working through verified questions examples and understanding core British traditions, history, legal systems, and civic values.',
      'Our comprehensive Life in the UK question bank and web simulator reproduce real examination room conditions with timed 24-question Life in the UK mock exam sessions, instant scoring, and detailed Life in the UK test questions and answers based directly on the official 3rd edition Home Office handbook.',
      'Whether you are seeking a Life in the UK free test to assess your baseline readiness or complete Life in the UK learning materials to master historical timelines and government structures, this simulator provides authentic Life in the UK test practice to ensure you pass on your first attempt.',
    ],
    syllabusTopics: [
      {
        title: 'The Values and Principles of the UK',
        description:
          'British values including democracy, rule of law, individual liberty, and mutual tolerance of different faiths and beliefs.',
      },
      {
        title: 'What is the UK?',
        description:
          'Countries of the UK (England, Scotland, Wales, Northern Ireland), capital cities, patron saints, and regional flags.',
      },
      {
        title: 'A Long and Illustrious History',
        description:
          'Stone Age to Roman Britain, Anglo-Saxons, Vikings, Norman Conquest (1066), Magna Carta, Tudors, English Civil War, Industrial Revolution, and 20th Century world events.',
      },
      {
        title: 'A Modern, Thriving Society',
        description:
          'British culture, music, arts, cinema, architecture, culinary traditions, public holidays, sports, and religious diversity.',
      },
      {
        title: 'The UK Government, the Law and Your Role',
        description:
          'Constitutional monarchy, Parliament (House of Commons and House of Lords), devolved administrations, elections, courts, and civic duties.',
      },
    ],
    examTips: [
      'Study the official 3rd edition handbook thoroughly and use our Life in the UK question bank to test your knowledge chapter by chapter.',
      'Review Life in the UK questions examples covering pivotal historical milestones (such as 1066 Norman Conquest, 1215 Magna Carta, 1689 Bill of Rights, and 1928 equal franchise).',
      'Take regular Life in the UK mock exam sessions under 45-minute timed conditions to build pacing and reduce test-day pressure.',
      'Review your flagged test questions and answers systematically in the results view to master challenging topics before your official appointment.',
    ],
    faqs: [
      {
        question: 'What is the format and passing score for the Life in the UK test?',
        answer:
          'The official Life in the UK test consists of 24 multiple-choice questions with a 45-minute time limit. You must achieve a minimum score of 75% (18 out of 24 correct) to receive your pass notification letter.',
      },
      {
        question: 'Where can I find a reliable Life in the UK question bank with questions examples and answers?',
        answer:
          'CivicPass provides a free, verified Life in the UK question bank featuring realistic questions examples, timed mock exams, and statutory explanations. Each question links back to the 3rd edition handbook standard, giving you clear learning materials instead of guesswork.',
      },
      {
        question: 'What are the Life in the UK English test topics and how do they differ from the Life in the UK test?',
        answer:
          'The Life in the UK test and the English language qualification are two distinct requirements for British citizenship and settlement (ILR). The Life in the UK test assesses civics, history, and government. The English language test (such as B1 SELT) evaluates speaking and listening skills across everyday English test topics like family, home, hobbies, work, and travel. You must complete both statutory requirements for naturalisation.',
      },
      {
        question: 'How do I do effective Life in the UK test practice online?',
        answer:
          'The most reliable method is taking repeated Life in the UK mock test sessions under timed conditions on our Life in the UK test web simulator. Combining mock exams with question-by-question review of the 3rd edition handbook ensures complete coverage.',
      },
      {
        question: 'Where do the Life in the UK test questions come from?',
        answer:
          'All test questions are taken directly from the official Home Office handbook "Life in the United Kingdom: A Guide for New Residents (3rd Edition)". Questions cover British history, government, law, culture, and society.',
      },
      {
        question: 'How long is the Life in the UK test pass certificate valid?',
        answer:
          'Your Life in the UK test pass result does not expire. Once you pass, the unique reference number remains valid indefinitely for your settlement (ILR) and British citizenship naturalisation applications.',
      },
    ],
  },

  ca: {
    countryId: 'ca',
    countryName: 'Canada',
    flag: '🇨🇦',
    officialAgency: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    examName: 'Discover Canada Official Practice Exam',
    metaTitle: 'Discover Canada Citizenship Practice Test & Canadian Mock Test',
    metaDescription:
      'Pass the Canadian citizenship test with our free Discover Canada test practice, mock exams, and IRCC question bank. The ideal web-based Discover Canada app.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'Discover Canada',
      'canadian citizenship',
      'canadian citizenship test',
      'canadian citizenship test practice',
      'canadian citizenship mock test',
      'canada citizenship test practice',
      'discover canada practice test',
      'discover canada citizenship test',
      'discover canada test',
      'discover canada app',
      'discover canada test practice',
      'discover canada citizenship practice test',
      'canadian citizenship test questions',
      'ircc citizenship test',
      'discover canada study guide',
      'discover canada questions',
      'canadian citizenship test 2026',
      'free canadian citizenship practice test',
      'canada citizenship exam',
      'canadian civics questions',
      'canadian history quiz',
    ],
    h1Title: 'Discover Canada Citizenship Test — Practice Test & Mock Exam',
    h2Subtitle:
      'Master the Canadian citizenship test with realistic questions examples drawn directly from the official Discover Canada study guide.',
    officialSourceDoc: 'Discover Canada: The Rights and Responsibilities of Citizenship (IRCC)',
    passingBenchmark: '75% (15 correct answers out of 20 questions)',
    timeLimitText: '30 minutes',
    totalQuestionsText: '20 multiple-choice questions',
    introParagraphs: [
      'Applying for Canadian citizenship involves passing the official IRCC citizenship exam. Thorough Discover Canada test practice ensures you master Canadian history, geography, democratic government, monarchy, and civic responsibilities before test day.',
      'Our Discover Canada citizenship practice test provides realistic simulation of the online and in-person Canadian citizenship test. Designed as an accessible, web-based Discover Canada app that runs on any phone or desktop, it requires no downloads or account creation.',
      'Taking regular Canadian citizenship mock test sessions sharpens your recall on key topics including the Canadian Charter of Rights and Freedoms, Confederation, Indigenous heritage, and federal governance, delivering the best Canada citizenship test practice available.',
    ],
    syllabusTopics: [
      {
        title: 'Rights and Responsibilities of Citizenship',
        description:
          'Canadian Charter of Rights and Freedoms, equality of women and men, democratic rights, bilingualism, and the rule of law.',
      },
      {
        title: 'Who We Are & Indigenous Peoples',
        description:
          'First Nations, Inuit, and Métis peoples, heritage, cultural diversity, and Canada as a pluralistic society.',
      },
      {
        title: 'Canadian History & Confederation',
        description:
          'New France, British North America, War of 1812, July 1 1867 Confederation, expansion to the West, and Canadian military heritage.',
      },
      {
        title: 'How Canadians Govern Themselves',
        description:
          'Federal state, parliamentary democracy, constitutional monarchy, Sovereign, Governor General, Prime Minister, Parliament, and elections.',
      },
      {
        title: 'Canadian Regions, Economy & Symbols',
        description:
          'Atlantic Provinces, Central Canada, Prairie Provinces, West Coast, Northern Territories, Crown, Beaver, Maple Leaf, and National Anthem.',
      },
    ],
    examTips: [
      'Read "Discover Canada: The Rights and Responsibilities of Citizenship" chapter by chapter alongside your Discover Canada test practice.',
      'Take a full Canadian citizenship mock test at least twice a week to build familiarity with the 30-minute exam pace.',
      'Familiarize yourself with the exact names of your federal Member of Parliament (MP), Lieutenant Governor, and Premier.',
      'Pay close attention to key dates like 1867 (Confederation) and 1982 (Patriation of the Constitution and the Charter).',
      'Use this platform on your mobile phone as a zero-install Discover Canada app to practice anytime, anywhere.',
    ],
    faqs: [
      {
        question: 'What is the passing grade for the Canadian citizenship test?',
        answer:
          'The Canadian citizenship test consists of 20 questions and you must answer at least 15 correctly (75%) within 30 minutes to pass.',
      },
      {
        question: 'Is there a free Discover Canada app or online platform for Canadian citizenship test practice?',
        answer:
          'Yes. CivicPass is designed as a responsive, zero-install web-based Discover Canada app. You can take a full Discover Canada citizenship practice test on your smartphone, tablet, or desktop with instant scoring, timer simulation, and official IRCC rationale.',
      },
      {
        question: 'How does this Discover Canada test practice help me prepare for the exam?',
        answer:
          'Our Discover Canada test practice uses the same question formats, topics, and timing as the official IRCC Canadian citizenship test. Sitting regular Canadian citizenship mock test sessions pinpoints weaker subject areas so you can focus your study on specific chapters.',
      },
      {
        question: 'Can the Canadian citizenship test be taken online or in person?',
        answer:
          'Most candidates now take the Canadian citizenship test online via the secure IRCC portal with webcam verification, though in-person tests and hearings are also scheduled when needed.',
      },
      {
        question: 'What happens if I do not pass the Canadian citizenship test on my first attempt?',
        answer:
          'If you do not pass your first Canadian citizenship test, IRCC will typically invite you to take a second test. If you do not pass the second test, you will be scheduled for a short interview with a citizenship official.',
      },
    ],
  },

  au: {
    countryId: 'au',
    countryName: 'Australia',
    flag: '🇦🇺',
    officialAgency: 'Department of Home Affairs (DHA)',
    examName: 'Our Common Bond Australian Practice Exam',
    metaTitle: 'Our Common Bond Practice Test & Values',
    metaDescription:
      'Prepare for the Australian citizenship test with free Our Common Bond practice questions, including the mandatory Australian values questions.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'our common bond',
      'our common bond practice test',
      'our common bond questions',
      'australian citizenship our common bond',
      'australian citizenship test',
      'australian citizenship test questions',
      'australian values test questions',
      'australian values test',
      'dha citizenship practice',
      'australian citizenship mock test',
      'australian citizenship test 2026',
      'free australian citizenship practice test',
      'australian citizenship exam',
      'australian civics test',
    ],
    h1Title: 'Australian Citizenship: Our Common Bond Practice Test',
    h2Subtitle:
      'Prepare for the DHA Australian citizenship test with questions on Australian values, history, and government.',
    officialSourceDoc: 'Australian Citizenship: Our Common Bond (Department of Home Affairs)',
    passingBenchmark: '75% overall + 100% on Australian Values (5 out of 5)',
    timeLimitText: '45 minutes',
    totalQuestionsText: '20 multiple-choice questions',
    introParagraphs: [
      'Acquiring Australian citizenship represents a shared commitment to Australia and its democratic values. The official Department of Home Affairs (DHA) citizenship test evaluates your knowledge of Australian society, history, institutions, and core values.',
      'Our Common Bond practice test is created strictly around the official resource book "Australian Citizenship: Our Common Bond". Candidates must demonstrate not only general civic knowledge but also full mastery of the mandatory Australian values questions.',
      'Our practice test web platform provides realistic timed sessions, immediate question-level explanations, and statutory citations so you walk into your Australian citizenship appointment fully prepared.',
    ],
    syllabusTopics: [
      {
        title: 'Part 1: Australia and Its People',
        description:
          'Aboriginal and Torres Strait Islander peoples, British settlement, states and territories, capital cities, and Australian symbols.',
      },
      {
        title: 'Part 2: Australia’s Democratic Beliefs, Rights and Liberties',
        description:
          'Parliamentary democracy, rule of law, living peacefully, respect for the freedom and dignity of the individual, and freedom of speech.',
      },
      {
        title: 'Part 3: Government and the Law in Australia',
        description:
          'The Australian Constitution, King Charles III and the Governor-General, Parliament (Senate and House of Representatives), and courts.',
      },
      {
        title: 'Part 4: Australian Values (Mandatory Component)',
        description:
          'Equality of men and women, freedom of association, mutual respect, fair go, integration, and rule of secular Australian law.',
      },
    ],
    examTips: [
      'You MUST get all 5 Australian values questions correct (100%) to pass, in addition to scoring 75% overall.',
      'Memorize Australia’s national symbols: Commonwealth Coat of Arms, Golden Wattle, Opal, and national colors (green and gold).',
      'Understand the three levels of government: Federal (Commonwealth), State/Territory, and Local Council.',
      'Take multiple practice sessions to ensure quick recall under the 45-minute testing clock.',
    ],
    faqs: [
      {
        question: 'What is the passing requirement for the Australian citizenship test?',
        answer:
          'To pass the Australian citizenship exam, you must achieve an overall score of at least 75% (15 out of 20 correct) AND answer all 5 Australian values questions correctly (100%). Failing a single values question results in a test failure regardless of your overall score.',
      },
      {
        question: 'What is the Australian citizenship Our Common Bond resource?',
        answer:
          '"Australian Citizenship: Our Common Bond" is the official study book published by the Department of Home Affairs (DHA). All questions on the citizenship test are based directly on the examinable sections in parts 1, 2, 3, and 4 of this book.',
      },
      {
        question: 'How do I prepare with Our Common Bond practice tests?',
        answer:
          'Take our timed Our Common Bond practice tests repeatedly, review the detailed statutory guidance for any missed question, and pay specific attention to the Australian values section to ensure 100% accuracy.',
      },
      {
        question: 'How long do I have to complete the Australian citizenship test?',
        answer:
          'You have 45 minutes to complete the 20 multiple-choice questions during your appointment at a Department of Home Affairs service centre.',
      },
    ],
  },
};
