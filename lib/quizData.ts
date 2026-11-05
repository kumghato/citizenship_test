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
    examTitle: 'USCIS Civics Practice Exam',
    bankPill: '1,000+ Question Official Bank',
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
    questions: [],
  },

  uk: {
    id: 'uk',
    countryName: 'United Kingdom',
    shortCode: 'GBR',
    flag: '🇬🇧',
    officialBody: 'Home Office · UK Visas & Immigration',
    examTitle: 'Life in the UK Official Practice Exam',
    bankPill: '1,000+ Question Official Bank',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 18,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 2700, // 45 minutes
    hotlineName: 'Life in the UK Test Helpline',
    hotlineNumber: '0800 015 4245',
    hotlineHours: 'Mon-Fri 9am-4pm GMT',
    dossierTitle: 'Home Office Statutory Archive',
    dossierStandard: 'Life in the UK Official Handbook: 3rd Edition',
    dossierParchmentTitle: 'Magna Carta (1215) & Statutory Bill of Rights (1689)',
    dossierParchmentText:
      'No free man shall be seized, imprisoned, dispossessed, outlawed, exiled or in any way destroyed; nor will We proceed against him, or send against him, save by the lawful judgement of his peers or by the law of the land.',
    questions: [],
  },

  ca: {
    id: 'ca',
    countryName: 'Canada',
    shortCode: 'CAN',
    flag: '🇨🇦',
    officialBody: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    examTitle: 'Discover Canada Official Practice Exam',
    bankPill: '1,000+ Question IRCC Pool',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 15,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 1800, // 30 minutes
    hotlineName: 'IRCC Client Support Centre',
    hotlineNumber: '1-888-242-2100',
    hotlineHours: 'Mon-Fri 8am-4pm Local Time',
    dossierTitle: 'IRCC Citizenship Dossier',
    dossierStandard: 'Discover Canada: The Rights and Responsibilities of Citizenship',
    dossierParchmentTitle: 'Constitution Act, 1982 · Canadian Charter of Rights and Freedoms',
    dossierParchmentText:
      'Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law. The Canadian Charter of Rights and Freedoms guarantees the rights and freedoms set out in it subject only to such reasonable limits prescribed by law as can be demonstrably justified in a free and democratic society.',
    questions: [],
  },

  au: {
    id: 'au',
    countryName: 'Australia',
    shortCode: 'AUS',
    flag: '🇦🇺',
    officialBody: 'Department of Home Affairs (DHA)',
    examTitle: 'Our Common Bond Australian Practice Exam',
    bankPill: '1,000+ Question Official Bank',
    modeBadge: 'OFFICIAL EXAM MODE (TIMED)',
    passingScore: 15,
    totalQuestions: 20,
    passingPercentage: 75,
    timeLimitSeconds: 2700, // 45 minutes
    hotlineName: 'DHA Citizenship Service Center',
    hotlineNumber: '131 881',
    hotlineHours: 'Mon-Fri 8:30am-4:30pm AEST',
    dossierTitle: 'Department of Home Affairs Dossier',
    dossierStandard: 'Australian Citizenship: Our Common Bond Standard',
    dossierParchmentTitle: 'Commonwealth of Australia Constitution Act (1900)',
    dossierParchmentText:
      'Whereas the people of New South Wales, Victoria, South Australia, Queensland, and Tasmania, humbly relying on the blessing of Almighty God, have agreed to unite in one indissoluble Federal Commonwealth under the Crown of the United Kingdom of Great Britain and Ireland, and under the Constitution hereby established.',
    questions: [],
  },
};

export function getExamConfig(country: string): CountryExamConfig | null {
  const normalized = country.toLowerCase().trim();
  if (normalized in EXAM_DATA) {
    return EXAM_DATA[normalized as SupportedCountry];
  }
  return null;
}
