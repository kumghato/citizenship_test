import type { MetadataRoute } from 'next';
import { SUPPORTED_COUNTRIES } from '@/lib/quizData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onlinecitizenshiptest.com';
  const lastModified = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const countryPages: MetadataRoute.Sitemap = SUPPORTED_COUNTRIES.flatMap((country) => [
    {
      url: `${baseUrl}/test/${country}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/test/${country}/results`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]);

  return [...mainPages, ...countryPages];
}
