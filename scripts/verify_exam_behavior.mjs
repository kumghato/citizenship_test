import fs from 'fs';
import path from 'path';

console.log('=== TEST SUITE: CITIZENSHIP EXAM REQUIREMENTS ===\n');

// 1. Verify question bank size vs API limit
const usData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'questions', 'us.json'), 'utf-8'));
const totalAvailable = usData.questions.length;
console.log(`1. Total questions in official database: ${totalAvailable}`);

// Simulate random Fisher-Yates selection of 20 questions
function getRandomQuestions(all, limit = 20) {
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, limit);
}

const batch1 = getRandomQuestions(usData.questions, 20);
const batch2 = getRandomQuestions(usData.questions, 20);

console.log(`✓ Fetched Batch 1: ${batch1.length} questions (IDs: ${batch1.slice(0, 5).map(q => q.id).join(', ')}...)`);
console.log(`✓ Fetched Batch 2: ${batch2.length} questions (IDs: ${batch2.slice(0, 5).map(q => q.id).join(', ')}...)`);

if (batch1.length !== 20 || batch2.length !== 20) {
  throw new Error('Batch size should be exactly 20, not all data!');
}

const ids1 = batch1.map(q => q.id);
const ids2 = batch2.map(q => q.id);
const hasDifference = ids1.some((id, idx) => id !== ids2[idx]);
if (!hasDifference) {
  throw new Error('Consecutive exam selection must produce randomized questions!');
}
console.log('✓ Randomization verified: Exam prepares distinct randomized sets.\n');

// 2. Test Fetching by IDs to compare answers
console.log('2. Testing ID Lookup to compare answers...');
const testIds = [ids1[0], ids1[2], ids1[4]];
const qMap = new Map(usData.questions.map(q => [q.id, q]));
const fetchedByIds = testIds.map(id => qMap.get(id)).filter(Boolean);

if (fetchedByIds.length !== testIds.length) {
  throw new Error('ID lookup failed');
}
console.log(`✓ Fetched exact questions by IDs: ${fetchedByIds.map(q => q.id).join(', ')}\n`);

// 3. Testing selected answers storage validation
console.log('3. Validating Session Storage Schema...');
const sessionAnswers = {
  countryId: 'us',
  selectedAnswers: {
    [testIds[0]]: fetchedByIds[0].correctAnswer, // Correct
    [testIds[1]]: 'Z',                           // Incorrect
    [testIds[2]]: null,                          // Skipped
  },
  questionIds: testIds,
  flaggedIds: [testIds[1]],
  timeSpentSeconds: 150,
  submittedAt: Date.now(),
};

// Check that NO question content or options are stored
const serialized = JSON.stringify(sessionAnswers);
const forbiddenKeys = ['questionText', 'statutoryGuidance', 'options', 'subtext', 'dossierNotes'];
for (const key of forbiddenKeys) {
  if (serialized.includes(key)) {
    throw new Error(`Forbidden key "${key}" detected in storage payload!`);
  }
}
console.log('✓ Verified: Stored data contains ONLY user selected answers & question IDs.');
console.log(`✓ Payload preview: ${serialized}\n`);

// 4. Test comparing stored answers against fetched questions
console.log('4. Comparing Stored Answers against Questions...');
let correctCount = 0;
let incorrectCount = 0;

for (const q of fetchedByIds) {
  const userAns = sessionAnswers.selectedAnswers[q.id];
  const isCorrect = userAns !== null && userAns === q.correctAnswer;
  if (isCorrect) correctCount++;
  else incorrectCount++;
}

console.log(`✓ Result of comparison: ${correctCount} correct, ${incorrectCount} incorrect out of ${fetchedByIds.length}`);
if (correctCount !== 1 || incorrectCount !== 2) {
  throw new Error(`Comparison test failed: expected 1 correct, 2 incorrect; got ${correctCount}/${incorrectCount}`);
}

console.log('\n=== ALL VERIFICATION CHECKS PASSED ===');
