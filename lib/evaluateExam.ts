import { QuizQuestion, SupportedCountry, CountryExamConfig, EXAM_DATA } from './quizData';
import { ExamResultData, ReviewQuestionItem, DomainPerformance } from './resultsData';

export interface ExamSubmissionPayload {
  countryId: SupportedCountry;
  questions: QuizQuestion[];
  answers: Record<number | string, string | null>;
  flagged?: number[];
  timeSpentSeconds?: number;
  submittedAt?: number;
}

/**
 * Maps a question category to its primary civic domain based on country.
 */
export function getDomainForCategory(countryId: string, category: string): { id: string; name: string } {
  const cat = category.toLowerCase();

  if (countryId === 'us') {
    if (cat.includes('government') || cat.includes('democracy') || cat.includes('system') || cat.includes('amendment')) {
      return { id: 'gov', name: 'American Government' };
    }
    if (cat.includes('history') || cat.includes('colonial') || cat.includes('war') || cat.includes('president')) {
      return { id: 'hist', name: 'American History' };
    }
    return { id: 'civics', name: 'Integrated Civics' };
  }

  if (countryId === 'uk') {
    if (cat.includes('government') || cat.includes('law') || cat.includes('parliament') || cat.includes('justice')) {
      return { id: 'gov', name: 'UK Government & Law' };
    }
    if (cat.includes('history') || cat.includes('tudor') || cat.includes('stuart') || cat.includes('century')) {
      return { id: 'hist', name: 'British History' };
    }
    return { id: 'society', name: 'British Customs & Society' };
  }

  if (countryId === 'ca') {
    if (cat.includes('govern') || cat.includes('law') || cat.includes('justice') || cat.includes('parliament') || cat.includes('charter')) {
      return { id: 'gov', name: 'Canadian Government & Law' };
    }
    if (cat.includes('history') || cat.includes('confederation') || cat.includes('war') || cat.includes('1812')) {
      return { id: 'hist', name: 'Canadian History' };
    }
    return { id: 'geo', name: 'Canadian Geography & Society' };
  }

  // Australia
  if (cat.includes('government') || cat.includes('law') || cat.includes('parliament') || cat.includes('constitution')) {
    return { id: 'gov', name: 'Government and the Law' };
  }
  if (cat.includes('beliefs') || cat.includes('rights') || cat.includes('liberties') || cat.includes('responsibilit')) {
    return { id: 'values', name: 'Democratic Beliefs & Values' };
  }
  return { id: 'people', name: 'Australia and Its People' };
}

/**
 * Dynamically evaluates exam questions against user answers to produce complete results.
 */
