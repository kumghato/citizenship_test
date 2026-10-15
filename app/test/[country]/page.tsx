import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getExamConfig,
  SUPPORTED_COUNTRIES,
} from '@/lib/quizData';
import { QuizContainer } from '@/components/quiz/QuizContainer';

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
  const config = getExamConfig(country);

  if (!config) {
    return {
      title: 'Examination Not Found — CivicPass',
      description: 'The requested citizenship examination could not be found.',
    };
  }

  return {
    title: `${config.examTitle} (${config.countryName}) — CivicPass`,
    description: `Official practice test for ${config.countryName} citizenship (${config.officialBody}). Practice ${config.totalQuestions} questions with real-time scoring, statutory legal guidance, and oral simulator.`,
  };
}

async function QuizContent({ params }: QuizPageProps) {
  const { country } = await params;
  const config = getExamConfig(country);

  if (!config) {
    notFound();
  }

  return <QuizContainer config={config} />;
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
