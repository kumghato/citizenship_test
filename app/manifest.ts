import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CivicPass — Citizenship Test Practice (USCIS, Life in the UK, Discover Canada, Our Common Bond)',
    short_name: 'CivicPass',
    description:
      'Pass your citizenship test on the first try. Free official practice questions and mock tests for USCIS civics, Life in the UK test, Discover Canada, and Australian citizenship Our Common Bond.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f8f5',
    theme_color: '#176b5b',
    icons: [
      {
        src: '/icon1.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
