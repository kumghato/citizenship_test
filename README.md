This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Question Data & API Architecture

The citizenship practice bank is separated into dedicated per-country JSON databases located in [`data/questions/`](file:///home/kumghato/Web apps/citizenship-test/data/questions):
- [`data/questions/us.json`](file:///home/kumghato/Web apps/citizenship-test/data/questions/us.json) — **1,040 questions** for the United States (USCIS Civics Standard).
- [`data/questions/uk.json`](file:///home/kumghato/Web apps/citizenship-test/data/questions/uk.json) — **1,090 questions** for the United Kingdom (Life in the UK 3rd Ed.).
- [`data/questions/ca.json`](file:///home/kumghato/Web apps/citizenship-test/data/questions/ca.json) — **1,144 questions** for Canada (Discover Canada IRCC syllabus).
- [`data/questions/au.json`](file:///home/kumghato/Web apps/citizenship-test/data/questions/au.json) — **1,108 questions** for Australia (Our Common Bond DHA standard).

### On-Demand Question API
Questions are fetched on-demand via the Next.js API rather than bundled entirely into the client:
- `GET /api/questions?country=us&limit=20&random=true`
- `GET /api/questions/[country]?limit=20`

Query parameters supported:
- `country`: `us` | `uk` | `ca` | `au` (default: `us`)
- `limit`: Number of questions to return (clamped between 1 and 100, default: 20)
- `random`: `true` | `false` (default: `true` for random test generation)
- `page`: Page number for pagination
- `category`: Substring filter on category / standard
- `ids`: Comma-separated list of specific question IDs

### Dynamic Results Evaluation
Results are evaluated dynamically based on the user's selected answers during the exam:
- Evaluator engine in [`lib/evaluateExam.ts`](file:///home/kumghato/Web apps/citizenship-test/lib/evaluateExam.ts).
- Dynamic score, percentage, elapsed time, and pass/fail determination.
- Dynamic domain breakdown calculating accuracy and mastery across government, history, geography, and society.
- Targeted recommendations and oral exam readiness insights tailored to missed items.
- Full question-by-question review showing the user's selected options against official answers, legal citations, and mnemonic guidance.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# citizenship_test
