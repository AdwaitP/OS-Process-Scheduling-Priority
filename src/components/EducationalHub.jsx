import React, { useState } from 'react';
import { BookOpen, Cpu, Zap, Layers, Server } from 'lucide-react';

export const EducationalHub = () => {
  const [activeSection, setActiveSection] = useState('INTRO');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-cyan-300" />
          Operating Systems Masterclass
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Process Scheduling Priority Guide
        </h1>
        <p className="text-sm text-blue-100 mt-2 max-w-3xl leading-relaxed">
          Learn the core principles of Pre-emptive and Non Pre-emptive Priority CPU Scheduling, decision rules, metric formulas, and real-world operating system implementations.
        </p>
      </div>

      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-xl border border-slate-200/80 shadow-xs scrollbar-none">
        <button
          onClick={() => setActiveSection('INTRO')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'INTRO'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          1. Core Principles
        </button>

        <button
          onClick={() => setActiveSection('PREEMPTIVE_VS_NON')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'PREEMPTIVE_VS_NON'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          2. Pre-emptive vs Non Pre-emptive
        </button>

        <button
          onClick={() => setActiveSection('CALCULATIONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'CALCULATIONS'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          3. Formula Calculations
        </button>

        <button
          onClick={() => setActiveSection('REAL_OS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            activeSection === 'REAL_OS'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          4. Real OS Implementations
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-slate-800 font-sans leading-relaxed">
        {activeSection === 'INTRO' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                1. What is Process Priority Scheduling?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                CPU scheduling decides which process from the ready queue gets CPU execution time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-700">The Priority Concept</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Each process is assigned an integer priority value. The CPU scheduler always selects the ready process with the highest priority to execute next.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-indigo-700">Priority Number Conventions</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Different operating systems use opposite priority number conventions:
                </p>
                <ul className="text-xs text-slate-700 space-y-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Lower Value = Higher Priority:</strong> Linux/Unix standard (e.g. 1 is higher priority than 5).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span><strong>Higher Value = Higher Priority:</strong> Windows NT/11 standard (e.g. 31 is higher priority than 1).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'PREEMPTIVE_VS_NON' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                2. Pre-emptive vs Non Pre-emptive Priority
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                The core architectural distinction lies in whether an executing process can be forcibly interrupted.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-900">Pre-emptive Priority Scheduling</h3>
                  <span className="text-[10px] bg-blue-600 text-white font-mono px-2 py-0.5 rounded font-bold">
                    Interrupted Mid-Way
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  When a process arrives with a <strong>strictly higher priority</strong> than the running process, the CPU immediately preempts (suspends) the current process and runs the newcomer.
                </p>
                <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs font-mono text-slate-700 space-y-1">
                  <p className="text-emerald-700 font-semibold">✓ Very fast response time for urgent tasks</p>
                  <p className="text-rose-700">✗ More context switches</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Non Pre-emptive Priority Scheduling</h3>
                  <span className="text-[10px] bg-slate-800 text-white font-mono px-2 py-0.5 rounded font-bold">
                    Runs to Completion
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Once a process enters the CPU, it holds the CPU until it completes its entire burst time. Higher priority newcomers wait in the ready queue.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                  <p className="text-emerald-700 font-semibold">✓ Minimal context switch overhead</p>
                  <p className="text-rose-700">✗ Slower response time for urgent tasks</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Architectural Comparison Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-white text-slate-700 border-b border-slate-200 font-bold">
                      <th className="p-2.5">Feature</th>
                      <th className="p-2.5 text-blue-700">Pre-emptive Priority</th>
                      <th className="p-2.5 text-slate-700">Non Pre-emptive Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-2.5 font-bold">CPU Interruption</td>
                      <td className="p-2.5 text-emerald-700 font-semibold">Yes, at any time step</td>
                      <td className="p-2.5 text-amber-700 font-semibold">No, holds CPU until done</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Decision Points</td>
                      <td className="p-2.5">On Arrival, Exit, or Priority Change</td>
                      <td className="p-2.5">Only on Process Completion</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Response Time</td>
                      <td className="p-2.5 text-emerald-700 font-semibold">Fast Response</td>
                      <td className="p-2.5 text-rose-700">Depends on running burst</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'CALCULATIONS' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                3. Formula Calculations & Metrics
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Standard formulas used to calculate execution performance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-blue-700 font-bold block text-sm">Completion Time (CT)</strong>
                <p className="text-slate-600">Exact time step at which the process finishes execution.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-indigo-700 font-bold block text-sm">Turnaround Time (TAT)</strong>
                <p className="text-slate-600">TAT = Completion Time (CT) - Arrival Time (AT)</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-emerald-700 font-bold block text-sm">Waiting Time (WT)</strong>
                <p className="text-slate-600">WT = Turnaround Time (TAT) - Burst Time (BT)</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-amber-700 font-bold block text-sm">Response Time (RT)</strong>
                <p className="text-slate-600">RT = First Executed Time - Arrival Time (AT)</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'REAL_OS' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                4. Real-World Operating System Implementations
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                How production OS kernels implement process priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <strong className="text-blue-700 font-bold block text-sm">Linux Kernel</strong>
                <p className="text-slate-600 leading-relaxed">
                  Uses <strong>NICE values (-20 to +19)</strong>. Lower nice value gives higher CPU allocation.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <strong className="text-indigo-700 font-bold block text-sm">Windows NT / 11</strong>
                <p className="text-slate-600 leading-relaxed">
                  Uses <strong>32 Priority Levels (0–31)</strong>. Windows dynamically boosts active foreground window threads for smooth user interface response.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
