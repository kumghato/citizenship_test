'use client';

import React from 'react';
import Link from 'next/link';
import { clearAllExamStorage } from '@/lib/examStorage';

interface ExitResultsButtonProps {
  label?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export function ExitResultsButton({
  label = 'Exit to Home',
  className = 'inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer',
  title = 'Return to CivicPass Home and clear storage',
  children,
}: ExitResultsButtonProps) {
  return (
    <Link
      href="/"
      onClick={() => clearAllExamStorage()}
      className={className}
      title={title}
    >
      {children || <span className="hidden sm:inline">{label}</span>}
    </Link>
  );
}

export default ExitResultsButton;
