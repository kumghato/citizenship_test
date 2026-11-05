import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getExamConfig,
  SUPPORTED_COUNTRIES,
  SupportedCountry,
} from '@/lib/quizData';
import { COUNTRY_SEO_DATA } from '@/lib/seoData';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { TrackSeoContent } from '@/components/seo/TrackSeoContent';

interface QuizPageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((country) => ({
    country,
  }));
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase() as SupportedCountry;
  const config = getExamConfig(normalizedCountry);
  const seo = COUNTRY_SEO_DATA[normalizedCountry];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://civicpass.org';

  if (!config || !seo) {
    return {
      title: 'Examination Not Found — CivicPass',
      description: 'The requested citizenship examination could not be found.',
    };
  }

  const canonicalUrl = `${siteUrl}/test/${normalizedCountry}`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: seo.metaTitle,
      description: seo.metaDescription,
      siteName: 'CivicPass',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

async function QuizContent({ params }: QuizPageProps) {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();
  const config = getExamConfig(normalizedCountry);

  if (!config) {
    notFound();
  }

  // Pass exam configuration metadata only; questions are always prepared
  // dynamically and fetched randomly on demand via API call when exam is selected.
  const examConfig = {
    ...config,
    questions: [],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <QuizContainer config={examConfig} />
      <TrackSeoContent country={normalizedCountry} />
    </div>
  );
}

function QuizLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading examination environment...</p>
      </div>
    </div>
  );
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <React.Suspense fallback={<QuizLoadingFallback />}>
      <QuizContent params={params} />
    </React.Suspense>
  );
}
