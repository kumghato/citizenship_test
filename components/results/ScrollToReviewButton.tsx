'use client';

import React from 'react';

interface ScrollToReviewButtonProps {
  label?: string;
  className?: string;
  onReviewMissed?: () => void;
}

export function ScrollToReviewButton({
  label = 'Review Statutory Rubric',
  className = 'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-800 hover:bg-slate-100/90 border border-slate-200 transition-colors shadow-2xs cursor-pointer',
  onReviewMissed,
}: ScrollToReviewButtonProps) {
  const handleScroll = () => {
    if (onReviewMissed) {
      onReviewMissed();
    }
    const element = document.getElementById('statutory-review');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className={className}
      title="Scroll down to question-by-question statutory review"
    >
      <span>{label}</span>
    </button>
  );
}

export default ScrollToReviewButton;
