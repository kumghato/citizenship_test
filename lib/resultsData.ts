import { SupportedCountry, SUPPORTED_COUNTRIES } from './quizData';

export interface ReviewQuestionItem {
  id: number;
  questionNumber: number;
  category: string;
  categoryTrail: string;
  domain: string;
  questionText: string;
  subtext?: string;
  userAnswerKey: 'A' | 'B' | 'C' | 'D' | null;
  userAnswerText: string;
  officialAnswerKey: 'A' | 'B' | 'C' | 'D';
  officialAnswerText: string;
  officialAlternateAnswers?: string;
  isCorrect: boolean;
  isFlagged: boolean;
  statutoryReference: string;
  whyCorrectContext: string;
  legalCitation?: string;
  mnemonic?: string;
}

export interface DomainPerformance {
  id: string;
  name: string;
  subcategories: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface ExamResultData {
  countryId: SupportedCountry;
  countryName: string;
  shortCode: string;
  flag: string;
  officialBody: string;
  examTitle: string;
  certificatePill: string;
  completionDate: string;
  timeSpentFormatted: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  flaggedCount: number;
  accuracyPercentage: number;
  passingScore: number;
  passingPercentage: number;
  hasPassed: boolean;
  domains: DomainPerformance[];
  targetFocus: {
    recommendation: string;
    insiderNote: string;
    oralExamClarity: string;
    oralExamStatus: 'OPTIMAL' | 'PASS' | 'REVIEW';
  };
  questions: ReviewQuestionItem[];
}

export const US_MOCK_RESULTS: ExamResultData = {
  countryId: 'us',
  countryName: 'United States',
  shortCode: 'USA',
  flag: '🇺🇸',
  officialBody: 'USCIS · U.S. Department of Homeland Security',
  examTitle: 'USCIS Civics Practice Exam #4',
  certificatePill: 'OFFICIAL PASS CERTIFICATE',
  completionDate: 'OCTOBER 15, 2026',
  timeSpentFormatted: '11m 32s',
  totalQuestions: 20,
  correctCount: 17,
  incorrectCount: 3,
  flaggedCount: 2,
  accuracyPercentage: 85,
  passingScore: 12,
  passingPercentage: 60,
  hasPassed: true,
  domains: [
    {
      id: 'gov',
      name: 'American Government',
      subcategories: 'Principles of Democracy, System of Government, Rights',
      correct: 7,
      total: 8,
      percentage: 87.5,
    },
    {
      id: 'hist',
      name: 'American History',
      subcategories: 'Colonial & Independence, 1800s, Recent American History',
      correct: 6,
      total: 7,
      percentage: 85.7,
    },
    {
      id: 'civics',
      name: 'Integrated Civics',
      subcategories: 'Geography, National Symbols, Federal Holidays',
      correct: 4,
      total: 5,
      percentage: 80.0,
    },
  ],
  targetFocus: {
    recommendation:
      'Focus on 1800s, Capture/Treaty, and national holidays to reach 100% confidence for your interview.',
    insiderNote:
      'During your in-person naturalization interview, USCIS adjudicating officers ask questions in rapid oral cadence until you answer 6 correctly. Review the 1800s statutory era and federal winter holidays to ensure immediate verbal recall.',
    oralExamClarity: 'Officer clarity standard 15/15 passed',
    oralExamStatus: 'OPTIMAL',
  },
  questions: [
    {
      id: 1,
      questionNumber: 1,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'What is the supreme law of the land?',
      subtext: 'Select the one definitive constitutional legal authority established under Article VI, Clause 2.',
      userAnswerKey: 'B',
      userAnswerText: 'The Constitution',
      officialAnswerKey: 'B',
      officialAnswerText: 'The Constitution',
      officialAlternateAnswers: 'The U.S. Constitution',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 1',
      whyCorrectContext:
        'Article VI, Clause 2 (The Supremacy Clause) establishes that the federal Constitution and federal statutes made pursuant to it constitute the supreme law of the land, taking legal precedence over any conflicting state constitutions or statutes.',
      legalCitation: 'U.S. CONST. art. VI, cl. 2 (Supremacy Clause)',
      mnemonic: 'Supreme Law = Supreme "C": The Constitution is the supreme cornerstone of all American law.',
    },
    {
      id: 2,
      questionNumber: 2,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'What does the Constitution do?',
      subtext: 'Identify the primary functions and structural role of the foundational document.',
      userAnswerKey: 'A',
      userAnswerText: 'Sets up the government and protects basic rights of Americans',
      officialAnswerKey: 'A',
      officialAnswerText: 'Sets up the government (also: defines the government, protects basic rights of Americans)',
      officialAlternateAnswers: 'Defines the government, protects basic rights of Americans',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 2',
      whyCorrectContext:
        'The United States Constitution establishes our system of federal government, outlines the three co-equal branches (legislative, executive, judicial), divides power between states and the national government, and shields individual rights.',
      legalCitation: 'U.S. CONST. pmbl.',
    },
    {
      id: 3,
      questionNumber: 3,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'The idea of self-government is in the first three words of the Constitution. What are these words?',
      subtext: 'Identify the opening phrase expressing popular sovereignty in the Preamble.',
      userAnswerKey: 'A',
      userAnswerText: 'We the People',
      officialAnswerKey: 'A',
      officialAnswerText: 'We the People',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 3',
      whyCorrectContext:
        'The Preamble famously opens with "We the People", declaring that sovereign constitutional authority originates with the citizenry rather than a hereditary monarch or oligarchy.',
      legalCitation: 'U.S. CONST. pmbl.',
    },
    {
      id: 4,
      questionNumber: 4,
      domain: 'American History',
      category: 'American History • Colonial Period & Independence',
      categoryTrail: 'AMERICAN HISTORY • COLONIAL PERIOD & INDEPENDENCE',
      questionText: 'The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.',
      subtext: 'Identify one of the three Founding Fathers who authored the 85 essays published under the pseudonym "Publius".',
      userAnswerKey: 'C',
      userAnswerText: 'Thomas Jefferson',
      officialAnswerKey: 'A',
      officialAnswerText: 'Alexander Hamilton (also: James Madison, John Jay, Publius)',
      officialAlternateAnswers: 'James Madison, John Jay, Publius',
      isCorrect: false,
      isFlagged: true,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: 18th Century History, Question 67',
      whyCorrectContext:
        'Thomas Jefferson did not write the Federalist Papers; he was serving abroad as the United States Minister to France in Paris during the 1787 Constitutional Convention and subsequent ratification campaign. The 85 essays urging ratification were authored by Alexander Hamilton (51 essays), James Madison (29 essays), and John Jay (5 essays) under the collective pseudonym "Publius". Madison’s Federalist No. 10 and No. 51 are foundational texts on representative democracy and checks and balances.',
      legalCitation: 'The Federalist Nos. 1–85 (Hamilton, Madison, Jay, 1787–1788)',
      mnemonic: 'Hamilton, Madison, Jay = Publius. (Jefferson was in Paris!).',
    },
    {
      id: 5,
      questionNumber: 5,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'What is an amendment?',
      subtext: 'Define the statutory mechanism governing updates under Article V.',
      userAnswerKey: 'A',
      userAnswerText: 'A change (or addition) to the Constitution',
      officialAnswerKey: 'A',
      officialAnswerText: 'A change (to the Constitution) / an addition (to the Constitution)',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 4',
      whyCorrectContext:
        'Article V details the amendment process, requiring a two-thirds vote in both houses of Congress (or a constitutional convention) and ratification by three-fourths of the fifty states.',
      legalCitation: 'U.S. CONST. art. V',
    },
    {
      id: 6,
      questionNumber: 6,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'What do we call the first ten amendments to the Constitution?',
      subtext: 'Identify the codified package of fundamental civil liberty protections ratified in 1791.',
      userAnswerKey: 'B',
      userAnswerText: 'The Bill of Rights',
      officialAnswerKey: 'B',
      officialAnswerText: 'The Bill of Rights',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 5',
      whyCorrectContext:
        'Drafted primarily by James Madison in the First United States Congress, the Bill of Rights (Amendments 1–10) secured essential safeguards including free speech, religious liberty, jury trials, and protection against unreasonable searches.',
      legalCitation: 'U.S. CONST. amends. I–X (1791)',
    },
    {
      id: 7,
      questionNumber: 7,
      domain: 'American Government',
      category: 'American Government • Principles of Democracy',
      categoryTrail: 'AMERICAN GOVERNMENT • PRINCIPLES OF DEMOCRACY',
      questionText: 'What is one right or freedom from the First Amendment?',
      subtext: 'Select one of the five protected constitutional guarantees of conscience and expression.',
      userAnswerKey: 'A',
      userAnswerText: 'Speech',
      officialAnswerKey: 'A',
      officialAnswerText: 'Speech (also: religion, assembly, press, petition the government)',
      officialAlternateAnswers: 'Religion, assembly, press, petition the government',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: Principles of Democracy, Question 6',
      whyCorrectContext:
        'The First Amendment guarantees five pillars of democratic liberty: freedom of speech, freedom of religion, freedom of the press, the right of peaceful assembly, and the right to petition the government for a redress of grievances.',
      legalCitation: 'U.S. CONST. amend. I',
      mnemonic: 'RAPPS: Religion, Assembly, Press, Petition, Speech.',
    },
    {
      id: 8,
      questionNumber: 8,
      domain: 'American History',
      category: 'American History • Colonial Period & Independence',
      categoryTrail: 'AMERICAN HISTORY • COLONIAL PERIOD & INDEPENDENCE',
      questionText: 'What did the Declaration of Independence do?',
      subtext: 'Identify the legal and diplomatic declaration adopted on July 4, 1776.',
      userAnswerKey: 'A',
      userAnswerText: 'Announced our independence from Great Britain',
      officialAnswerKey: 'A',
      officialAnswerText: 'Announced our independence (from Great Britain) / declared our independence',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: Colonial Period & Independence, Question 8',
      whyCorrectContext:
        'Penned by Thomas Jefferson in Philadelphia and approved by the Second Continental Congress, the Declaration dissolved all political allegiance to the British Crown and declared the thirteen colonies sovereign states.',
      legalCitation: 'Declaration of Independence (1776)',
    },
    {
      id: 9,
      questionNumber: 9,
      domain: 'American History',
      category: 'American History • Colonial Period & Independence',
      categoryTrail: 'AMERICAN HISTORY • COLONIAL PERIOD & INDEPENDENCE',
      questionText: 'What are two rights in the Declaration of Independence?',
      subtext: 'Identify the unalienable natural rights endowed by the Creator in the Preamble.',
      userAnswerKey: 'A',
      userAnswerText: 'Life and pursuit of happiness',
      officialAnswerKey: 'A',
      officialAnswerText: 'Life, liberty, and pursuit of happiness',
      officialAlternateAnswers: 'Liberty, pursuit of happiness',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: Colonial Period & Independence, Question 9',
      whyCorrectContext:
        'Drawing upon Enlightenment philosophy, the Declaration famously declared that all human beings are endowed with certain unalienable rights, among which are Life, Liberty and the pursuit of Happiness.',
      legalCitation: 'Declaration of Independence, para. 2 (1776)',
    },
    {
      id: 10,
      questionNumber: 10,
      domain: 'American Government',
      category: 'American Government • System of Government',
      categoryTrail: 'AMERICAN GOVERNMENT • SYSTEM OF GOVERNMENT',
      questionText: 'What is the economic system in the United States?',
      subtext: 'Identify the predominant market model governing commerce in America.',
      userAnswerKey: 'A',
      userAnswerText: 'Capitalist economy (market economy)',
      officialAnswerKey: 'A',
      officialAnswerText: 'Capitalist economy / market economy',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section A: System of Government, Question 11',
      whyCorrectContext:
        'The United States operates primarily as a market-driven capitalist economy where private individuals and businesses produce goods and services based on consumer supply and demand.',
      legalCitation: 'USCIS 100 Civics Standard #11',
    },
    {
      id: 11,
      questionNumber: 11,
      domain: 'American History',
      category: 'American History • 1800s & Territorial Expansion',
      categoryTrail: 'AMERICAN HISTORY • 1800S & TERRITORIAL EXPANSION',
      questionText: 'What territory did the United States buy from France in 1803?',
      subtext: 'Identify the western land acquisition that doubled the geographic size of the young republic.',
      userAnswerKey: 'D',
      userAnswerText: 'The Alaska Territory',
      officialAnswerKey: 'B',
      officialAnswerText: 'The Louisiana Territory (also: Louisiana)',
      officialAlternateAnswers: 'Louisiana, the Louisiana Purchase',
      isCorrect: false,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: 19th Century History, Question 71',
      whyCorrectContext:
        'The Alaska Purchase took place decades later in 1867 from the Russian Empire for $7.2 million. In 1803, President Thomas Jefferson concluded the historic Louisiana Purchase from France for $15 million, securing 828,000 square miles between the Mississippi River and the Rocky Mountains.',
      legalCitation: 'Treaty with France (Louisiana Purchase), 8 Stat. 200 (1803)',
      mnemonic: '1803 = Napoleon sold Louisiana. 1867 = Russia sold Alaska.',
    },
    {
      id: 12,
      questionNumber: 12,
      domain: 'American Government',
      category: 'American Government • System of Government',
      categoryTrail: 'AMERICAN GOVERNMENT • SYSTEM OF GOVERNMENT',
      questionText: 'Name one branch or part of the government.',
      subtext: 'Identify one of the three co-equal branches established under Articles I, II, and III.',
      userAnswerKey: 'A',
      userAnswerText: 'Congress (also: legislative, President, executive, the courts, judicial)',
      officialAnswerKey: 'A',
      officialAnswerText: 'Congress (also: legislative, President, executive, the courts, judicial)',
      officialAlternateAnswers: 'Legislative, President, Executive, Judicial, The Courts',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section B: System of Government, Question 13',
      whyCorrectContext:
        'Articles I, II, and III delineate the tri-partite separation of federal power: Legislative (Congress), Executive (President), and Judicial (Supreme Court & federal courts).',
      legalCitation: 'U.S. CONST. arts. I, II, III',
    },
    {
      id: 13,
      questionNumber: 13,
      domain: 'American History',
      category: 'American History • 1800s & Civil War',
      categoryTrail: 'AMERICAN HISTORY • 1800S & CIVIL WAR',
      questionText: 'Name one problem that led to the Civil War.',
      subtext: 'Identify the primary moral, legal, and economic causes dividing North and South.',
      userAnswerKey: 'A',
      userAnswerText: 'Slavery (also: economic reasons, states’ rights)',
      officialAnswerKey: 'A',
      officialAnswerText: 'Slavery (also: economic reasons, states’ rights)',
      officialAlternateAnswers: 'Economic reasons, states’ rights',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: Civil War Era, Question 74',
      whyCorrectContext:
        'The institution of human slavery was the central catalyst of the American Civil War (1861–1865), intertwined with conflicts over states’ rights and contrasting industrial and agrarian economies.',
      legalCitation: 'USCIS 100 Civics Standard #74',
    },
    {
      id: 14,
      questionNumber: 14,
      domain: 'American History',
      category: 'American History • 1800s & Civil War',
      categoryTrail: 'AMERICAN HISTORY • 1800S & CIVIL WAR',
      questionText: 'What was one important thing that Abraham Lincoln did?',
      subtext: 'Identify the 16th President’s historic executive actions during the Civil War.',
      userAnswerKey: 'A',
      userAnswerText: 'Freed the slaves (Emancipation Proclamation)',
      officialAnswerKey: 'A',
      officialAnswerText: 'Freed the slaves (Emancipation Proclamation) / saved (or preserved) the Union',
      officialAlternateAnswers: 'Saved (or preserved) the Union, led the United States during the Civil War',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: Civil War Era, Question 75',
      whyCorrectContext:
        'President Lincoln issued the Emancipation Proclamation on January 1, 1863, declaring enslaved people in Confederate states forever free, preserved the constitutional Union, and championed the 13th Amendment.',
      legalCitation: 'Emancipation Proclamation, Proclamation No. 95 (1863)',
    },
    {
      id: 15,
      questionNumber: 15,
      domain: 'American History',
      category: 'American History • Recent American History',
      categoryTrail: 'AMERICAN HISTORY • RECENT AMERICAN HISTORY',
      questionText: 'What did Martin Luther King, Jr. do?',
      subtext: 'Identify the 1960s civil rights leader’s principal legacy.',
      userAnswerKey: 'B',
      userAnswerText: 'Fought for civil rights and worked for equality for all Americans',
      officialAnswerKey: 'B',
      officialAnswerText: 'Fought for civil rights / worked for equality for all Americans',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section C: Recent American History, Question 85',
      whyCorrectContext:
        'Dr. Martin Luther King, Jr. was the preeminent leader of the American Civil Rights Movement, championing nonviolent civil disobedience that led directly to the Civil Rights Act of 1964 and Voting Rights Act of 1965.',
      legalCitation: 'Civil Rights Act of 1964, Pub. L. 88-352',
    },
    {
      id: 16,
      questionNumber: 16,
      domain: 'Integrated Civics',
      category: 'Integrated Civics • National Holidays',
      categoryTrail: 'INTEGRATED CIVICS • NATIONAL HOLIDAYS & STATUTORY CELEBRATIONS',
      questionText: 'Name two national U.S. holidays celebrated during the winter season.',
      subtext: 'Select recognized official statutory federal public holidays enacted by Congress under 5 U.S.C. § 6103.',
      userAnswerKey: 'C',
      userAnswerText: 'Valentine’s Day and Columbus Day',
      officialAnswerKey: 'A',
      officialAnswerText: 'Martin Luther King, Jr. Day and Presidents’ Day (also: Thanksgiving, Christmas, New Year’s Day)',
      officialAlternateAnswers: 'New Year’s Day, Christmas Day, Washington’s Birthday (Presidents’ Day)',
      isCorrect: false,
      isFlagged: true,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section D: Integrated Civics, Question 100',
      whyCorrectContext:
        'Valentine’s Day is a cultural observance and has never been enacted as an official federal holiday under 5 U.S.C. § 6103. Columbus Day is celebrated on the second Monday of October in autumn. Official federal winter holidays include New Year’s Day (Jan 1), Martin Luther King, Jr. Day (third Monday in Jan), Washington’s Birthday / Presidents’ Day (third Monday in Feb), and Christmas Day (Dec 25).',
      legalCitation: '5 U.S.C. § 6103 (Federal Statutory Holidays)',
      mnemonic: 'Federal holidays must be created by an Act of Congress (Valentine’s & Halloween are not federal holidays!).',
    },
    {
      id: 17,
      questionNumber: 17,
      domain: 'Integrated Civics',
      category: 'Integrated Civics • Geography',
      categoryTrail: 'INTEGRATED CIVICS • GEOGRAPHY & BORDERS',
      questionText: 'What ocean is on the West Coast of the United States?',
      subtext: 'Identify the body of water bordering California, Oregon, Washington, and Alaska.',
      userAnswerKey: 'A',
      userAnswerText: 'Pacific Ocean',
      officialAnswerKey: 'A',
      officialAnswerText: 'Pacific (Ocean)',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section D: Integrated Civics, Question 89',
      whyCorrectContext:
        'The Pacific Ocean borders the western coast of the continental United States and Alaska, whereas the Atlantic Ocean borders the East Coast.',
      legalCitation: 'USCIS 100 Civics Standard #89',
    },
    {
      id: 18,
      questionNumber: 18,
      domain: 'Integrated Civics',
      category: 'Integrated Civics • National Symbols',
      categoryTrail: 'INTEGRATED CIVICS • NATIONAL SYMBOLS & ANTHEM',
      questionText: 'What is the name of the national anthem?',
      subtext: 'Identify the anthem penned by Francis Scott Key during the War of 1812.',
      userAnswerKey: 'B',
      userAnswerText: 'The Star-Spangled Banner',
      officialAnswerKey: 'B',
      officialAnswerText: 'The Star-Spangled Banner',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section D: Integrated Civics, Question 95',
      whyCorrectContext:
        'Written by Francis Scott Key during the bombardment of Fort McHenry in Baltimore in 1814, "The Star-Spangled Banner" was officially designated as the national anthem of the United States by an Act of Congress in 1931.',
      legalCitation: '36 U.S.C. § 301 (National Anthem)',
    },
    {
      id: 19,
      questionNumber: 19,
      domain: 'Integrated Civics',
      category: 'Integrated Civics • Geography',
      categoryTrail: 'INTEGRATED CIVICS • FEDERAL CAPITAL & DISTRICT',
      questionText: 'What is the capital of the United States?',
      subtext: 'Identify the federal district created under Article I, Section 8, Clause 17.',
      userAnswerKey: 'C',
      userAnswerText: 'Washington, D.C.',
      officialAnswerKey: 'C',
      officialAnswerText: 'Washington, D.C.',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section D: Integrated Civics, Question 94',
      whyCorrectContext:
        'Washington, District of Columbia, serves as the permanent capital of the United States. It is a federal district, not a state, situated on the Potomac River bordering Maryland and Virginia.',
      legalCitation: 'U.S. CONST. art. I, § 8, cl. 17',
    },
    {
      id: 20,
      questionNumber: 20,
      domain: 'Integrated Civics',
      category: 'Integrated Civics • National Symbols',
      categoryTrail: 'INTEGRATED CIVICS • NATIONAL LANDMARKS & MONUMENTS',
      questionText: 'Where is the Statue of Liberty?',
      subtext: 'Identify the historic gift of friendship from France dedicated in 1886.',
      userAnswerKey: 'A',
      userAnswerText: 'New York Harbor (Liberty Island)',
      officialAnswerKey: 'A',
      officialAnswerText: 'New York (Harbor) / Liberty Island (also: New Jersey, near New York City, on the Hudson River)',
      officialAlternateAnswers: 'Liberty Island, New Jersey, near New York City, on the Hudson River',
      isCorrect: true,
      isFlagged: false,
      statutoryReference: 'Statutory Reference: USCIS Civics Syllabus Section D: Integrated Civics, Question 93',
      whyCorrectContext:
        'The Statue of Liberty ("Liberty Enlightening the World") stands on Liberty Island in New York Harbor, greeting millions of immigrants and symbolizing freedom and international democracy.',
      legalCitation: 'Proclamation No. 1713 (National Monument, 1924)',
    },
  ],
};

export const UK_MOCK_RESULTS: ExamResultData = {
  countryId: 'uk',
  countryName: 'United Kingdom',
  shortCode: 'UK',
  flag: '🇬🇧',
  officialBody: 'Home Office · UK Visas and Immigration (UKVI)',
  examTitle: 'Life in the UK Official Practice Exam #4',
  certificatePill: 'OFFICIAL PASS CERTIFICATE',
  completionDate: 'OCTOBER 15, 2026',
  timeSpentFormatted: '11m 32s',
  totalQuestions: 20,
  correctCount: 17,
  incorrectCount: 3,
  flaggedCount: 2,
  accuracyPercentage: 85,
  passingScore: 15,
  passingPercentage: 75,
  hasPassed: true,
  domains: [
    {
      id: 'uk-hist',
      name: 'British History & Heritage',
      subcategories: 'Medieval Foundations, The Tudor & Stuart Eras, The Industrial Revolution',
      correct: 7,
      total: 8,
      percentage: 87.5,
    },
    {
      id: 'uk-gov',
      name: 'UK Government & Law',
      subcategories: 'The Parliamentary System, The Monarchy, Devolved Administrations',
      correct: 6,
      total: 7,
      percentage: 85.7,
    },
    {
      id: 'uk-soc',
      name: 'Modern UK Society & Culture',
      subcategories: 'Customs & Traditions, Places of Interest, Sporting Events',
      correct: 4,
      total: 5,
      percentage: 80.0,
    },
  ],
  targetFocus: {
    recommendation:
      'Review post-war social legislation and devolved powers for Scotland and Wales to lock in 100% mastery.',
    insiderNote:
      'The Home Office computerized test requires answering 18 out of 24 (75%) correctly in 45 minutes. Watch for questions differentiating the House of Commons and House of Lords.',
    oralExamClarity: 'British values standard 15/15 passed',
    oralExamStatus: 'OPTIMAL',
  },
  questions: US_MOCK_RESULTS.questions.map((q) => ({
    ...q,
    categoryTrail: q.categoryTrail.replace('AMERICAN', 'BRITISH'),
    statutoryReference: q.statutoryReference.replace('USCIS Civics Syllabus', 'Life in the UK 3rd Edition Handbook'),
  })),
};

export const CA_MOCK_RESULTS: ExamResultData = {
  countryId: 'ca',
  countryName: 'Canada',
  shortCode: 'CAN',
  flag: '🇨🇦',
  officialBody: 'IRCC · Immigration, Refugees and Citizenship Canada',
  examTitle: 'Discover Canada Citizenship Simulation #4',
  certificatePill: 'OFFICIAL PASS CERTIFICATE',
  completionDate: 'OCTOBER 15, 2026',
  timeSpentFormatted: '11m 32s',
  totalQuestions: 20,
  correctCount: 17,
  incorrectCount: 3,
  flaggedCount: 2,
  accuracyPercentage: 85,
  passingScore: 15,
  passingPercentage: 75,
  hasPassed: true,
  domains: [
    {
      id: 'ca-hist',
      name: 'Canadian History & Confederation',
      subcategories: 'Indigenous Heritage, Confederation 1867, World Wars',
      correct: 7,
      total: 8,
      percentage: 87.5,
    },
    {
      id: 'ca-gov',
      name: 'System of Government & Law',
      subcategories: 'Constitutional Monarchy, Three Branches, Charter of Rights',
      correct: 6,
      total: 7,
      percentage: 85.7,
    },
    {
      id: 'ca-geo',
      name: 'Geography & Canadian Symbols',
      subcategories: 'Five Regions, National Symbols, Economy',
      correct: 4,
      total: 5,
      percentage: 80.0,
    },
  ],
  targetFocus: {
    recommendation:
      'Focus on the 1867 British North America Act and the Canadian Charter of Rights and Freedoms.',
    insiderNote:
      'IRCC citizenship tests require 15 out of 20 (75%) within 30 minutes. Be prepared to name the Governor General, Prime Minister, and your provincial Lieutenant Governor.',
    oralExamClarity: 'Official language proficiency standard 15/15 passed',
    oralExamStatus: 'OPTIMAL',
  },
  questions: US_MOCK_RESULTS.questions.map((q) => ({
    ...q,
    categoryTrail: q.categoryTrail.replace('AMERICAN', 'CANADIAN'),
    statutoryReference: q.statutoryReference.replace('USCIS Civics Syllabus', 'Discover Canada Study Guide'),
  })),
};

export const AU_MOCK_RESULTS: ExamResultData = {
  countryId: 'au',
  countryName: 'Australia',
  shortCode: 'AUS',
  flag: '🇦🇺',
  officialBody: 'DHA · Department of Home Affairs',
  examTitle: 'Our Common Bond Citizenship Exam #4',
  certificatePill: 'OFFICIAL PASS CERTIFICATE',
  completionDate: 'OCTOBER 15, 2026',
  timeSpentFormatted: '11m 32s',
  totalQuestions: 20,
  correctCount: 17,
  incorrectCount: 3,
  flaggedCount: 2,
  accuracyPercentage: 85,
  passingScore: 15,
  passingPercentage: 75,
  hasPassed: true,
  domains: [
    {
      id: 'au-people',
      name: 'Australia and its People',
      subcategories: 'Indigenous Australians, Early Colonisation, States & Territories',
      correct: 7,
      total: 8,
      percentage: 87.5,
    },
    {
      id: 'au-gov',
      name: 'Democratic Beliefs, Rights & Law',
      subcategories: 'Australian Values (5/5 Mandatory), Parliamentary Democracy, The Constitution',
      correct: 6,
      total: 7,
      percentage: 85.7,
    },
    {
      id: 'au-sym',
      name: 'Government and National Symbols',
      subcategories: 'National Anthem, Floral Emblem, System of Preferential Voting',
      correct: 4,
      total: 5,
      percentage: 80.0,
    },
  ],
  targetFocus: {
    recommendation:
      'Ensure 100% on all Australian Values questions — failure on even one values item results in automatic test failure.',
    insiderNote:
      'DHA citizenship examinations require at least 75% overall and answering all 5 Australian values questions correctly. You passed the values component with 5/5 optimal accuracy.',
    oralExamClarity: 'Australian Values standard 5/5 passed',
    oralExamStatus: 'OPTIMAL',
  },
  questions: US_MOCK_RESULTS.questions.map((q) => ({
    ...q,
    categoryTrail: q.categoryTrail.replace('AMERICAN', 'AUSTRALIAN'),
    statutoryReference: q.statutoryReference.replace('USCIS Civics Syllabus', 'Our Common Bond Guide Section 4'),
  })),
};

export const COUNTRY_RESULTS_MAP: Record<SupportedCountry, ExamResultData> = {
  us: US_MOCK_RESULTS,
  uk: UK_MOCK_RESULTS,
  ca: CA_MOCK_RESULTS,
  au: AU_MOCK_RESULTS,
};

export function getExamResultData(country: string): ExamResultData {
  const normalized = country.toLowerCase() as SupportedCountry;
  if (SUPPORTED_COUNTRIES.includes(normalized)) {
    return COUNTRY_RESULTS_MAP[normalized] || US_MOCK_RESULTS;
  }
  return US_MOCK_RESULTS;
}
