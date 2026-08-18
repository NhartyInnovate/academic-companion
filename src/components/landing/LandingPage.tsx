import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Target, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Check, 
  Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, setOnboardingStep, setIsMissionModalOpen } = useApp();

  const handleStartSemester = () => {
    setOnboardingStep(1);
    setCurrentRoute('onboarding');
  };

  const handleExploreToday = () => {
    setCurrentRoute('today');
  };

  const handleDirectMission = () => {
    setCurrentRoute('today');
    setIsMissionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-7 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 block leading-tight">
                Academic Companion
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Student Journey
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute('login')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={handleStartSemester}
              className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Start My Semester</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-white">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
          {/* Editorial Category Eyebrow */}
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-6 block">
            The Student Journey
          </span>

          {/* Main Editorial Headline */}
          <h1 className="editorial-serif text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-8 text-slate-900 max-w-3xl mx-auto">
            Stop cramming.<br />
            Start making progress.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed font-normal">
            Turn your semester into a clear study plan, know what to study each day, and build the consistency that leads to better results.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartSemester}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 text-base"
            >
              <span>Start My Semester</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreToday}
              className="w-full sm:w-auto px-10 py-4 border border-slate-200 rounded-full font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2 text-base"
            >
              <Play className="w-4 h-4 text-slate-400" />
              <span>See Live Prototype</span>
            </button>
          </div>

          {/* Value Micro-Points */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Tailored to university syllabi
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Daily bite-sized study missions
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> AI-guided concept explanations
            </span>
          </div>

          {/* Product UI Mockup Frame (Editorial Style) */}
          <div className="mt-16 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xl text-left overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="ml-3 text-xs text-slate-500 font-mono hidden sm:inline">
                  Academic Companion • Today’s Study Mission
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">David Adeyemi • NOUN (200L)</span>
            </div>

            {/* Interactive Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Main Mission Preview */}
              <div className="lg:col-span-2 mission-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">
                      CSC 205 — DBMS
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-light editorial-serif text-slate-900 block leading-tight">40m</span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Est. Time</span>
                    </div>
                  </div>

                  <h3 className="editorial-serif text-2xl sm:text-3xl text-slate-900 mb-3">
                    Understand Database Normalization
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-6">
                    Learn how 1NF, 2NF and 3NF organize relational data and why normalization is critical for data integrity.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-4">
                  <div className="w-1/2">
                    <div className="flex justify-between text-[11px] font-bold mb-1.5 uppercase text-slate-400">
                      <span>Mission Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-slate-100 progress-pill overflow-hidden">
                      <div className="bg-slate-900 h-full w-[0%]"></div>
                    </div>
                  </div>
                  <button
                    onClick={handleDirectMission}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Start Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats & Streak Preview */}
              <div className="space-y-4">
                <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Semester Progress</div>
                    <div className="text-4xl editorial-serif mb-4">18%</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span className="text-slate-400">Missions Completed</span>
                        <span className="font-bold text-white">24 / 120</span>
                      </div>
                      <div className="w-full bg-white/10 progress-pill">
                        <div className="bg-white h-full w-[18%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-orange-500 text-lg">🔥</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">7 day streak</div>
                      <div className="text-[10px] text-slate-400">Active daily habit</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">Week 4</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Section (Clean Editorial) */}
        <section className="border-t border-slate-200 bg-slate-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-2">
                Core Philosophy
              </span>
              <h2 className="editorial-serif text-3xl sm:text-4xl text-slate-900">
                Designed to eliminate academic overwhelm
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
                Students rarely fail because of lack of ability. They struggle because semesters lack structured daily momentum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="editorial-serif text-xl font-bold text-slate-900 mb-2">1. Know What to Study</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    No more staring blankly at lecture slides wondering where to begin. Every day opens with a single, clear mission.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct priority clarity
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="editorial-serif text-xl font-bold text-slate-900 mb-2">2. Learn with Guidance</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Break complex syllabus concepts into bite-sized lessons with contextual AI explanations and instant knowledge checks.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-indigo-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Embedded academic coach
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="editorial-serif text-xl font-bold text-slate-900 mb-2">3. Stay Consistent</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Small, daily 30–45 minute study habits beat exhausting all-night cramming sessions before exams every single time.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-orange-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Low-pressure habit loops
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="editorial-serif text-xl font-bold text-slate-900 mb-2">4. See Your Progress</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    A visual semester roadmap connects your daily effort to midterm continuous assessment and final exam readiness.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 12-week roadmap visualization
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Realistic User Story Context */}
        <section className="py-20 max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-3 block">
              Case Study
            </span>
            <h3 className="editorial-serif text-3xl text-slate-900 mb-4">
              Prototyped around authentic university workflows
            </h3>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Experience the platform through David Adeyemi’s 200 Level Computer Science semester at National Open University of Nigeria (NOUN) with real course units, continuous assessments, and database normalization missions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleStartSemester}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Walkthrough Semester Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleExploreToday}
                className="px-8 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-full text-sm transition-colors cursor-pointer"
              >
                Go Directly to Today Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-slate-900 flex items-center justify-center text-white text-[10px]">
              AC
            </div>
            <span className="font-bold text-slate-900">Academic Companion</span>
            <span>• Student Productivity Prototype</span>
          </div>
          <div>
            Built with mock data & local state for product evaluation.
          </div>
        </div>
      </footer>
    </div>
  );
};
