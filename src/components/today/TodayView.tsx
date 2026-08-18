import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Clock, 
  Flame, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const TodayView: React.FC = () => {
  const { 
    student, 
    todayMission, 
    isMissionCompleted, 
    setIsMissionModalOpen, 
    streakCount, 
    semesterProgress, 
    assessments, 
    setCurrentRoute,
    setSelectedCourseId,
    totalMissionsCompleted,
    totalMissionsPlanned,
    resetMissionState
  } = useApp();

  const handleStartMission = () => {
    setIsMissionModalOpen(true);
  };

  const handleGoToCourse = (courseCode: string) => {
    if (courseCode.includes('205')) setSelectedCourseId('c-csc205');
    else if (courseCode.includes('201')) setSelectedCourseId('c-csc201');
    else if (courseCode.includes('203')) setSelectedCourseId('c-csc203');
    else if (courseCode.includes('MTH')) setSelectedCourseId('c-mth203');
    setCurrentRoute('course-detail');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Top Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
            Week 4 • Continuous Study
          </span>
          <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
            Today’s Mission
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Good morning, {student.name.split(' ')[0]}. One meaningful step today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
            {student.institution} • 200L
          </span>
          <button
            onClick={() => setCurrentRoute('learn')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            Study Interface
          </button>
        </div>
      </div>

      {/* Main Grid: Mission Card (col-span-8) + Side Stats (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Primary Focus Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="mission-card p-6 sm:p-8 rounded-3xl bg-white relative overflow-hidden shadow-xs">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
                {todayMission.courseCode} — {todayMission.courseName}
              </span>
              <div className="text-right">
                <span className="text-2xl font-light editorial-serif text-slate-900 block leading-tight">
                  {todayMission.estimatedMinutes}m
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Est. Time
                </span>
              </div>
            </div>

            <h2 className="editorial-serif text-2xl sm:text-3xl text-slate-900 mb-3 leading-snug">
              {todayMission.topic}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
              {todayMission.description}
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Module Unit
                  </div>
                  <div className="text-xs font-semibold text-slate-700">
                    Unit 3.2 • Relational Modeling
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Assessment Impact
                  </div>
                  <div className="text-xs font-semibold text-indigo-600">
                    Midterm TMA 1 Prep
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isMissionCompleted ? (
                  <>
                    <button
                      onClick={handleStartMission}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Review Completed</span>
                    </button>
                    <button
                      onClick={resetMissionState}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                      title="Reset mission state to try again"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleStartMission}
                    className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Next Up Tomorrow Teaser */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Tomorrow’s Planned Mission
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  CSC 201: Implement Stacks & Circular Queue Buffers
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('journey')}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              View Roadmap
            </button>
          </div>
        </div>

        {/* Right Column: Inverted Stats & Streaks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dark Semester Progress Card */}
          <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-md">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
              Semester Progress
            </div>
            <div className="text-5xl editorial-serif mb-6 leading-none">
              {semesterProgress}%
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-slate-400">Missions Completed</span>
                <span className="font-bold text-white">
                  {totalMissionsCompleted} / {totalMissionsPlanned}
                </span>
              </div>
              <div className="w-full bg-white/10 progress-pill overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500"
                  style={{ width: `${semesterProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span>Week 4 Active</span>
                <span>8 Weeks Remaining</span>
              </div>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-xl">🔥</span>
                <div>
                  <div className="text-sm font-bold text-slate-900">{streakCount} Day Habit Streak</div>
                  <div className="text-[11px] text-slate-400">Active daily study momentum</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {isMissionCompleted 
                ? 'Great work! Today’s mission is checked off and streak is intact.'
                : 'Finish today’s 40-minute mission to maintain your streak into Week 4.'}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Target: 6 days / week</span>
              <button 
                onClick={() => setCurrentRoute('progress')}
                className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Upcoming Assessments Mini-Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Key Assessment Deadlines
              </span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-2.5">
              {assessments.slice(0, 2).map((ass) => (
                <div 
                  key={ass.id}
                  onClick={() => handleGoToCourse(ass.courseCode)}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {ass.courseCode} • {ass.type}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {ass.title}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {ass.daysRemaining}d left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
