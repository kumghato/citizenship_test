import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_COUNTRIES } from '@/lib/quizData';
import { getExamResultData } from '@/lib/resultsData';
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
  const result = getExamResultData(country);

  if (!SUPPORTED_COUNTRIES.includes(country.toLowerCase())) {
    return {
      title: 'Exam Results Not Found — CivicPass',
      description: 'The requested citizenship exam result could not be located.',
    };
  }

  return {
    title: `Official Exam Results & Statutory Review (${result.countryName}) — CivicPass`,
    description: `Official results report for ${result.countryName} citizenship examination (${result.officialBody}). Overall score: ${result.accuracyPercentage}%. Statutory legal rubric breakdown and question-by-question review.`,
  };
}

async function ResultsContent({ params }: ResultsPageProps) {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();

  if (!SUPPORTED_COUNTRIES.includes(normalizedCountry)) {
    notFound();
  }

  const result = getExamResultData(normalizedCountry);

  return <ResultsClientView initialResult={result} />;
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
