import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_COUNTRIES, SupportedCountry } from '@/lib/quizData';
import { getExamResultData } from '@/lib/resultsData';
import { COUNTRY_SEO_DATA } from '@/lib/seoData';
import { ResultsClientView } from '@/components/results/ResultsClientView';

interface ResultsPageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({
    country,
  }));
}

export async function generateMetadata({
  params,
}: ResultsPageProps): Promise<Metadata> {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase() as SupportedCountry;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';

  if (!SUPPORTED_COUNTRIES.includes(normalizedCountry)) {
    return {
      title: 'Exam Results Not Found — CivicPass',
      description: 'The requested citizenship exam result could not be located.',
    };
  }

  const result = getExamResultData(normalizedCountry);
  const seo = COUNTRY_SEO_DATA[normalizedCountry];
  const canonicalUrl = `${siteUrl}/test/${normalizedCountry}/results`;
  const title = `${result.countryName} Citizenship Exam Results & Statutory Review | CivicPass`;
  const description = `Review your practice performance for the ${result.countryName} citizenship test (${result.officialBody}). Detailed rubric breakdown by civics domain and legal standard.`;

  return {
    title,
    description,
    keywords: seo ? seo.keywords : [],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: 'CivicPass',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

async function ResultsContent({ params }: ResultsPageProps) {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase() as SupportedCountry;

  if (!SUPPORTED_COUNTRIES.includes(normalizedCountry)) {
    notFound();
  }

  const result = getExamResultData(normalizedCountry);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${siteUrl}/test/${normalizedCountry}/results`;
  const parentUrl = `${siteUrl}/test/${normalizedCountry}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${result.countryName} Exam Practice`,
        item: parentUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Results & Review',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ResultsClientView initialResult={result} />
    </>
  );
}

function ResultsLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading examination results...</p>
      </div>
    </div>
  );
}

export default function ResultsPage({ params }: ResultsPageProps) {
  return (
    <React.Suspense fallback={<ResultsLoadingFallback />}>
      <ResultsContent params={params} />
    </React.Suspense>
  );
}
