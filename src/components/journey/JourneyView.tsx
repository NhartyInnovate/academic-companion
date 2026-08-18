import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Sparkles, 
  ShieldAlert,
  Play
} from 'lucide-react';

export const JourneyView: React.FC = () => {
  const { 
    roadmap, 
    semesterProgress, 
    student, 
    setIsMissionModalOpen
  } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
            Full Semester Timeline
          </span>
          <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
            My Journey
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your progressive semester roadmap from day one to examination readiness.
          </p>
        </div>

        {/* Progress summary capsule */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-xs">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Overall Completion</span>
            <span className="text-2xl editorial-serif text-slate-900 font-bold leading-tight">{semesterProgress}%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
            W4
          </div>
        </div>
      </div>

      {/* Legend & Motivational anchor */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>You are currently in <strong>Week 4</strong>. Steady daily study steps prevent last-minute exam distress.</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 flex-shrink-0 font-medium">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-900"></span> Current</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Upcoming</span>
        </div>
      </div>

      {/* Timeline Roadmap */}
      <div className="relative pl-6 sm:pl-10 space-y-8">
        {/* Continuous Connecting Line */}
        <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-0.5 bg-slate-200 -z-0"></div>

        {roadmap.map((week) => {
          const isCompleted = week.status === 'completed';
          const isCurrent = week.status === 'current';

          return (
            <div key={week.weekNumber} className="relative z-10">
              {/* Timeline Node Badge */}
              <div 
                className={`absolute -left-6 sm:-left-10 top-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-600 text-white ring-4 ring-[#F8FAFC]'
                    : isCurrent
                    ? 'bg-slate-900 text-white ring-4 ring-slate-200'
                    : 'bg-white text-slate-400 border border-slate-300 ring-4 ring-[#F8FAFC]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{week.weekNumber}</span>
                )}
              </div>

              {/* Week Card Box */}
              <div 
                className={`rounded-3xl p-6 sm:p-7 border transition-all ${
                  isCurrent
                    ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900'
                    : isCompleted
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-white/70 border-slate-200 opacity-90'
                }`}
              >
                {/* Week Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <h3 className="editorial-serif text-xl sm:text-2xl text-slate-900">
                      {week.title}
                    </h3>
                    {isCurrent && (
                      <span className="px-3 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                        Current Week
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{week.dateRange}</span>
                  </div>
                </div>

                {/* Week Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {week.items.map((item, idx) => {
                    const isTodayActiveMission = isCurrent && item.topicName.includes('Normalization');

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                          item.completed
                            ? 'bg-slate-50 border-slate-200 text-slate-600'
                            : isTodayActiveMission
                            ? 'bg-indigo-50/50 border-indigo-200 text-slate-900 shadow-xs'
                            : 'bg-white border-slate-100 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{item.courseCode}</span>
                              <span className="text-[9px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 uppercase font-semibold">
                                {item.type}
                              </span>
                            </div>
                            <div className={`text-xs truncate mt-0.5 ${item.completed ? 'text-slate-500' : isTodayActiveMission ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                              {item.topicName}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Launch Button if active */}
                        {isTodayActiveMission && (
                          <button
                            onClick={() => setIsMissionModalOpen(true)}
                            className="ml-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full flex items-center gap-1 transition-colors cursor-pointer flex-shrink-0 shadow-xs"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Study</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Milestone or Assessment Flag if present */}
                {week.weekNumber === 5 && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Milestone: Continuous Assessment Test 1 (CSC 205) occurs at the end of this week.</span>
                  </div>
                )}

                {week.weekNumber === 8 && (
                  <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-900">
                    <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>Final Examination Phase: NOUN E-Exam Testing Center schedule begins.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
