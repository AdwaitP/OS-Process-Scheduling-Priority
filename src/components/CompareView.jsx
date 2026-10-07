import React from 'react';
import { runSimulation } from '../utils/schedulerEngine.js';
import { GanttChart } from './GanttChart.jsx';
import { GitCompare, ArrowDownUp, Zap } from 'lucide-react';

export const CompareView = ({ processes, priorityOrder }) => {
  const preemptiveResult = runSimulation(processes, 'PREEMPTIVE_PRIORITY', priorityOrder);
  const nonPreemptiveResult = runSimulation(processes, 'NON_PREEMPTIVE_PRIORITY', priorityOrder);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4 text-cyan-300" />
            Side-by-Side Algorithm Comparison
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Pre-emptive Priority vs Non Pre-emptive Priority
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
            Compare execution timelines, preemption context switches, turnaround times, and response times on your current set of {processes.length} processes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/20 text-xs font-mono text-white">
          <ArrowDownUp className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>Order: {priorityOrder === 'LOWER_IS_HIGHER' ? '1=Highest' : '99=Highest'}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm overflow-x-auto">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Performance Metrics Comparison Scorecard
        </h3>

        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[11px] font-bold">
              <th className="p-3">Algorithm</th>
              <th className="p-3 text-cyan-700">Avg Turnaround (TAT)</th>
              <th className="p-3 text-emerald-700">Avg Waiting (WT)</th>
              <th className="p-3 text-amber-700">Avg Response (RT)</th>
              <th className="p-3 text-purple-700">Context Switches</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-blue-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Pre-emptive Priority
              </td>
              <td className="p-3 font-bold text-cyan-700 tabular-nums">
                {preemptiveResult.metrics.avgTurnaroundTime} u
              </td>
              <td className="p-3 font-bold text-emerald-700 tabular-nums">
                {preemptiveResult.metrics.avgWaitingTime} u
              </td>
              <td className="p-3 font-bold text-amber-700 tabular-nums">
                {preemptiveResult.metrics.avgResponseTime} u
              </td>
              <td className="p-3 font-bold text-purple-700 tabular-nums">
                {preemptiveResult.metrics.contextSwitches}
              </td>
            </tr>

            <tr className="hover:bg-slate-50">
              <td className="p-3 font-bold text-indigo-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Non Pre-emptive Priority
              </td>
              <td className="p-3 font-bold text-cyan-700 tabular-nums">
                {nonPreemptiveResult.metrics.avgTurnaroundTime} u
              </td>
              <td className="p-3 font-bold text-emerald-700 tabular-nums">
                {nonPreemptiveResult.metrics.avgWaitingTime} u
              </td>
              <td className="p-3 font-bold text-amber-700 tabular-nums">
                {nonPreemptiveResult.metrics.avgResponseTime} u
              </td>
              <td className="p-3 font-bold text-purple-700 tabular-nums">
                {nonPreemptiveResult.metrics.contextSwitches} (0 Mid-Burst Swaps)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1 font-mono">
            <span>1. Pre-emptive Priority Execution Timeline</span>
            <span className="text-blue-600">Context Switches: {preemptiveResult.metrics.contextSwitches}</span>
          </div>
          <GanttChart
            ganttBlocks={preemptiveResult.ganttBlocks}
            totalTime={preemptiveResult.metrics.totalExecutionTime}
            currentStepTime={preemptiveResult.metrics.totalExecutionTime}
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1 font-mono">
            <span>2. Non Pre-emptive Priority Execution Timeline</span>
            <span className="text-indigo-600">Context Switches: {nonPreemptiveResult.metrics.contextSwitches}</span>
          </div>
          <GanttChart
            ganttBlocks={nonPreemptiveResult.ganttBlocks}
            totalTime={nonPreemptiveResult.metrics.totalExecutionTime}
            currentStepTime={nonPreemptiveResult.metrics.totalExecutionTime}
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          Key Comparative Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 font-sans">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <strong className="text-blue-700 font-bold block mb-1">Pre-emptive Priority Advantages</strong>
            <p className="text-slate-600 leading-relaxed">
              Interrupting lower priority processes on higher priority arrival provides much lower response times for urgent interactive tasks, but incurs extra context switch overhead.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <strong className="text-indigo-700 font-bold block mb-1">Non Pre-emptive Priority Advantages</strong>
            <p className="text-slate-600 leading-relaxed">
              Once a process gains the CPU, it runs to completion without mid-burst interruptions. This minimizes CPU context switches and provides predictable batch processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
