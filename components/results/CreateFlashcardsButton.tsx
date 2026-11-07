'use client';

import React, { useState } from 'react';

interface CreateFlashcardsButtonProps {
  incorrectCount: number;
  onPracticeMissed?: () => void;
}

export function CreateFlashcardsButton({
  incorrectCount,
  onPracticeMissed,
}: CreateFlashcardsButtonProps) {
  const [flashcardCreated, setFlashcardCreated] = useState(false);

  const handleCreateFlashcards = () => {
    setFlashcardCreated(true);
    if (onPracticeMissed) {
      onPracticeMissed();
    } else {
      const elem = document.getElementById('statutory-review');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCreateFlashcards}
      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
        flashcardCreated
          ? 'bg-emerald-600 text-white shadow-xs'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 hover:scale-[1.01]'
      }`}
    >
      {flashcardCreated ? (
        <span>Flashcards Generated!</span>
      ) : (
        <span>Create Custom Flash [{incorrectCount}]</span>
      )}
    </button>
  );
}

export default CreateFlashcardsButton;
