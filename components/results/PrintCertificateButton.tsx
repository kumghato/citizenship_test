'use client';

import React from 'react';

interface PrintCertificateButtonProps {
  className?: string;
}

export function PrintCertificateButton({
  className = 'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer',
}: PrintCertificateButtonProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={className}
      title="Print official score certificate and statutory review"
    >
      <span>Print Certificate</span>
    </button>
  );
}

export default PrintCertificateButton;
