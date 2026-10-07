import React from 'react';
import { Cpu, BookOpen, GitCompare, HelpCircle, Sliders } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <span className="text-base md:text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
            OS Priority Scheduling <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">Lab</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('SIMULATOR')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'SIMULATOR'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Interactive Simulator
          </button>

          <button
            onClick={() => setActiveTab('COMPARE')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'COMPARE'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            Compare Mode
          </button>

          <button
            onClick={() => setActiveTab('LEARN')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'LEARN'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Masterclass Theory
          </button>

          <button
            onClick={() => setActiveTab('QUIZ')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'QUIZ'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Quiz
          </button>
        </nav>
      </div>
    </header>
  );
};
