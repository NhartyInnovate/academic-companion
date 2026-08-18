import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  School, 
  Check, 
  Save 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { student, updateProfile } = useApp();
  const [name, setName] = useState(student.name);
  const [institution, setInstitution] = useState(student.institution);
  const [programme, setProgramme] = useState(student.programme);
  const [level, setLevel] = useState(student.level);
  const [targetGpa, setTargetGpa] = useState(student.targetGpa || '4.75 / 5.00');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      institution,
      programme,
      level,
      targetGpa,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 block mb-1">
          Academic Identity
        </span>
        <h1 className="editorial-serif text-3xl sm:text-4xl text-slate-900 leading-tight">
          Student Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your institutional record, academic level, and target performance metrics.
        </p>
      </div>

      {/* Profile ID Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-bold font-serif shadow-xs">
            {student.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900 editorial-serif">{student.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[11px] uppercase tracking-wider">
                {student.level}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">{student.programme}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <School className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.institution}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 px-6 rounded-2xl border border-slate-200 text-left sm:text-right w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Academic Session</span>
          <span className="text-sm font-bold text-slate-900 block mt-0.5">{student.academicYear}</span>
          <span className="text-xs text-indigo-600 font-medium">{student.semester}</span>
        </div>
      </div>

      {/* Edit Information Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="editorial-serif text-2xl text-slate-900">
            Edit Academic Details
          </h3>
          {isSaved && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" /> Saved changes!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Institution
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Programme of Study
            </label>
            <input
              type="text"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Academic Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
            >
              <option value="100 Level">100 Level</option>
              <option value="200 Level">200 Level</option>
              <option value="300 Level">300 Level</option>
              <option value="400 Level">400 Level</option>
              <option value="500 Level">500 Level</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Graduation CGPA
            </label>
            <input
              type="text"
              value={targetGpa}
              onChange={(e) => setTargetGpa(e.target.value)}
              placeholder="e.g. 4.75 / 5.00"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-400"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
