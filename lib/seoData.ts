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
    metaTitle: 'USCIS Test Practice: Official US Citizen Test Questions & Civics Mock Exam',
    metaDescription:
      'Practice USCIS test questions for your US citizen test and American citizen test. Free 2026 USCIS test practice with real-time scoring and statutory explanations.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'USCIS',
      'uscis test questions',
      'uscis test practice',
      'us citizen test',
      'american citizen test',
      'uscis civics test',
      'us naturalization test',
      '100 civics questions',
      'us citizenship test practice',
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
    metaTitle: 'Life in the UK Test Web Practice: 2026 Mock Test & Real Exam Questions',
    metaDescription:
      'Prepare for the Life in the UK test with free official practice questions and timed mock tests. Master the 3rd edition handbook topics with our Life in the UK test web simulator.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'Life in the UK',
      'life in the uk test',
      'life in the uk test practice',
      'life in the uk test questions',
      'life in the uk mock test',
      'life in the uk test web',
      'british citizenship test',
      'life in the uk 3rd edition handbook',
      'life in the uk official practice',
    ],
    h1Title: 'Life in the UK Test Practice — Official Mock Test & Questions',
    h2Subtitle:
      'Study official Life in the UK test questions based on the 3rd Edition Home Office handbook.',
    officialSourceDoc: 'Life in the UK: A Guide for New Residents (3rd Edition Handbook)',
    passingBenchmark: '75% (18 correct answers out of 24 questions)',
    timeLimitText: '45 minutes',
    totalQuestionsText: '24 multiple-choice questions',
    introParagraphs: [
      'Passing the Life in the UK test is a mandatory statutory requirement for British citizenship (naturalisation) and Indefinite Leave to Remain (ILR). The examination assesses your knowledge of British traditions, history, legal systems, and daily life.',
      'Our Life in the UK test web simulator reproduces the real examination room conditions with timed sessions, 24 randomized questions, and comprehensive explanations based on the official 3rd edition handbook.',
      'Regular Life in the UK mock test practice helps candidates familiarize themselves with multi-select formats, historical dates, monarchical lineages, and statutory principles, dramatically increasing first-attempt pass rates.',
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
      'Read the official 3rd edition handbook thoroughly before attempting Life in the UK mock test sets.',
      'Pay special attention to historical milestones (such as 1066, 1215 Magna Carta, 1689 Bill of Rights, and 1928 equal voting rights).',
      'Watch out for multi-option questions that require choosing two correct answers instead of one.',
      'Review your flagged questions systematically in the results view to master missed topics.',
    ],
    faqs: [
      {
        question: 'What is the format and passing score for the Life in the UK test?',
        answer:
          'The official Life in the UK test consists of 24 multiple-choice questions with a 45-minute time limit. You must achieve a minimum score of 75% (18 out of 24 correct) to receive your pass notification letter.',
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
    metaTitle: 'Discover Canada Practice Test: Canadian Citizenship Exam Questions (IRCC)',
    metaDescription:
      'Pass your Canadian citizenship test on the first try. Free Discover Canada practice exam featuring official IRCC questions, Canadian history, rights, and government.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'Discover Canada',
      'canadian citizenship',
      'canadian citizenship test',
      'discover canada practice test',
      'canadian citizenship test practice',
      'canadian citizenship test questions',
      'ircc citizenship test',
      'discover canada study guide',
    ],
    h1Title: 'Discover Canada Practice Test & Canadian Citizenship Exam',
    h2Subtitle:
      'Master the Canadian citizenship test with questions drawn directly from the official Discover Canada study guide.',
    officialSourceDoc: 'Discover Canada: The Rights and Responsibilities of Citizenship (IRCC)',
    passingBenchmark: '75% (15 correct answers out of 20 questions)',
    timeLimitText: '30 minutes',
    totalQuestionsText: '20 multiple-choice questions',
    introParagraphs: [
      'Applying for Canadian citizenship involves passing the official IRCC citizenship exam. The test evaluates your knowledge of Canadian history, geography, democratic government, monarchy, and civic responsibilities.',
      'Our Discover Canada practice test provides realistic simulation of the online and in-person Canadian citizenship test. Every practice test question aligns with the official study guide published by Immigration, Refugees and Citizenship Canada (IRCC).',
      'Through focused practice on Canadian citizenship test questions, you will learn key facts about the Canadian Charter of Rights and Freedoms, Confederation, Indigenous peoples, and federal parliamentary systems.',
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
      'Read "Discover Canada: The Rights and Responsibilities of Citizenship" chapter by chapter before testing.',
      'Familiarize yourself with the exact names of your federal Member of Parliament (MP), Lieutenant Governor, and Premier.',
      'Pay close attention to key dates like 1867 (Confederation) and 1982 (Patriation of the Constitution and the Charter).',
      'Practice answering within the 30-minute allocation to leave time to review difficult questions.',
    ],
    faqs: [
      {
        question: 'What is the passing grade for the Canadian citizenship test?',
        answer:
          'The Canadian citizenship test consists of 20 questions and you must answer at least 15 correctly (75%) within 30 minutes to pass.',
      },
      {
        question: 'How does this Discover Canada practice test help me prepare?',
        answer:
          'Our Discover Canada practice test uses the same question formats, topics, and timing as the official IRCC Canadian citizenship test. It pinpoints weaker subject areas so you can focus your study on specific chapters.',
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
    metaTitle: 'Our Common Bond Practice Test: Australian Citizenship Exam Questions (DHA)',
    metaDescription:
      'Prepare for the Australian citizenship test with official Our Common Bond practice questions. Practice Australian citizenship our common bond mock exams with Australian values.',
    keywords: [
      'citizenship test',
      'free citizenship test',
      'online citizenship test',
      'our common bond',
      'our common bond practice test',
      'australian citizenship our common bond',
      'australian citizenship test',
      'australian values test questions',
      'dha citizenship practice',
      'australian citizenship mock test',
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
