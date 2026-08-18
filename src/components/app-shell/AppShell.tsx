import React, { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';
import { 
  Compass, 
  Calendar, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  User, 
  Settings, 
  Bell, 
  Flame, 
  Play, 
  LogOut
} from 'lucide-react';
import { NotificationPanel } from '../notifications/NotificationPanel';
import { MissionExperience } from '../mission/MissionExperience';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    student, 
    streakCount, 
    unreadNotificationCount, 
    setIsNotificationPanelOpen,
    setIsMissionModalOpen,
    isMissionCompleted 
  } = useApp();

  const mainNavItems: { id: AppRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Play className="w-4 h-4 fill-current" /> },
    { id: 'journey', label: 'My Journey', icon: <Calendar className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <Layers className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const bottomNavItems: { id: AppRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Play className="w-4 h-4 fill-current" /> },
    { id: 'journey', label: 'Journey', icon: <Calendar className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <Layers className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row selection:bg-slate-900 selection:text-white">
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-7 h-[calc(100vh-1.75rem)] z-30 justify-between p-5 flex-shrink-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <div 
            onClick={() => setCurrentRoute('today')}
            className="flex items-center gap-3 px-2 py-1 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 block leading-tight">
                Academic Companion
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                NOUN • 200L CS
              </span>
            </div>
          </div>

          {/* Quick Mission Launch Pill in Sidebar */}
          <div>
            <button
              onClick={() => setIsMissionModalOpen(true)}
              className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-between shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isMissionCompleted ? 'Review Mission' : 'Today’s Mission'}</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                40m
              </span>
            </button>
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Study System
            </div>
            {mainNavItems.map((item) => {
              const isActive = currentRoute === item.id || (item.id === 'courses' && currentRoute === 'course-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentRoute(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'nav-active'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Profile & Settings */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentRoute('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                currentRoute === 'profile'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setCurrentRoute('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                currentRoute === 'settings'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
          </div>

          {/* Student Status Summary Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {student.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{student.name}</div>
                <div className="text-[10px] text-slate-400 truncate">NOUN • 200L</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('landing')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors"
              title="Exit prototype to landing page"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-7 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Brand indicator */}
            <div 
              onClick={() => setCurrentRoute('today')}
              className="md:hidden flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-slate-900">
                Academic Companion
              </span>
            </div>

            {/* Desktop Semester breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{student.institution}</span>
              <span>/</span>
              <span>2026 Second Semester</span>
              <span>/</span>
              <span className="text-indigo-600 font-semibold">Week 4 Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Counter Pill */}
            <button
              onClick={() => setCurrentRoute('progress')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold transition-transform hover:scale-105 cursor-pointer"
            >
              <span className="text-orange-500">🔥</span>
              <span>{streakCount} Days</span>
            </button>

            {/* Notification Bell with Badge */}
            <button
              onClick={() => setIsNotificationPanelOpen(true)}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Avatar button */}
            <button
              onClick={() => setCurrentRoute('profile')}
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              title="Profile"
            >
              {student.name.split(' ').map((n) => n[0]).join('')}
            </button>
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-lg">
        {bottomNavItems.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentRoute(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Global Modals & Drawers */}
      <NotificationPanel />
      <MissionExperience />
    </div>
  );
};
