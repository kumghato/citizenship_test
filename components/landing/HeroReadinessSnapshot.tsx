'use client';

import React from 'react';
import { useCountryPreference } from './CountryPreferenceProvider';

interface TrackSnapshot {
  score: string;
  examLabel: string;
  passingScore: string;
  answered: string;
  toPass: string;
  focusAreas: string;
  activeTrack: string;
  progressWidth: string;
  scoreRingDelta: string;
}

const SNAPSHOTS: Record<string, TrackSnapshot> = {
  us: {
    score: '78%',
    examLabel: 'USCIS Civics',
    passingScore: 'Passing Score: 60%',
    answered: '14 answered',
    toPass: '12 to pass',
    focusAreas: '3 focus areas',
    activeTrack: 'USCIS 100 Civics Standard',
    progressWidth: '78%',
    scoreRingDelta: '+12%',
  },
  uk: {
    score: '83%',
    examLabel: 'Life in the UK',
    passingScore: 'Passing Score: 75%',
    answered: '20 answered',
    toPass: '18 to pass',
    focusAreas: '2 focus areas',
    activeTrack: 'Life in the UK Official Standard',
    progressWidth: '83%',
    scoreRingDelta: '+8%',
  },
  ca: {
    score: '80%',
    examLabel: 'Discover Canada',
    passingScore: 'Passing Score: 75%',
    answered: '16 answered',
    toPass: '15 to pass',
    focusAreas: '2 focus areas',
    activeTrack: 'Discover Canada 2026 Standard',
    progressWidth: '80%',
    scoreRingDelta: '+5%',
  },
  au: {
    score: '85%',
    examLabel: 'Our Common Bond',
    passingScore: 'Passing Score: 75%',
    answered: '17 answered',
    toPass: '15 to pass',
    focusAreas: '1 focus area',
    activeTrack: 'Our Common Bond Standard',
    progressWidth: '85%',
    scoreRingDelta: '+10%',
  },
};

export function HeroReadinessSnapshot() {
  const { countryId } = useCountryPreference();
  const snapshot = SNAPSHOTS[countryId] ?? SNAPSHOTS.us;

  return (
    <div className="hero-visual" aria-label="CivicPass exam readiness preview">
      <div className="hero-panel">
        <div className="hero-panel__top">
          <span className="hero-panel__label">Readiness snapshot</span>
          <span className="hero-panel__status">Practice mode</span>
        </div>
        <div className="hero-score">
          <div>
            <strong>{snapshot.score}</strong>
            <p>
              {snapshot.examLabel} · {snapshot.passingScore}
            </p>
          </div>
          <div className="hero-score__ring">
            <span>{snapshot.scoreRingDelta}</span>
          </div>
        </div>
        <div
          className="hero-progress"
          aria-label={`${snapshot.score} readiness score`}
        >
          <span style={{ width: snapshot.progressWidth }} />
        </div>
        <div className="hero-panel__footer">
          <span>{snapshot.answered}</span>
          <span>{snapshot.toPass}</span>
          <span>{snapshot.focusAreas}</span>
        </div>
      </div>
      <div className="hero-note">
        <span>
          Active Track: <strong>{snapshot.activeTrack}</strong>
        </span>
      </div>
    </div>
  );
}

export default HeroReadinessSnapshot;
