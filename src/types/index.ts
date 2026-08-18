export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface StudentProfile {
  name: string;
  institution: string;
  programme: string;
  level: string;
  semester: string;
  academicYear: string;
  avatarUrl?: string;
  targetGpa?: string;
  dailyStudyGoalMinutes: number;
  studyDays: DayOfWeek[];
}

export interface Assessment {
  id: string;
  courseCode: string;
  title: string;
  type: 'Test' | 'Assignment' | 'Exam' | 'Quiz' | 'Project';
  dueDate: string; // e.g. "Aug 24, 2026"
  daysRemaining: number;
  weightPercentage: number;
  completed?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  estimatedMinutes: number;
  summary?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'notes' | 'slides' | 'recording';
  size: string;
  dateAdded: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  progressPercentage: number;
  completedMissions: number;
  totalMissions: number;
  nextTopic: string;
  lecturer?: string;
  colorTheme: 'blue' | 'indigo' | 'emerald' | 'amber' | 'slate' | 'violet';
  topics: Topic[];
  materials: Material[];
  assessments: Assessment[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface StudyMission {
  id: string;
  courseCode: string;
  courseName: string;
  topic: string;
  objective: string;
  description: string;
  estimatedMinutes: number;
  progressPercentage: number;
  sectionContent: {
    introduction: string;
    keyConcepts: { term: string; explanation: string }[];
    exampleTitle: string;
    exampleDescription: string;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    ruleTakeaways: string[];
  };
  practiceQuestion: PracticeQuestion;
}

export type ConfidenceLevel = 'understood' | 'practice' | 'help' | null;

export interface WeekJourney {
  weekNumber: number;
  title: string;
  dateRange: string;
  status: 'completed' | 'current' | 'upcoming';
  items: {
    courseCode: string;
    topicName: string;
    completed: boolean;
    type: 'lesson' | 'quiz' | 'test' | 'milestone';
  }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'mission' | 'streak' | 'assessment' | 'system';
  isRead: boolean;
  actionRoute?: AppRoute;
}

export interface DailyStudyLog {
  day: DayOfWeek;
  dateLabel: string;
  studied: boolean;
  minutes: number;
  missionsCompleted: number;
}

export type AppRoute = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'onboarding'
  | 'today'
  | 'journey'
  | 'courses'
  | 'course-detail'
  | 'learn'
  | 'progress'
  | 'profile'
  | 'settings';