export function evaluateExamResults(
  payload: ExamSubmissionPayload,
  fallbackConfig?: CountryExamConfig | null
): ExamResultData {
  const {
    countryId,
    questions,
    answers = {},
    flagged = [],
    timeSpentSeconds = 692,
    submittedAt = Date.now(),
  } = payload;

  const config = fallbackConfig || EXAM_DATA[countryId] || EXAM_DATA.us;
  const flaggedSet = new Set<number>(flagged);

  // Format time spent
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeSpentFormatted = `${minutes}m ${String(seconds).padStart(2, '0')}s`;

  // Format completion date
  const dateObj = new Date(submittedAt);
  const completionDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  // Build dynamic review question items
  const dynamicQuestions: ReviewQuestionItem[] = questions.map((q, idx) => {
    const rawKey = answers[q.id] ?? answers[idx] ?? answers[String(q.id)] ?? answers[String(idx)] ?? null;
    const userKey = (rawKey as 'A' | 'B' | 'C' | 'D' | null) || null;
    const userOpt = q.options.find((opt) => opt.key === userKey);
    const officialOpt = q.options.find((opt) => opt.key === q.correctAnswer);
    const isCorrect = userKey !== null && userKey === q.correctAnswer;
    const isFlagged = flaggedSet.has(q.id) || flaggedSet.has(idx);

    const domainInfo = getDomainForCategory(countryId, q.category);

    return {
      id: q.id,
      questionNumber: idx + 1,
      category: q.category,
      categoryTrail: q.category.toUpperCase(),
      domain: domainInfo.name,
      questionText: q.questionText,
      subtext: q.subtext,
      userAnswerKey: userKey,
      userAnswerText: userOpt ? userOpt.text : 'No Submission (Skipped)',
      officialAnswerKey: q.correctAnswer,
      officialAnswerText: officialOpt ? officialOpt.text : '',
      isCorrect,
      isFlagged,
      statutoryReference: `Statutory Reference: ${q.statutoryStandard}, Question #${q.id}`,
      whyCorrectContext:
        q.statutoryGuidance?.dossierNotes || q.statutoryGuidance?.clue || 'Official standard answer required under statutory naturalization guidelines.',
      legalCitation: q.statutoryGuidance?.legalCitation,
      mnemonic: q.statutoryGuidance?.mnemonic,
    };
  });

  const totalQuestions = dynamicQuestions.length > 0 ? dynamicQuestions.length : config.totalQuestions;
  const correctCount = dynamicQuestions.filter((q) => q.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const accuracyPercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passingScore = config.passingScore;
  const hasPassed = correctCount >= passingScore;

  // Dynamically compute domain performance
  const domainMap = new Map<string, { id: string; name: string; subcats: Set<string>; correct: number; total: number }>();

  dynamicQuestions.forEach((q) => {
    const info = getDomainForCategory(countryId, q.category);
    if (!domainMap.has(info.id)) {
      domainMap.set(info.id, {
        id: info.id,
        name: info.name,
        subcats: new Set<string>(),
        correct: 0,
        total: 0,
      });
    }

    const domainEntry = domainMap.get(info.id)!;
    domainEntry.total += 1;
    if (q.isCorrect) {
      domainEntry.correct += 1;
    }

    // Extract subcategory if separated by '•' or '·'
    const parts = q.category.split(/[•·]/);
    if (parts.length > 1) {
      domainEntry.subcats.add(parts[1].trim());
    } else {
      domainEntry.subcats.add(q.category);
    }
  });

  const domains: DomainPerformance[] = Array.from(domainMap.values()).map((d) => ({
    id: d.id,
    name: d.name,
    subcategories: Array.from(d.subcats).slice(0, 3).join(', '),
    correct: d.correct,
    total: d.total,
    percentage: d.total > 0 ? Math.round((d.correct / d.total) * 1000) / 10 : 0,
  }));

  // Identify weak areas for Targeted Focus
  const missedQuestions = dynamicQuestions.filter((q) => !q.isCorrect);
  const missedCategories = Array.from(
    new Set(missedQuestions.map((q) => q.category.split(/[•·]/)[0].trim()))
  );

  let recommendation = '';
  let insiderNote = '';
  let oralExamClarity = '';
  let oralExamStatus: 'OPTIMAL' | 'PASS' | 'REVIEW' = 'OPTIMAL';

  if (accuracyPercentage === 100) {
    recommendation = `Flawless 100% mastery demonstrated across all ${countryId.toUpperCase()} civic statutory domains. You are exceptionally prepared for the official exam.`;
    insiderNote = `During your naturalization interview, adjudicating officers ask questions verbally. Your prompt, 100% recall demonstrates optimal command of statutory standards.`;
    oralExamClarity = `Oral Exam Simulation: Officer clarity standard ${correctCount}/${totalQuestions} passed`;
    oralExamStatus = 'OPTIMAL';
  } else if (hasPassed) {
    const focusCat = missedCategories.length > 0 ? missedCategories.join(' and ') : 'missed statutory standards';
    recommendation = `Targeted focus recommended on ${focusCat} to reach 100% confidence for your naturalization interview.`;
    insiderNote = `You have achieved the statutory passing score of ${passingScore}/${totalQuestions}. Review the ${incorrectCount} missed questions below to cement instant verbal recall.`;
    oralExamClarity = `Oral Exam Simulation: Officer clarity standard ${correctCount}/${totalQuestions} passed`;
    oralExamStatus = accuracyPercentage >= 85 ? 'OPTIMAL' : 'PASS';
  } else {
    const weakDomain = domains.reduce((prev, curr) => (prev.percentage < curr.percentage ? prev : curr), domains[0]);
    const weakName = weakDomain ? weakDomain.name : 'core statutory domains';
    recommendation = `Additional study recommended in ${weakName}. Focus on statutory guidance and legal citations before re-testing.`;
    insiderNote = `The ${config.officialBody.split('·')[0].trim()} passing threshold requires at least ${passingScore} correct answers out of ${totalQuestions} (${config.passingPercentage}%). Review every missed question and launch a fresh simulation.`;
    oralExamClarity = `Oral Exam Diagnostic: ${correctCount}/${totalQuestions} scored (Statutory pass requirement: ${passingScore}/${totalQuestions})`;
    oralExamStatus = 'REVIEW';
  }

  const certificatePill = hasPassed
    ? 'OFFICIAL PASS CERTIFICATE'
    : 'DIAGNOSTIC PRACTICE REPORT · RETEST RECOMMENDED';

  return {
    countryId,
    countryName: config.countryName,
    shortCode: config.shortCode,
    flag: config.flag,
    officialBody: config.officialBody,
    examTitle: config.examTitle,
    certificatePill,
    completionDate,
    timeSpentFormatted,
    totalQuestions,
    correctCount,
    incorrectCount,
    flaggedCount: flaggedSet.size,
    accuracyPercentage,
    passingScore,
    passingPercentage: config.passingPercentage,
    hasPassed,
    domains,
    targetFocus: {
      recommendation,
      insiderNote,
      oralExamClarity,
      oralExamStatus,
    },
    questions: dynamicQuestions,
  };
}
