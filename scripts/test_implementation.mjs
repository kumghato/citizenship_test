import fs from 'fs';
import path from 'path';

console.log('=== RUNNING VERIFICATION SUITE ===\n');

// 1. Check all country JSON files have >= 1,000 questions each
const countries = ['us', 'uk', 'ca', 'au'];
for (const c of countries) {
  const filePath = path.join(process.cwd(), 'data', 'questions', `${c}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing question file: ${filePath}`);
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const count = content.questions.length;
  console.log(`✓ Country ${c.toUpperCase()}: ${count} questions found in ${filePath}`);
  if (count < 1000) {
    throw new Error(`Expected at least 1000 questions for ${c}, got ${count}`);
  }

  // Check each question has 4 options, valid correctAnswer
  let validOpts = 0;
  for (const q of content.questions) {
    if (q.options.length === 4 && ['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
      validOpts++;
    }
  }
  if (validOpts !== count) {
    throw new Error(`Some questions in ${c} have invalid options or answer keys!`);
  }
}

console.log('\nAll 4 country JSON files verified with >= 1,000 valid questions each!');
