import React from 'react';
import { BottomCtaSelector } from './BottomCtaSelector';

export function BottomCta() {
  return (
    <div className="cta-panel">
      <div className="cta-panel__content">
        <span className="eyebrow">Start Where You Are</span>
        <h2>Pass Your Citizenship Exam with Focused Practice.</h2>
        <p>
          Choose your exam track — USCIS, Life in the UK, Discover Canada, or Our Common
          Bond — and begin a free timed mock test with question-by-question review.
        </p>
        <BottomCtaSelector />
      </div>
      <div className="cta-panel__aside">
        <span>Free Practice Online</span>
        <strong>
          Master your test format.<br />Walk in with confidence.
        </strong>
      </div>
    </div>
  );
}

export default BottomCta;
