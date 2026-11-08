import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { COUNTRY_SEO_DATA, TrackSeoData } from '@/lib/seoData';
import { SUPPORTED_COUNTRIES, SupportedCountry } from '@/lib/quizData';

interface TrackSeoContentProps {
  country: string;
}

export function TrackSeoContent({ country }: TrackSeoContentProps) {
  const normalizedCountry = country.toLowerCase() as SupportedCountry;
  const data: TrackSeoData = COUNTRY_SEO_DATA[normalizedCountry];

  if (!data) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onlinecitizenshiptest.com';
  const pageUrl = `${siteUrl}/test/${normalizedCountry}`;

  const otherCountries = SUPPORTED_COUNTRIES.filter(
    (c) => c !== normalizedCountry
  ) as SupportedCountry[];

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
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
            name: `${data.countryName} Citizenship Exam`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'LearningResource',
        '@id': `${pageUrl}/#resource`,
        name: data.h1Title,
        description: data.metaDescription,
        learningResourceType: 'Practice Exam & Mock Test',
        educationalLevel: 'Citizenship & Naturalization',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'CivicPass',
          url: siteUrl,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}/#faq`,
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="w-full bg-white border-t border-slate-200 mt-12 py-12 px-4 sm:px-6 lg:px-8 text-slate-800"
        aria-label={`${data.examName} Study Guide and Information`}
      >
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition">
              CivicPass Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-semibold text-slate-800">
              {data.countryName} ({data.examName})
            </span>
          </nav>

          {/* Header & Overview */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200 uppercase tracking-wider">
              <span>{data.flag}</span>
              <span>Official Study Guide & Practice Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {data.h1Title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.h2Subtitle}
            </p>
          </header>

          {/* Key Exam Specifications Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm">
            <div>
              <span className="block text-slate-400 font-medium">Official Body</span>
              <strong className="block text-slate-900 font-semibold mt-1">
                {data.officialAgency}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Official Document</span>
              <strong className="block text-slate-900 font-semibold mt-1">
                {data.officialSourceDoc}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Passing Benchmark</span>
              <strong className="block text-emerald-700 font-semibold mt-1">
                {data.passingBenchmark}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Exam Time Limit</span>
              <strong className="block text-slate-900 font-semibold mt-1">
                {data.timeLimitText}
              </strong>
            </div>
          </div>

          {/* In-depth Editorial Content */}
          <article className="prose prose-slate max-w-none space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            {data.introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Exam Syllabus / Core Domains */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-700" />
              <span>Official Syllabus & Examinable Topics</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.syllabusTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-300 transition"
                >
                  <h4 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {topic.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proven Exam Tips */}
          <div className="p-6 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-700" />
              <span>Key Tips to Pass on Your First Attempt</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.examTips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900"
                >
                  <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Country-Specific FAQ Section */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle size={20} className="text-emerald-700" />
              <span>Frequently Asked Questions — {data.countryName} Citizenship</span>
            </h3>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-slate-50 border border-slate-200 rounded-xl p-4 transition open:bg-white open:border-emerald-300"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer flex items-center justify-between text-sm sm:text-base list-none">
                    <span>{faq.question}</span>
                    <span className="text-emerald-700 group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal Cross-Linking to other tracks */}
          <div className="border-t border-slate-200 pt-8 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Explore Other Official Citizenship Exam Tracks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {otherCountries.map((cId) => {
                const other = COUNTRY_SEO_DATA[cId];
                return (
                  <Link
                    key={cId}
                    href={`/test/${cId}`}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl transition flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{other.flag}</span>
                      <span className="font-medium text-slate-800">{other.h1Title}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
