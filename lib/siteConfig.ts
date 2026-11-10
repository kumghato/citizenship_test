/**
 * Central site facts used by metadata, structured data and the visible
 * trust blocks. Keep the date in sync whenever the guidance pages change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://onlinecitizenshiptest.com'
).replace(/\/+$/, '');

export const SITE_NAME = 'CivicPass';
export const SITE_TAGLINE = 'Citizenship test practice for the US, UK, Canada and Australia';
export const CONTACT_EMAIL = 'support@civicpass.org';
export const EDITORIAL_EMAIL = 'editorial@civicpass.org';

export const CONTENT_PUBLISHED = '2025-09-01';
export const CONTENT_UPDATED = '2026-11-10';
export const CONTENT_UPDATED_LABEL = '10 November 2026';

export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_ALT =
  'CivicPass — citizenship test practice for USCIS, Life in the UK, Discover Canada and Our Common Bond';

/**
 * Official publications every question is checked against. These are the
 * citations shown to readers and search engines.
 */
export const OFFICIAL_SOURCES = [
  {
    label: 'USCIS civics test study materials and test updates',
    publisher: 'U.S. Citizenship and Immigration Services',
    href: 'https://www.uscis.gov/citizenship/find-study-materials-and-resources/check-for-test-updates',
  },
  {
    label: 'Life in the UK Test: official guidance',
    publisher: 'GOV.UK',
    href: 'https://www.gov.uk/life-in-the-uk-test',
  },
  {
    label: 'Discover Canada: the rights and responsibilities of citizenship',
    publisher: 'Immigration, Refugees and Citizenship Canada',
    href: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html',
  },
  {
    label: 'Australian Citizenship: Our Common Bond',
    publisher: 'Department of Home Affairs',
    href: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond',
  },
] as const;

export type SocialProfile = {
  /** Human readable platform name, also used as the link label. */
  label: string;
  /** Full profile URL, e.g. https://x.com/civicpass */
  href: string;
};

/**
 * Brand profiles shown in the footer and as `sameAs` in the organisation
 * schema. Add the CivicPass handles here once the accounts exist — the footer
 * and structured data pick them up automatically.
 */
export const SOCIAL_PROFILES: SocialProfile[] = [];

export type PostalAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
};

/**
 * Optional postal address for the organisation schema and footer. Leave as
 * `null` while the project runs without a public correspondence address.
 */
export const POSTAL_ADDRESS: PostalAddress | null = null;
