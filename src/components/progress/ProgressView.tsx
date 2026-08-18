import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Trophy 
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { 
    semesterProgress, 
    totalMissionsCompleted, 
    totalMissionsPlanned, 
    streakCount, 
    courses, 
    weeklyLogs,
    isMissionCompleted 
  } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
            Academic Consistency & Momentum
          </span>
          <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
            Progress & Habits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Measurable academic momentum built one steady study mission at a time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
            {streakCount}-Day Streak Active
          </span>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Semester Progress */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semester Plan</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-4xl editorial-serif text-slate-900">
            {semesterProgress}%
          </div>
          <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
            On track for Week 4 targets
          </div>
        </div>

        {/* Metric 2: Missions Completed */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Missions Done</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-4xl editorial-serif text-slate-900">
            {totalMissionsCompleted} <span className="text-base font-normal text-slate-400">/ {totalMissionsPlanned}</span>
          </div>
          <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
            20% of planned study steps
          </div>
        </div>

        {/* Metric 3: Current Streak */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-4xl editorial-serif text-orange-600">
            {streakCount} Days
          </div>
          <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
            Active daily study habit
          </div>
        </div>

        {/* Metric 4: Longest Streak */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Longest Streak</span>
            <Trophy className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-4xl editorial-serif text-slate-900">
            14 Days
          </div>
          <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
            Achieved earlier this session
          </div>
        </div>
      </div>

      {/* Weekly Consistency Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="editorial-serif text-2xl text-slate-900">
              Weekly Consistency Tracker
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Week 4 Daily Study Activity (Aug 11 – Aug 17, 2026)
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Studied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Rest / Planned
            </span>
          </div>
        </div>

        {/* 7-Day Mon-Sun Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3.5 pt-2">
          {weeklyLogs.map((log) => (
            <div
              key={log.day}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all flex flex-col justify-between h-32 ${
                log.studied
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-bold block text-slate-900">{log.day}</span>
                <span className="text-[10px] text-slate-400 block">{log.dateLabel}</span>
              </div>

              <div className="my-auto">
                {log.studied ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mx-auto text-xs">
                    ○
                  </div>
                )}
              </div>

              <div className="text-[10px] font-medium">
                {log.studied ? (
                  <span className="text-emerald-700 font-bold">{log.minutes}m</span>
                ) : (
                  <span className="text-slate-400">0m</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Consistency Affirmation */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-3 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            {isMissionCompleted
              ? 'Awesome job! You completed all scheduled study days for this week.'
              : 'Completing today’s mission checks off Sunday and keeps your 8-day streak intact!'}
          </span>
        </div>
      </div>

      {/* Course-by-Course Progress Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
        <h3 className="editorial-serif text-2xl text-slate-900">
          Syllabus Coverage by Course
        </h3>

        <div className="space-y-4 pt-1">
          {courses.map((c) => (
            <div key={c.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">{c.code}</span>
                  <span className="text-slate-500 font-normal truncate max-w-[220px] sm:max-w-md">{c.name}</span>
                </span>
                <span className="text-slate-900">{c.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 progress-pill overflow-hidden">
                <div 
                  className="bg-slate-900 h-full transition-all duration-300"
                  style={{ width: `${c.progressPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
