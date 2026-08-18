import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Play, 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  Clock, 
  Eye 
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const { 
    selectedCourse, 
    setCurrentRoute, 
    setIsMissionModalOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'topics' | 'materials' | 'ai'>('topics');
  const [courseAiQuestion, setCourseAiQuestion] = useState('');
  const [courseAiAnswer, setCourseAiAnswer] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<string | null>(null);

  if (!selectedCourse) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>No course selected.</p>
        <button
          onClick={() => setCurrentRoute('courses')}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-medium cursor-pointer"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  const handleAskCourseAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseAiQuestion.trim()) return;

    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      setCourseAiAnswer(
        `Here is guidance for **${selectedCourse.code}: ${selectedCourse.name}**:\n\nRegarding "${courseAiQuestion}", this is a high-yield topic on past NOUN examinations. Focus on applying the foundational principles and solving practice problems rather than rote memorization. Check Module 2 of your courseware for standard schema diagrams!`
      );
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Back Navigation */}
      <div>
        <button
          onClick={() => setCurrentRoute('courses')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>
      </div>

      {/* Course Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                {selectedCourse.code}
              </span>
              <span className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                {selectedCourse.units} Credit Units
              </span>
              {selectedCourse.lecturer && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedCourse.lecturer}</span>
                </span>
              )}
            </div>

            <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900">
              {selectedCourse.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl">
              Next scheduled syllabus milestone: <strong className="text-slate-900">{selectedCourse.nextTopic}</strong>
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl min-w-44 text-center sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Course Mastery</span>
            <div className="text-3xl editorial-serif text-slate-900">
              {selectedCourse.progressPercentage}%
            </div>
            <div className="w-full bg-slate-200 progress-pill overflow-hidden mt-2">
              <div 
                className="bg-slate-900 h-full"
                style={{ width: `${selectedCourse.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'topics'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Syllabus Topics ({selectedCourse.topics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'materials'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Course Materials & PDFs ({selectedCourse.materials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Course AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Checklist
            </h3>
            <span className="text-xs text-slate-400">
              Paced sequentially across your 12-week semester
            </span>
          </div>

          <div className="space-y-3">
            {selectedCourse.topics.map((topic, idx) => {
              const isCompleted = topic.status === 'completed';
              const isInProgress = topic.status === 'in_progress';
              const isNormMission = selectedCourse.code === 'CSC 205' && topic.title.includes('Normalization');

              return (
                <div
                  key={topic.id}
                  className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
                    isCompleted
                      ? 'bg-white border-slate-200 text-slate-600 shadow-xs'
                      : isInProgress
                      ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900'
                      : 'bg-white border-slate-100 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Topic {idx + 1}
                        </span>
                        {isInProgress && (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider">
                            Active
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-semibold mt-0.5 ${isInProgress ? 'text-slate-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-500'}`}>
                        {topic.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-xs text-slate-400 flex items-center gap-1 hidden sm:flex">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{topic.estimatedMinutes}m</span>
                    </div>

                    {isNormMission && (
                      <button
                        onClick={() => setIsMissionModalOpen(true)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Launch Mission</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Official Courseware & Slide Decks
            </h3>
            <span className="text-xs text-slate-400">
              Pre-loaded for offline reading
            </span>
          </div>

          <div className="space-y-3">
            {selectedCourse.materials.map((mat) => (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">{mat.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{mat.size}</span>
                      <span>•</span>
                      <span>Added {mat.dateAdded}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewMaterial(mat.title)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Note</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Material Preview Modal simulation */}
          {previewMaterial && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 mt-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Previewing: {previewMaterial}</span>
                </span>
                <button
                  onClick={() => setPreviewMaterial(null)}
                  className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                [Simulated PDF Courseware Viewer]: This document contains Chapter 4: Relational Model Foundations and Functional Dependencies used by the AI Study Mission generator to calibrate David's daily practice questions and exam reviews.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Course AI Tutor Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="editorial-serif text-2xl text-slate-900">
                  Ask AI About {selectedCourse.code}
                </h3>
                <p className="text-xs text-slate-400">
                  Ask clarifying questions specific to this syllabus, past questions, or exam formulas.
                </p>
              </div>
            </div>

            {/* AI Response Display */}
            {courseAiAnswer && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {courseAiAnswer}
              </div>
            )}

            {isAiThinking && (
              <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                <span>Searching {selectedCourse.code} syllabus context...</span>
              </div>
            )}

            {/* Query Form */}
            <form onSubmit={handleAskCourseAi} className="space-y-3">
              <textarea
                rows={3}
                value={courseAiQuestion}
                onChange={(e) => setCourseAiQuestion(e.target.value)}
                placeholder={`Ask anything about ${selectedCourse.code}, e.g. "What are the common exam questions in this course?" or "Summarize the key formulas."`}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCourseAiQuestion('What are the key continuous assessment exam topics for this course?')}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs cursor-pointer border border-slate-200"
                  >
                    Key Exam Topics
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseAiQuestion('Give me a 5-bullet summary of Module 2.')}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs cursor-pointer border border-slate-200"
                  >
                    Module Summary
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask Companion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
