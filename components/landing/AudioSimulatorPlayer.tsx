'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Mic,
  Headphones,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface AudioTrack {
  id: number;
  question: string;
  expectedAnswer: string;
  officer: string;
  duration: number; // in seconds
  country: string;
}

const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 1,
    question: "USCIS Examiner: 'What is the supreme law of the land?'",
    expectedAnswer: 'The Constitution',
    officer: 'USCIS Field Examiner Robert H. (Oral Interview Format)',
    duration: 28,
    country: 'United States',
  },
  {
    id: 2,
    question: "Home Office: 'Which monarch established the Church of England?'",
    expectedAnswer: 'King Henry VIII',
    officer: 'Life in the UK Audio Coach (Official Syllabi)',
    duration: 32,
    country: 'United Kingdom',
  },
  {
    id: 3,
    question: "IRCC Examiner: 'What are the three branches of Canadian government?'",
    expectedAnswer: 'Executive, Legislative, and Judicial',
    officer: 'Discover Canada Oral Prep Coach',
    duration: 35,
    country: 'Canada',
  },
];

export function AudioSimulatorPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState(8);
  const [isMuted, setIsMuted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [micActive, setMicActive] = useState(false);

  const track = AUDIO_TRACKS[currentTrackIndex];

  // Simulated playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, track.duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % AUDIO_TRACKS.length);
    setCurrentTime(0);
    setShowAnswer(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length
    );
    setCurrentTime(0);
    setShowAnswer(false);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const speeds = [0.8, 1.0, 1.25];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate 26 visual waveform bars
  const waveformBars = [
    24, 45, 65, 30, 80, 95, 60, 40, 75, 90, 50, 70, 85, 100, 65, 45, 80, 92, 55, 38, 70, 84, 48, 62, 35, 20
  ];

  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-2xl p-5 md:p-6 shadow-xl border border-slate-800">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isPlaying ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isPlaying ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            ></span>
          </span>
          <span className="text-slate-300 font-semibold tracking-wide flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-blue-400" />
            Interview Simulation Audio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/80 font-mono">
            Question {track.id} of {AUDIO_TRACKS.length}
          </span>
        </div>
      </div>

      {/* Question Audio Header */}
      <div className="mt-4">
        <div className="text-[11px] font-semibold tracking-wider uppercase text-blue-400 flex items-center justify-between">
          <span>{track.officer}</span>
          <span className="text-slate-400 font-mono text-[10px]">
            Official Voice Model
          </span>
        </div>
        <p className="mt-1.5 text-sm md:text-base font-semibold text-white leading-snug">
          &ldquo;{track.question.replace(/^[^:]+:\s*'|'$/g, '')}&rdquo;
        </p>
      </div>

      {/* Dynamic Animated Waveform */}
      <div className="mt-5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
        <div className="flex items-end justify-between gap-1 h-12 px-1">
          {waveformBars.map((baseHeight, idx) => {
            const progress = (idx / waveformBars.length) * track.duration;
            const hasPlayed = progress <= currentTime;

            // Compute dynamic height based on playing state
            const dynamicHeight = isPlaying
              ? Math.max(15, Math.min(100, (baseHeight * (0.6 + Math.sin(idx + currentTime * 2) * 0.4))))
              : baseHeight * 0.5;

            return (
              <div
                key={idx}
                style={{ height: `${dynamicHeight}%` }}
                className={`w-full rounded-full transition-all duration-150 ${
                  hasPlayed
                    ? 'bg-gradient-to-t from-blue-500 to-cyan-400'
                    : 'bg-slate-700/60'
                }`}
              />
            );
          })}
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (currentTime / track.duration) * 100)}%`,
              }}
            />
          </div>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Answer Peek / Voice Simulation Feedback */}
      <div className="mt-3.5">
        {showAnswer ? (
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Official Answer:</strong>{' '}
                {track.expectedAnswer}
              </span>
            </div>
            <button
              onClick={() => setShowAnswer(false)}
              className="text-[10px] text-emerald-400/80 hover:text-emerald-200 underline ml-2"
            >
              Hide
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setShowAnswer(true)}
              className="text-blue-400 hover:text-blue-300 underline font-medium text-[11px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Reveal Official Examiner Answer Key
            </button>
            <button
              onClick={() => setMicActive(!micActive)}
              className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-all ${
                micActive
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>{micActive ? 'Listening...' : 'Simulate Oral Answer'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Player Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={`px-2 py-1 text-[10px] font-semibold rounded ${
                playbackSpeed === s
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Center Media Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Previous question"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
            title={isPlaying ? 'Pause simulation' : 'Play audio question'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Next question"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleRestart}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Replay from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Volume toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
export default AudioSimulatorPlayer;
