import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DayOfWeek } from '../../types';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  School,
  Clock
} from 'lucide-react';

export const OnboardingFlow: React.FC = () => {
  const { 
    onboardingStep, 
    setOnboardingStep, 
    setCurrentRoute, 
    student, 
    updateProfile, 
    courses, 
    addCourse, 
    assessments, 
    addAssessment, 
    toggleStudyDay,
    setIsMissionModalOpen 
  } = useApp();

  // Local state for Step 4 & 5 form inputs
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseUnits, setNewCourseUnits] = useState(3);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const [newAssTitle, setNewAssTitle] = useState('');
  const [newAssCourse, setNewAssCourse] = useState(courses[0]?.code || 'CSC 205');
  const [newAssType, setNewAssType] = useState<'Test' | 'Assignment' | 'Exam' | 'Quiz'>('Test');
  const [newAssDate, setNewAssDate] = useState('Aug 30, 2026');
  const [showAddAssessment, setShowAddAssessment] = useState(false);

  const handleNext = () => {
    if (onboardingStep < 7) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setCurrentRoute('today');
      setIsMissionModalOpen(true);
    }
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleAddNewCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode || !newCourseName) return;
    addCourse({
      code: newCourseCode.toUpperCase().trim(),
      name: newCourseName.trim(),
      units: Number(newCourseUnits),
      progressPercentage: 0,
      nextTopic: 'Module 1 Foundations',
      colorTheme: 'indigo',
    });
    setNewCourseCode('');
    setNewCourseName('');
    setShowAddCourse(false);
  };

  const handleAddNewAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssTitle) return;
    addAssessment({
      courseCode: newAssCourse,
      title: newAssTitle,
      type: newAssType,
      dueDate: newAssDate,
      weightPercentage: newAssType === 'Exam' ? 60 : 15,
    });
    setNewAssTitle('');
    setShowAddAssessment(false);
  };

  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'Mon', label: 'Monday' },
    { key: 'Tue', label: 'Tuesday' },
    { key: 'Wed', label: 'Wednesday' },
    { key: 'Thu', label: 'Thursday' },
    { key: 'Fri', label: 'Friday' },
    { key: 'Sat', label: 'Saturday' },
    { key: 'Sun', label: 'Sunday' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Top Progress Indicator */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
            Step {onboardingStep} of 7
          </span>
          <span className="text-slate-500 font-medium">
            {onboardingStep === 1 && 'Welcome'}
            {onboardingStep === 2 && 'About You'}
            {onboardingStep === 3 && 'Semester Period'}
            {onboardingStep === 4 && 'Your Courses'}
            {onboardingStep === 5 && 'Academic Dates'}
            {onboardingStep === 6 && 'Study Schedule'}
            {onboardingStep === 7 && 'Ready'}
          </span>
        </div>
        <div className="w-full bg-slate-200 progress-pill overflow-hidden">
          <div 
            className="bg-slate-900 h-full transition-all duration-300"
            style={{ width: `${(onboardingStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Box */}
      <div className="max-w-2xl mx-auto w-full my-8 bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-lg">
        {/* STEP 1: WELCOME */}
        {onboardingStep === 1 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 editorial-serif mb-3">
              Let's build your semester.
            </h1>
            <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed mb-8">
              We'll use a few details about your semester to create a personalized study journey that fits your schedule.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto mb-8 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No endless form filling — pre-configured for your programme</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Generates daily 30–45 minute bite-sized missions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Synchronizes tests, TMAs, and final exam deadlines</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-base transition-colors shadow-xs hover:shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Let's Go</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: ABOUT YOU */}
        {onboardingStep === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">About You</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us where and what you are studying to tailor your academic roadmap.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  placeholder="e.g. David Adeyemi"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  University / Institution
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={student.institution}
                    onChange={(e) => updateProfile({ institution: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                    placeholder="e.g. National Open University of Nigeria (NOUN)"
                  />
                  <School className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Programme / Major
                  </label>
                  <input
                    type="text"
                    value={student.programme}
                    onChange={(e) => updateProfile({ programme: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                    placeholder="e.g. B.Sc. Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Academic Level
                  </label>
                  <select
                    value={student.level}
                    onChange={(e) => updateProfile({ level: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  >
                    <option value="100 Level">100 Level (Freshman)</option>
                    <option value="200 Level">200 Level (Sophomore)</option>
                    <option value="300 Level">300 Level (Junior)</option>
                    <option value="400 Level">400 Level (Senior)</option>
                    <option value="500 Level">500 Level (Engineering/Final)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: YOUR SEMESTER */}
        {onboardingStep === 3 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">Your Semester</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Define the academic timeline so we can pace your missions accurately.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Academic Session
                  </label>
                  <input
                    type="text"
                    value={student.academicYear}
                    onChange={(e) => updateProfile({ academicYear: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Semester
                  </label>
                  <select
                    value={student.semester}
                    onChange={(e) => updateProfile({ semester: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  >
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Semester Start Date
                  </label>
                  <input
                    type="text"
                    defaultValue="July 21, 2026"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Semester End Date
                  </label>
                  <input
                    type="text"
                    defaultValue="September 20, 2026"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Expected Examination Period
                </label>
                <input
                  type="text"
                  defaultValue="September 08 – September 20, 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: YOUR COURSES */}
        {onboardingStep === 4 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">Your Courses</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Review your active course registrations or add new courses.
                </p>
              </div>
              <button
                onClick={() => setShowAddCourse(!showAddCourse)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Add Course Form Modal/Collapse */}
            {showAddCourse && (
              <form onSubmit={handleAddNewCourse} className="mb-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Code</label>
                    <input
                      type="text"
                      placeholder="e.g. CSC 207"
                      value={newCourseCode}
                      onChange={(e) => setNewCourseCode(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Course Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Operating Systems"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-medium">Credit Units:</span>
                    <select
                      value={newCourseUnits}
                      onChange={(e) => setNewCourseUnits(Number(e.target.value))}
                      className="bg-white border border-slate-200 rounded-xl text-xs text-slate-900 px-2 py-1"
                    >
                      <option value={2}>2 Units</option>
                      <option value={3}>3 Units</option>
                      <option value={4}>4 Units</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCourse(false)}
                      className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold"
                    >
                      Save Course
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Course Cards Grid */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {courses.map((c) => (
                <div 
                  key={c.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {c.code.split(' ')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{c.code}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {c.units} Units
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate max-w-[260px] sm:max-w-xs mt-0.5">
                        {c.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5" /> Enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: ACADEMIC DATES */}
        {onboardingStep === 5 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">Academic Dates</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Keep track of tests, assignments (TMA), and exams.
                </p>
              </div>
              <button
                onClick={() => setShowAddAssessment(!showAddAssessment)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Deadline</span>
              </button>
            </div>

            {/* Add Assessment Form */}
            {showAddAssessment && (
              <form onSubmit={handleAddNewAssessment} className="mb-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Course</label>
                    <select
                      value={newAssCourse}
                      onChange={(e) => setNewAssCourse(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Assessment Type</label>
                    <select
                      value={newAssType}
                      onChange={(e) => setNewAssType(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    >
                      <option value="Test">Continuous Assessment Test</option>
                      <option value="Assignment">TMA / Assignment</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Exam">Final Examination</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Lab Practical Test 1"
                    value={newAssTitle}
                    onChange={(e) => setNewAssTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    required
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Due Date</label>
                    <input
                      type="text"
                      value={newAssDate}
                      onChange={(e) => setNewAssDate(e.target.value)}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAssessment(false)}
                      className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold"
                    >
                      Add Date
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {assessments.map((ass) => (
                <div 
                  key={ass.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                      {ass.type[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{ass.courseCode}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {ass.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium truncate max-w-[240px] sm:max-w-sm mt-0.5">
                        {ass.title}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{ass.dueDate}</div>
                    <div className="text-[10px] text-slate-400">{ass.daysRemaining} days left</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: STUDY AVAILABILITY */}
        {onboardingStep === 6 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 editorial-serif">Study Availability</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                When can you realistically study without getting overwhelmed?
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select your available study days:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {days.map((d) => {
                    const isSelected = student.studyDays.includes(d.key);
                    return (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => toggleStudyDay(d.key)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-semibold">{d.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Target Daily Study Session</span>
                  </label>
                  <span className="text-xs font-bold text-slate-900 px-3 py-0.5 rounded-full bg-white border border-slate-200">
                    {student.dailyStudyGoalMinutes} Minutes / Day
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  value={student.dailyStudyGoalMinutes}
                  onChange={(e) => updateProfile({ dailyStudyGoalMinutes: Number(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>20 mins (Bite-sized)</span>
                  <span>45 mins (Balanced)</span>
                  <span>90 mins (Deep dive)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: SEMESTER IS READY */}
        {onboardingStep === 7 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 editorial-serif mb-3">
              Your semester has a plan.
            </h2>
            <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed mb-8">
              We've turned your 6 courses and academic deadlines into a structured study journey. Your first mission is ready.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left max-w-md mx-auto mb-8 space-y-3 shadow-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                First Scheduled Mission
              </div>
              <div className="text-base font-bold text-slate-900 editorial-serif">
                CSC 205: Understand Database Normalization
              </div>
              <p className="text-xs text-slate-500">
                Learn 1NF, 2NF, and 3NF to eliminate anomalies in relational database design.
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <span>Estimated duration: 40 mins</span>
                <span className="text-orange-600 font-bold">Streak Day 1</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-base transition-colors shadow-xs hover:shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>See My First Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Action Buttons (for steps 2 to 6) */}
        {onboardingStep > 1 && onboardingStep < 7 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom helper */}
      <div className="text-center text-xs text-slate-400 font-medium">
        Academic Companion • Prototype Onboarding Engine
      </div>
    </div>
  );
};
