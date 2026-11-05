'use client';

/**
 * Storage utility for citizenship examination sessions.
 * Strictly manages selected answers and enforces complete storage clearance on exam exit.
 *
 * RULES:
 * 1. Do NOT store any questions data (question texts, options, statutory citations, official answers) in storage.
 * 2. Store ONLY the selected answers of the users in session storage only to compare the answers.
 * 3. Clear ALL session storage and local storage when the user exits the exam.
 */

export const EXAM_ANSWERS_STORAGE_KEY = 'civicpass_user_answers';

export interface UserSelectedExamAnswers {
  countryId: string;
  // Mapping of question ID to the user's selected option key ('A' | 'B' | 'C' | 'D' | null)
  selectedAnswers: Record<number, string | null>;
  // Order of question IDs as presented in the randomized exam
  questionIds: number[];
  // Question IDs flagged by the candidate for review
  flaggedIds?: number[];
  timeSpentSeconds: number;
  submittedAt: number;
}

/**
 * Clears ALL sessionStorage and localStorage completely when the user exits the exam.
 */
export function clearAllExamStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.clear();
    localStorage.clear();
    window.dispatchEvent(new Event('civicpass_storage_cleared'));
    window.dispatchEvent(new Event('civicpass_answers_updated'));
  } catch (err) {
    console.warn('Unable to clear exam storage:', err);
  }
}

/**
 * Stores ONLY the selected answers and required IDs of the user in sessionStorage.
 * Never stores any question content or answer bank data.
 */
export function saveUserSelectedAnswers(data: UserSelectedExamAnswers): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = JSON.stringify(data);
    sessionStorage.setItem(EXAM_ANSWERS_STORAGE_KEY, payload);
    sessionStorage.setItem(`${EXAM_ANSWERS_STORAGE_KEY}_${data.countryId}`, payload);
    window.dispatchEvent(new Event('civicpass_answers_updated'));
  } catch (err) {
    console.warn('Unable to save selected answers to sessionStorage:', err);
  }
}

/**
 * Retrieves the user's selected answers from sessionStorage to compare answers on the results screen.
 */
export function getUserSelectedAnswers(countryId?: string): UserSelectedExamAnswers | null {
  if (typeof window === 'undefined') return null;
  try {
    const specificKey = countryId ? `${EXAM_ANSWERS_STORAGE_KEY}_${countryId}` : null;
    const raw =
      (specificKey ? sessionStorage.getItem(specificKey) : null) ||
      sessionStorage.getItem(EXAM_ANSWERS_STORAGE_KEY);

    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserSelectedExamAnswers;
    if (!parsed || !parsed.selectedAnswers) return null;
    return parsed;
  } catch (err) {
    console.warn('Unable to retrieve selected answers from sessionStorage:', err);
    return null;
  }
}
