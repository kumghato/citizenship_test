'use client';

import React from 'react';
import Link from 'next/link';
import { clearAllExamStorage } from '@/lib/examStorage';

interface RetakeExamButtonProps {
  countryId: string;
  label?: string;
  className?: string;
  title?: string;
}

export function RetakeExamButton({
  countryId,
  label = 'Retake Timed Simulation',
  className = 'w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer',
  title = 'Retake practice examination with fresh random questions',
}: RetakeExamButtonProps) {
  return (
    <Link
      href={`/test/${countryId}`}
      onClick={() => clearAllExamStorage()}
      className={className}
      title={title}
    >
      <span>{label}</span>
    </Link>
  );
}

export default RetakeExamButton;
