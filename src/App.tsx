import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBar } from './components/common/DemoBar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthScreens } from './components/auth/AuthScreens';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { AppShell } from './components/app-shell/AppShell';
import { TodayView } from './components/today/TodayView';
import { JourneyView } from './components/journey/JourneyView';
import { CoursesView } from './components/courses/CoursesView';
import { CourseDetailView } from './components/courses/CourseDetailView';
import { LearnView } from './components/learn/LearnView';
import { ProgressView } from './components/progress/ProgressView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';

const MainRouter: React.FC = () => {
  const { currentRoute } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      {/* Top Demo Quick Navigator for testing & presentations */}
      <DemoBar />

      {/* Primary View Routing */}
      {currentRoute === 'landing' && <LandingPage />}

      {currentRoute === 'login' && <AuthScreens mode="login" />}

      {currentRoute === 'signup' && <AuthScreens mode="signup" />}

      {currentRoute === 'onboarding' && <OnboardingFlow />}

      {/* Authenticated Application Shell */}
      {(currentRoute === 'today' ||
        currentRoute === 'journey' ||
        currentRoute === 'courses' ||
        currentRoute === 'course-detail' ||
        currentRoute === 'learn' ||
        currentRoute === 'progress' ||
        currentRoute === 'profile' ||
        currentRoute === 'settings') && (
        <AppShell>
          {currentRoute === 'today' && <TodayView />}
          {currentRoute === 'journey' && <JourneyView />}
          {currentRoute === 'courses' && <CoursesView />}
          {currentRoute === 'course-detail' && <CourseDetailView />}
          {currentRoute === 'learn' && <LearnView />}
          {currentRoute === 'progress' && <ProgressView />}
          {currentRoute === 'profile' && <ProfileView />}
          {currentRoute === 'settings' && <SettingsView />}
        </AppShell>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
