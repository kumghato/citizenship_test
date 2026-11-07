export interface CountryOption {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  exam: string;
}

export const COUNTRIES: CountryOption[] = [
  { id: 'us', name: 'United States', shortName: 'US', flag: '🇺🇸', exam: 'USCIS Civics' },
  { id: 'uk', name: 'United Kingdom', shortName: 'UK', flag: '🇬🇧', exam: 'Life in the UK' },
  { id: 'ca', name: 'Canada', shortName: 'CA', flag: '🇨🇦', exam: 'Discover Canada' },
  { id: 'au', name: 'Australia', shortName: 'AU', flag: '🇦🇺', exam: 'Our Common Bond' },
];

export const NAV_LINKS = [
  ['Exam Tracks', '/#tracks'],
  ['Study Guides', '/#exam-guides'],
  ['FAQ', '/#faq'],
] as const;
