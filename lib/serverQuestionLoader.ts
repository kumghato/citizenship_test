import fs from 'fs/promises';
import path from 'path';
import { QuizQuestion, CountryExamConfig, SupportedCountry, SUPPORTED_COUNTRIES } from './quizData';

export interface QuestionQueryParams {
  country?: string;
  limit?: number;
  page?: number;
  random?: boolean;
  category?: string;
  ids?: number[];
  metaOnly?: boolean;
}

export interface QuestionApiResponse {
  success: boolean;
  countryId: SupportedCountry;
  countryName: string;
  shortCode: string;
  flag: string;
  officialBody: string;
  examTitle: string;
  bankPill: string;
  modeBadge: string;
  passingScore: number;
  totalQuestions: number;
  passingPercentage: number;
  timeLimitSeconds: number;
  hotlineName: string;
  hotlineNumber: string;
  hotlineHours: string;
  dossierTitle: string;
  dossierStandard: string;
  dossierParchmentTitle: string;
  dossierParchmentText: string;
  pagination: {
    totalAvailable: number;
    returned: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  questions: QuizQuestion[];
}

// In-memory cache for parsed country files to ensure sub-millisecond response times
const countryCache = new Map<string, CountryExamConfig>();

/**
 * Loads a country's full question dataset from its dedicated JSON file on the server.
 */
export async function loadCountryQuestionsFromFile(
  countryInput: string
): Promise<CountryExamConfig | null> {
  const normalized = countryInput.toLowerCase().trim();
  if (!SUPPORTED_COUNTRIES.includes(normalized)) {
    return null;
  }

  const cached = countryCache.get(normalized);
  if (cached) {
    return cached;
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'data',
      'questions',
      `${normalized}.json`
    );
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(content) as CountryExamConfig;
    countryCache.set(normalized, parsed);
    return parsed;
  } catch (error) {
    console.error(`Error loading questions file for country ${normalized}:`, error);
    return null;
  }
}

/**
 * Query questions on demand with filtering, pagination, or random sampling.
 */
export async function queryQuestions(
  params: QuestionQueryParams
): Promise<QuestionApiResponse | null> {
  const countryId = (params.country || 'us').toLowerCase().trim() as SupportedCountry;
  const config = await loadCountryQuestionsFromFile(countryId);

  if (!config) {
    return null;
  }

  const allQuestions = config.questions || [];
  let filtered = [...allQuestions];

  // Filter by specific question IDs if provided
  if (params.ids && params.ids.length > 0) {
    const idSet = new Set(params.ids);
    filtered = filtered.filter((q) => idSet.has(q.id));
  }

  // Filter by category if provided
  if (params.category && params.category.trim()) {
    const catQuery = params.category.toLowerCase().trim();
    filtered = filtered.filter(
      (q) =>
        q.category.toLowerCase().includes(catQuery) ||
        q.statutoryStandard.toLowerCase().includes(catQuery)
    );
  }

  const totalAvailable = filtered.length;

  if (params.metaOnly) {
    return {
      success: true,
      countryId: config.id,
      countryName: config.countryName,
      shortCode: config.shortCode,
      flag: config.flag,
      officialBody: config.officialBody,
      examTitle: config.examTitle,
      bankPill: config.bankPill,
      modeBadge: config.modeBadge,
      passingScore: config.passingScore,
      totalQuestions: config.totalQuestions,
      passingPercentage: config.passingPercentage,
      timeLimitSeconds: config.timeLimitSeconds,
      hotlineName: config.hotlineName,
      hotlineNumber: config.hotlineNumber,
      hotlineHours: config.hotlineHours,
      dossierTitle: config.dossierTitle,
      dossierStandard: config.dossierStandard,
      dossierParchmentTitle: config.dossierParchmentTitle,
      dossierParchmentText: config.dossierParchmentText,
      pagination: {
        totalAvailable,
        returned: 0,
        page: 1,
        limit: 0,
        totalPages: 1,
      },
      questions: [],
    };
  }

  // Determine limit and pagination
  const limit = Math.min(Math.max(params.limit ?? config.totalQuestions ?? 20, 1), 100);
  const totalPages = Math.max(Math.ceil(totalAvailable / limit), 1);
  const page = Math.min(Math.max(params.page ?? 1, 1), totalPages);

  let resultQuestions: QuizQuestion[] = [];

  if (params.random) {
    // Fisher-Yates shuffle sample without mutating original
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    resultQuestions = shuffled.slice(0, limit);
  } else {
    const startIndex = (page - 1) * limit;
    resultQuestions = filtered.slice(startIndex, startIndex + limit);
  }

  return {
    success: true,
    countryId: config.id,
    countryName: config.countryName,
    shortCode: config.shortCode,
    flag: config.flag,
    officialBody: config.officialBody,
    examTitle: config.examTitle,
    bankPill: config.bankPill,
    modeBadge: config.modeBadge,
    passingScore: config.passingScore,
    totalQuestions: limit,
    passingPercentage: config.passingPercentage,
    timeLimitSeconds: config.timeLimitSeconds,
    hotlineName: config.hotlineName,
    hotlineNumber: config.hotlineNumber,
    hotlineHours: config.hotlineHours,
    dossierTitle: config.dossierTitle,
    dossierStandard: config.dossierStandard,
    dossierParchmentTitle: config.dossierParchmentTitle,
    dossierParchmentText: config.dossierParchmentText,
    pagination: {
      totalAvailable,
      returned: resultQuestions.length,
      page,
      limit,
      totalPages,
    },
    questions: resultQuestions,
  };
}
