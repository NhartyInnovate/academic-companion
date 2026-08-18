import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';
import { 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  PlayCircle, 
  Compass, 
  Layers
} from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    resetMissionState, 
    isMissionCompleted, 
    setIsMissionModalOpen 
  } = useApp();

  const routes: { id: AppRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Landing', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'onboarding', label: 'Onboarding', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'today', label: 'Today (Core)', icon: <PlayCircle className="w-3.5 h-3.5" /> },
    { id: 'journey', label: 'Journey', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'learn', label: 'Learn', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside 
      aria-label="Prototype demo toolbar"
      className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 sticky top-0 z-50 flex items-center justify-between shadow-xs overflow-x-auto gap-2"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-100 bg-slate-800 px-2 py-0.5 rounded text-[10px] tracking-widest uppercase border border-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Academic Companion Prototype
        </span>
        <span className="text-slate-600 hidden sm:inline">|</span>
      </div>

      <nav aria-label="Prototype quick navigation" className="flex items-center gap-1 overflow-x-auto py-0.5">
        {routes.map((r) => {
          const isActive = currentRoute === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setCurrentRoute(r.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => {
            setCurrentRoute('today');
            setIsMissionModalOpen(true);
          }}
          className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-full font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          title="Open Study Mission immediately"
        >
          <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Launch Mission</span>
        </button>

        {isMissionCompleted && (
          <button
            onClick={resetMissionState}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full font-medium flex items-center gap-1 transition-colors border border-slate-700 cursor-pointer text-xs"
            title="Reset mission completion state for another walkthrough"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden md:inline">Reset Mission</span>
          </button>
        )}
      </div>
    </aside>
  );
};
