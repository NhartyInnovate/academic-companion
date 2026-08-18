import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Clock, 
  RotateCcw, 
  Sliders 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    student, 
    updateProfile, 
    resetMissionState 
  } = useApp();

  const [reminderTime, setReminderTime] = useState('08:00 AM');
  const [allowAssessmentAlerts, setAllowAssessmentAlerts] = useState(true);
  const [allowStreakReminders, setAllowStreakReminders] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = () => {
    resetMissionState();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
          Preferences & Controls
        </span>
        <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
          Application Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize study mission pacing, notifications, and prototype behavior.
        </p>
      </div>

      <div className="space-y-6">
        {/* Study Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="editorial-serif text-2xl text-slate-900">Study Habit Pacing</h3>
              <p className="text-xs text-slate-400">Configure how missions are scheduled across your week.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Daily Study Session
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  value={student.dailyStudyGoalMinutes}
                  onChange={(e) => updateProfile({ dailyStudyGoalMinutes: Number(e.target.value) })}
                  className="flex-1 accent-slate-900 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-900 min-w-24 text-right px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                  {student.dailyStudyGoalMinutes} Mins / Day
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Daily Reminder Time
              </label>
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              >
                <option value="07:00 AM">07:00 AM (Early Morning Focus)</option>
                <option value="08:00 AM">08:00 AM (Standard Morning)</option>
                <option value="04:00 PM">04:00 PM (Afternoon Study)</option>
                <option value="08:00 PM">08:00 PM (Evening Session)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Config */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="editorial-serif text-2xl text-slate-900">Notification Preferences</h3>
              <p className="text-xs text-slate-400">Supportive prompts designed to reduce anxiety, not add noise.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Assessment & Test Countdown Alerts</span>
                <span className="text-[11px] text-slate-500">Gentle pacing alerts 7 days and 3 days before exam dates</span>
              </div>
              <input
                type="checkbox"
                checked={allowAssessmentAlerts}
                onChange={(e) => setAllowAssessmentAlerts(e.target.checked)}
                className="accent-slate-900 w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Streak & Consistency Affirmations</span>
                <span className="text-[11px] text-slate-500">Supportive celebration when milestone streaks are reached</span>
              </div>
              <input
                type="checkbox"
                checked={allowStreakReminders}
                onChange={(e) => setAllowStreakReminders(e.target.checked)}
                className="accent-slate-900 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Prototype Reset / Demonstration Controls */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="editorial-serif text-2xl text-slate-900">Prototype Demonstration Controls</h3>
              <p className="text-xs text-slate-400">Reset local state to present the uncompleted mission walkthrough again.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Reset Mission State</span>
              <span className="text-[11px] text-slate-500">Restores David's Sunday mission to 0% with 7-day streak for fresh demonstration.</span>
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
              <span>{resetSuccess ? 'Reset Complete!' : 'Reset Demo State'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
