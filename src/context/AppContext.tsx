import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  StudentProfile, 
  Course, 
  StudyMission, 
  WeekJourney, 
  AppNotification, 
  DailyStudyLog, 
  Assessment, 
  AppRoute,
  ConfidenceLevel,
  DayOfWeek
} from '../types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_COURSES, 
  INITIAL_ASSESSMENTS, 
  FEATURED_TODAY_MISSION, 
  INITIAL_ROADMAP, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_WEEKLY_LOGS 
} from '../data/mockData';

interface AppContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  assessments: Assessment[];
  setAssessments: React.Dispatch<React.SetStateAction<Assessment[]>>;
  todayMission: StudyMission;
  isMissionCompleted: boolean;
  completeMission: (confidence: ConfidenceLevel) => void;
  resetMissionState: () => void;
  streakCount: number;
  semesterProgress: number;
  totalMissionsCompleted: number;
  totalMissionsPlanned: number;
  roadmap: WeekJourney[];
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  weeklyLogs: DailyStudyLog[];
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedCourse: Course | undefined;
  isMissionModalOpen: boolean;
  setIsMissionModalOpen: (open: boolean) => void;
  isNotificationPanelOpen: boolean;
  setIsNotificationPanelOpen: (open: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  addCourse: (newCourse: Omit<Course, 'id' | 'topics' | 'materials' | 'assessments' | 'completedMissions' | 'totalMissions'>) => void;
  addAssessment: (newAssessment: Omit<Assessment, 'id' | 'daysRemaining' | 'completed'>) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  toggleStudyDay: (day: DayOfWeek) => void;
  demoCelebrationTriggered: boolean;
  setDemoCelebrationTriggered: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [todayMission, setTodayMission] = useState<StudyMission>(FEATURED_TODAY_MISSION);
  const [isMissionCompleted, setIsMissionCompleted] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(7);
  const [semesterProgress, setSemesterProgress] = useState<number>(18);
  const [totalMissionsCompleted, setTotalMissionsCompleted] = useState<number>(24);
  const [totalMissionsPlanned] = useState<number>(120);
  const [roadmap, setRoadmap] = useState<WeekJourney[]>(INITIAL_ROADMAP);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [weeklyLogs, setWeeklyLogs] = useState<DailyStudyLog[]>(INITIAL_WEEKLY_LOGS);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('c-csc205');
  const [isMissionModalOpen, setIsMissionModalOpen] = useState<boolean>(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [demoCelebrationTriggered, setDemoCelebrationTriggered] = useState<boolean>(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const completeMission = (_confidence: ConfidenceLevel) => {
    setIsMissionCompleted(true);
    setStreakCount(8);
    setSemesterProgress(20);
    setTotalMissionsCompleted(25);
    setDemoCelebrationTriggered(true);

    // Update CSC 205 course progress
    setCourses((prev) =>
      prev.map((course) => {
        if (course.code === 'CSC 205') {
          const updatedTopics = course.topics.map((t) =>
            t.title.includes('Normalization') ? { ...t, status: 'completed' as const } : t
          );
          return {
            ...course,
            progressPercentage: 50,
            completedMissions: course.completedMissions + 1,
            topics: updatedTopics,
            nextTopic: 'SQL Data Definition (DDL) & DML',
          };
        }
        return course;
      })
    );

    // Update today's study log (Sunday studied)
    setWeeklyLogs((prev) =>
      prev.map((log) =>
        log.day === 'Sun' ? { ...log, studied: true, minutes: 40, missionsCompleted: 1 } : log
      )
    );

    // Update Roadmap week 4
    setRoadmap((prev) =>
      prev.map((week) => {
        if (week.weekNumber === 4) {
          const updatedItems = week.items.map((item) =>
            item.courseCode === 'CSC 205' && item.topicName.includes('Normalization')
              ? { ...item, completed: true }
              : item
          );
          return { ...week, items: updatedItems };
        }
        return week;
      })
    );

    // Add completion notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '🎯 Mission Completed: Normalization',
        message: 'You completed today\'s study mission. Streak increased to 8 days!',
        timestamp: 'Just now',
        type: 'mission',
        isRead: false,
        actionRoute: 'today',
      },
      ...prev,
    ]);
  };

  const resetMissionState = () => {
    setIsMissionCompleted(false);
    setStreakCount(7);
    setSemesterProgress(18);
    setTotalMissionsCompleted(24);
    setTodayMission((prev) => ({ ...prev, progressPercentage: 0 }));
    setDemoCelebrationTriggered(false);
  };

  const addCourse = (newCourseData: Omit<Course, 'id' | 'topics' | 'materials' | 'assessments' | 'completedMissions' | 'totalMissions'>) => {
    const newId = `c-${newCourseData.code.toLowerCase().replace(/\s+/g, '')}-${Date.now()}`;
    const fullCourse: Course = {
      ...newCourseData,
      id: newId,
      completedMissions: 0,
      totalMissions: 15,
      progressPercentage: 0,
      topics: [
        { id: `t-${newId}-1`, title: 'Course Foundations & Overview', status: 'upcoming', estimatedMinutes: 30 },
        { id: `t-${newId}-2`, title: 'Core Principles Module 1', status: 'upcoming', estimatedMinutes: 45 },
        { id: `t-${newId}-3`, title: 'Intermediate Concepts Module 2', status: 'upcoming', estimatedMinutes: 40 },
        { id: `t-${newId}-4`, title: 'Revision & Past Question Practice', status: 'upcoming', estimatedMinutes: 50 },
      ],
      materials: [
        { id: `m-${newId}-1`, title: `${newCourseData.code}_Syllabus_Overview.pdf`, type: 'pdf', size: '1.2 MB', dateAdded: 'Today' },
      ],
      assessments: [],
    };
    setCourses((prev) => [...prev, fullCourse]);
  };

  const addAssessment = (newAss: Omit<Assessment, 'id' | 'daysRemaining' | 'completed'>) => {
    const item: Assessment = {
      ...newAss,
      id: `ass-${Date.now()}`,
      daysRemaining: 14,
      completed: false,
    };
    setAssessments((prev) => [...prev, item]);
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
  };

  const toggleStudyDay = (day: DayOfWeek) => {
    setStudent((prev) => {
      const exists = prev.studyDays.includes(day);
      return {
        ...prev,
        studyDays: exists
          ? prev.studyDays.filter((d) => d !== day)
          : [...prev.studyDays, day],
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        student,
        setStudent,
        courses,
        setCourses,
        assessments,
        setAssessments,
        todayMission,
        isMissionCompleted,
        completeMission,
        resetMissionState,
        streakCount,
        semesterProgress,
        totalMissionsCompleted,
        totalMissionsPlanned,
        roadmap,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        weeklyLogs,
        selectedCourseId,
        setSelectedCourseId,
        selectedCourse,
        isMissionModalOpen,
        setIsMissionModalOpen,
        isNotificationPanelOpen,
        setIsNotificationPanelOpen,
        onboardingStep,
        setOnboardingStep,
        addCourse,
        addAssessment,
        updateProfile,
        toggleStudyDay,
        demoCelebrationTriggered,
        setDemoCelebrationTriggered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
