import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  mode: 'login' | 'signup';
}

export const AuthScreens: React.FC<AuthScreenProps> = ({ mode }) => {
  const { setCurrentRoute, setOnboardingStep, student } = useApp();
  const [email, setEmail] = useState('david.adeyemi@student.noun.edu.ng');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState(student.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      setOnboardingStep(1);
      setCurrentRoute('onboarding');
    } else {
      setCurrentRoute('today');
    }
  };

  const handleDemoSignIn = () => {
    setCurrentRoute('today');
  };

  const handleDemoSignUp = () => {
    setOnboardingStep(1);
    setCurrentRoute('onboarding');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-center items-center px-4 py-12">
      {/* Brand Icon */}
      <button 
        onClick={() => setCurrentRoute('landing')}
        className="flex items-center gap-3 mb-8 group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
          <Compass className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="text-left">
          <span className="font-bold text-xl tracking-tight text-slate-900 editorial-serif block">
            Academic Companion
          </span>
          <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase">
            PROTOTYPE ACCESS
          </span>
        </div>
      </button>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">
            {mode === 'signup' ? 'Create your student account' : 'Welcome back'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {mode === 'signup' 
              ? 'Organize your semester and start learning with daily missions.' 
              : 'Sign in to access your today\'s study mission and roadmap.'}
          </p>
        </div>

        {/* 1-Click Fast Demo Box */}
        <div className="mb-6 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Interactive Demo Profile</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pre-loaded with David Adeyemi (NOUN • 200 Level B.Sc. Computer Science).
          </p>
          <button
            type="button"
            onClick={mode === 'signup' ? handleDemoSignUp : handleDemoSignIn}
            className="w-full mt-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{mode === 'signup' ? 'Start Onboarding as David' : 'Instant Sign In as David'}</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Or Mock Form</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                placeholder="David Adeyemi"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Institutional Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              placeholder="matric@student.noun.edu.ng"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
          >
            <span>{mode === 'signup' ? 'Proceed to Semester Setup' : 'Continue to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentRoute('login')}
                className="text-slate-900 hover:underline font-semibold cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have a plan yet?{' '}
              <button
                type="button"
                onClick={() => setCurrentRoute('signup')}
                className="text-slate-900 hover:underline font-semibold cursor-pointer"
              >
                Start My Semester
              </button>
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local frontend prototype state • No real server calls</span>
        </div>
      </div>
    </div>
  );
};
