import { NextRequest, NextResponse } from 'next/server';
import { queryQuestions, QuestionQueryParams } from '@/lib/serverQuestionLoader';
import { SUPPORTED_COUNTRIES } from '@/lib/quizData';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get('country') || 'us';
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

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    // Default random to true for practice test generation, unless explicitly specified as 'false'
    const random = randomParam !== null ? randomParam.toLowerCase() === 'true' : true;
    const metaOnly = metaOnlyParam?.toLowerCase() === 'true';

    let ids: number[] | undefined;
    if (idsParam) {
      ids = idsParam
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));
    }

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
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_')) {
      throw error;
    }
    console.error('Questions API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while retrieving questions.',
      },
      { status: 500 }
    );
  }
}
