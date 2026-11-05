import { NextRequest, NextResponse } from 'next/server';
import { queryQuestions, QuestionQueryParams } from '@/lib/serverQuestionLoader';
import { SUPPORTED_COUNTRIES } from '@/lib/quizData';

interface RouteProps {
  params: Promise<{ country: string }>;
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const { country } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page');
    const randomParam = searchParams.get('random');
    const category = searchParams.get('category') || undefined;
    const idsParam = searchParams.get('ids');
    const metaOnlyParam = searchParams.get('metaOnly');

    const normalizedCountry = country.toLowerCase().trim();
    if (!SUPPORTED_COUNTRIES.includes(normalizedCountry)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported country '${country}'. Supported countries are: ${SUPPORTED_COUNTRIES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    let ids: number[] | undefined;
    if (idsParam) {
      ids = idsParam
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));
    }

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const random = randomParam !== null ? randomParam.toLowerCase() === 'true' : (ids && ids.length > 0 ? false : true);
    const metaOnly = metaOnlyParam?.toLowerCase() === 'true';

    const queryParams: QuestionQueryParams = {
      country: normalizedCountry,
      limit,
      page,
      random,
      category,
      ids,
      metaOnly,
    };

    const response = await queryQuestions(queryParams);

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to load questions for country '${country}'.`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: unknown) {
    const err = error as { digest?: string };
    if (err?.digest?.startsWith('NEXT_')) {
      throw error;
    }
    console.error('Questions [country] API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while retrieving questions.',
      },
      { status: 500 }
    );
  }
}
