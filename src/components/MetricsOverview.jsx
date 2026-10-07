import React from 'react';
import { Activity, Clock, Zap, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

export const MetricsOverview = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Avg TAT</span>
          <Clock className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
            {metrics.avgTurnaroundTime} <span className="text-xs text-slate-500 font-normal">units</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Turnaround Time</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Avg WT</span>
          <Activity className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
            {metrics.avgWaitingTime} <span className="text-xs text-slate-500 font-normal">units</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Waiting Time</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Avg RT</span>
          <Zap className="w-4 h-4 text-amber-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
            {metrics.avgResponseTime} <span className="text-xs text-slate-500 font-normal">units</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Response Delay</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">CPU Util</span>
          <ShieldCheck className="w-4 h-4 text-blue-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-blue-600 font-mono tracking-tight tabular-nums">
            {metrics.cpuUtilization}%
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Core Efficiency</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-purple-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Context Sw</span>
          <RefreshCw className="w-4 h-4 text-purple-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-purple-700 font-mono tracking-tight tabular-nums">
            {metrics.contextSwitches}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Preempt Swaps</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:border-pink-400 transition-all">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Throughput</span>
          <BarChart2 className="w-4 h-4 text-pink-600" />
        </div>
        <div className="mt-2">
          <div className="text-xl md:text-2xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
            {metrics.throughput} <span className="text-[10px] text-slate-500 font-normal">p/u</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Procs per Unit Time</p>
        </div>
      </div>
    </div>
  );
};
