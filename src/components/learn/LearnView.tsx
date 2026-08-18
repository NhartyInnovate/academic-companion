import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Play, 
  Layers,
  FileText
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const { 
    setIsMissionModalOpen, 
    setCurrentRoute, 
    setSelectedCourseId,
    isMissionCompleted 
  } = useApp();

  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello David! I'm your Academic Companion. What concept across your 6 courses are you working to understand today? You can ask about normalization, asymptotic Big-O, Boolean circuits, or proof by induction."
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    setQuestion('');
    setConversation((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let reply = '';
      const qLower = userText.toLowerCase();

      if (qLower.includes('normalization') || qLower.includes('2nf') || qLower.includes('3nf')) {
        reply = "In Database Management Systems (CSC 205), normalization reduces duplication. Remember the golden rule:\n• 1NF requires atomic values\n• 2NF removes partial dependencies on composite keys\n• 3NF removes transitive dependencies (non-key determining non-key).";
      } else if (qLower.includes('big o') || qLower.includes('complexity') || qLower.includes('data structure')) {
        reply = "In Data Structures (CSC 201), Big O describes how runtime scales with input size n. For example:\n• Array indexing is O(1)\n• Linear Search is O(n)\n• Binary Search on sorted arrays is O(log n)\n• Nested Loop Comparisons are O(n²).";
      } else if (qLower.includes('discrete') || qLower.includes('induction') || qLower.includes('proof')) {
        reply = "In Discrete Mathematics (MTH 203), Proof by Mathematical Induction has two essential phases:\n1) Base Case: Prove P(1) holds true.\n2) Inductive Step: Assume P(k) is true (inductive hypothesis), then prove that P(k+1) must also be true.";
      } else {
        reply = `That's a thoughtful question regarding "${userText}". Based on your 200-level syllabus, focus on mastering the underlying mechanism and writing out step-by-step solutions. Would you like a worked example or a quick practice drill?`;
      }

      setConversation((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 450);
  };

  const handleQuickPrompt = (text: string) => {
    setQuestion(text);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
            Academic AI Tutor
          </span>
          <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
            Learn Workspace
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore syllabus concepts, review lecture materials, or ask your companion for step-by-step explanations.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentRoute('courses')}
            className="px-4 py-2 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Course Materials
          </button>
          <button 
            onClick={() => setIsMissionModalOpen(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-medium cursor-pointer hover:bg-slate-800"
          >
            Active Mission
          </button>
        </div>
      </div>

      {/* Continue Learning Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
              <span>CSC 205 • IN PROGRESS</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 editorial-serif">
              Database Normalization (1NF, 2NF, 3NF & BCNF)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isMissionCompleted ? 'Completed today! Review anytime.' : 'Current active study mission • 40 minutes'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsMissionModalOpen(true)}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isMissionCompleted ? 'Review Mission' : 'Continue Learning'}</span>
        </button>
      </div>

      {/* AI Academic Companion Sandbox */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 editorial-serif">
                Ask Your Academic Companion
              </h3>
              <p className="text-xs text-slate-400">
                What are you trying to understand?
              </p>
            </div>
          </div>

          <span className="text-[10px] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Context: NOUN 200L CS
          </span>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleQuickPrompt('Explain 2NF vs 3NF with a simple table')}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200 transition-colors cursor-pointer"
          >
            💡 2NF vs 3NF Difference
          </button>
          <button
            onClick={() => handleQuickPrompt('How does Asymptotic Big O notation work in CSC 201?')}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200 transition-colors cursor-pointer"
          >
            ⚡ Big O in Data Structures
          </button>
          <button
            onClick={() => handleQuickPrompt('What are the steps for Proof by Mathematical Induction in MTH 203?')}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs rounded-full border border-slate-200 transition-colors cursor-pointer"
          >
            📐 Mathematical Induction Steps
          </button>
        </div>

        {/* Chat Thread */}
        <div className="space-y-4 max-h-84 overflow-y-auto pr-1">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-white border border-slate-200 text-slate-900 user-bubble ml-8 sm:ml-16 shadow-xs font-medium'
                  : 'bg-indigo-600 text-white ai-bubble mr-8 sm:mr-16 whitespace-pre-line shadow-xs'
              }`}
            >
              <div className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${msg.sender === 'user' ? 'text-slate-400' : 'text-indigo-200'}`}>
                {msg.sender === 'user' ? 'David Adeyemi' : 'Academic Companion'}
              </div>
              {msg.text}
            </div>
          ))}

          {isThinking && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Formulating clear conceptual explanation...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleAsk} className="flex gap-2 pt-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type any syllabus question or concept you need explained..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>

      {/* Course Materials Shelf */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Recently Referenced Course Materials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => {
              setSelectedCourseId('c-csc205');
              setCurrentRoute('course-detail');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
              <FileText className="w-4 h-4" />
              <span>CSC 205</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 truncate">
              CSC205_Lecture_Notes_Normalization.pdf
            </div>
            <div className="text-[11px] text-slate-400 mt-1">2.4 MB • 18 Pages</div>
          </div>

          <div 
            onClick={() => {
              setSelectedCourseId('c-csc201');
              setCurrentRoute('course-detail');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
              <FileText className="w-4 h-4" />
              <span>CSC 201</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 truncate">
              Algorithm_Complexity_Cheatsheet.pdf
            </div>
            <div className="text-[11px] text-slate-400 mt-1">850 KB • 6 Pages</div>
          </div>

          <div 
            onClick={() => {
              setSelectedCourseId('c-mth203');
              setCurrentRoute('course-detail');
            }}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
              <FileText className="w-4 h-4" />
              <span>MTH 203</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 truncate">
              MTH203_Discrete_Math_Problem_Sets.pdf
            </div>
            <div className="text-[11px] text-slate-400 mt-1">1.9 MB • 12 Pages</div>
          </div>
        </div>
      </div>
    </div>
  );
};
