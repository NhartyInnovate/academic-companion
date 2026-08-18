import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Calendar, 
  User 
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { courses, setSelectedCourseId, setCurrentRoute } = useApp();

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentRoute('course-detail');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
            Active Semester Registration
          </span>
          <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
            Registered Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track syllabus progress, lecture materials, and assessment milestones for all 6 courses.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-xs">
          <span className="font-semibold text-slate-900">6 Registered</span> • Total 16 Credit Units
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const upcomingExam = course.assessments.find((a) => a.type === 'Exam' || a.type === 'Test');

          return (
            <div
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg cursor-pointer group shadow-xs"
            >
              <div>
                {/* Course Code & Unit Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                    {course.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {course.units} Units
                  </span>
                </div>

                {/* Course Name */}
                <h3 className="text-lg font-bold text-slate-900 editorial-serif group-hover:text-indigo-600 transition-colors mb-1 line-clamp-1">
                  {course.name}
                </h3>

                {/* Lecturer info */}
                {course.lecturer && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{course.lecturer}</span>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-1.5 my-5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Syllabus Covered</span>
                    <span className="text-slate-900">{course.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 progress-pill overflow-hidden">
                    <div 
                      className="bg-slate-900 h-full transition-all duration-300"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Next Scheduled Topic */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-0.5">
                    Next Study Topic:
                  </span>
                  <span className="text-xs text-slate-700 font-medium line-clamp-1">
                    {course.nextTopic}
                  </span>
                </div>
              </div>

              {/* Assessment Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {upcomingExam ? (
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{upcomingExam.type}: {upcomingExam.dueDate.split(',')[0]}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">No imminent exam</span>
                )}

                <span className="text-slate-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
