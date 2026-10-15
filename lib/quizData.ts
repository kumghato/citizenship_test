export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface StatutoryGuidance {
  clue: string;
  legalCitation: string;
  mnemonic?: string;
  dossierNotes: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  statutoryStandard: string;
  questionText: string;
  subtext: string;
  marks: number;
  type: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  statutoryGuidance: StatutoryGuidance;
}

export interface CountryExamConfig {
  id: 'us' | 'uk' | 'ca' | 'au';
  countryName: string;
  shortCode: string;
  flag: string;
  officialBody: string;
  examTitle: string;
  bankPill: string;
  modeBadge: string;
  passingScore: number;
  totalQuestions: number;
  passingPercentage: number;
  timeLimitSeconds: number;
  hotlineName: string;
  hotlineNumber: string;
  hotlineHours: string;
  dossierTitle: string;
  dossierStandard: string;
  dossierParchmentTitle: string;
  dossierParchmentText: string;
  questions: QuizQuestion[];
}

export const SUPPORTED_COUNTRIES: readonly string[] = ['us', 'uk', 'ca', 'au'] as const;

export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

export const EXAM_DATA: Record<SupportedCountry, CountryExamConfig> = {
  us: {
    id: 'us',
    countryName: 'United States',
    shortCode: 'USA',
    flag: '🇺🇸',
    officialBody: 'USCIS · U.S. Department of Homeland Security',
    examTitle: 'USCIS Civics Practice Exam #4',
    bankPill: '100-Question Standard Bank',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 12,
    totalQuestions: 20,
    passingPercentage: 60,
    timeLimitSeconds: 1200, // 20 minutes
    hotlineName: 'USCIS Naturalization Contact Center',
    hotlineNumber: '1-800-375-5283',
    hotlineHours: 'Mon-Fri 8am-8pm EST',
    dossierTitle: 'Naturalization Source Dossier',
    dossierStandard: 'USCIS 100 Civics Standard #1',
    dossierParchmentTitle: 'Constitution of the United States',
    dossierParchmentText:
      'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity...',
    questions: [
      {
        id: 1,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #1',
        questionText: 'What is the supreme law of the land?',
        subtext:
          'Select the one definitive constitutional legal authority established under Article VI, Clause 2.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Declaration of Independence' },
          { key: 'B', text: 'The Constitution' },
          { key: 'C', text: 'The Emancipation Proclamation' },
          { key: 'D', text: 'The Federalist Papers' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Think of the foundational 1787 document that established the three branches of the federal government.',
          legalCitation: 'U.S. CONST. art. VI, cl. 2 (The Supremacy Clause)',
          mnemonic:
            'Supreme Law = Supreme "C": The Constitution is the supreme cornerstone of all American law.',
          dossierNotes:
            'Article VI, Clause 2 specifies that federal constitutional law takes precedence over any state constitution or state statutes. No state or federal statute may contradict its constitutional provisions.',
        },
      },
      {
        id: 2,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #2',
        questionText: 'What does the Constitution do?',
        subtext:
          'Identify the fundamental institutional purpose of the 1787 charter of government.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Sets up the government and protects basic rights of Americans' },
          { key: 'B', text: 'Defines state borders and tax tariffs between states' },
          { key: 'C', text: 'Outlines the diplomatic treaty obligations with foreign kingdoms' },
          { key: 'D', text: 'Creates the national banking and federal reserve system' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The Constitution establishes institutional structure (Articles I–III) and guarantees individual liberties (Bill of Rights).',
          legalCitation: 'Preamble to the United States Constitution (1787)',
          mnemonic:
            'Structure + Safeguards: It sets up governmental branches and protects citizens’ unalienable freedoms.',
          dossierNotes:
            'The Constitution fulfills two primary legal doctrines: defining the tripartite separation of powers and enumerating civil liberties through subsequent constitutional amendments.',
        },
      },
      {
        id: 3,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #3',
        questionText:
          'The idea of self-government is in the first three words of the Constitution. What are these words?',
        subtext:
          'Identify the famous opening phrase establishing the doctrine of popular sovereignty.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Congress shall make' },
          { key: 'B', text: 'In God We' },
          { key: 'C', text: 'We the People' },
          { key: 'D', text: 'Four score and' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'The phrase emphasizes that sovereign governing legitimacy flows directly from the citizenry, not a monarch.',
          legalCitation: 'U.S. CONST. pmbl.',
          mnemonic: '3 Words = "We The People" representing popular sovereignty in democracy.',
          dossierNotes:
            'Penned in large calligraphy on the parchment by Jacob Shallus, "We the People" affirmed that the authority of the federal union originates directly with the governed population.',
        },
      },
      {
        id: 4,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #4',
        questionText: 'What is an amendment?',
        subtext:
          'Determine the legal definition under Article V governing alterations to constitutional text.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'A change or an addition to the Constitution' },
          { key: 'B', text: 'A presidential executive decree with immediate effect' },
          { key: 'C', text: 'A formal judicial opinion written by the Chief Justice' },
          { key: 'D', text: 'An interstate compact negotiated between governors' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Think of Article V processes requiring two-thirds of Congress and three-fourths of states.',
          legalCitation: 'U.S. CONST. art. V',
          mnemonic: '"Amend" means to alter, modify, or add new formal provisions.',
          dossierNotes:
            'Article V outlines the rigorous constitutional amending formula. Amendments become valid parts of the Constitution once ratified by three-fourths of the several states.',
        },
      },
      {
        id: 5,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #5',
        questionText: 'What do we call the first ten amendments to the Constitution?',
        subtext:
          'Identify the collective legal charter ratified on December 15, 1791.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Magna Carta' },
          { key: 'B', text: 'The Articles of Confederation' },
          { key: 'C', text: 'The Bill of Rights' },
          { key: 'D', text: 'The Federalist Papers' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Drafted by James Madison to address Anti-Federalist concerns regarding personal liberties.',
          legalCitation: 'U.S. CONST. amends. I–X (1791)',
          mnemonic: 'First 10 = Bill of Rights: The fundamental guarantees of citizen protection.',
          dossierNotes:
            'The Bill of Rights limits governmental overreach, preserving free speech, religious liberty, due process of law, freedom from unreasonable searches, and trial by jury.',
        },
      },
      {
        id: 6,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #6',
        questionText: 'What is one right or freedom from the First Amendment?',
        subtext:
          'Choose the fundamental civil liberty explicitly protected under Amendment I.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Right to bear arms' },
          { key: 'B', text: 'Speech' },
          { key: 'C', text: 'Right to a speedy trial' },
          { key: 'D', text: 'Protection against quartering troops' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'The First Amendment safeguards five core liberties: speech, religion, assembly, press, and petition.',
          legalCitation: 'U.S. CONST. amend. I',
          mnemonic: 'RAPPS: Religion, Assembly, Press, Petition, Speech.',
          dossierNotes:
            'The First Amendment prohibits Congress from establishing a religion or impeding the free exercise thereof, and protects freedom of speech, the press, assembly, and petition.',
        },
      },
      {
        id: 7,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #7',
        questionText: 'How many amendments does the Constitution have?',
        subtext:
          'Select the total count of ratified constitutional amendments through the 27th Amendment (1992).',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '21' },
          { key: 'B', text: '25' },
          { key: 'C', text: '27' },
          { key: 'D', text: '50' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'The most recent amendment was ratified in 1992 concerning congressional compensation.',
          legalCitation: 'U.S. CONST. amend. XXVII (1992)',
          mnemonic: '27 Amendments: 10 in the Bill of Rights + 17 subsequent historic updates.',
          dossierNotes:
            'From 1791 to 1992, over 11,000 constitutional amendments have been proposed, but only 27 have achieved ratification by three-fourths of state legislatures.',
        },
      },
      {
        id: 8,
        category: 'American History • Colonial Period & Independence',
        statutoryStandard: 'USCIS 100 Civics Standard #8',
        questionText: 'What did the Declaration of Independence do?',
        subtext:
          'Identify the legal and diplomatic declaration adopted by the Continental Congress on July 4, 1776.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Announced our independence from Great Britain' },
          { key: 'B', text: 'Established the Supreme Court of the United States' },
          { key: 'C', text: 'Created the United States military branches' },
          { key: 'D', text: 'Formed the original thirteen state borders' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Penned by Thomas Jefferson in Philadelphia, severing political ties with King George III.',
          legalCitation: 'The Unanimous Declaration of the thirteen united States of America (1776)',
          mnemonic: 'Declaration = Declared independence from British monarchical control.',
          dossierNotes:
            'The Declaration dissolved all allegiance to the British Crown, declaring the thirteen American colonies to be free and independent sovereign states.',
        },
      },
      {
        id: 9,
        category: 'American History • Colonial Period & Independence',
        statutoryStandard: 'USCIS 100 Civics Standard #9',
        questionText: 'What are two rights in the Declaration of Independence?',
        subtext:
          'Identify the unalienable natural rights endowed by the Creator as stated in the preamble.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Life and pursuit of happiness' },
          { key: 'B', text: 'Trial by jury and right to bail' },
          { key: 'C', text: 'Freedom of navigation and commerce' },
          { key: 'D', text: 'Right to citizenship and passport' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Remember Jefferson’s famous phrase: "Life, Liberty and the pursuit of Happiness".',
          legalCitation: 'Declaration of Independence, para. 2 (1776)',
          mnemonic: 'L-L-P: Life, Liberty, and the Pursuit of happiness.',
          dossierNotes:
            'Drawing upon John Locke’s philosophy, the Declaration articulated that human beings possess inherent unalienable rights that no government may justly revoke.',
        },
      },
      {
        id: 10,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #10',
        questionText: 'What is freedom of religion?',
        subtext:
          'Determine the constitutional scope of religious exercise under the Establishment and Free Exercise Clauses.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'You must attend an approved religious service once a year' },
          { key: 'B', text: 'You can practice any religion, or not practice a religion' },
          { key: 'C', text: 'Only recognized traditional religions are permitted to worship' },
          { key: 'D', text: 'Religious leaders are elected to the federal legislature' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Guarantees freedom TO practice and freedom FROM state-mandated religion.',
          legalCitation: 'U.S. CONST. amend. I (Establishment & Free Exercise Clauses)',
          mnemonic: 'Any or None: Freedom of conscience permits any faith or secular choice.',
          dossierNotes:
            'The First Amendment operates as a dual shield: the federal government cannot establish an official state church, nor may it restrict individual peaceful worship.',
        },
      },
      {
        id: 11,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #11',
        questionText: 'What is the economic system in the United States?',
        subtext:
          'Identify the predominant economic market model governing commerce in America.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Capitalist economy (market economy)' },
          { key: 'B', text: 'Command-planned state economy' },
          { key: 'C', text: 'Feudal barter economy' },
          { key: 'D', text: 'National agrarian syndicate' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'An economy driven by private enterprise, supply and demand, and market investment.',
          legalCitation: 'USCIS Civics Reference Guide · Section 1, Question 11',
          mnemonic: 'Capitalist / Market: Private enterprise determines goods, pricing, and services.',
          dossierNotes:
            'In a market economy, decisions regarding investment, production, and distribution are largely driven by competitive markets and private enterprise rather than state allocation.',
        },
      },
      {
        id: 12,
        category: 'American Government • Principles of Democracy',
        statutoryStandard: 'USCIS 100 Civics Standard #12',
        questionText: 'What is the "rule of law"?',
        subtext:
          'Identify the constitutional doctrine governing equal submission to statutory authority.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Everyone must follow the law; no one is above the law' },
          { key: 'B', text: 'Judges hold absolute power over civil disagreements' },
          { key: 'C', text: 'Elected officials are immune from state criminal statutes' },
          { key: 'D', text: 'Laws can only be enacted by direct nationwide referendum' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'From the President to individual citizens, all persons are subject to legal accountability.',
          legalCitation: 'Marbury v. Madison, 5 U.S. (1 Cranch) 137 (1803)',
          mnemonic: 'No One is Above: Equal obedience and accountability under published statutes.',
          dossierNotes:
            'The rule of law ensures that all citizens, government leaders, and state apparatuses are accountable to laws that are publicly promulgated, equally enforced, and independently adjudicated.',
        },
      },
      {
        id: 13,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #13',
        questionText: 'Name one branch or part of the government.',
        subtext:
          'Select one of the three co-equal branches established under the first three Articles of the Constitution.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Legislative (Congress)' },
          { key: 'B', text: 'The Federal Reserve' },
          { key: 'C', text: 'The United Nations' },
          { key: 'D', text: 'State National Guard' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The three branches are Legislative (Congress), Executive (President), and Judicial (Courts).',
          legalCitation: 'U.S. CONST. arts. I, II, III',
          mnemonic: 'LEJ: Legislative, Executive, Judicial.',
          dossierNotes:
            'Article I vests all legislative powers in Congress, Article II vests executive power in the President, and Article III establishes the Supreme Court and federal judicial system.',
        },
      },
      {
        id: 14,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #14',
        questionText:
          'What stops one branch of government from becoming too powerful?',
        subtext:
          'Identify the structural doctrine dividing authority and providing mutual oversight.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Checks and balances (separation of powers)' },
          { key: 'B', text: 'The Federal Trade Commission' },
          { key: 'C', text: 'Annual constitutional referendums' },
          { key: 'D', text: 'Military tribunal oversight' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'James Madison wrote in Federalist No. 51: "Ambition must be made to counteract ambition."',
          legalCitation: 'The Federalist No. 51 (Madison, 1788)',
          mnemonic: 'Checks and Balances: Each branch limits and reviews the powers of the other two.',
          dossierNotes:
            'Constitutional checks include the presidential veto, congressional override, Senate confirmation of appointments, and Supreme Court judicial review.',
        },
      },
      {
        id: 15,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #15',
        questionText: 'Who is in charge of the executive branch?',
        subtext:
          'Identify the head of state and head of government under Article II.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Chief Justice of the Supreme Court' },
          { key: 'B', text: 'The Speaker of the House' },
          { key: 'C', text: 'The President' },
          { key: 'D', text: 'The Senate Majority Leader' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Elected every four years, serving as Commander-in-Chief of the military forces.',
          legalCitation: 'U.S. CONST. art. II, § 1, cl. 1',
          mnemonic: 'Executive = President: Head of the executive departments and armed forces.',
          dossierNotes:
            'The President is responsible for enforcing federal laws, conducting foreign diplomacy, directing armed forces, and appointing federal officers with Senate confirmation.',
        },
      },
      {
        id: 16,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #16',
        questionText: 'Who makes federal laws?',
        subtext:
          'Select the bicameral body holding all legislative authority of the federal union.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Congress (Senate and House of Representatives)' },
          { key: 'B', text: 'The Cabinet and Department Secretaries' },
          { key: 'C', text: 'The Governors of the fifty states' },
          { key: 'D', text: 'The Supreme Court of the United States' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Consists of the upper chamber (Senate) and lower chamber (House of Representatives).',
          legalCitation: 'U.S. CONST. art. I, § 1',
          mnemonic: 'Congress makes the laws, President signs/enforces them, Courts interpret them.',
          dossierNotes:
            'All bills for raising revenue originate in the House, and every bill must pass both the Senate and the House of Representatives before presenting to the President.',
        },
      },
      {
        id: 17,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #17',
        questionText: 'What are the two parts of the U.S. Congress?',
        subtext:
          'Identify the two chambers resulting from the 1787 Connecticut Great Compromise.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Senate and House of Representatives' },
          { key: 'B', text: 'The Department of State and Department of Defense' },
          { key: 'C', text: 'The Supreme Court and Appellate Circuits' },
          { key: 'D', text: 'The Electoral College and National Convention' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'One provides equal representation (2 per state); the other is based on state population.',
          legalCitation: 'U.S. CONST. art. I, § 1 (Bicameralism Compromise)',
          mnemonic: 'Bicameral Congress = Senate (100) + House (435).',
          dossierNotes:
            'The Great Compromise balanced the interests of small states (equal Senate representation) and large states (proportional House representation).',
        },
      },
      {
        id: 18,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #18',
        questionText: 'How many U.S. Senators are there?',
        subtext:
          'Calculate the total based on two senators representing each of the 50 states.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '50' },
          { key: 'B', text: '100' },
          { key: 'C', text: '435' },
          { key: 'D', text: '538' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: '50 states × 2 senators each.',
          legalCitation: 'U.S. CONST. art. I, § 3, cl. 1 & amend. XVII',
          mnemonic: '50 States × 2 Senators = 100 U.S. Senators total.',
          dossierNotes:
            'Originally chosen by state legislatures, U.S. Senators have been directly elected by popular vote in each state since the ratification of the 17th Amendment in 1913.',
        },
      },
      {
        id: 19,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #19',
        questionText: 'We elect a U.S. Senator for how many years?',
        subtext:
          'Determine the statutory length of a single senatorial term.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Two (2) years' },
          { key: 'B', text: 'Four (4) years' },
          { key: 'C', text: 'Six (6) years' },
          { key: 'D', text: 'Eight (8) years' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Senators serve longer terms than House representatives (2 years) and the President (4 years).',
          legalCitation: 'U.S. CONST. art. I, § 3, cl. 1',
          mnemonic: 'Senator = 6 years (staggered elections so one-third are up every two years).',
          dossierNotes:
            'The six-year term was intended to promote institutional stability and insulate senators from transient short-term electoral passions.',
        },
      },
      {
        id: 20,
        category: 'American Government • System of Government',
        statutoryStandard: 'USCIS 100 Civics Standard #20',
        questionText:
          'Under our Constitution, some powers belong to the federal government. What is one power of the federal government?',
        subtext:
          'Identify an enumerated power reserved exclusively to the national government under Article I, Section 8.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'To print money' },
          { key: 'B', text: 'To provide police protection' },
          { key: 'C', text: "To issue driver's licenses" },
          { key: 'D', text: 'To approve local zoning laws' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Article I, Section 8, Clause 5 grants exclusive federal authority over the currency.',
          legalCitation: 'U.S. CONST. art. I, § 8, cl. 5 (The Coinage Clause)',
          mnemonic: 'The 3 F’s of Federal Powers: Finance (print money), Forces (army/navy), Foreign treaties.',
          dossierNotes:
            'Under the Articles of Confederation, states issued chaotic competing currencies. The 1787 Constitutional Convention reserved the coinage and currency power strictly to the federal government.',
        },
      },
    ],
  },

  uk: {
    id: 'uk',
    countryName: 'United Kingdom',
    shortCode: 'GBR',
    flag: '🇬🇧',
    officialBody: 'Home Office · UK Visas & Immigration',
    examTitle: 'Life in the UK Practice Test #2',
    bankPill: 'Official 24-Question Bank',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 18,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 2700, // 45 minutes
    hotlineName: 'Life in the UK Test Helpdesk',
    hotlineNumber: '0300 790 6268',
    hotlineHours: 'Mon-Fri 8am-4pm GMT',
    dossierTitle: 'Home Office Statutory Study Dossier',
    dossierStandard: 'Life in the UK Handbook (3rd Edition)',
    dossierParchmentTitle: 'Magna Carta (The Great Charter, 1215)',
    dossierParchmentText:
      'No free man shall be seized, imprisoned, dispossessed, outlawed, exiled or in any way destroyed, nor will we proceed against him or send others to do so, except by the lawful judgment of his equals or by the law of the land...',
    questions: [
      {
        id: 1,
        category: 'British History • Medieval Foundations',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'Which document signed in 1215 limited the power of the British monarch?',
        subtext: 'Select the historical charter sealed at Runnymede by King John.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Bill of Rights' },
          { key: 'B', text: 'The Magna Carta' },
          { key: 'C', text: 'The Reform Act' },
          { key: 'D', text: 'The Treaty of Union' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Signed in 1215 by King John under pressure from rebellious feudal barons.',
          legalCitation: 'Magna Carta Libertatum (1215)',
          mnemonic: '1215 = Magna Carta: Established that even the King is subject to the law.',
          dossierNotes:
            'Clause 39 of the Magna Carta established the foundational precedent for habeas corpus and due process of English common law.',
        },
      },
      {
        id: 2,
        category: 'UK Government & Law • The Parliamentary System',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'How many members of Parliament (MPs) are elected to the House of Commons?',
        subtext: 'Determine the current statutory size of the elected chamber representing UK constituencies.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '500' },
          { key: 'B', text: '650' },
          { key: 'C', text: '750' },
          { key: 'D', text: '800' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'There are currently 650 constituencies across England, Scotland, Wales, and Northern Ireland.',
          legalCitation: 'Parliamentary Constituencies Act 2020',
          mnemonic: '650 MPs represent 650 parliamentary seats.',
          dossierNotes:
            'Members of the House of Commons are elected through the First Past the Post electoral system in 650 single-member constituencies.',
        },
      },
      {
        id: 3,
        category: 'British History • The Norman Conquest',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'In which year did the Battle of Hastings take place, establishing Norman rule?',
        subtext: 'Identify the pivotal invasion year led by William, Duke of Normandy.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '1066' },
          { key: 'B', text: '1215' },
          { key: 'C', text: '1485' },
          { key: 'D', text: '1603' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The most celebrated date in British history, immortalized on the Bayeux Tapestry.',
          legalCitation: 'The Norman Conquest (1066)',
          mnemonic: '1066: King Harold was defeated and William the Conqueror became King.',
          dossierNotes:
            'The Norman Conquest transformed the English language, legal customs, and aristocratic landholding, culminating in the Domesday Book of 1086.',
        },
      },
      {
        id: 4,
        category: 'UK Government & Law • Voting & Elections',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'What is the minimum voting age for citizens in UK General Elections?',
        subtext: 'Select the legal franchise age for parliamentary elections across the UK.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '16' },
          { key: 'B', text: '18' },
          { key: 'C', text: '21' },
          { key: 'D', text: '25' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'While 16-year-olds can vote in Scottish and Welsh parliament elections, UK general elections require age 18.',
          legalCitation: 'Representation of the People Act 1969',
          mnemonic: '18 for General Elections nationwide.',
          dossierNotes:
            'The voting age in UK parliamentary elections was reduced from 21 to 18 in 1969.',
        },
      },
      {
        id: 5,
        category: 'British Customs & Society • The Monarchy',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 4',
        questionText: 'What constitutional role does the British Monarch serve in modern government?',
        subtext: 'Determine the statutory description of the King’s political standing.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Constitutional Head of State who remains politically neutral' },
          { key: 'B', text: 'Chief Executive with supreme legislative veto power' },
          { key: 'C', text: 'Chief Justice of the Supreme Court of the United Kingdom' },
          { key: 'D', text: 'Leader of the governing political party in Parliament' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The monarch reigns but does not rule; government policies are directed by ministers.',
          legalCitation: 'Constitutional Reform Act 2005 & Royal Prerogative',
          mnemonic: 'Head of State + Politically Neutral.',
          dossierNotes:
            'The United Kingdom is a parliamentary democracy with a constitutional monarch. The monarch acts on the advice of elected ministers.',
        },
      },
      // Questions 6 through 20 for UK
      {
        id: 6,
        category: 'British History • The Tudors and Stuarts',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'Who was the reigning monarch during the defeat of the Spanish Armada in 1588?',
        subtext: 'Identify the Tudor monarch whose navy repelled Philip II’s fleet.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Henry VIII' },
          { key: 'B', text: 'Elizabeth I' },
          { key: 'C', text: 'James I' },
          { key: 'D', text: 'Victoria' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Daughter of Henry VIII and Anne Boleyn, celebrated for the Tilbury speech.',
          legalCitation: 'Spanish Armada Campaign (1588)',
          mnemonic: 'Elizabeth I led the Golden Age that defeated the Armada.',
          dossierNotes:
            'The defeat of the Spanish Armada secured England’s independence and Protestant succession.',
        },
      },
      {
        id: 7,
        category: 'UK Government & Law • The Justice System',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'In England and Wales, serious criminal cases are tried before a jury in which court?',
        subtext: 'Select the criminal court where 12 randomly selected jurors determine guilt.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Magistrates’ Court' },
          { key: 'B', text: 'Crown Court' },
          { key: 'C', text: 'County Court' },
          { key: 'D', text: 'High Court of Justice' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Magistrates handle minor crimes; serious indictable offences go to the Crown Court.',
          legalCitation: 'Senior Courts Act 1981',
          mnemonic: 'Crown Court = Serious Crime + 12 Jurors.',
          dossierNotes:
            'In the Crown Court, a judge advises on points of law while a 12-person jury decides the verdict of guilt.',
        },
      },
      {
        id: 8,
        category: 'British Geography • The Home Nations',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 2',
        questionText: 'What is the capital city of Northern Ireland?',
        subtext: 'Identify the administrative capital on the River Lagan.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Edinburgh' },
          { key: 'B', text: 'Cardiff' },
          { key: 'C', text: 'Belfast' },
          { key: 'D', text: 'Londonderry' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Capital of Northern Ireland, renowned for its historic Harland & Wolff shipyards.',
          legalCitation: 'Northern Ireland Act 1998',
          mnemonic: 'Belfast (NI), Cardiff (Wales), Edinburgh (Scotland), London (England).',
          dossierNotes:
            'Belfast houses the Northern Ireland Assembly at Stormont Estate.',
        },
      },
      {
        id: 9,
        category: 'British History • The 20th Century',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'Who was Prime Minister of the United Kingdom during the majority of World War II?',
        subtext: 'Identify the wartime coalition leader famous for his defiant speeches in 1940.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Neville Chamberlain' },
          { key: 'B', text: 'Winston Churchill' },
          { key: 'C', text: 'Clement Attlee' },
          { key: 'D', text: 'Harold Macmillan' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Appointed Prime Minister in May 1940, declaring "we shall never surrender".',
          legalCitation: 'War Cabinet Records 1940–1945',
          mnemonic: 'Churchill = British wartime resolve during WWII.',
          dossierNotes:
            'Churchill rallied the British public through the Blitz and led the Allied victory in Europe.',
        },
      },
      {
        id: 10,
        category: 'British Customs & Society • National Patron Saints',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 4',
        questionText: 'Who is the patron saint of Scotland, celebrated on November 30th?',
        subtext: 'Select the saint whose diagonal white saltire forms part of the Union Flag.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'St George' },
          { key: 'B', text: 'St Patrick' },
          { key: 'C', text: 'St Andrew' },
          { key: 'D', text: 'St David' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Saint Andrew’s cross (the white saltire on blue) is Scotland’s national flag.',
          legalCitation: 'St Andrew’s Day Bank Holiday (Scotland) Act 2007',
          mnemonic: 'Scotland = St Andrew (Nov 30). Wales = St David. England = St George. NI = St Patrick.',
          dossierNotes:
            'St Andrew’s Day is celebrated on 30 November as Scotland’s official national day.',
        },
      },
      {
        id: 11,
        category: 'British History • The Glorious Revolution',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'What did the Bill of Rights of 1689 establish?',
        subtext: 'Determine the landmark constitutional balance between the Crown and Parliament.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Confirmed Parliament’s supremacy and free parliamentary elections' },
          { key: 'B', text: 'Abolished the House of Lords permanently' },
          { key: 'C', text: 'Created the United Kingdom of Great Britain and Ireland' },
          { key: 'D', text: 'Granted universal suffrage to all adult residents' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Enacted after the Glorious Revolution when William and Mary took the throne.',
          legalCitation: 'Bill of Rights 1689 (1 Will & Mar sess 2 c 2)',
          mnemonic: '1689 Bill of Rights = Crown cannot levy taxes without Parliament.',
          dossierNotes:
            'The 1689 Bill of Rights curbed royal prerogative, requiring parliamentary consent for taxation and maintaining a standing army during peacetime.',
        },
      },
      {
        id: 12,
        category: 'UK Government & Law • Devolution',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'Which devolved legislature was established in Edinburgh in 1999?',
        subtext: 'Select the national legislative assembly for Scotland.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Scottish Parliament' },
          { key: 'B', text: 'The Senedd' },
          { key: 'C', text: 'The Stormont Assembly' },
          { key: 'D', text: 'The Greater London Authority' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Located at Holyrood in Edinburgh, legislating on health, education, and Scots law.',
          legalCitation: 'Scotland Act 1998',
          mnemonic: 'Holyrood = Scottish Parliament in Edinburgh.',
          dossierNotes:
            'Devolution transferred powers over domestic Scottish affairs from Westminster to Holyrood.',
        },
      },
      {
        id: 13,
        category: 'British History • The Industrial Revolution',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'Which Scottish engineer developed the commercially viable steam engine in the late 18th century?',
        subtext: 'Identify the pioneer whose improvements powered the Industrial Revolution.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Alexander Graham Bell' },
          { key: 'B', text: 'James Watt' },
          { key: 'C', text: 'Isambard Kingdom Brunel' },
          { key: 'D', text: 'George Stephenson' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'His separate condenser design made steam power efficient, giving his name to the unit of power (Watt).',
          legalCitation: 'Industrial Innovation Archives · James Watt (1769 Patent)',
          mnemonic: 'Watt steam engine powered Britain’s factories.',
          dossierNotes:
            'James Watt’s partnership with Matthew Boulton in Birmingham initiated the modern mechanization of industry.',
        },
      },
      {
        id: 14,
        category: 'British Customs & Society • The Commonwealth',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'What is the Commonwealth?',
        subtext: 'Identify the voluntary association of sovereign states mostly formerly part of the British Empire.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'A military defense pact with binding combat treaties' },
          { key: 'B', text: 'A voluntary association of 56 independent member nations' },
          { key: 'C', text: 'A single economic customs union with a shared currency' },
          { key: 'D', text: 'An administrative committee directly appointed by the British Prime Minister' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Encompasses 56 nations spanning Africa, Asia, the Americas, Europe, and the Pacific.',
          legalCitation: 'London Declaration 1949 & Commonwealth Charter',
          mnemonic: 'Commonwealth = 56 voluntary nations committed to democracy and peace.',
          dossierNotes:
            'The Commonwealth represents 2.5 billion people united by shared values of human rights and democracy.',
        },
      },
      {
        id: 15,
        category: 'UK Government & Law • The House of Lords',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'Members of the House of Lords are:',
        subtext: 'Identify the appointment and succession rules governing the second chamber.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Elected every 5 years by nationwide postal ballot' },
          { key: 'B', text: 'Largely appointed Life Peers, plus bishops and hereditary peers' },
          { key: 'C', text: 'Directly chosen by local municipal town mayors' },
          { key: 'D', text: 'Senior civil servants from the Ministry of Justice' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'The House of Lords is unelected, scrutinizing legislation passed by the Commons.',
          legalCitation: 'Life Peerages Act 1958 & House of Lords Act 1999',
          mnemonic: 'House of Lords = Appointed Life Peers, revisory chamber.',
          dossierNotes:
            'The House of Lords provides expert revision of legislation and holds the executive to account without electoral party mandates.',
        },
      },
      {
        id: 16,
        category: 'British History • World War I',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'On what day is Remembrance Day commemorated across the UK with a two-minute silence?',
        subtext: 'Identify the day commemorating the 1918 armistice ending the First World War.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '11th November' },
          { key: 'B', text: '6th June' },
          { key: 'C', text: '25th December' },
          { key: 'D', text: '1st May' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The 11th hour of the 11th day of the 11th month (Armistice Day).',
          legalCitation: 'Remembrance Day Traditions · The Cenotaph, Whitehall',
          mnemonic: '11/11 at 11:00 am: Poppy day honoring fallen service members.',
          dossierNotes:
            'A national service of remembrance is held at the Cenotaph in Whitehall, attended by the royal family, government, and veterans.',
        },
      },
      {
        id: 17,
        category: 'British History • Women’s Suffrage',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'Who was the prominent leader of the militant Suffragettes campaign for women’s votes in the early 20th century?',
        subtext: 'Identify the founder of the Women’s Social and Political Union (WSPU).',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Florence Nightingale' },
          { key: 'B', text: 'Emmeline Pankhurst' },
          { key: 'C', text: 'Mary Wollstonecraft' },
          { key: 'D', text: 'Elizabeth Fry' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Used the slogan "Deeds, not words" to fight for women’s right to vote.',
          legalCitation: 'Representation of the People Act 1918',
          mnemonic: 'Emmeline Pankhurst = Suffragette leader.',
          dossierNotes:
            'Her activism contributed to the Representation of the People Act 1918, which gave women over 30 who met property qualifications the right to vote.',
        },
      },
      {
        id: 18,
        category: 'UK Government & Law • The Prime Minister',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'Where is the official country residence of the British Prime Minister located?',
        subtext: 'Identify the 16th-century estate in Buckinghamshire provided for the PM’s use.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Chequers' },
          { key: 'B', text: 'Balmoral Castle' },
          { key: 'C', text: 'Highgrove House' },
          { key: 'D', text: 'Sandringham Estate' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: '10 Downing Street is the London residence/office; Chequers is the official country retreat.',
          legalCitation: 'Chequers Estate Act 1917',
          mnemonic: 'Downing Street for work, Chequers for country retreat.',
          dossierNotes:
            'Gifted to the nation by Sir Arthur Lee in 1917 to provide prime ministers with a tranquil countryside retreat.',
        },
      },
      {
        id: 19,
        category: 'British Customs & Society • Legal Traditions',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 5',
        questionText: 'What is the highest judicial court of appeal for civil and criminal cases in the UK?',
        subtext: 'Identify the court created under the Constitutional Reform Act 2005.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Supreme Court of the United Kingdom' },
          { key: 'B', text: 'The House of Commons Judicial Committee' },
          { key: 'C', text: 'The Privy Council of the Crown' },
          { key: 'D', text: 'The Old Bailey Central Criminal Court' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Replaced the Appellate Committee of the House of Lords in October 2009.',
          legalCitation: 'Constitutional Reform Act 2005 (c 4)',
          mnemonic: 'UK Supreme Court: 12 independent Justices situated at Middlesex Guildhall.',
          dossierNotes:
            'The Supreme Court is completely separate from Parliament, ensuring constitutional separation of judicial and legislative powers.',
        },
      },
      {
        id: 20,
        category: 'British History • The Act of Union',
        statutoryStandard: 'Life in the UK Syllabus · Chapter 3',
        questionText: 'In 1707, the Act of Union formally united which two nations into the Kingdom of Great Britain?',
        subtext: 'Select the treaty joining two historic realms under a single Parliament.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'England and Scotland' },
          { key: 'B', text: 'England and Ireland' },
          { key: 'C', text: 'England and France' },
          { key: 'D', text: 'Scotland and Wales' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Shared a monarch since 1603 (Union of the Crowns), united parliaments in 1707.',
          legalCitation: 'Union with Scotland Act 1706 & Union with England Act 1707',
          mnemonic: '1707 = England + Scotland = Great Britain.',
          dossierNotes:
            'The 1707 Acts created the Parliament of Great Britain at Westminster while safeguarding Scotland’s separate legal and church systems.',
        },
      },
    ],
  },

  ca: {
    id: 'ca',
    countryName: 'Canada',
    shortCode: 'CAN',
    flag: '🇨🇦',
    officialBody: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    examTitle: 'Discover Canada Official Practice Exam',
    bankPill: '20-Question IRCC Pool',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 15,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 1800, // 30 minutes
    hotlineName: 'IRCC Client Support Centre',
    hotlineNumber: '1-888-242-2100',
    hotlineHours: 'Mon-Fri 8am-4pm Local Time',
    dossierTitle: 'Discover Canada Rights & History Dossier',
    dossierStandard: 'IRCC Discover Canada Guide Standard #1',
    dossierParchmentTitle: 'Canadian Charter of Rights and Freedoms (1982)',
    dossierParchmentText:
      'Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law: The Canadian Charter of Rights and Freedoms guarantees the rights and freedoms set out in it subject only to such reasonable limits prescribed by law...',
    questions: [
      {
        id: 1,
        category: 'Canadian Rights & Responsibilities',
        statutoryStandard: 'Discover Canada Guide · Section 1',
        questionText: 'What are the three founding peoples of Canada?',
        subtext: 'Select the three distinct cultural and historical origins recognized in Canadian law.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Aboriginal, French, and British' },
          { key: 'B', text: 'English, American, and Irish' },
          { key: 'C', text: 'French, Spanish, and Dutch' },
          { key: 'D', text: 'First Nations, Scandinavian, and Celtic' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Canada’s heritage unites Indigenous peoples (First Nations, Métis, Inuit) with French and British settlers.',
          legalCitation: 'Constitution Act, 1982, s. 35',
          mnemonic: 'A-F-B: Aboriginal, French, British.',
          dossierNotes:
            'Aboriginal peoples were the original inhabitants; French settlement began with Samuel de Champlain (1608); British institutions were introduced after the Treaty of Paris (1763).',
        },
      },
      {
        id: 2,
        category: 'Canadian Government & Monarchy',
        statutoryStandard: 'Discover Canada Guide · Section 6',
        questionText: 'Who is the representative of the King in Canada at the federal level?',
        subtext: 'Identify the viceregal officer appointed by the Sovereign on the Prime Minister’s advice.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Governor General' },
          { key: 'B', text: 'The Prime Minister' },
          { key: 'C', text: 'The Lieutenant Governor' },
          { key: 'D', text: 'The Chief Justice' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Federal level = Governor General; Provincial level = Lieutenant Governor.',
          legalCitation: 'Constitution Act, 1867, Part III (Executive Power)',
          mnemonic: 'GG = Governor General represents the King for all of Canada.',
          dossierNotes:
            'The Governor General summons and dissolves Parliament, reads the Speech from the Throne, and signs royal assent for federal legislation.',
        },
      },
      {
        id: 3,
        category: 'Canadian History • Confederation',
        statutoryStandard: 'Discover Canada Guide · Section 3',
        questionText: 'In what year was the Dominion of Canada formed through Confederation?',
        subtext: 'Identify the year celebrated every July 1st as Canada Day.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '1776' },
          { key: 'B', text: '1812' },
          { key: 'C', text: '1867' },
          { key: 'D', text: '1931' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'The British North America Act came into effect on July 1, 1867.',
          legalCitation: 'British North America Act, 1867 (now Constitution Act, 1867)',
          mnemonic: '1867: Sir John A. Macdonald became the first Prime Minister.',
          dossierNotes:
            'The original four confederating provinces were Ontario, Quebec, Nova Scotia, and New Brunswick.',
        },
      },
      {
        id: 4,
        category: 'Canadian Justice System',
        statutoryStandard: 'Discover Canada Guide · Section 8',
        questionText: 'What is the highest court in Canada?',
        subtext: 'Identify the final appellate court of nine judges in Ottawa.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Federal Court of Appeal' },
          { key: 'B', text: 'The Supreme Court of Canada' },
          { key: 'C', text: 'The Queen’s Privy Council Court' },
          { key: 'D', text: 'The Senate Tribunal' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Consists of a Chief Justice and eight puisne judges, three of whom must be from Quebec.',
          legalCitation: 'Supreme Court Act, R.S.C. 1985, c. S-26',
          mnemonic: 'Supreme Court = 9 judges in Ottawa serving as the highest legal authority.',
          dossierNotes:
            'The Supreme Court is the court of last resort for all legal questions concerning criminal, constitutional, and civil law.',
        },
      },
      {
        id: 5,
        category: 'Canadian Government • Parliament',
        statutoryStandard: 'Discover Canada Guide · Section 6',
        questionText: 'What are the three parts of the Parliament of Canada?',
        subtext: 'Select the three constitutional entities that comprise the federal legislature.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Sovereign (King), the Senate, and the House of Commons' },
          { key: 'B', text: 'The Prime Minister, the Cabinet, and the Civil Service' },
          { key: 'C', text: 'The Supreme Court, the Premiers, and the Mayors' },
          { key: 'D', text: 'The Governor General, the RCMP, and the Armed Forces' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The Monarch plus two legislative houses (appointed Senate and elected Commons).',
          legalCitation: 'Constitution Act, 1867, s. 17',
          mnemonic: 'Parliament = Crown + Senate + House of Commons.',
          dossierNotes:
            'Section 17 declares: "There shall be One Parliament for Canada, consisting of the Queen, an Upper House styled the Senate, and the House of Commons."',
        },
      },
      // Questions 6-20 for CA
      {
        id: 6,
        category: 'Canadian Symbols & Values',
        statutoryStandard: 'Discover Canada Guide · Section 9',
        questionText: 'What is the national winter sport of Canada?',
        subtext: 'Identify the winter sport designated by federal statute.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Curling' },
          { key: 'B', text: 'Ice hockey' },
          { key: 'C', text: 'Figure skating' },
          { key: 'D', text: 'Snowboarding' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Ice hockey is the national winter sport; lacrosse is the national summer sport.',
          legalCitation: 'National Sports of Canada Act, S.C. 1994, c. 16',
          mnemonic: 'Winter = Hockey. Summer = Lacrosse.',
          dossierNotes:
            'The National Sports of Canada Act (1994) officially recognized hockey as the national winter sport and lacrosse as the summer sport.',
        },
      },
      {
        id: 7,
        category: 'Canadian Rights & Responsibilities',
        statutoryStandard: 'Discover Canada Guide · Section 1',
        questionText: 'Which constitutional document entrenched fundamental rights in 1982?',
        subtext: 'Select the charter patriated alongside the Constitution Act, 1982.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Canadian Charter of Rights and Freedoms' },
          { key: 'B', text: 'The Quebec Act' },
          { key: 'C', text: 'The Manitoba Act' },
          { key: 'D', text: 'The Royal Proclamation of 1763' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Enacted by Pierre Trudeau and Queen Elizabeth II in Ottawa in 1982.',
          legalCitation: 'Constitution Act, 1982, Part I',
          mnemonic: '1982 Charter guarantees freedom of conscience, mobility, and equality.',
          dossierNotes:
            'The Charter guarantees fundamental freedoms, democratic rights, mobility rights, legal rights, and equality rights across Canada.',
        },
      },
      {
        id: 8,
        category: 'Canadian History • World War I',
        statutoryStandard: 'Discover Canada Guide · Section 4',
        questionText: 'Which April 1917 battle is revered as the birthplace of Canadian national identity?',
        subtext: 'Identify the French ridge captured by all four divisions of the Canadian Corps.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Battle of the Somme' },
          { key: 'B', text: 'Battle of Vimy Ridge' },
          { key: 'C', text: 'Battle of Passchendaele' },
          { key: 'D', text: 'Battle of Ypres' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Captured on Easter Monday, April 9, 1917, where Canadians fought united as one corps.',
          legalCitation: 'Canadian Military History Archives · Vimy Memorial',
          mnemonic: 'Vimy Ridge = Canadian troops won an epic tactical victory together.',
          dossierNotes:
            'Brigadier-General A.E. Ross famously stated after the battle: "In those few minutes I witnessed the birth of a nation."',
        },
      },
      {
        id: 9,
        category: 'Canadian Geography & Regions',
        statutoryStandard: 'Discover Canada Guide · Section 10',
        questionText: 'What are the three Prairie provinces of Canada?',
        subtext: 'Identify the western provinces renowned for agriculture and energy resources.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Manitoba, Saskatchewan, and Alberta' },
          { key: 'B', text: 'Alberta, British Columbia, and Yukon' },
          { key: 'C', text: 'Ontario, Quebec, and New Brunswick' },
          { key: 'D', text: 'Nova Scotia, PEI, and Newfoundland' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Bounded by the Canadian Shield to the east and the Rocky Mountains to the west.',
          legalCitation: 'Natural Resources Canada Regional Directory',
          mnemonic: 'SAM: Saskatchewan, Alberta, Manitoba = The Prairies.',
          dossierNotes:
            'The Prairie provinces contain some of the most fertile farmland in the world and vast oil and potash deposits.',
        },
      },
      {
        id: 10,
        category: 'Canadian Government • Elections',
        statutoryStandard: 'Discover Canada Guide · Section 7',
        questionText: 'In Canada, voting in federal elections is conducted by:',
        subtext: 'Determine the statutory balloting method used by Elections Canada.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Secret ballot' },
          { key: 'B', text: 'Public voice roll call' },
          { key: 'C', text: 'Show of hands at town hall' },
          { key: 'D', text: 'Electoral college delegates' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'No one has the right to see or know how you cast your vote.',
          legalCitation: 'Canada Elections Act, S.C. 2000, c. 9',
          mnemonic: 'Secret Ballot guarantees privacy and protection against intimidation.',
          dossierNotes:
            'Elections Canada ensures that voting is secret, free, and accessible to every eligible citizen.',
        },
      },
      {
        id: 11,
        category: 'Canadian Symbols & Values',
        statutoryStandard: 'Discover Canada Guide · Section 9',
        questionText: 'What official symbol appears at the centre of the National Flag of Canada?',
        subtext: 'Select the 11-pointed symbol adopted in 1965.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Beaver' },
          { key: 'B', text: 'The Maple Leaf' },
          { key: 'C', text: 'The Fleur-de-lis' },
          { key: 'D', text: 'The Crown' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'The red and white flag with a stylized red maple leaf was raised on February 15, 1965.',
          legalCitation: 'National Flag of Canada Act, R.S.C. 1985, c. N-9',
          mnemonic: 'Red Maple Leaf = Universal symbol of Canada.',
          dossierNotes:
            'King George V proclaimed red and white as Canada’s official colors in 1921.',
        },
      },
      {
        id: 12,
        category: 'Canadian History • Official Bilingualism',
        statutoryStandard: 'Discover Canada Guide · Section 2',
        questionText: 'What are the two official languages of Canada established under federal statute?',
        subtext: 'Identify the languages holding equal status in Parliament and federal institutions.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'English and French' },
          { key: 'B', text: 'English and Inuktitut' },
          { key: 'C', text: 'French and Gaelic' },
          { key: 'D', text: 'English and Spanish' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'The Official Languages Act of 1969 guarantees equal status for English and French.',
          legalCitation: 'Official Languages Act, R.S.C. 1985, c. 31 (4th Supp.)',
          mnemonic: 'English & French: Federal bilingualism nationwide.',
          dossierNotes:
            'Canadians have the right to receive federal government services and communications in both English and French.',
        },
      },
      {
        id: 13,
        category: 'Canadian Government • The Senate',
        statutoryStandard: 'Discover Canada Guide · Section 6',
        questionText: 'How are Senators appointed to the Parliament of Canada?',
        subtext: 'Identify the appointment formula governing the upper chamber.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Elected by direct provincial elections' },
          { key: 'B', text: 'Appointed by the Governor General on the advice of the Prime Minister' },
          { key: 'C', text: 'Chosen by provincial premiers every 4 years' },
          { key: 'D', text: 'Selected by the Supreme Court of Canada' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Senators serve until the mandatory retirement age of 75.',
          legalCitation: 'Constitution Act, 1867, ss. 24–36',
          mnemonic: 'Appointed by Governor General on PM advice.',
          dossierNotes:
            'The Senate examines bills passed by the House of Commons, providing "sober second thought".',
        },
      },
      {
        id: 14,
        category: 'Canadian History • Sir John A. Macdonald',
        statutoryStandard: 'Discover Canada Guide · Section 3',
        questionText: 'Who was the first Prime Minister of the Dominion of Canada?',
        subtext: 'Identify the Father of Confederation who led the construction of the transcontinental railway.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Sir Wilfrid Laurier' },
          { key: 'B', text: 'Sir John A. Macdonald' },
          { key: 'C', text: 'William Lyon Mackenzie King' },
          { key: 'D', text: 'Alexander Mackenzie' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'A Scottish-born lawyer who forged the Confederation pact in 1867.',
          legalCitation: 'Historic Sites and Monuments Board of Canada',
          mnemonic: 'Macdonald = First Prime Minister (1867).',
          dossierNotes:
            'Macdonald spearheaded the Canadian Pacific Railway, connecting British Columbia with Eastern Canada.',
        },
      },
      {
        id: 15,
        category: 'Canadian Geography • Provinces & Territories',
        statutoryStandard: 'Discover Canada Guide · Section 10',
        questionText: 'How many provinces and territories make up Canada?',
        subtext: 'Select the total jurisdiction count.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '10 Provinces and 3 Territories' },
          { key: 'B', text: '12 Provinces and 2 Territories' },
          { key: 'C', text: '13 Provinces and 1 Territory' },
          { key: 'D', text: '8 Provinces and 4 Territories' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: '10 provinces have constitutional powers under 1867; 3 northern territories have delegated powers.',
          legalCitation: 'Constitution Act, 1867 and Territorial Acts',
          mnemonic: '10 + 3 = 13 total Canadian jurisdictions.',
          dossierNotes:
            'The three northern territories are Yukon, Northwest Territories, and Nunavut (created in 1999).',
        },
      },
      {
        id: 16,
        category: 'Canadian Rights & Responsibilities',
        statutoryStandard: 'Discover Canada Guide · Section 1',
        questionText: 'What is a citizen’s responsibility when summoned for jury duty in Canada?',
        subtext: 'Identify the statutory civic duty essential to the justice system.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Serving on a jury is a legal civic duty when called' },
          { key: 'B', text: 'Jury duty is strictly voluntary and paid like employment' },
          { key: 'C', text: 'Only lawyers and legal educators are eligible for jury service' },
          { key: 'D', text: 'Citizens may delegate their jury summons to relatives' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Citizens have both rights and legal responsibilities, including jury duty and voting.',
          legalCitation: 'Provincial Juries Acts & Criminal Code of Canada',
          mnemonic: 'Jury duty is a mandatory civic responsibility when summoned.',
          dossierNotes:
            'Jury service guarantees that individuals accused of serious crimes are tried fairly by peers from their community.',
        },
      },
      {
        id: 17,
        category: 'Canadian History • World War II',
        statutoryStandard: 'Discover Canada Guide · Section 4',
        questionText: 'Which Normandy beach did Canadian forces capture on D-Day, June 6, 1944?',
        subtext: 'Identify the heroic beachhead assigned to the 3rd Canadian Infantry Division.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Omaha Beach' },
          { key: 'B', text: 'Juno Beach' },
          { key: 'C', text: 'Utah Beach' },
          { key: 'D', text: 'Sword Beach' },
        ],
        correctAnswer: 'B',
        statutoryGuidance: {
          clue: 'Canadian troops advanced deeper inland on June 6 than any other Allied unit.',
          legalCitation: 'Department of National Defence Historical Section',
          mnemonic: 'Juno Beach was Canada’s D-Day victory.',
          dossierNotes:
            'Over 14,000 Canadian soldiers landed on Juno Beach, breaking through Hitler’s Atlantic Wall fortifications.',
        },
      },
      {
        id: 18,
        category: 'Canadian Economy & Trade',
        statutoryStandard: 'Discover Canada Guide · Section 5',
        questionText: 'Who is Canada’s largest international trading partner?',
        subtext: 'Identify the neighbouring country sharing the world’s longest undefended border.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'United States' },
          { key: 'B', text: 'United Kingdom' },
          { key: 'C', text: 'China' },
          { key: 'D', text: 'Japan' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Over three-quarters of Canadian exports flow across the US border under CUSMA.',
          legalCitation: 'Statistics Canada International Trade Accounts',
          mnemonic: 'United States: largest customer and economic partner.',
          dossierNotes:
            'Billions of dollars of goods cross the 8,891-kilometre Canada-US border daily.',
        },
      },
      {
        id: 19,
        category: 'Canadian Symbols • The Beaver',
        statutoryStandard: 'Discover Canada Guide · Section 9',
        questionText: 'Why was the beaver adopted as an official animal symbol of Canada?',
        subtext: 'Identify the historic industry that drove early European exploration of Canada.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'It drove the lucrative fur trade and early exploration' },
          { key: 'B', text: 'It was domesticated by early settlers for transportation' },
          { key: 'C', text: 'It was sacred to the French monarchy' },
          { key: 'D', text: 'It appears on the royal crest of England' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Beaver pelts for felt hats fueled the Hudson’s Bay Company fur trade for centuries.',
          legalCitation: 'National Symbol of Canada Act, R.S.C. 1985, c. N-17',
          mnemonic: 'Beaver = Fur trade that built Canada’s trade routes.',
          dossierNotes:
            'The beaver was recognized as a symbol of Canadian sovereignty by Royal Charter in 1670 and formally codified by Parliament in 1975.',
        },
      },
      {
        id: 20,
        category: 'Canadian Government • Oath of Citizenship',
        statutoryStandard: 'Discover Canada Guide · Section 1',
        questionText: 'To whom do new citizens swear allegiance during the Canadian Citizenship Oath?',
        subtext: 'Select the Sovereign and constitutional institution named in the statutory oath.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'King Charles III, King of Canada, his Heirs and Successors' },
          { key: 'B', text: 'The Prime Minister of Canada' },
          { key: 'C', text: 'The Supreme Court of Canada' },
          { key: 'D', text: 'The Parliament in Ottawa' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'You swear loyalty to the person who represents the constitutional state: the Monarch.',
          legalCitation: 'Citizenship Act, R.S.C. 1985, c. C-29, s. 24',
          mnemonic: 'Allegiance is sworn to the Sovereign (King Charles III), representing Canada.',
          dossierNotes:
            'By swearing allegiance to the Sovereign, new citizens pledge loyalty to Canada, its laws, and democratic traditions.',
        },
      },
    ],
  },

  au: {
    id: 'au',
    countryName: 'Australia',
    shortCode: 'AUS',
    flag: '🇦🇺',
    officialBody: 'Department of Home Affairs (DHA)',
    examTitle: 'Our Common Bond Australian Practice Exam',
    bankPill: '20-Question Bank (Values Included)',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 15,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 2700, // 45 minutes
    hotlineName: 'DHA Citizenship Service Center',
    hotlineNumber: '131 881',
    hotlineHours: 'Mon-Fri 9am-5pm AEST',
    dossierTitle: 'Our Common Bond Resource Dossier',
    dossierStandard: 'DHA Our Common Bond Standard #1',
    dossierParchmentTitle: 'Commonwealth of Australia Constitution Act (1900)',
    dossierParchmentText:
      'Whereas the people of New South Wales, Victoria, South Australia, Queensland, and Tasmania, humbly relying on the blessing of Almighty God, have agreed to unite in one indissoluble Federal Commonwealth under the Crown of the United Kingdom...',
    questions: [
      {
        id: 1,
        category: 'Australia’s Democratic Beliefs & Rights',
        statutoryStandard: 'Our Common Bond · Section 1',
        questionText: 'What is the capital city of Australia?',
        subtext: 'Identify the planned federal capital territory established in 1913.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Sydney' },
          { key: 'B', text: 'Melbourne' },
          { key: 'C', text: 'Canberra' },
          { key: 'D', text: 'Brisbane' },
        ],
        correctAnswer: 'C',
        statutoryGuidance: {
          clue: 'Chosen as a compromise between rival cities Sydney and Melbourne.',
          legalCitation: 'Seat of Government Act 1908',
          mnemonic: 'Canberra = Capital of Australia (ACT).',
          dossierNotes:
            'Canberra houses Parliament House, the High Court of Australia, and the National Gallery in the Australian Capital Territory.',
        },
      },
      {
        id: 2,
        category: 'Australian Values (Mandatory)',
        statutoryStandard: 'Our Common Bond · Section 4 (Mandatory Values)',
        questionText:
          'In Australia, what does the value of "equality of men and women" mean under the law?',
        subtext:
          'Select the mandatory Australian value regarding gender equality and legal rights.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Men and women have identical rights, freedoms, and protections' },
          { key: 'B', text: 'Men hold primary authority in domestic and family disputes' },
          { key: 'C', text: 'Women must obtain family permission before seeking employment' },
          { key: 'D', text: 'Legal protections vary depending on cultural or ethnic background' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Australian law guarantees complete equality regardless of gender.',
          legalCitation: 'Sex Discrimination Act 1984 (Cth)',
          mnemonic: 'Equal Rights: Men and women have equal opportunities and dignity.',
          dossierNotes:
            'Australian Values questions are zero-tolerance: applicants must answer all five values questions correctly to pass the DHA examination.',
        },
      },
      {
        id: 3,
        category: 'Australia and Its People',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'Who are the original Indigenous peoples of Australia?',
        subtext: 'Identify the two distinct Aboriginal cultures possessing ancient heritage.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Aboriginal and Torres Strait Islander peoples' },
          { key: 'B', text: 'Maori and Polynesian peoples' },
          { key: 'C', text: 'Melanesian and Micronesian settlers' },
          { key: 'D', text: 'Inuit and First Nations peoples' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Possessing the oldest continuous living cultures in the world, spanning over 65,000 years.',
          legalCitation: 'National Indigenous Australians Agency Protocols',
          mnemonic: 'ATSI: Aboriginal & Torres Strait Islander peoples.',
          dossierNotes:
            'Aboriginal peoples mainland Australia and Torres Strait Islanders from northern islands possess rich traditions, Dreamtime stories, and connection to land.',
        },
      },
      {
        id: 4,
        category: 'Australian Values (Mandatory)',
        statutoryStandard: 'Our Common Bond · Section 4 (Mandatory Values)',
        questionText:
          'Should people in Australia be allowed to express their opinions peacefully without fear?',
        subtext:
          'Determine the scope of freedom of speech and expression in Australian society.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Yes, freedom of speech is a fundamental value within the law' },
          { key: 'B', text: 'No, only opinions endorsed by the government are permitted' },
          { key: 'C', text: 'Only media journalists have the right to speak publicly' },
          { key: 'D', text: 'Speech must be approved in advance by local police' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Australians value peaceful open debate, free expression, and mutual respect.',
          legalCitation: 'Australian Common Law · Implied Freedom of Political Communication',
          mnemonic: 'Freedom of Speech allows peaceful sharing of differing views.',
          dossierNotes:
            'While expression is free, it must operate within the law—incitement to violence or racial vilification is prohibited.',
        },
      },
      {
        id: 5,
        category: 'Government and the Law in Australia',
        statutoryStandard: 'Our Common Bond · Section 3',
        questionText: 'Who is the King’s representative in Australia at the federal level?',
        subtext: 'Identify the viceregal head of state under the Australian Constitution.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Governor-General' },
          { key: 'B', text: 'The Prime Minister' },
          { key: 'C', text: 'The High Court Chief Justice' },
          { key: 'D', text: 'The Premier of New South Wales' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Appointed by the Sovereign on the recommendation of the Australian Prime Minister.',
          legalCitation: 'Australian Constitution, ss. 2 & 61',
          mnemonic: 'Governor-General acts on behalf of the King in Australia.',
          dossierNotes:
            'Under the Australian Constitution, executive power is vested in the King and exercisable by the Governor-General.',
        },
      },
      // Questions 6-20 for AU
      {
        id: 6,
        category: 'Australian Values (Mandatory)',
        statutoryStandard: 'Our Common Bond · Section 4 (Mandatory Values)',
        questionText: 'What does "a fair go" mean in Australian society?',
        subtext: 'Identify the iconic Australian cultural ethos regarding equality and opportunity.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Everyone deserves equal opportunity and fair treatment' },
          { key: 'B', text: 'Wealthy individuals receive priority judicial hearings' },
          { key: 'C', text: 'All citizens must earn the identical annual salary' },
          { key: 'D', text: 'Only native-born citizens may access public healthcare' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'A defining national concept: giving everyone a fair chance regardless of background.',
          legalCitation: 'Our Common Bond · Core Cultural Value: "A Fair Go"',
          mnemonic: 'A Fair Go = Equality of opportunity, dignity, and compassion.',
          dossierNotes:
            'The "fair go" reflects Australia’s egalitarian spirit, valuing hard work and mutual respect over inherited class privilege.',
        },
      },
      {
        id: 7,
        category: 'Australian Values (Mandatory)',
        statutoryStandard: 'Our Common Bond · Section 4 (Mandatory Values)',
        questionText: 'In Australia, are people free to follow any religion or no religion at all?',
        subtext: 'Select the principle governing freedom of religion in the Commonwealth.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Yes, freedom of religion is protected and people may choose any or no faith' },
          { key: 'B', text: 'No, everyone must register with an official church' },
          { key: 'C', text: 'Only religions established before 1901 are lawful' },
          { key: 'D', text: 'Religious leaders can overrule civil criminal statutes' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Section 116 of the Constitution bars the federal government from establishing any religion.',
          legalCitation: 'Australian Constitution, s. 116',
          mnemonic: 'Section 116 = Freedom of religion and secular democracy.',
          dossierNotes:
            'Australians are free to practice any peaceful religion or choose no faith, but religious laws never override Australian law.',
        },
      },
      {
        id: 8,
        category: 'Australian Values (Mandatory)',
        statutoryStandard: 'Our Common Bond · Section 4 (Mandatory Values)',
        questionText: 'Is it acceptable to use violence towards a family member or partner in Australia?',
        subtext: 'Identify the mandatory zero-tolerance legal standard concerning domestic violence.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'No, domestic and family violence is strictly illegal in Australia' },
          { key: 'B', text: 'Yes, if permitted by religious or traditional customs' },
          { key: 'C', text: 'Yes, in private domestic disputes between married spouses' },
          { key: 'D', text: 'Only minor physical punishment is allowed without police charges' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Domestic and family violence is never acceptable and is punishable under criminal law.',
          legalCitation: 'Family Law Act 1975 & State Criminal Codes',
          mnemonic: 'Zero tolerance: Violence of any kind is a serious crime.',
          dossierNotes:
            'Australian law strictly forbids all physical, emotional, and financial abuse against any partner or child, with no cultural exemptions.',
        },
      },
      {
        id: 9,
        category: 'Government and the Law in Australia',
        statutoryStandard: 'Our Common Bond · Section 3',
        questionText: 'Voting in federal and state elections in Australia is:',
        subtext: 'Determine the statutory legal requirement for Australian citizens aged 18 and over.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Compulsory for all eligible citizens' },
          { key: 'B', text: 'Voluntary for everyone' },
          { key: 'C', text: 'Only compulsory for registered party members' },
          { key: 'D', text: 'Mandatory only for landowners and businesses' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Australia was one of the first democracies to introduce compulsory voting (1924).',
          legalCitation: 'Commonwealth Electoral Act 1918, s. 245',
          mnemonic: 'Voting is Compulsory: every eligible citizen must cast a ballot.',
          dossierNotes:
            'Compulsory voting ensures that governments are elected by a true majority of all eligible adult citizens.',
        },
      },
      {
        id: 10,
        category: 'Australian Symbols & National Days',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'On what date is Australia Day celebrated each year?',
        subtext: 'Identify the national holiday marking the arrival of the First Fleet in 1788.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '26 January' },
          { key: 'B', text: '25 April' },
          { key: 'C', text: '1 January' },
          { key: 'D', text: '11 November' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Marks the raising of the British flag at Sydney Cove by Captain Arthur Phillip in 1788.',
          legalCitation: 'Australia Day Public Holiday Acts',
          mnemonic: '26 January = Australia Day; 25 April = Anzac Day.',
          dossierNotes:
            'Australia Day is celebrated with citizenship ceremonies, community awards, and reflection on national history.',
        },
      },
      {
        id: 11,
        category: 'Australian History • Anzac Tradition',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'What does Anzac Day commemorate on 25 April each year?',
        subtext: 'Identify the sacred military remembrance day marking the 1915 landing at Gallipoli.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The landing of Australian and New Zealand forces at Gallipoli in 1915' },
          { key: 'B', text: 'The signing of the Treaty of Versailles' },
          { key: 'C', text: 'The declaration of Federation in Sydney' },
          { key: 'D', text: 'The end of the second World War in the Pacific' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'ANZAC: Australian and New Zealand Army Corps.',
          legalCitation: 'Anzac Day Commemoration Acts',
          mnemonic: '25 April: Dawn Services honoring all military personnel who served and died.',
          dossierNotes:
            'The Anzac spirit represents courage, endurance, initiative, and mateship forged on the shores of Turkey in 1915.',
        },
      },
      {
        id: 12,
        category: 'Government and the Law in Australia',
        statutoryStandard: 'Our Common Bond · Section 3',
        questionText: 'What are the two houses of the Federal Parliament of Australia?',
        subtext: 'Select the upper and lower federal legislative chambers.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Senate and the House of Representatives' },
          { key: 'B', text: 'The Legislative Council and Legislative Assembly' },
          { key: 'C', text: 'The Privy Council and High Chamber' },
          { key: 'D', text: 'The National Assembly and Congress' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Green chamber is the House of Representatives; red chamber is the Senate.',
          legalCitation: 'Australian Constitution, s. 1',
          mnemonic: 'Federal Parliament = Senate (76 senators) + House of Reps (151 MPs).',
          dossierNotes:
            'The House of Representatives forms the government; the Senate provides equal representation for the six founding states.',
        },
      },
      {
        id: 13,
        category: 'Australian Symbols & Heritage',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'What is the national anthem of Australia?',
        subtext: 'Identify the anthem adopted in 1984.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Advance Australia Fair' },
          { key: 'B', text: 'Waltzing Matilda' },
          { key: 'C', text: 'God Save the King' },
          { key: 'D', text: 'I Still Call Australia Home' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Opening words: "Australians all let us rejoice, for we are one and free".',
          legalCitation: 'Proclamation of National Anthem (1984, amended 2021)',
          mnemonic: 'Advance Australia Fair: "one and free".',
          dossierNotes:
            'The anthem was amended in 2021 from "for we are young and free" to "for we are one and free" to recognize Indigenous history.',
        },
      },
      {
        id: 14,
        category: 'Australian History • Federation',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'In what year did the six British colonies unite to form the Commonwealth of Australia?',
        subtext: 'Identify the Federation year celebrated on 1 January.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '1901' },
          { key: 'B', text: '1788' },
          { key: 'C', text: '1851' },
          { key: 'D', text: '1945' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Federation occurred on January 1, 1901, with Edmund Barton as the first Prime Minister.',
          legalCitation: 'Commonwealth of Australia Constitution Act 1900',
          mnemonic: '1901: Federation united the 6 colonies into one nation.',
          dossierNotes:
            'Federation established a national federal government while retaining state parliaments for local matters.',
        },
      },
      {
        id: 15,
        category: 'Government and the Law in Australia',
        statutoryStandard: 'Our Common Bond · Section 3',
        questionText: 'What is the highest court in the Australian judicial system?',
        subtext: 'Select the constitutional court located in Canberra.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The High Court of Australia' },
          { key: 'B', text: 'The Federal Court of Australia' },
          { key: 'C', text: 'The Supreme Court of New South Wales' },
          { key: 'D', text: 'The Privy Council' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Consists of the Chief Justice and six other Justices interpreting the Constitution.',
          legalCitation: 'Australian Constitution, s. 71 & Judiciary Act 1903',
          mnemonic: 'High Court of Australia = Final court of appeal.',
          dossierNotes:
            'The High Court decides constitutional challenges and hears appeals from federal and state appellate courts.',
        },
      },
      {
        id: 16,
        category: 'Australian Geography & States',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'How many states and major mainland territories are there in Australia?',
        subtext: 'Determine the count of federated states and mainland territories.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: '6 States and 2 Mainland Territories' },
          { key: 'B', text: '7 States and 3 Territories' },
          { key: 'C', text: '5 States and 1 Territory' },
          { key: 'D', text: '8 States and 2 Territories' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'States: NSW, VIC, QLD, WA, SA, TAS. Mainland Territories: ACT and NT.',
          legalCitation: 'Australian Constitution & Territory Self-Government Acts',
          mnemonic: '6 States + 2 Mainland Territories (ACT & NT).',
          dossierNotes:
            'The six founding states have individual state constitutions and parliaments.',
        },
      },
      {
        id: 17,
        category: 'Australian Symbols • National Colours',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'What are the official national colours of Australia?',
        subtext: 'Identify the iconic sports and ceremonial colours.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'Green and Gold' },
          { key: 'B', text: 'Red and White' },
          { key: 'C', text: 'Blue and Silver' },
          { key: 'D', text: 'Black and Ochre' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Inspired by the golden wattle flower against green foliage, proclaimed in 1984.',
          legalCitation: 'Governor-General Proclamation of National Colours (1984)',
          mnemonic: 'Green & Gold = Australia’s official national colours.',
          dossierNotes:
            'Green and gold represent the golden wattle (Acacia pycnantha), Australia’s national floral emblem.',
        },
      },
      {
        id: 18,
        category: 'Government and the Law in Australia',
        statutoryStandard: 'Our Common Bond · Section 3',
        questionText: 'Who forms the Government in the Australian federal parliament?',
        subtext: 'Identify how the executive government is determined following a general election.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The party or coalition with a majority in the House of Representatives' },
          { key: 'B', text: 'The party that wins the highest number of Senate seats' },
          { key: 'C', text: 'Appointed directly by the Governor-General without party affiliation' },
          { key: 'D', text: 'Chosen by a nationwide vote of all municipal city mayors' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: '76 of the 151 House of Representatives seats are needed to form majority government.',
          legalCitation: 'Westminster System Conventions & Australian Constitution',
          mnemonic: 'Majority in the House of Representatives = Forms Government.',
          dossierNotes:
            'The leader of the majority party becomes Prime Minister, and ministers are chosen from members of Parliament.',
        },
      },
      {
        id: 19,
        category: 'Australian Symbols • Coat of Arms',
        statutoryStandard: 'Our Common Bond · Section 2',
        questionText: 'Which two native Australian animals support the Commonwealth Coat of Arms?',
        subtext: 'Identify the kangaroo and flightless bird chosen because they rarely move backwards.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The Kangaroo and the Emu' },
          { key: 'B', text: 'The Koala and the Platypus' },
          { key: 'C', text: 'The Dingo and the Wombat' },
          { key: 'D', text: 'The Kookaburra and the Tasmanian Devil' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'Both animals symbolize a nation moving forward, incapable of walking backwards easily.',
          legalCitation: 'Royal Warrant granting Commonwealth Arms (1912)',
          mnemonic: 'Kangaroo + Emu: Looking forward.',
          dossierNotes:
            'The Australian Coat of Arms shows a shield with the badges of the six states supported by a red kangaroo and an emu.',
        },
      },
      {
        id: 20,
        category: 'Australia’s Democratic Beliefs & Rights',
        statutoryStandard: 'Our Common Bond · Section 1',
        questionText: 'What is a key privilege and responsibility granted to new Australian citizens?',
        subtext: 'Identify the democratic and civic right acquired upon taking the pledge.',
        marks: 1,
        type: 'Single Choice',
        options: [
          { key: 'A', text: 'The right to vote and hold an Australian passport' },
          { key: 'B', text: 'Exemption from municipal council taxes' },
          { key: 'C', text: 'Automatic free travel on commercial international airlines' },
          { key: 'D', text: 'Immunity from civil contract litigation' },
        ],
        correctAnswer: 'A',
        statutoryGuidance: {
          clue: 'New citizens gain voting rights, an Australian passport, and the right to stand for public office.',
          legalCitation: 'Australian Citizenship Act 2007 (Cth)',
          mnemonic: 'Citizenship = Voting + Passport + Civic Participation.',
          dossierNotes:
            'By making the Australian Citizenship Pledge, citizens affirm loyalty to Australia, its democratic beliefs, and laws.',
        },
      },
    ],
  },
};

export function getExamConfig(country: string): CountryExamConfig | null {
  const normalized = country.toLowerCase().trim();
  if (normalized in EXAM_DATA) {
    return EXAM_DATA[normalized as SupportedCountry];
  }
  return null;
}
