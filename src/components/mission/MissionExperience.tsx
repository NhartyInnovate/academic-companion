import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConfidenceLevel } from '../../types';
import { MOCK_AI_RESPONSES } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Clock, 
  Sparkles, 
  Send, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  RotateCcw, 
  Bot, 
  BookOpen, 
  Lightbulb, 
  Smile, 
  Meh, 
  Frown
} from 'lucide-react';

export const MissionExperience: React.FC = () => {
  const { 
    isMissionModalOpen, 
    setIsMissionModalOpen, 
    todayMission, 
    completeMission, 
    setCurrentRoute
  } = useApp();

  // Active sub-step in mission: 'learn' -> 'practice' -> 'confidence' -> 'completed'
  const [missionStep, setMissionStep] = useState<'learn' | 'practice' | 'confidence' | 'completed'>('learn');
  
  // AI companion state
  const [aiActiveTab, setAiActiveTab] = useState<'explain_simply' | 'give_example' | 'summarize_this' | 'custom'>('explain_simply');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Practice state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmittedPractice, setHasSubmittedPractice] = useState(false);

  // Confidence rating
  const [confidence, setConfidence] = useState<ConfidenceLevel>(null);

  if (!isMissionModalOpen) return null;

  const handleSelectOption = (optId: string) => {
    if (hasSubmittedPractice) return;
    setSelectedOption(optId);
  };

  const handleSubmitPractice = () => {
    if (!selectedOption) return;
    setHasSubmittedPractice(true);
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      const qLower = customQuestion.toLowerCase();
      if (qLower.includes('bcnf') || qLower.includes('boyce')) {
        setCustomAnswer('Boyce-Codd Normal Form (BCNF) is a stricter version of 3NF. While 3NF allows prime attributes on the right-hand side of a dependency, BCNF strictly requires that the determinant (left-hand side) of *every* functional dependency MUST be a candidate superkey.');
      } else if (qLower.includes('exam') || qLower.includes('test')) {
        setCustomAnswer('Exam Pro-Tip: In Nigerian university examinations (like NOUN e-exams), questions often test whether you know that **2NF eliminates partial dependencies** and **3NF eliminates transitive dependencies**. Always check composite keys first!');
      } else if (qLower.includes('anomaly') || qLower.includes('anomalies')) {
        setCustomAnswer('There are 3 major anomalies prevented by normalization: 1) **Update Anomaly** (changing one lecturer room requires 50 updates), 2) **Insertion Anomaly** (cannot record a new course until a student registers), 3) **Deletion Anomaly** (deleting the last student deletes course records).');
      } else {
        setCustomAnswer(`Great question regarding "${customQuestion}". In database normalization, the core principle is that every non-key column must directly depend on the entire primary key. Decomposing redundant tables into atomic relations eliminates duplicate storage and keeps the relational schema mathematically sound.`);
      }
    }, 450);
  };

  const handleFinishMission = () => {
    completeMission(confidence);
    setMissionStep('completed');

    // Trigger subtle confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0f172a', '#4f46e5', '#10b981', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleCloseAndGoToJourney = () => {
    setIsMissionModalOpen(false);
    setCurrentRoute('journey');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-center items-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 flex flex-col my-auto max-h-[92vh] overflow-hidden">
        
        {/* Top Mission Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                  {todayMission.courseCode}
                </span>
                <span className="text-xs text-slate-400 font-medium">{todayMission.courseName}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 editorial-serif mt-0.5">
                {todayMission.topic}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{todayMission.estimatedMinutes} mins study</span>
            </div>
            <button
              onClick={() => setIsMissionModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close mission"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="px-6 sm:px-8 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${missionStep === 'learn' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
              1. Learn Concepts
            </span>
            <span className="text-slate-300">→</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${missionStep === 'practice' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
              2. Practice Recall
            </span>
            <span className="text-slate-300">→</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${missionStep === 'confidence' || missionStep === 'completed' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
              3. Complete Step
            </span>
          </div>

          <span className="text-slate-400 font-medium text-xs hidden md:inline">
            One meaningful study step at a time.
          </span>
        </div>

        {/* Dynamic Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* ================= STEP 1: LEARN ================= */}
          {missionStep === 'learn' && (
            <div className="space-y-6">
              {/* Objective Banner */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Mission Objective</h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {todayMission.objective}
                  </p>
                </div>
              </div>

              {/* Core Text */}
              <div className="max-w-none text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>{todayMission.sectionContent.introduction}</p>
              </div>

              {/* Key Concepts Grid */}
              <div>
                <h3 className="editorial-serif text-xl font-bold text-slate-900 mb-3">
                  The Progressive Normal Forms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {todayMission.sectionContent.keyConcepts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">{item.term}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Normalization Comparison Table */}
              {todayMission.sectionContent.tableData && (
                <div className="space-y-2.5">
                  <h3 className="editorial-serif text-xl font-bold text-slate-900">
                    Comparison & Practical Tests
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                        <tr>
                          {todayMission.sectionContent.tableData.headers.map((h, i) => (
                            <th key={i} className="p-3.5 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {todayMission.sectionContent.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{row[0]}</td>
                            <td className="p-3.5">{row[1]}</td>
                            <td className="p-3.5 text-rose-600 font-medium">{row[2]}</td>
                            <td className="p-3.5 text-slate-500 italic">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Rule Takeaways */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Mental Model</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {todayMission.sectionContent.ruleTakeaways.map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contextual AI Assistant Panel */}
              <div className="mt-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    <span>Academic Companion • AI Tutor</span>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2.5 py-0.5 rounded-full font-medium">
                    Contextual Explanations
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAiActiveTab('explain_simply');
                      setCustomAnswer(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      aiActiveTab === 'explain_simply' && !customAnswer
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    💡 Explain Simply
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAiActiveTab('give_example');
                      setCustomAnswer(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      aiActiveTab === 'give_example' && !customAnswer
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    🇳🇬 Give Me an Example
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAiActiveTab('summarize_this');
                      setCustomAnswer(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      aiActiveTab === 'summarize_this' && !customAnswer
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    ⚡ Summarize This
                  </button>
                </div>

                {/* AI Response Display Box */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line mb-3 min-h-20 shadow-xs">
                  {isAiLoading ? (
                    <div className="flex items-center gap-2 text-slate-500 py-3 justify-center">
                      <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                      <span>Synthesizing syllabus explanation...</span>
                    </div>
                  ) : customAnswer ? (
                    customAnswer
                  ) : (
                    MOCK_AI_RESPONSES[aiActiveTab]
                  )}
                </div>

                {/* Custom Question Input */}
                <form onSubmit={handleCustomQuestionSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ask anything about normalization or exam prep..."
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PRACTICE ================= */}
          {missionStep === 'practice' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1">
                  Active Recall
                </span>
                <h3 className="editorial-serif text-3xl text-slate-900">
                  Let’s see what you remember.
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active retrieval cements understanding 300% faster than passive re-reading.
                </p>
              </div>

              {/* Question Card */}
              <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Question 1 of 1 • Concept Verification
                </div>
                <p className="text-base font-semibold text-slate-900">
                  {todayMission.practiceQuestion.question}
                </p>

                {/* Options List */}
                <div className="space-y-3 pt-1">
                  {todayMission.practiceQuestion.options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = opt.id === todayMission.practiceQuestion.correctOptionId;

                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                    if (hasSubmittedPractice) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {hasSubmittedPractice && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                        {hasSubmittedPractice && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explanation */}
                {hasSubmittedPractice && (
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    selectedOption === todayMission.practiceQuestion.correctOptionId
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <div className="font-bold mb-1">
                      {selectedOption === todayMission.practiceQuestion.correctOptionId
                        ? '✓ Correct! You accurately identified the normal form criteria.'
                        : '✗ Not quite. Review the explanation:'}
                    </div>
                    <div>{todayMission.practiceQuestion.explanation}</div>
                  </div>
                )}

                {/* Practice Submit / Continue Buttons */}
                <div className="pt-3 flex justify-end">
                  {!hasSubmittedPractice ? (
                    <button
                      type="button"
                      disabled={!selectedOption}
                      onClick={handleSubmitPractice}
                      className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full text-xs font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMissionStep('confidence')}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CONFIDENCE CHECK ================= */}
          {missionStep === 'confidence' && (
            <div className="space-y-6 max-w-lg mx-auto text-center py-8">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1">
                Calibration
              </span>
              <h3 className="editorial-serif text-3xl text-slate-900">
                How confident do you feel?
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We calibrate your future spaced repetition intervals based on this feedback.
              </p>

              <div className="grid grid-cols-3 gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={() => setConfidence('understood')}
                  className={`p-5 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    confidence === 'understood'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smile className="w-8 h-8 text-emerald-600" />
                  <span className="text-xs">I understand</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfidence('practice')}
                  className={`p-5 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    confidence === 'practice'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Meh className="w-8 h-8 text-amber-600" />
                  <span className="text-xs">Need practice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfidence('help')}
                  className={`p-5 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    confidence === 'help'
                      ? 'bg-rose-50 border-rose-500 text-rose-900 shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Frown className="w-8 h-8 text-rose-600" />
                  <span className="text-xs">Need more help</span>
                </button>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleFinishMission}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Complete Mission</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: CELEBRATION & COMPLETION ================= */}
          {missionStep === 'completed' && (
            <div className="space-y-6 max-w-md mx-auto text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="editorial-serif text-3xl sm:text-4xl text-slate-900">
                  Mission Complete.
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Another step toward a stronger semester.
                </p>
              </div>

              {/* Progress & Streak Stats Box */}
              <div className="grid grid-cols-2 gap-3.5 p-5 bg-slate-50 border border-slate-200 rounded-3xl text-left">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-orange-600 text-xs font-bold mb-1">
                    <Flame className="w-4 h-4" />
                    <span>Streak Increased</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">8 Days Active</div>
                  <div className="text-[10px] text-slate-400">Consistency maintained</div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Roadmap Progress</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">20% Complete</div>
                  <div className="text-[10px] text-slate-400">+2% boost today</div>
                </div>
              </div>

              {/* Next Day Teaser */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 text-left">
                <span className="font-bold text-indigo-600 block mb-0.5">Your next mission is ready tomorrow:</span>
                <span>CSC 205: SQL Data Definition (DDL) & Primary Keys</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAndGoToJourney}
                  className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>View My Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMissionModalOpen(false)}
                  className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-full text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation for Learn Step */}
        {missionStep === 'learn' && (
          <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Ready to test your comprehension?
            </span>
            <button
              onClick={() => setMissionStep('practice')}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Go to Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
