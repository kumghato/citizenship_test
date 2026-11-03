import { queryQuestions } from '../lib/serverQuestionLoader';
import { evaluateExamResults, ExamSubmissionPayload } from '../lib/evaluateExam';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('=== RUNNING CIVICPASS VERIFICATION SUITE ===\n');

  // Test 1: Check Question JSON files
  console.log('--- Test 1: Country Question JSON Files ---');
  const countries = ['us', 'uk', 'ca', 'au'];
  for (const c of countries) {
    const filePath = path.join(process.cwd(), 'data', 'questions', `${c}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing question file: ${filePath}`);
    }
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const qCount = content.questions.length;
    console.log(`✓ ${c.toUpperCase()}: ${qCount} questions in ${filePath}`);
    if (qCount < 1000) {
      throw new Error(`Expected at least 1000 questions for ${c}, got ${qCount}`);
    }
    // Check first and last questions
    const firstQ = content.questions[0];
    const lastQ = content.questions[qCount - 1];
    if (!firstQ.options || firstQ.options.length !== 4) throw new Error('First Q options invalid');
    if (!lastQ.options || lastQ.options.length !== 4) throw new Error('Last Q options invalid');
  }

  // Test 2: Test on-demand Question Loader (fetches only requested amount)
  console.log('\n--- Test 2: On-Demand Question Loader API ---');
  const queryRes20 = await queryQuestions({ country: 'us', limit: 20, random: true });
  if (!queryRes20) throw new Error('queryQuestions returned null');
  console.log(`✓ Fetched on-demand: requested 20, returned: ${queryRes20.questions.length} (total available in bank: ${queryRes20.pagination.totalAvailable})`);
  if (queryRes20.questions.length !== 20) throw new Error(`Expected 20 questions, got ${queryRes20.questions.length}`);
  if (queryRes20.pagination.totalAvailable < 1000) throw new Error('Total bank questions < 1000');

  const queryRes5 = await queryQuestions({ country: 'ca', limit: 5, random: true });
  if (!queryRes5) throw new Error('queryQuestions CA returned null');
  console.log(`✓ Fetched on-demand: requested 5, returned: ${queryRes5.questions.length} (total available in bank: ${queryRes5.pagination.totalAvailable})`);
  if (queryRes5.questions.length !== 5) throw new Error(`Expected 5 questions, got ${queryRes5.questions.length}`);

  // Test 3: Test Dynamic Results Calculation with user-selected answers
  console.log('\n--- Test 3: Dynamic Results Evaluation ---');
  const testSampleQuestions = queryRes20.questions;

  // Scenario A: User answers 18 correctly, 2 wrong
  const answersPass: Record<number, string> = {};
  testSampleQuestions.forEach((q, idx) => {
    if (idx < 18) {
      answersPass[idx] = q.correctAnswer;
    } else {
      // Pick a wrong option
      const wrong = q.options.find(o => o.key !== q.correctAnswer);
      answersPass[idx] = wrong ? wrong.key : 'A';
    }
  });

  const payloadPass: ExamSubmissionPayload = {
    countryId: 'us',
    questions: testSampleQuestions,
    answers: answersPass,
    flagged: [1, 5],
    timeSpentSeconds: 720,
    submittedAt: Date.now(),
  };

  const evalPass = evaluateExamResults(payloadPass);
  console.log(`✓ Scenario A (18/20): Score=${evalPass.correctCount}/${evalPass.totalQuestions} (${evalPass.accuracyPercentage}%), Passed=${evalPass.hasPassed}`);
  if (evalPass.correctCount !== 18) throw new Error(`Expected 18 correct, got ${evalPass.correctCount}`);
  if (evalPass.accuracyPercentage !== 90) throw new Error(`Expected 90%, got ${evalPass.accuracyPercentage}`);
  if (!evalPass.hasPassed) throw new Error('Expected hasPassed=true');
  if (evalPass.domains.length === 0) throw new Error('Expected domains to be calculated');
  console.log(`  Domains Breakdown: ${evalPass.domains.map(d => `${d.name}: ${d.correct}/${d.total} (${d.percentage}%)`).join(' | ')}`);
  console.log(`  Targeted Recommendation: "${evalPass.targetFocus.recommendation}"`);

  // Scenario B: User answers only 8 correctly, 12 wrong (Fails passing score of 12)
  const answersFail: Record<number, string> = {};
  testSampleQuestions.forEach((q, idx) => {
    if (idx < 8) {
      answersFail[idx] = q.correctAnswer;
    } else {
      const wrong = q.options.find(o => o.key !== q.correctAnswer);
      answersFail[idx] = wrong ? wrong.key : 'A';
    }
  });

  const payloadFail: ExamSubmissionPayload = {
    countryId: 'us',
    questions: testSampleQuestions,
    answers: answersFail,
    flagged: [0, 2, 4],
    timeSpentSeconds: 500,
    submittedAt: Date.now(),
  };

  const evalFail = evaluateExamResults(payloadFail);
  console.log(`✓ Scenario B (8/20): Score=${evalFail.correctCount}/${evalFail.totalQuestions} (${evalFail.accuracyPercentage}%), Passed=${evalFail.hasPassed}`);
  if (evalFail.correctCount !== 8) throw new Error(`Expected 8 correct, got ${evalFail.correctCount}`);
  if (evalFail.accuracyPercentage !== 40) throw new Error(`Expected 40%, got ${evalFail.accuracyPercentage}`);
  if (evalFail.hasPassed) throw new Error('Expected hasPassed=false');
  if (evalFail.certificatePill !== 'DIAGNOSTIC PRACTICE REPORT · RETEST RECOMMENDED') {
    throw new Error(`Unexpected certificate pill: ${evalFail.certificatePill}`);
  }
  if (evalFail.targetFocus.oralExamStatus !== 'REVIEW') {
    throw new Error(`Expected oralExamStatus='REVIEW', got ${evalFail.targetFocus.oralExamStatus}`);
  }
  console.log(`  Fail Notice Pill: "${evalFail.certificatePill}"`);
  console.log(`  Fail Recommendation: "${evalFail.targetFocus.recommendation}"`);

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
